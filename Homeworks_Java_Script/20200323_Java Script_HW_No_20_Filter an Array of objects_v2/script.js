let directorsArray = [
    {
        ObjectNo: "1",
        directorName: "Steve",
        middleName: "",
        directorLastName: "Jobs",
        nationality: "NZ",
        skills: [{
                language: "French",
                programmingLang: "c#",
                communication: "great communicator"
                },
                {
                    language: "GERMAN",
                    programmingLang: "C++",
                    communication: "great communicator"
                },
                ]
    },
    {
        ObjectNo: "2",
        directorName: "Antonina",
        middleName: "Petrivna",
        directorLastName: "Krucha",
        nationality: "UA",
        skills: {
            language: "German",
            programmingLang: "C#",
            communication: "mediocre communicator"
        }
    },
    {
        ObjectNo: "3",
        directorName: "Lidiya",
        middleName: "Vasylivna",
        directorLastName: "Ivanenko",
        nationality: "RU",
        skills: {
            language: "Spanish",
            programmingLang: "Java",
            communication: "great communicator"
        }
    },
    {
        ObjectNo: "4",
        directorName: "Michael ",
        middleName: "",
        directorLastName: "Bay",
        nationality: "US",
        skills: {
            language: "Estonian",
            programmingLang: "Ruby",
            communication: "great communicator"
        }
    },
    {
        ObjectNo: "5",
        directorName: "Freddie",
        directorLastName: "Mercury",
        nationality: "NZ",
        skills: {
            language: "French",
            programmingLang: "Python",
            communication: "great communicator"
        }
    },
    {
        ObjectNo: "6",
        directorName: "Grigoriy",
        middleName: "Maksimovich",
        directorLastName: "Ivanenko",
        nationality: "UA",
        language: "German",
        skills: {
            programmingLang: "C#",
            communication: "mediocre communicator"
        }
    }
];

let foundKeyWords = [];
let filteredArray = [];
let result = 0;

const filterCollection = (coll, keyWords, includeAllKeywords, ...fieldsToSearchIn) => {
    const kWords = keyWords.toLowerCase().split(" ");
    console.log(`kWords: ${kWords}`);
    console.log(`fieldsToSearchIn: ${fieldsToSearchIn}`);

    let firstLevel = fieldsToSearchIn.map(item => {
        return item.includes(".") ? item.slice(0, item.indexOf(".")) : item;
    });
    let secondLevel = fieldsToSearchIn.map(item => {
        return item.includes(".") ? item.slice(item.indexOf(".") + 1, item.length) : item;
    });

    for (let key of coll) {
        // we use the loop "for ... of", because we initially have an array with objects.
        // console.log(key);
        foundKeyWords = [];
        // before passing each next object for further filtration, we clear array "foundKeyWords".
        searchWithinObj(key);

        if (includeAllKeywords) {result = foundKeyWords.length === kWords.length ? 1 : 0}
        if (!includeAllKeywords) {result =  foundKeyWords.length >0 ? 1 : 0}

        result === 1 ? filteredArray.push(key) : filteredArray;
    }

    function searchWithinObj(obj) {
        for (let key in obj) {
            if (isArray(obj[key]) && (firstLevel.includes(key) || secondLevel.includes(key))) {
                for (let item of obj[key]) {searchWithinObj(item)}
            }
            // here we check if obj[key] is an array. If it is -> we pass all objects within this array
            // to the function "searchWithinObj" recursively.

            if (isObject(obj[key]) && (firstLevel.includes(key) || secondLevel.includes(key))) {
                searchWithinObj(obj[key])
            }
            // here we check if obj[key] is an object. If it is -> we pass it to the function "searchWithinObj" recursively.

            if (firstLevel.includes(key) || secondLevel.includes(key)) {
                if (kWords.includes(String(obj[key]).toLowerCase()) && !foundKeyWords.includes(obj[key])) {
                    foundKeyWords.push(obj[key]);
                }
            }
        }
    }
    console.log("----------------------------------------");
    console.log("Filtered array:");
    console.log(filteredArray);
}

const isArray = (elem) => Array.isArray(elem); // Function that checks if the type of element is "array".
const isObject = (elem) => typeof elem === 'object'; // Function that checks if the type of element is "object".

const filtered = filterCollection(directorsArray, "German UA C#", true,
    "skills.language", "skills.programmingLang", "nationality");

// -------------------------------------------
// 1. const filtered = filterCollection(directorsArray, "German UA C#", true,"skills.language", "skills.programmingLang", "nationality");
// Results of filtration: Object No.2, Object No.6.
// The boolean flag here is set to "true", which means that all keywords should be found within the object.
// -------------------------------------------
// 2. const filtered = filterCollection(directorsArray, "German UA C#", false,"skills.language", "skills.programmingLang", "nationality");
// Results of filtration: Object No.1, Object No.2, Object No.6.
// The boolean flag here is set to "false", which means that even partial match of keywords is enough for obj. to be filtered.
// That is why object No.1 was added to the result here.
// -------------------------------------------
// 3. const filtered = filterCollection(directorsArray, "Python French NZ", true,"skills.language", "skills.programmingLang", "nationality");
// Results of filtration: Object No.5.
// The boolean flag here is set to "true", which means that all keywords should be found within the object.
// -------------------------------------------


