import { Parser } from "binary-parser";

const testTest = function () {
	//console.log(this);
	return 0;
};

const isNone = function () {
	if (this.nom === "None") {
		return 1;
	} else {
		return 0;
	}
};


const testType = function () {
	console.log("function function function function : testType");
	console.log(`this.taille_type > ${this.taille_type}`);
	console.log(`this.type > ${this.type}`);

	switch (this.type) {
		case "IntProperty":
			return 1;
		case "StrProperty":
			return 2;
		case "NameProperty":
			return 2;
		case "FloatProperty":
			return 3;
		case "ArrayProperty":
			return 4;
		case "ByteProperty":
			return 5;
		case "BoolProperty":
			return 6;
		case "QWordProperty":
			return 7;
		case "StructProperty":
			return 8;
		default:
			return 0;
	}
};

const testReadUntil = function () {
	console.log("function function function function : testReadUntil");

	if (
		typeof this.Properties.key === "undefined" ||
		this.Properties.key === null
	) {
		this.Properties.key = 0;
	} else {
		this.Properties.key = this.Properties.key + 1;
	}

	console.log("THIS");
	console.log(this);

	// console.log(`this.Properties[this.Properties.key].nom > ${this.Properties[this.Properties.key].nom}`);

	console.log("this.Properties[this.Properties.key].Info");
	console.log(this.Properties[this.Properties.key].Info);

	// console.log("this.Properties[this.Properties.key].Info.value");
	// console.log(this.Properties[this.Properties.key].Info.value);
	// if (typeof this.Properties[this.Properties.key].Info.value !== "undefined") {
	// 	if (Array.isArray(this.Properties[this.Properties.key].Info.value.array)) {
	// 		this.Properties[this.Properties.key].Info.value.array.forEach(
	// 			(element) => {
	// 				console.log("element");
	// 				console.log(element);
	// 				console.log("element.Properties");
	// 				console.log(element.Properties);
	// 			}
	// 		);
	// 	}
	// }

	if (this.Properties[this.Properties.key].nom === "None") {
		return true;
	} else {
		return false;
	}
};

const testReadUntil2 = function () {
	console.log("function function function function : testReadUntil2");
	if (
		typeof this.Structure.key === "undefined" ||
		this.Structure.key === null
	) {
		this.Structure.key = 0;
	} else {
		this.Structure.key = this.Structure.key + 1;
	}
	console.log("this.Structure[this.Structure.key].Info");
	console.log(this.Structure[this.Structure.key].Info);

	if (this.Structure[this.Structure.key].nom === "None") {
		return true;
	} else {
		return false;
	}
};

const testVersion = function () {
	if (this.engine_V >= 866 && this.license_V >= 18) {
		return 1;
	} else {
		return 0;
	}
};

const testStructProperty = function () {
	console.log("function function function function : testStructProperty");
	if (
		typeof this.Structure.key === "undefined" ||
		this.Structure.key === null
	) {
		this.Structure.key = 0;
	} else {
		this.Structure.key = this.Structure.key + 1;
	}

	console.log("THIS");
	console.log(this);

	console.log("this.Structure[this.Structure.key].type");
	console.log(this.Structure[this.Structure.key].type);

	// console.log("this.Structure[this.Structure.key].taille_type");
	// console.log(this.Structure[this.Structure.key].taille_type);

	console.log("this.Structure[this.Structure.key].Unknown");
	console.log(this.Structure[this.Structure.key].Unknown);
	console.log("this.Structure[this.Structure.key].value");
	console.log(this.Structure[this.Structure.key].value);
	if (this.Structure[this.Structure.key].type === "None") {
		return true;
	} else {
		return false;
	}
};

const QWord = new Parser().endianess("little").int32("hex1").int32("hex2");

const Bool = new Parser().endianess("little").bit8("value");

const UInt32 = new Parser().endianess("little").int32();

const String16 = new Parser()
	.endianess("little")
	.int32("taille_String16")
	.string("String16", {
		encoding: "utf8",
		length: function () {
			let raw = this.taille_String16;
			if (raw < 0) {
				raw = raw * -2;
			}
			return raw;
		},
		stripNull: true,
	});
const Float = new Parser().endianess("little").floatle();

const testByte = function () {
	console.log("function function function function : testByte");
	// console.log("THIS");
	// console.log(this);
	console.log("this.cle");
	console.log(this.cle);
	if (
		this.cle === "OnlinePlatform_Steam" ||
		this.cle === "OnlinePlatform_PS4" ||
		this.cle === "None"
	) {
		return 1;
	} else {
		return 0;
	}
};

