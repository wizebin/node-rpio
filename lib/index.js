import bindings from 'bindings'
const binding = bindings('rpio');
import fs from 'fs';
import { EventEmitter } from 'events';
import { detectPinmap, getMockPinmap, mockDevices, pinmaps } from './pinMaps';
import * as constants from './constants';
import { INPUT, OUTPUT, PIN_RESET, POLL_BOTH, PULL_OFF, PWM } from './constants';

export class rpio extends EventEmitter {
  constructor() {
    super();

    this.on('warn', this.defaultWarningHandler);
    Object.assign(this, constants);
  }

  initialize = (options) => {
    if (this.initialized) {
      this.emit('warn', 'Already initialized');
    }
    this.options = Object.assign(this.options, options || {});
    this.pincache = {};

    if (this.options.mock) {
      const mock = getMockPinmap(this.options.mock || rpio.defaultMock);
      if (mock.pinmap) {
        this.pinmap = mock.pinmap;
        this.soctype = mock.soctype;
      } else {
        throw new Error(`Unsupported mock mode ${mock} (try ${Object.keys(mockDevices).join(', ')})`);
      }
    } else {
      const detected = detectPinmap();
      if (detected.pinmap !== null) {
        this.pinmap = detected.pinmap;
        this.soctype = detected.soctype;
      } else {
        this.emit('warn', `Hardware auto-detection failed, running in ${rpio.defaultMock} mock mode`);
        const mock = getMockPinmap(rpio.defaultMock);
        this.pinmap = mock.pinmap;
        this.soctype = mock.soctype;
      }
    }

    if (this.options.closeOnExit) {
      process.on('exit', function(code) {
        rpio.prototype.exit();
      });
    }

    this.maybeMock(binding.rpio_init, this.soctype, this.options.gpiomem ? 1 : 0);
	  this.initialized = true;
  }

  init = (...params) => this.initialize(...params);

  initialized = false;
  options = {
    gpiomem: true,
    mapping: 'physical',
    mock: false,
    closeOnExit: true,
    pollingTimeout: 1,
  };

  static defaultMock = 'raspi-3';

  maybeMock = (func, ...args) => {
    if (this.options.mock) {
      this.emit('mocked', func, args);
      return undefined;
    }

    return func(...args);
  }

  pincache = {};
  soctype = null;
  mockmap = {};

  /*
  * Pin event polling.  We track which pins are being monitored, and create a
  * bitmask for efficient checks.  The event_poll function is executed in a
  * setInterval() context whenever any pins are being monitored, and emits
  * events when their EDS bit is set.
  */
  eventPins = {};
  eventMask = 0x0;
  eventRunning = null;

  pollEvents = () => {
    const active = this.maybeMock(binding.gpio_event_poll, this.eventMask);

    for (gpioPin in this.eventPins) {
      if (active & (1 << gpioPin))
        this.emit('pin' + gpioPin);
    }
  }

  ensurePolling = () => {
    if (!this.eventRunning) {
      this.eventRunning = setInterval(this.pollEvents, this.options.pollingTimeout);
    }
    return true;
  }

  pinToGpio(pin) {
    if (this.pincache[pin])
      return this.pincache[pin];

    if (this.options.mapping === 'physical') {
      if (this.pinmap[pin] == -1 ||
          this.pinmap[pin] == null) {
        throw new Error(`Pin ${pin} is not valid when using ${this.options.mapping} mapping`);
      }
      this.pincache[pin] = this.pinmap[pin];
    } else if (this.options.mapping === 'gpio') {
      if (this.pinmap.indexOf(pin) === -1)
        throw new Error(`Pin ${pin} is not valid when using ${this.options.mapping} mapping`);
      this.pincache[pin] = pin;
    } else {
      throw new Error('Unsupported GPIO mode');
    }

    return this.pincache[pin];
  }

  checkSystemGpio(pin){
    if (fs.existsSync('/sys/class/gpio/gpio' + pin)) {
      throw new Error(`GPIO${pin} is currently in use by /sys/class/gpio`);
    }
  }

  pwmPins = {
    12: { function: 4, channel: 0 },
    13: { function: 4, channel: 0 },
    18: { function: 2, channel: 1 },
    19: { function: 2, channel: 1 },
  };

  getPwmPin = (pin) => {
    const gpioPin = this.pinToGpio(pin);
    const pwmPin = this.pwmPins[gpioPin];
    if (pwmPin === undefined) throw new Error(`Pin ${pin} (gpio ${gpioPin}) does not support hardware PWM`);
    return pwmPin;
  }

  getPwmFunction(pin) {
    const pwmPin = this.getPwmPin(pin);
    return pwmPin.function;
  }

  getPwmChannel(pin) {
    const pwmPin = this.getPwmPin(pin);
    return pwmPin.channel;
  }

