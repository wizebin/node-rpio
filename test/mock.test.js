import instance, { rpio } from '../lib/index';

describe('mock', () => {
	it('initializes a mock', () => {
		instance.init({ mock: 'raspi-3' });
	});

	it('allows for multiple instances', () => {
		const second = new rpio();
		second.init({ mock: 'raspi-3' });
	});

	it('opens pins', () => {
		instance.open(11, instance.INPUT, instance.PULL_DOWN);
		instance.open(12, instance.OUTPUT, instance.HIGH);
		instance.open(13, instance.OUTPUT);
		instance.close(11);
		instance.close(12);
		instance.close(13);
	})

	it('reads', () => {
		instance.open(11, instance.OUTPUT, instance.HIGH);
		instance.open(12, instance.OUTPUT);
		expect(instance.read(11)).toEqual(instance.HIGH);
		expect(instance.read(12)).toEqual(instance.LOW);
		instance.close(11);
		instance.close(12);
	})

	it('writes', () => {
		instance.open(11, instance.OUTPUT);
		expect(instance.write(11, instance.HIGH)).toEqual(instance.read(11));
		instance.close(11);
	})
});
