// Here we calculate the number of days between two dates by time duration (not calendar days)

Date.prototype.daysTo = function (date2) {
	var date1 = this;
	const millisInOneDay = 1000 * 60 * 60 * 24;
	const diff = Math.abs(date1.getTime() - date2.getTime());
	const res = Math.floor(diff / millisInOneDay);
	return res;
};

const date1 = new Date(2021, 09, 25, 12, 12, 12, 12);
const date2 = new Date(2021, 10, 03, 02, 02, 02, 02);

console.log(date1.daysTo(date2)); // expected result: 8

const date3 = new Date(2021, 09, 25, 12, 12, 12, 12);
const date4 = new Date(2021, 10, 03, 12, 12, 12, 12);

console.log(date3.daysTo(date4)); // expected result: 9 (precisely 9 days)

// the following dates were deliberately put in reverse chronological order
const date5 = new Date(2021, 05, 05);
const date6 = new Date(2007, 04, 03);
console.log(date5.daysTo(date6)); // expected result: 5147

// in the sample below only 1 second is missing to have 1 complete day between these 2 dates;
// but the program will show 0 complete days (according to technical task)
const date7 = new Date(2021, 09, 25, 15, 0, 0);
const date8 = new Date(2021, 09, 26, 14, 59, 59);
console.log(date7.daysTo(date8));
