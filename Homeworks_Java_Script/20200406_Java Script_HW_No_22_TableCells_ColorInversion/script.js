// let n = prompt('Будет построена таблица размерностью n*n ячеек. Укажите, пожалуйста, n:');
let table = document.createElement("table");

function createTable () {
    for (i=1; i<=n; i++) {
        let newTableRow = document.createElement("tr");
        table.append(newTableRow);
            for (j=1; j<=n; j++) {
                let newTableCell = document.createElement("td");
                newTableCell.innerHTML=`R${i} \n C${j}`;
                newTableRow.append(newTableCell);
            }
    }
    document.body.append(table);
}

let n=30;
createTable(n);

table.addEventListener("click", changeColor);

function changeColor(event) {
    // console.log(event.target);
    event.target.classList.toggle("blackCells");
}

document.body.addEventListener("click", colorsInversion);

function colorsInversion (event) {
    if (event.target === document.body) {
        table.classList.toggle("black");

        let selectedBlackCells = document.getElementsByClassName("blackCells");
        let selectedBlackCellsArray = Array.prototype.slice.call(selectedBlackCells);
        // console.log(selectedBlackCellsArray);
        if (selectedBlackCellsArray.length > 0) {
            for (let key of selectedBlackCellsArray) {
                key.classList.remove("blackCells");
                key.classList.add("whiteCells");
            }
            return;
        }

        let selectedWhiteCells = document.getElementsByClassName("whiteCells");
        let selectedWhiteCellsArray = Array.prototype.slice.call(selectedWhiteCells);
        // console.log(selectedWhiteCellsArray);
        if (selectedWhiteCellsArray.length > 0) {
            for (let key of selectedWhiteCellsArray) {
                key.classList.remove("whiteCells");
                key.classList.add("blackCells");
            }
        }
    }
}
