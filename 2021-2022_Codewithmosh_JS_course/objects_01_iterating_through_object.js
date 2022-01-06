const address = {
	street: "Obolons'ka naberezhna street",
	city: 'Kyiv',
	zipCode: '04073',
};

function showAddress(address) {
	for (const key in address) {
		console.log(`${key}: ${address[key]}`);
	}
}

showAddress(address);
