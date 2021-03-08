/*
 * Map physical pin to BCM GPIOxx numbering.  There are currently three
 * layouts:
 *
 * 	PINMAP_26_R1:	26-pin original model B (PCB rev 1.0)
 * 	PINMAP_26:	26-pin models A and B (PCB rev 2.0)
 * 	PINMAP_40:	40-pin models
 *
 * A -1 indicates an unusable pin.  Each table starts with a -1 so that we
 * can index into the array by pin number.
 */

import constants from './constants';

export const pinmaps = {
	/*
	 * Original Raspberry Pi, PCB revision 1.0
	 */
	PINMAP_26_R1: [
		-1,
		-1, -1,		/*  P1  P2 */
		 0, -1,		/*  P3  P4 */
		 1, -1,		/*  P5  P6 */
		 4, 14,		/*  P7  P8 */
		-1, 15,		/*  P9  P10 */
		17, 18,		/* P11  P12 */
		21, -1,		/* P13  P14 */
		22, 23,		/* P15  P16 */
		-1, 24,		/* P17  P18 */
		10, -1,		/* P19  P20 */
		 9, 25,		/* P21  P22 */
		11,  8,		/* P23  P24 */
		-1,  7		/* P25  P26 */
	],
	/*
	 * Original Raspberry Pi, PCB revision 2.0.
	 *
	 * Differs to R1 on pins 3, 5, and 13.
	 *
	 * XXX: no support yet for the P5 header pins.
	 */
	PINMAP_26: [
		-1,
		-1, -1,		/*  P1  P2 */
		 2, -1,		/*  P3  P4 */
		 3, -1,		/*  P5  P6 */
		 4, 14,		/*  P7  P8 */
		-1, 15,		/*  P9  P10 */
		17, 18,		/* P11  P12 */
		27, -1,		/* P13  P14 */
		22, 23,		/* P15  P16 */
		-1, 24,		/* P17  P18 */
		10, -1,		/* P19  P20 */
		 9, 25,		/* P21  P22 */
		11,  8,		/* P23  P24 */
		-1,  7		/* P25  P26 */
	],
	/*
	 * Raspberry Pi 40-pin models.
	 *
	 * First 26 pins are the same as PINMAP_26.
	 */
	PINMAP_40: [
		-1,
		-1, -1,		/*  P1  P2 */
		 2, -1,		/*  P3  P4 */
		 3, -1,		/*  P5  P6 */
		 4, 14,		/*  P7  P8 */
		-1, 15,		/*  P9  P10 */
		17, 18,		/* P11  P12 */
		27, -1,		/* P13  P14 */
		22, 23,		/* P15  P16 */
		-1, 24,		/* P17  P18 */
		10, -1,		/* P19  P20 */
		 9, 25,		/* P21  P22 */
		11,  8,		/* P23  P24 */
		-1,  7,		/* P25  P26 */
		 0,  1,		/* P27  P28 */
		 5, -1,		/* P29  P30 */
		 6, 12,		/* P31  P32 */
		13, -1,		/* P33  P34 */
		19, 16,		/* P35  P36 */
		26, 20,		/* P37  P38 */
		-1, 21		/* P39  P40 */
	],
	/*
	 * Compute Modules.
	 *
	 * https://www.raspberrypi.org/documentation/hardware/computemodule/datasheets/rpi_DATA_CM_1p0.pdf
	 * https://datasheets.raspberrypi.org/cm4/cm4-datasheet.pdf
	 */
	PINMAP_CM1: [
		-1,
		-1, -1,		/*  P1  P2 */
		 0, -1,		/*  P3  P4 */
		 1, -1,		/*  P5  P6 */
		-1, -1,		/*  P7  P8 */
		 2, -1,		/*  P9  P10 */
		 3, -1,		/* P11  P12 */
		-1, -1,		/* P13  P14 */
		 4, -1,		/* P15  P16 */
		 5, -1,		/* P17  P18 */
		-1, -1,		/* P19  P20 */
		 6, -1,		/* P21  P22 */
		 7, -1,		/* P23  P24 */
		-1, -1,		/* P25  P26 */
		 8, 28,		/* P27  P28 */
		 9, 29,		/* P29  P30 */
		-1, -1,		/* P31  P32 */
		10, 30,		/* P33  P34 */
		11, 31,		/* P35  P36 */
		-1, -1,		/* P37  P38 */
		-1, -1,		/* P39  P40 */
		-1, -1,		/* P41  P42 */
		-1, -1,		/* P43  P44 */
		12, 32,		/* P45  P46 */
		13, 33,		/* P47  P48 */
		-1, -1,		/* P49  P50 */
		14, 34,		/* P51  P52 */
		15, 35,		/* P53  P54 */
		-1, -1,		/* P55  P56 */
		16, 36,		/* P57  P58 */
		17, 37,		/* P59  P60 */
		-1, -1,		/* P61  P62 */
		18, 38,		/* P63  P64 */
		19, 39,		/* P65  P66 */
		-1, -1,		/* P67  P68 */
		20, 40,		/* P69  P70 */
		21, 41,		/* P71  P72 */
		-1, -1,		/* P73  P74 */
		22, 42,		/* P75  P76 */
		23, 43,		/* P77  P78 */
		-1, -1,		/* P79  P80 */
		24, 44,		/* P81  P82 */
		25, 45,		/* P83  P84 */
		-1, -1,		/* P85  P86 */
		26, 46,		/* P87  P88 */
		27, 47,		/* P89  P90 */
		-1, -1,		/* P91  P92 */
		-1, -1,		/* P93  P94 */
		-1, -1,		/* P95  P96 */
		-1, -1,		/* P97  P98 */
		-1, -1,		/* P99  P100 */
		-1, -1,		/* P101 P102 */
		-1, -1,		/* P103 P104 */
		-1, -1,		/* P105 P106 */
		-1, -1,		/* P107 P108 */
		-1, -1,		/* P109 P110 */
		-1, -1,		/* P111 P112 */
		-1, -1,		/* P113 P114 */
		-1, -1,		/* P115 P116 */
		-1, -1,		/* P117 P118 */
		-1, -1,		/* P119 P120 */
		-1, -1,		/* P121 P122 */
		-1, -1,		/* P123 P124 */
		-1, -1,		/* P125 P126 */
		-1, -1,		/* P127 P128 */
		-1, -1,		/* P129 P130 */
		-1, -1,		/* P131 P132 */
		-1, -1,		/* P133 P134 */
		-1, -1,		/* P135 P136 */
		-1, -1,		/* P137 P138 */
		-1, -1,		/* P139 P140 */
		-1, -1,		/* P141 P142 */
		-1, -1,		/* P143 P144 */
		-1, -1,		/* P145 P146 */
		-1, -1,		/* P147 P148 */
		-1, -1,		/* P149 P150 */
		-1, -1,		/* P151 P152 */
		-1, -1,		/* P153 P154 */
		-1, -1,		/* P155 P156 */
		-1, -1,		/* P157 P158 */
		-1, -1,		/* P159 P160 */
		-1, -1,		/* P161 P162 */
		-1, -1,		/* P163 P164 */
		-1, -1,		/* P165 P166 */
		-1, -1,		/* P167 P168 */
		-1, -1,		/* P169 P170 */
		-1, -1,		/* P171 P172 */
		-1, -1,		/* P173 P174 */
		-1, -1,		/* P175 P176 */
		-1, -1,		/* P177 P178 */
		-1, -1,		/* P179 P180 */
		-1, -1,		/* P181 P182 */
		-1, -1,		/* P183 P184 */
		-1, -1,		/* P185 P186 */
		-1, -1,		/* P187 P188 */
		-1, -1,		/* P189 P190 */
		-1, -1,		/* P191 P192 */
		-1, -1,		/* P193 P194 */
		-1, -1,		/* P195 P196 */
		-1, -1,		/* P197 P198 */
		-1, -1		/* P199 P200 */
	],
	PINMAP_CM4: [
		-1,
		-1, -1,		/*  P1  P2 */
		-1, -1,		/*  P3  P4 */
		-1, -1,		/*  P5  P6 */
		-1, -1,		/*  P7  P8 */
		-1, -1,		/*  P9  P10 */
		-1, -1,		/* P11  P12 */
		-1, -1,		/* P13  P14 */
		-1, -1,		/* P15  P16 */
		-1, -1,		/* P17  P18 */
		-1, -1,		/* P19  P20 */
		-1, -1,		/* P21  P22 */
		-1, 26,		/* P23  P24 */
		21, 19,		/* P25  P26 */
		20, 13,		/* P27  P28 */
		16,  6,		/* P29  P30 */
		12, -1,		/* P31  P32 */
		-1,  5,		/* P33  P34 */
		 1,  0,		/* P35  P36 */
		 7, 11,		/* P37  P38 */
		 8,  9,		/* P39  P40 */
		25, -1,		/* P41  P42 */
		-4, 10,		/* P43  P44 */
		24, 22,		/* P45  P46 */
		23, 27,		/* P47  P48 */
		18, 17,		/* P49  P50 */
		15, -1,		/* P51  P52 */
		-1,  4,		/* P53  P54 */
		14,  3,		/* P55  P56 */
		-1,  2,		/* P57  P58 */
		-1, -1,		/* P59  P60 */
		-1, -1,		/* P61  P62 */
		-1, -1,		/* P63  P64 */
		-1, -1,		/* P65  P66 */
		-1, -1,		/* P67  P68 */
		-1, -1,		/* P69  P70 */
		-1, -1,		/* P71  P72 */
		-1, -1,		/* P73  P74 */
		-1, -1,		/* P75  P76 */
		-1, -1,		/* P77  P78 */
		-1, 45,		/* P79  P80 */
		-1, 44,		/* P81  P82 */
		-1, -1,		/* P83  P84 */
		-1, -1,		/* P85  P86 */
		-1, -1,		/* P87  P88 */
		-1, -1,		/* P89  P90 */
		-1, -1,		/* P91  P92 */
		-1, -1,		/* P93  P94 */
		-1, -1,		/* P95  P96 */
		-1, -1,		/* P97  P98 */
		-1, -1,		/* P99  P100 */
		-1, -1,		/* P101 P102 */
		-1, -1,		/* P103 P104 */
		-1, -1,		/* P105 P106 */
		-1, -1,		/* P107 P108 */
		-1, -1,		/* P109 P110 */
		-1, -1,		/* P111 P112 */
		-1, -1,		/* P113 P114 */
		-1, -1,		/* P115 P116 */
		-1, -1,		/* P117 P118 */
		-1, -1,		/* P119 P120 */
		-1, -1,		/* P121 P122 */
		-1, -1,		/* P123 P124 */
		-1, -1,		/* P125 P126 */
		-1, -1,		/* P127 P128 */
		-1, -1,		/* P129 P130 */
		-1, -1,		/* P131 P132 */
		-1, -1,		/* P133 P134 */
		-1, -1,		/* P135 P136 */
		-1, -1,		/* P137 P138 */
		-1, -1,		/* P139 P140 */
		-1, -1,		/* P141 P142 */
		-1, -1,		/* P143 P144 */
		-1, -1,		/* P145 P146 */
		-1, -1,		/* P147 P148 */
		-1, -1,		/* P149 P150 */
		-1, -1,		/* P151 P152 */
		-1, -1,		/* P153 P154 */
		-1, -1,		/* P155 P156 */
		-1, -1,		/* P157 P158 */
		-1, -1,		/* P159 P160 */
		-1, -1,		/* P161 P162 */
		-1, -1,		/* P163 P164 */
		-1, -1,		/* P165 P166 */
		-1, -1,		/* P167 P168 */
		-1, -1,		/* P169 P170 */
		-1, -1,		/* P171 P172 */
		-1, -1,		/* P173 P174 */
		-1, -1,		/* P175 P176 */
		-1, -1,		/* P177 P178 */
		-1, -1,		/* P179 P180 */
		-1, -1,		/* P181 P182 */
		-1, -1,		/* P183 P184 */
		-1, -1,		/* P185 P186 */
		-1, -1,		/* P187 P188 */
		-1, -1,		/* P189 P190 */
		-1, -1,		/* P191 P192 */
		-1, -1,		/* P193 P194 */
		-1, -1,		/* P195 P196 */
		-1, -1,		/* P197 P198 */
		-1, -1		/* P199 P200 */
	],
	/*
	 * Orange Pi Zero (26 pin)
	 */
	PINMAP_OPI_26: [
		-1,
		-1,  -1,	/*  P1  P2 */
		12,  -1,	/*  P3  P4 */
		11,  -1,	/*  P5  P6 */
		 6, 198,	/*  P7  P8 */
		-1, 199,	/*  P9  P10 */
		 1,   7,	/* P11  P12 */
		 0,  -1,	/* P13  P14 */
		 3,  19,	/* P15  P16 */
		-1,  18,	/* P17  P18 */
		15,  -1,	/* P19  P20 */
		16,   2,	/* P21  P22 */
		14,  13,	/* P23  P24 */
		-1,  10,	/* P25  P26 */
	],
	/*
	 * Banana Pi M2 Zero (40 pin)
	 */
	PINMAP_BPI_M2Z: [
		 -1,
		 -1,  -1,	/*  P1  P2 */
		 12,  -1,	/*  P3  P4 */
		 11,  -1,	/*  P5  P6 */
		  6,  13,	/*  P7  P8 */
		 -1,  14,	/*  P9  P10 */
		  1,  16,	/* P11  P12 */
		  0,  -1,	/* P13  P14 */
		  3,  15,	/* P15  P16 */
		 -1,  68,	/* P17  P18 */
		 64,  -1,	/* P19  P20 */
		 65,   2,	/* P21  P22 */
		 66,  67,	/* P23  P24 */
		 -1,  71,	/* P25  P26 */
		 19,  18,	/* P27  P28 */
		  7,  -1,	/* P29  P30 */
		  8, 354,	/* P31  P32 */
		  9,  -1,	/* P33  P34 */
		 10, 356,	/* P35  P36 */
		 17,  21,	/* P37  P38 */
		 -1,  20	/* P39  P40 */
	],
	/*
	 * Banana Pi M2 Berry / Ultra (40 pin)
	 */
	PINMAP_BPI_M2U: [
		 -1,
		 -1,  -1,	/*  P1  P2 */
		 53,  -1,	/*  P3  P4 */
		 52,  -1,	/*  P5  P6 */
		 35, 274,	/*  P7  P8 */
		 -1, 275,	/*  P9  P10 */
		276, 273,	/* P11  P12 */
		277,  -1,	/* P13  P14 */
		249, 272,	/* P15  P16 */
		 -1, 250,	/* P17  P18 */
		 64,  -1,	/* P19  P20 */
		 65, 251,	/* P21  P22 */
		 66,  87,	/* P23  P24 */
		 -1, 248,	/* P25  P26 */
		257, 256,	/* P27  P28 */
		224,  -1,	/* P29  P30 */
		225, 116,	/* P31  P32 */
		226,  -1,	/* P33  P34 */
		227, 231,	/* P35  P36 */
		228, 230,	/* P37  P38 */
		 -1, 229	/* P39  P40 */
	]
}


