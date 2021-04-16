// http://www.codewars.com/kata/58279e13c983ca4a2a00002a

function greetDevelopers(list) {
	return list.map(obj => {
		let greetingStr = `Hi ${obj.firstName}, what do you like the most about ${obj.language}?`;
		obj['greeting'] = greetingStr;
		return obj;
	});
}
