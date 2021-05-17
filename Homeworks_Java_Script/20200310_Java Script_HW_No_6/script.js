let initialArray = ['hello', 'world', 23, '23', null, () => {}, undefined, [1,2,3], {name: 'Vladimir'}];

function filterBy(items, typesToRemove) {
    return items.filter (item => {
        if (isNull(item)) {
            return !typesToRemove.includes('null');
        }
        if (isArray(item)) {
            return !typesToRemove.includes('array');
        }
        return !typesToRemove.includes(typeof item); // Если условие true , то функция вернет true
    });
}

function isNull(value) {
    return value === null;
}

function isArray(value) {
    return Array.isArray(value); // Если условие true , то функция вернет true
}

console.log( filterBy(initialArray, ['null', 'array','object']));
