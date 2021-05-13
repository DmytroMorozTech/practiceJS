function initialRequest() {
    fetch('http://swapi.dev/api/films')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            createTable(data.results);
        });
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
    document.body.append(table);

    filmsArray.forEach((film, rowIndex) => {
        let tableRow = document.createElement("tr");
        tableRow.classList.add("tableRow");

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

        getCharacters(film["characters"], rowIndex);
    });
}

function getCharacters(charactersLinksArr, rowIndex) {
    let charactersFetchArr = charactersLinksArr.map(link => {
        return fetch(`${link}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                return data.name;
            });
    });

    let containers4CharactersDOM = document.querySelectorAll(".characters");

    Promise.all(charactersFetchArr)
        .then((response)=> {
            containers4CharactersDOM[rowIndex].innerHTML = `${response.join(", ")}`;
        });
}

initialRequest();




