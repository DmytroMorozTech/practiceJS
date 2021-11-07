const initialArr = [
	{ amount: 10000, quantity: 10 },
	{ amount: 20000, quantity: 20 },
	{ amount: 30000, quantity: 30 },
	{ amount: 1400, quantity: 350 },
	{ amount: 22, quantity: 1500 },
	{ amount: 1530, quantity: 48 },
	{ amount: 32340, quantity: 16 },
	{ amount: 77652, quantity: 100 },
	{ amount: 20, quantity: 15000 },
];

function sortSalesByVolumeOfGoodsSold(arr) {
	const clonedArr = [...arr];
	const mappedAndSortedArr = clonedArr
		.map(sale => {
			return { ...sale, Total: sale.amount * sale.quantity };
		})
		.sort((s1, s2) => s1.Total - s2.Total);
	// in task the order of sorting was not specified
	// currently the array is sorted in ascending order by field "Total";
	// If we need to set the sorting order as descending, then sorting condition should be replaced to:
	// .sort((s1, s2) => s2.Total - s1.Total);
	return mappedAndSortedArr;
}

const result = sortSalesByVolumeOfGoodsSold(initialArr);
console.log(result);