/*
 * Detect Raspberry Pi model and the pinmap in use using device tree.
 */
export function getPinmapFromModel(model) {
  const result = { model, soctype: null, pinmap: null };

  let raspberryMatch = model.match(/^Raspberry Pi (.*)$/);
	if (raspberryMatch) {
		result.soctype = constants.SOC_BCM2835;

		/*
		 * Original 26-pin PCB 1.0.  Note that older kernels do not
		 * expose the "Rev 1" string here, affecting e.g. Debian 7,
		 * but that release is way past EOL at this point.
		 *
		 * An open question is what DT returns for the newer revisions,
		 * as we may be able to reverse the logic here.  Answers on a
		 * postcard to my "raspberry pi cpuinfo vs device-tree" gist.
		 */
		if (raspberryMatch[1] == 'Model B Rev 1') {
			result.mapname = 'PINMAP_26_R1';
		} else if (raspberryMatch[1].indexOf('Model') === 0 && raspberryMatch[1].indexOf('Plus') === -1) { // Regular 26-pin variants with the P5 header.
			result.mapname = 'PINMAP_26';
		} else if (raspberryMatch[1].indexOf('Compute Module 4') === 0) { // 200-pin Compute Modules.
			result.mapname = 'PINMAP_CM4';
		} else if (raspberryMatch[1].indexOf('Compute Module') === 0) {
			result.mapname = 'PINMAP_CM1';
		} else { // All other models are 40-pin variants with the same pinmap.
		  result.mapname = 'PINMAP_40';
    }
	} else if (model.match(/^sun8iw7p/) || model.match(/Orange Pi Zero/)) { // Orange Pi Zero (H2+)
    // XXX: According to linux-sunxi.org sun8iw7p may match 40-pin models?
		result.soctype = constants.SOC_SUNXI;
		result.mapname = 'PINMAP_OPI_26';
	} else if (model.match(/Banana Pi BPI-M2-Zero/)) { // Banana Pi M2 Zero (H2+)
		result.soctype = constants.SOC_SUNXI;
		result.mapname = 'PINMAP_BPI_M2Z';
	} else if (model.match(/^sun8iw11p/)) { // Banana Pi M2 Ultra (R40, V40)
		result.soctype = constants.SOC_SUNXI;
		result.mapname = 'PINMAP_BPI_M2U';
	}

  result.pinmap = pinmaps[result.mapname];

	return result;
}