  setPinPwm(pin) {
    var gpioPin = this.pinToGpio(pin);

    if (this.options.gpiomem) throw new Error('PWM not available in gpiomem mode');

    this.checkSystemGpio(gpioPin);

    /*
    * PWM channels and alternate functions differ from pin to pin, set
    * them up appropriately based on selected pin.
    */
    const pwmPin = this.getPwmPin(pin);

    maybeMock(binding.gpio_function, gpioPin, pwmPin.function);

    /*
    * For now we assume mark-space mode, balanced is unsupported.
    */
    maybeMock(binding.pwm_set_mode, pwmPin.channel, 1, 1);
  }

  defaultWarningHandler = (message) => {
    if (this.listenerCount('warn') > 1) this.removeListener('warn', this.defaultWarningHandler);
    else console.error(message);
  }

  mode = (pin, mode, value) => {
    const gpioPin = this.pinToGpio(pin);

    if (mode === INPUT) {
      this.maybeMock(binding.gpio_function, gpioPin, INPUT);
    } else if (mode === OUTPUT) {
      this.maybeMock(binding.gpio_function, gpioPin, OUTPUT); // TODO: should this go below the if statement like in the OG lib?
      if (value !== undefined) {
        if (this.options.mock) this.mockmap[gpioPin] = value;
        this.maybeMock(binding.gpio_write, gpioPin, value);
      }
    } else if (mode === PWM) {
      this.setPinPwm(pin);
    } else {
      throw new Error(`Unsupported pin mode ${mode} (try ${[INPUT, OUTPUT, PWM].join(', ')})`);
    }
  }

  forceNoGpioMem = () => {
    if (this.options.gpiomem) {
      this.options.gpiomem = false;
      this.emit('warn', 'Automatically changing options.gpiomem to false, this is required to use PWM');
    }
  }

  open = (pin, mode, value) => {
    if (!this.initialized) {
      if (mode === PWM) this.forceNoGpioMem();
      this.initialize();
    }

    const gpioPin = this.pinToGpio(pin);
    this.checkSystemGpio(gpioPin);

    return this.mode(pin, mode, value);
  }

  read = (pin, mode) => {
    const gpioPin = this.pinToGpio(pin);
    if (this.options.mock) {
      if (this.mockmap[gpioPin]) return this.mockmap[gpioPin];
      this.mockmap[gpioPin] = 0;
      return this.mockmap[gpioPin];
    }

    return this.maybeMock(binding.gpio_read, gpioPin, mode ? 1 : 0);
  }

  readbuf = (pin, buf, length, mode) => {
    if (length === undefined) length = buf.length;
    if (length > buf.length) throw new Error(`Buffer too small, has ${buf.length}B available, you requested ${length}B`);

    return this.maybeMock(binding.gpio_readbuf, this.pinToGpio(pin), buf, length, mode ? 1 : 0);
  }

  write = (pin, value) => {
    const gpioPin = this.pinToGpio(pin);
    if (this.options.mock) {
      this.mockmap[gpioPin] = value;
      return this.mockmap[gpioPin];
    }

    return this.maybeMock(binding.gpio_write, gpioPin, value);
  }

  writebuf = (pin, buffer, length) => {
    if (length === undefined) length = buffer.length;
    if (length > buffer.length) throw new Error(`Buffer smaller than requested write length, has ${buffer.length}B, you requested ${length}B`);

    return this.maybeMock(binding.gpio_writebuf, this.pinToGpio(pin), buffer, length);
  }

  writepad = (group, control) => {
    if (this.options.gpiomem) throw new Error('Pad control unavailable in gpiomem mode');

    return this.maybeMock(binding.gpio_pad_write, group, control);
  }

  pud = (pin, state) => {
    return this.maybeMock(binding.gpio_pud, pin_to_gpio(pin), state);
  }

  poll = (pin, callback, direction) => {
    const gpioPin = this.pinToGpio(pin);

    if (direction === undefined) direction = POLL_BOTH;
    if (typeof(callback) === 'function') {
      if (gpioPin in this.eventPins) throw new Error(`Pin ${pin} (gpio ${gpioPin}) is already listening for events`);

      this.maybeMock(binding.gpio_event_set, gpioPin, direction);

      const pinCallback = () => callback(pin);
      this.on(`pin${gpioPin}`, pinCallback); // todo: make sure this is removed later

      this.eventPins[gpioPin] = pinCallback;
      this.eventMask |= (1 << gpioPin);

      this.ensurePolling();
    } else {
      this.stopPolling(pin);
    }
  }

  stopPolling = (pin) => {
    if (!(gpioPin in this.eventPins)) {
      this.emit('warn', `Pin ${pin} (gpio ${gpioPin}) is not listening for events`);
      return false;
    }

    this.maybeMock(binding.gpio_event_clear, gpioPin);

    this.removeListener(`pin${gpioPin}`, this.eventPins[gpioPin]);

    delete this.eventPins[gpioPin];
    this.eventMask &= ~(1 << gpioPin);

    if (Object.keys(this.eventPins).length === 0) {
      clearInterval(this.eventRunning);
      this.eventRunning = null;
    }

    return true;
  }

