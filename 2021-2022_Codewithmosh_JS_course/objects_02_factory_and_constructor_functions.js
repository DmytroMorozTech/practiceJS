// factory function
function createAddress(city, street, zipCode) {
	return {
		street: street,
		city: city,
		zipCode: zipCode,
	};
}

console.log('*****************************************');
const address1 = createAddress('Kyiv', "Obolons'ka naberezhna street", '04073');
console.log('Object created using factory function:');
console.log(address1);

console.log(`Was constructed by: ${address1.constructor}`); // [Function: Object]
// Because when an object within factory function was returned, under the hood JS called
// Object constructor function -> return {} is the same as: return new Object{}

//constructor function
function Address(city, street, zipCode) {
	this.city = city;
	this.street = street;
	this.zipCode = zipCode;
}

console.log('*****************************************');
const address2 = new Address('Los Angeles', 'Belle Avenue', 'LA-2433');
console.log('Object created using constructor function:');
console.log(address2);
console.log(`Was constructed by: ${address2.constructor}`);
// address2.constructor will reference the constructor function that was used to create
// this address object

//Expected output:
// Was constructed by: function Address(city, street, zipCode) {
// this.city = city;
// this.street = street;
// this.zipCode = zipCode;
// }
