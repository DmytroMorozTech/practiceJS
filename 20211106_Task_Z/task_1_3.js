function cloneObject(obj) {
	let clone = {};
	for (const key in obj) {
		let value = obj[key];
		if (value != null && typeof value == 'object' && !Array.isArray(value))
			clone[key] = cloneObject(value);
		else clone[key] = value;
	}
	return clone;
}

const isObject = variable => {
	return variable !== null && typeof variable === 'object' && !Array.isArray(variable);
};

const src = {
	prop11: {
		prop21: 21,
		prop22: {
			prop31: 31,
			prop32: 32,
			prop33: {
				name: 'Superman',
				address: {
					country: 'USA',
					city: 'NY',
				},
				phoneNumber: '5555555',
			},
		},
	},
	prop12: 12,
};

const proto = {
	prop11: {
		prop22: null,
	},
};

const src1 = {
	p1: {
		p11: {
			p111: 'data p1/p11/p111',
		},
	},
	p2: {
		p21: {
			p211: 'data p2/p21/p211',
		},
	},
	p3: {
		p31: {
			p311: 'data p3/p31/p311',
		},
	},
};

const proto1 = {
	p1: 'proto data p1',
	p2: {
		p21: {
			p211: 'proto data p2.p21.p211',
		},
	},
	p3: {
		p31: {
			p311: {
				p4111: 'proto data p3.p31.p311.p4111',
			},
		},
	},
};

function objectProjection(proto, src) {
	if (Object.keys(proto).length === 0 || Object.keys(src).length === 0) return {};
	const res = {};

	function recurse(proto, src, res) {
		for (const key in proto) {
			if (Object.keys(src).includes(key)) {
				res[key] = {};
			}

			let valueProto = proto[key];
			let valueSrc = src[key];

			if (isObject(valueProto) && isObject(valueSrc)) {
				recurse(valueProto, valueSrc, res[key]);
			} else {
				res[key] = isObject(valueSrc) ? cloneObject(valueSrc) : valueSrc;
			}
		}
	}

	recurse(proto, src, res);

	return res;
}

console.log('--------------------------------------------------');
console.log('RESULT with dataset No.1:');
const result1 = JSON.stringify(objectProjection(proto, src));
console.log(result1);

console.log('--------------------------------------------------');
console.log('RESULT with dataset No.2:');
const result2 = JSON.stringify(objectProjection(proto1, src1));
console.log(result2);
console.log('--------------------------------------------------');
