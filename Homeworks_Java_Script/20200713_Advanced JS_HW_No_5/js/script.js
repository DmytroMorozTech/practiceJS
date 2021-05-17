function initialRequest() {
    const request = new XMLHttpRequest();
    request.open('GET', 'http://swapi.dev/api/films');
    // request initialization

    request.onload = function() {
        if (request.readyState === 4 && request.status === 200) {
            const res = JSON.parse(request.response);
            createTable(res.results);
        }
        if(request.status === 404) {
            alert('Data not found');
        }
    }
    request.send();
}

function createTable(filmsArray) {
    let table = document.createElement("table");
    table.classList.add('filmsTable');
    table.insertAdjacentHTML('afterbegin', `
        <thead class="tableHead">
            <tr class="tableRow">
                <th class="th-1">Episode ID</th>
                <th class="th-2">Title</th>
                <th class="th-3">Opening Crawl</th>
                <th class="th-4">Characters</th>
            </tr>
        </thead>
    `);
    let requestedKeys = ["episode_id", "title", "opening_crawl"];
    let charactersLinksArr = [];
    let numberOfFilms = filmsArray.length;

    filmsArray.forEach(film => {
        let tableRow = document.createElement("tr");
        tableRow.classList.add("tableRow");

        // console.log(film);
        charactersLinksArr.push(film["characters"]);

        for (let i = 0; i <= 3; i++) {
            let tableCell = document.createElement('td');
            let tableCellContent = i!==3 ? film[requestedKeys[i]] : "";
            tableCell.innerText = `${tableCellContent}`;

            if (i === 1) {
                tableCell.classList.add("title");
            }

            if (i === 3) {
                tableCell.classList.add("characters");
                tableCell.innerHTML = `<div class="loading"></div>`;
                // adding a div, that is responsible for loading spinner.
            }

            tableRow.append(tableCell);
        }
        table.append(tableRow);
    });

    document.body.append(table);
    getData(charactersLinksArr, numberOfFilms);
    // charactersLinksArr  -> array with arrays. Each inner array contains a number of links that have to be retrieved in order to get the names of characters.
}


function getData(charactersLinksArr, numberOfFilms) {
    let uploadedListOfCharacters =  Array.from({length:numberOfFilms},()=>[]);

    charactersLinksArr.forEach((linksArr, rowIndex) => {
        let numberOfCharacters = linksArr.length;
        // console.log(`In row No. ${rowIndex + 1} the number of characters is  ${numberOfCharacters}`);

        linksArr.forEach(link => {
            requestFromServer(link,rowIndex,numberOfCharacters, uploadedListOfCharacters);
        })
    })
}

function requestFromServer(link,rowIndex,numberOfCharacters,uploadedListOfCharacters) {
    const request = new XMLHttpRequest();
    request.open('GET', `${link}`);

    request.onload = function() {
        if (request.readyState === 4 && request.status === 200) {
            let character = JSON.parse(request.response).name;
            uploadedListOfCharacters[rowIndex].push(character);
            checkIfLoaded(rowIndex,numberOfCharacters,uploadedListOfCharacters);
        }
        if(request.status === 404) {
            alert('Data not found');
        }
    }
    request.send();
}

function checkIfLoaded(rowIndex,numberOfCharacters,uploadedListOfCharacters) {
    let timerID = setTimeout(checkIfLoaded,500, rowIndex,numberOfCharacters,uploadedListOfCharacters);
    // checkIfLoaded will be called every 500ms recursively using setTimeout.

    let numbOfLoadedChar = uploadedListOfCharacters[rowIndex].length;
    if (numberOfCharacters === numbOfLoadedChar) {
    // if this condition is true (all characters were loaded) - spinner will be removed for this particular film.
        let containers4CharactersDOM = document.querySelectorAll(".characters");
        containers4CharactersDOM[rowIndex].innerHTML = `${uploadedListOfCharacters[rowIndex].join(" / ")}`;

        clearTimeout(timerID);
    }
}

initialRequest();




