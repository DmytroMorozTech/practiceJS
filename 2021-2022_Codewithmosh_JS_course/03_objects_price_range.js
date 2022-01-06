const priceRanges = [
	{ label: '$', tooltip: 'Inexpensive', minPerPerson: 0, maxPerPerson: 10 },
	{ label: '$$', tooltip: 'Moderate', minPerPerson: 11, maxPerPerson: 25 },
	{ label: '$$$', tooltip: 'Expensive', minPerPerson: 26, maxPerPerson: 50 },
];

let restaurants = [
	{ name: 'Restaurant 1', averagePerPerson: 5 },
	{ name: 'Restaurant 2', averagePerPerson: 15 },
	{ name: 'Restaurant 3', averagePerPerson: 25 },
	{ name: 'Restaurant 4', averagePerPerson: 45 },
];

const selectedPriceRange = priceRanges[1]; //$$ Moderate
const filteredRestaurants = restaurants.filter(
	r =>
		r.averagePerPerson >= selectedPriceRange.minPerPerson &&
		r.averagePerPerson <= selectedPriceRange.maxPerPerson
);

console.log(filteredRestaurants);
