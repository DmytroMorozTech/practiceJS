//https://www.codewars.com/kata/621470ede0bb220022c9e396

const input = [
	["130/90", "140/94"],
	["160/110"],
	["200/120"],
	["150/94", "140/90", "120/90"],
	["140/94", "140/90", "120/80", "130/84"],
];

let hypertensive = function (patients) {
	let count = 0;

	function createDataObj(dataAsStr) {
		const dataArr = dataAsStr.split("/");
		return { systolic: +dataArr[0], diastolic: +dataArr[1] };
	}

	function getIsHypertensiveCriteria3(obj) {
		return obj.systolic >= 180 && obj.diastolic >= 110;
	}

	function getIsPatientHypertensive(dataArr, id) {
		const dataArrOfObjects = dataArr.map(createDataObj);

		if (dataArrOfObjects.length === 1) return getIsHypertensiveCriteria3(dataArrOfObjects[0]);

		const isHypertensiveCriteria3 = dataArrOfObjects.some(getIsHypertensiveCriteria3);
		if (isHypertensiveCriteria3) return true;

		const avgSystolicPressure =
			dataArrOfObjects.map(p => p.systolic).reduce((prev, val) => +prev + val, 0) / dataArr.length;
		const avgDiastolicPressure =
			dataArrOfObjects.map(p => p.diastolic).reduce((prev, val) => +prev + val, 0) / dataArr.length;

		return avgSystolicPressure >= 140 || avgDiastolicPressure >= 90 || isHypertensiveCriteria3;
	}

	for (let i = 0; i < patients.length; i++) {
		count = getIsPatientHypertensive(patients[i]) ? ++count : count;
	}

	return count;
};

console.log(hypertensive(input)); // 3