  close = (pin, reset) => {
    const gpioPin = this.pinToGpio(pin);

    if (this.options.mock) {
      this.mockmap[gpioPin] = undefined;
    }

    if (reset === undefined) reset = PIN_RESET;

    if (gpioPin in this.eventPins) this.stopPolling(pin);

    if (reset) {
      if (!this.options.gpiomem) this.pud(pin, PULL_OFF);
      this.mode(pin, INPUT);
    }
  }

  exit = () => {
    this.maybeMock(binding.rpio_close);
  }

  pwmSetClockDivider = (divider) => {
    return this.maybeMock(binding.pwm_set_clock, divider); // originally this was supposed to be a power of 2, that appears unnecessary
  }

  pwmSetRange = (pin, range) => {
    const channel = this.getPwmChannel(pin);

    return this.maybeMock(binding.pwm_set_range, channel, range);
  }

  pwmSetData = (pin, data) => {
    const channel = this.getPwmChannel(pin);

    return this.maybeMock(binding.pwm_set_data, channel, data);
  }

  i2cBegin = () => {
    if (!this.initialized) {
      this.forceNoGpioMem();
      this.initialize();
    }

    if (this.options.gpiomem) throw new Error('i2c not available in gpiomem mode');

    this.maybeMock(binding.i2c_begin);
  }

  i2cSetSlaveAddress = (addresss) => {
    return this.maybeMock(binding.i2c_set_slave_address, addresss);
  }

  i2cSetClockDivider = (divider) => {
    return this.maybeMock(binding.i2c_set_clock_divider, divider);
  }

  i2cSetBaudRate = (baud) => {
    return this.maybeMock(binding.i2c_set_baudrate, baud);
  }

  i2cRead = (buffer, length) => {
    if (length === undefined) length = buffer.length;
    if (length > buffer.length) throw new Error('Buffer too small');

    return this.maybeMock(binding.i2c_read, buffer, length);
  }

  i2cReadRegisterRestart = (reg, buffer, length) => {
    if (length === undefined) length = buffer.length;
    if (length > buffer.length) throw new Error('Buffer too small');

    return this.maybeMock(binding.i2c_read_register_rs, reg, buffer, length);
  }

  i2cWrite = (buffer, length) => {
    if (length === undefined) length = buffer.length;
    if (length > buffer.length) throw new Error('Buffer too small');

    return this.maybeMock(binding.i2c_write, buffer, length);
  }

  i2cWriteReadRestart = (commandBuffer, commandLength, readBuffer, readLength) => {
    if (commandLength === undefined) commandLength = commandBuffer.length;
    if (commandLength > commandBuffer.length) throw new Error('Write buffer too small');
    if (readLength === undefined) readLength = readBuffer.length;
    if (readLength > readBuffer.length) throw new Error('Read buffer too small');

    return this.maybeMock(binding.i2c_write_read_rs, commandBuffer, commandLength, readBuffer, readLength);
  }

  i2cEnd = () => {
    maybeMock(binding.i2c_end);
  }

  spiBegin = () => {
    if (!initialized) {
      this.forceNoGpioMem();
      this.initialize();
    }

    if (this.options.gpiomem) throw new Error('SPI not available in gpiomem mode');

    maybeMock(binding.spi_begin);
  }

  spiChipSelect = (chipSelect) => {
    return this.maybeMock(binding.spi_chip_select, chipSelect);
  }

  spiSetCSPolarity = (chipSelect, active) => {
    return this.maybeMock(binding.spi_set_cs_polarity, chipSelect, active);
  }

  spiSetClockDivider = (divider) => {
    if ((divider % 2) !== 0 || divider < 0 || divider > 65536)
      throw new Error('Clock divider must be an even number between 0 and 65536');

    return this.maybeMock(binding.spi_set_clock_divider, divider);
  }

  spiSetDataMode = (mode) => {
    return this.maybeMock(binding.spi_set_data_mode, mode);
  }

  spiTransfer = (transferBuffer, receiveBuffer, length) => {
    return this.maybeMock(binding.spi_transfer, transferBuffer, receiveBuffer, length);
  }

  spiWrite = (buffer, length) => {
    return this.maybeMock(binding.spi_write, buffer, length);
  }

  spiEnd = () => {
    maybeMock(binding.spi_end);
  }

  sleep = (seconds) => {
    maybeMock(binding.rpio_usleep, seconds * 1000000);
  }

  msleep = (milliseconds) => {
    maybeMock(binding.rpio_usleep, milliseconds * 1000);
  }

  usleep = (picoseconds) => {
    maybeMock(binding.rpio_usleep, picoseconds);
  }
}

export default new rpio();
