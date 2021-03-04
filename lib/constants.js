
/*
* Supported SoC types.  Must be kept in sync with rpio.cc.
*/
export const SOC_BCM2835 = 0x0;
export const SOC_SUNXI = 0x1;

/*
,
*/
export const LOW = 0x0;
export const HIGH = 0x1;

/*
* Supported function select modes.  INPUT and OUTPUT match the bcm2835
* function select integers.  PWM is handled specially.
*/
export const INPUT = 0x0;
export const OUTPUT = 0x1;
export const PWM = 0x2;

/*
* Configure builtin pullup/pulldown resistors.
*/
export const PULL_OFF = 0x0;
export const PULL_DOWN = 0x1;
export const PULL_UP = 0x2;

/*
* Pin edge detect events.  Default to both.
*/
export const POLL_LOW = 0x1;	/* Falling edge detect */
export const POLL_HIGH = 0x2;	/* Rising edge detect */
export const POLL_BOTH = 0x3;	/* POLL_LOW | POLL_HIGH */

/*
* Reset pin status on close (default), or preserve current status.
*/
export const PIN_PRESERVE = 0x0;
export const PIN_RESET = 0x1;

/*
* GPIO Pad Control
*/
export const PAD_GROUP_0_27 = 0x0;
export const PAD_GROUP_28_45 = 0x1;
export const PAD_GROUP_46_53 = 0x2;
export const PAD_DRIVE_2mA = 0x00;
export const PAD_DRIVE_4mA = 0x01;
export const PAD_DRIVE_6mA = 0x02;
export const PAD_DRIVE_8mA = 0x03;
export const PAD_DRIVE_10mA = 0x04;
export const PAD_DRIVE_12mA = 0x05;
export const PAD_DRIVE_14mA = 0x06;
export const PAD_DRIVE_16mA = 0x07;
export const PAD_HYSTERESIS = 0x08;
export const PAD_SLEW_UNLIMITED = 0x10;

export default {
  SOC_BCM2835,
  SOC_SUNXI,
  LOW,
  HIGH,
  INPUT,
  OUTPUT,
  PWM,
  PULL_OFF,
  PULL_DOWN,
  PULL_UP,
  POLL_LOW,
  POLL_HIGH,
  POLL_BOTH,
  PIN_PRESERVE,
  PIN_RESET,
  PAD_GROUP_0_27,
  PAD_GROUP_28_45,
  PAD_GROUP_46_53,
  PAD_DRIVE_2mA,
  PAD_DRIVE_4mA,
  PAD_DRIVE_6mA,
  PAD_DRIVE_8mA,
  PAD_DRIVE_10mA,
  PAD_DRIVE_12mA,
  PAD_DRIVE_14mA,
  PAD_DRIVE_16mA,
  PAD_HYSTERESIS,
  PAD_SLEW_UNLIMITED,
};