const Byte = new Parser()
	.endianess("little")
	.int32("taille_cle")
	.string("cle", {
		encoding: "utf8",
		length: "taille_cle",
		stripNull: true,
	})
	.int32("taille_value")
	.choice("value", {
		tag: testByte,
		choices: {
			0: new Parser().string("value", {
				encoding: "utf8",
				length: "taille_value",
				stripNull: true,
			}),
			1: new Parser(),
		},
	});

const testValueStructProperty = function () {
	console.log("function function function function : testValueStructProperty");

	// console.log("THIS");
	// console.log(this);
	// console.log("this.Unknown");
	// console.log(this.Unknown);

	switch (this.Unknown) {
		case "IntProperty":
			return 1;
		case "StrProperty":
			return 2;
		case "NameProperty":
			return 2;
		case "FloatProperty":
			return 3;
		case "ByteProperty":
			return 5;
		case "BoolProperty":
			return 6;
		case "QWordProperty":
			return 7;
		default:
			return 0;
	}
};

const StructProperty = new Parser()
	.endianess("little")
	.int32("taille_nom")
	.string("nom", {
		encoding: "utf8",
		length: "taille_nom",
		stripNull: true,
	})
	.int32("taille_label")
	.string("label", {
		encoding: "utf8",
		length: "taille_label",
		stripNull: true,
	})
	.int32("taille_type")
	.string("type", {
		encoding: "utf8",
		length: "taille_type",
		stripNull: true,
	})
	.choice("details", {
		tag: testType,
		choices: {
			1: UInt32,
			2: String16,
			3: Float,
			5: Byte,
			6: Bool,
			7: QWord,
			0: new Parser(),
		},
	});

const Version = new Parser()
	.endianess("little")
	.int32("engine_V")
	.int32("license_V")
	.choice("netcode_V", {
		tag: testVersion,
		choices: {
			1: UInt32, // Si la condition est vraie, lire un entier non signé de 32 bits pour net_version
			0: new Parser(), // Sinon, définir net_version à 0
		},
	});

const ArrayDetail = new Parser()
	.endianess("little")
	.int32("taille_nom")
	.string("nom", {
		encoding: "utf8",
		length: "taille_nom",
		stripNull: true,
	})
	.choice("Info", {
		tag: isNone,
		choices: {
			1: new Parser(),
			0: new Parser()
				.endianess("little")
				.int32("taille_type")
				.string("type", {
					encoding: "utf8",
					length: "taille_type",
					stripNull: true,
				})
				.int32("inconnu1")
				.int32("inconnu2")
				.choice("details", {
					tag: testType,
					choices: {
						1: UInt32,
						2: String16,
						3: Float,
						5: Byte,
						6: Bool,
						7: QWord,
						8: StructProperty,
					},
				}),
		},
	});

const ArrayProperty = new Parser()
	.endianess("little")
	.int32("taille_Array")
	.array("array", {
		type: new Parser().array("Properties", {
			type: ArrayDetail,
			readUntil: testReadUntil,
		}),
		length: "taille_Array",
	});

const Property = new Parser()
	.endianess("little")
	.int32("taille_nom")
	.string("nom", {
		encoding: "utf8",
		length: "taille_nom",
		stripNull: true,
	})
	.choice("Info", {
		tag: isNone,
		choices: {
			1: new Parser(),
			0: new Parser()
				.endianess("little")
				.int32("taille_type")
				.string("type", {
					encoding: "utf8",
					length: "taille_type",
					stripNull: true,
				})
				.int32("inconnu1")
				.int32("inconnu2")
				.choice("value", {
					tag: testType,
					choices: {
						1: UInt32,
						2: String16,
						3: Float,
						4: ArrayProperty,
						5: Byte,
						6: Bool,
						7: QWord,
						0: new Parser(),
					},
				}),
		},
	});

const Header = new Parser()
	.endianess("little")
	.int32("header_taille")
	.int32("crc")
	.nest("Version", { type: Version })
	.int32("taille_RC")
	.string("ReplayClass", {
		encoding: "utf8",
		length: "taille_RC",
		stripNull: true,
	})
	.array("Properties", {
		type: Property,
		readUntil: testReadUntil,
	    length: "header_taille",
	})
	.choice("TEST", {
		tag: testTest,
		choices: {
			0: new Parser(), // Sinon, définir net_version à 0
		},
	});
//.nest("Properties", { type: Properties })
export default Header;
