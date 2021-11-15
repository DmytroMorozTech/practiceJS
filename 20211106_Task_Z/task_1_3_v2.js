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

// Dataset No. 1 goes below
// Expected object projection:
// {"prop11":{"prop22":{"prop31":31,"prop32":32,"prop33":{"name":"Superman","address":{"country":"USA","city":"NY"},"phoneNumber":"5555555"}}}}
const src1 = {
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

const proto1 = {
	prop11: {
		prop22: null,
	},
};

// Dataset No. 2 goes below
// Expected object projection:
// {"p1":{"p11":{"p111":"data p1/p11/p111"}},"p2":{"p21":{"p211":"data p2/p21/p211"}}}
const src2 = {
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

const proto2 = {
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

// Dataset No. 3 goes below
// Expected object projection:
// {"prop13":{"prop41":41}}
const src3 = {
	prop11: {
		prop21: 21,
		prop22: {
			prop31: 31,
			prop32: 32,
		},
	},
	prop12: 12,
	prop13: {
		prop41: 41,
	},
};

const proto3 = {
	prop11: {
		prop21: {
			prop211: null,
		},
		prop23: null,
	},
	prop13: null,
};

const resolvePath = (object, path) => path.split('.').reduce((o, p) => o[p], object);

function calculateProjectionPaths(proto, src) {
	if (Object.keys(proto).length === 0 || Object.keys(src).length === 0) return [];
	const projectionAddresses = [];

	function recurse(proto, src, path) {
		for (const key in proto) {
			const noSuchKeyInSrcObj = !Object.keys(src).includes(key);
			if (noSuchKeyInSrcObj) return;
			// if src object doesn't have such key - we should stop this iteration; no need to proceed

			let valueProto = proto[key];
			let valueSrc = src[key];

			if (isObject(valueProto) && isObject(valueSrc)) {
				const updatedPath = path.length > 0 ? `${path}.${key}` : `${key}`;
				recurse(valueProto, valueSrc, updatedPath);
			}

			if (!isObject(valueProto)) {
				const updatedPath = path.length > 0 ? `${path}.${key}` : `${key}`;
				projectionAddresses.push(updatedPath);
			}
		}
	}

	recurse(proto, src, '');

	return projectionAddresses;
}

function objectProjection(proto, src) {
	const addresses = calculateProjectionPaths(proto, src);
	if (addresses.length === 0) return {};

	const setPath = (object, path, value) =>
		path
			.split('.')
			.reduce((o, p, i) => (o[p] = path.split('.').length === ++i ? value : o[p] || {}), object);

	const projectionObj = {};
	for (let i = 0; i < addresses.length; i++) {
		let currentAddress = addresses[i];
		const valueOfSrcObjByAddress = resolvePath(src, currentAddress);
		const valueOfSrcObjByAddressCloned = !isObject(valueOfSrcObjByAddress)
			? valueOfSrcObjByAddress
			: cloneObject(valueOfSrcObjByAddress);
		setPath(projectionObj, currentAddress, valueOfSrcObjByAddressCloned);
	}

	return projectionObj;
}

console.log('--------------------------------------------------');
console.log('Projection paths for dataset No.1:');
console.log(calculateProjectionPaths(proto1, src1));

console.log('Projected object for dataset No.1:');
console.log(JSON.stringify(objectProjection(proto1, src1)));

console.log('--------------------------------------------------');
console.log('Projection paths for dataset No.2:');
console.log(calculateProjectionPaths(proto2, src2));

console.log('Projected object for dataset No.2:');
console.log(JSON.stringify(objectProjection(proto2, src2)));
console.log('--------------------------------------------------');

console.log('Projection paths for dataset No.3:');
console.log(calculateProjectionPaths(proto3, src3));

console.log('Projected object for dataset No.3:');
console.log(JSON.stringify(objectProjection(proto3, src3)));
console.log('--------------------------------------------------');