export function detectPinmap() {
  try {
    const fileData = fs.readFileSync('/proc/device-tree/model', 'ascii');
		return getPinmapFromModel(fileData.replace(/\0+$/, ''));
	} catch (err) {
		return { pinmap: null, soctype: null };
	}
}

const mockDevices = {
  'raspi-b-r1': { soctype: constants.SOC_BCM2835, mapname: 'PINMAP_26_R1' },
  'raspi-a': { soctype: constants.SOC_BCM2835, mapname: 'PINMAP_26' },
  'raspi-b': { soctype: constants.SOC_BCM2835, mapname: 'PINMAP_26' },
  'raspi-a+': { soctype: constants.SOC_BCM2835, mapname: 'PINMAP_40' },
  'raspi-b+': { soctype: constants.SOC_BCM2835, mapname: 'PINMAP_40' },
  'raspi-2': { soctype: constants.SOC_BCM2835, mapname: 'PINMAP_40' },
  'raspi-3': { soctype: constants.SOC_BCM2835, mapname: 'PINMAP_40' },
  'raspi-4': { soctype: constants.SOC_BCM2835, mapname: 'PINMAP_40' },
  'raspi-400': { soctype: constants.SOC_BCM2835, mapname: 'PINMAP_40' },
  'raspi-zero': { soctype: constants.SOC_BCM2835, mapname: 'PINMAP_40' },
  'raspi-zero-w': { soctype: constants.SOC_BCM2835, mapname: 'PINMAP_40' },
  'cm': { soctype: constants.SOC_BCM2835, mapname: 'PINMAP_CM1' },
  'cm1': { soctype: constants.SOC_BCM2835, mapname: 'PINMAP_CM1' },
  'cm3': { soctype: constants.SOC_BCM2835, mapname: 'PINMAP_CM1' },
  'cm3-lite': { soctype: constants.SOC_BCM2835, mapname: 'PINMAP_CM1' },
  'compute-module': { soctype: constants.SOC_BCM2835, mapname: 'PINMAP_CM1' },
  'compute-module-3': { soctype: constants.SOC_BCM2835, mapname: 'PINMAP_CM1' },
  'compute-module-3-lite': { soctype: constants.SOC_BCM2835, mapname: 'PINMAP_CM1' },
  'cm4': { soctype: constants.SOC_BCM2835, mapname: 'PINMAP_CM4' },
  'compute-module-4': { soctype: constants.SOC_BCM2835, mapname: 'PINMAP_CM4' },
  'orangepi-zero': { soctype: constants.SOC_SUNXI, mapname: 'PINMAP_OPI_26' },
  'bananapi-m2-berry': { soctype: constants.SOC_SUNXI, mapname: 'PINMAP_BPI_M2U' },
  'bananapi-m2-ultra': { soctype: constants.SOC_SUNXI, mapname: 'PINMAP_BPI_M2U' },
  'bananapi-m2-zero': { soctype: constants.SOC_SUNXI, mapname: 'PINMAP_BPI_M2Z' },
};

export function getMockPinmap(device) {
  const result = mockDevices[device];
  if (!result) {
    return null;
  }
  result.model = `mock-${device}`;
  result.mock = true;
  result.pinmap = pinmaps[result.mapname];
  return result;
}

export { mockDevices };
