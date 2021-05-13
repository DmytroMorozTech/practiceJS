let counter = 0;

class DraggableCard {
    constructor() {
        this.card = this._createCard();
    }
    _createCard() {
        const card = document.createElement('input');
        card.type = 'text';
        card.name = 'card';
        card.classList.add('card');
        card.draggable = "true";
        card.classList.add('draggable');
        // class draggable is needed to search with querySelector for elements that are draggable.

        return card
    }
}

class List {
    // creates a brand new list, which can be easily be filled with cards.
    cardsArr = [];

    constructor() {
        this._createList();
        this._handleEvents();
    }

    _createId() {
        return counter++;
    }

    _createList() {
        const container = document.createElement('div');
        container.classList.add("list");

        const container4Cards = document.createElement('form');
        container4Cards.classList.add('container4Cards');
        // ---------------------------
        const addCardBtn = document.createElement('button');
        addCardBtn.type = 'button';
        addCardBtn.innerText = 'Add a card';
        addCardBtn.classList.add('addCardBtn');

        const iconAdd = document.createElement('img');
        iconAdd.src = "./img/add-icon.svg";
        iconAdd.classList.add("icon");
        addCardBtn.prepend(iconAdd);
        // ---------------------------
        const sortBtnContainer = document.createElement('div');
        sortBtnContainer.classList.add('sort-btn-container');

        const sortBtn = document.createElement('button');
        sortBtn.type = 'button';
        sortBtn.innerText = 'Sort cards';
        sortBtn.classList.add('sortBtn');

        const iconSort = document.createElement('img');
        iconSort.src = "./img/sort-icon.svg";
        iconSort.classList.add("icon");
        sortBtn.prepend(iconSort);
    // ---------------------------
        container.append(sortBtnContainer);
        container.append(container4Cards);
        container.append(addCardBtn);

        this._container = container;
        this._container4Cards = container4Cards;
        this._addCardBtn = addCardBtn;
        this._sortBtnContainer = sortBtnContainer;
        this._sortBtn = sortBtn;

        this._listId = this._createId();
        this._container.dataset.listId = `${this._listId}`;
        // console.log(`New list ID: ${this._listId}`);
    }

    _handleEvents() {
        this._addCard = this._addCardOnClick.bind(this);
        this._addCardBtn.addEventListener('click', this._addCard);

        this.cardMove = this._onDragover.bind(this);
        this._container4Cards.addEventListener('dragover', this.cardMove);
    }

    _onDragover(evt) {
        evt.preventDefault();
        // by default dropping of element inside of other element is disabled. That's why we have to disable default behaviour.
        const container = this._container4Cards;
        const afterElement = this._getDragAfterElement(container, evt.clientY);
        const draggable = document.querySelector('.dragging');
        if(afterElement == null) {
            container.append(draggable);
        } else {
            container.insertBefore(draggable, afterElement)
            // we insert draggable into container before the afterElement.
        }
        this._addSortBtn();

    }

    _getDragAfterElement(container, y){
        //if our draggable element if above, lets say, element No.4, this function will return this element No.4 (which is basically the dragAfter element!).
        const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];

        return draggableElements.reduce((closest,child)=>{
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height/2
            // console.log(box);
            if (offset <0 && offset > closest.offset) {
                return {offset: offset, element: child}
            } else {
                return closest
            }
        },  {offset: Number.NEGATIVE_INFINITY}).element
    }

    _addCardOnClick() {
        let currentDraggableCard = new DraggableCard().card;
        this._container4Cards.append(currentDraggableCard);
        this._handleCardEvents(currentDraggableCard);
        this._addSortBtn();

        this.cardsArr.push(currentDraggableCard);
        // every instance of List will have an internal array (cardsArr) that will store info about all cards, that are included into this particular list.
    }
    // ----------------------
    // the main goal of code below is to add class "dragging" to the card, that user started to drag.
    // as soon as user stops dragging it, event handler will remove class "dragging" from this element.

    _handleCardEvents(currentDraggableCard) {
        this._addDragging = this._addClassDragging.bind(this);
        currentDraggableCard.addEventListener('dragstart', this._addDragging);

        this._removeDragging = this._removeClassDragging.bind(this);
        currentDraggableCard.addEventListener('dragend', this._removeDragging);
    }

    _addClassDragging(evt) {
        let draggedCard = evt.target.closest('input');
        draggedCard.classList.add('dragging');
        //---------------------------------------
        // As soon as user starts dragging card it is deleted from trello.listsArr[].cardsArr.
        // And this card will be added to the relevant array on dragend event. It may be even the same container.
        //---------------------------------------
            //more complex solution
            // it was improved below using dataset attribute for each list in DOM.
            // let arrContainingDraggedCard = trello.listsArr.filter( list => {
            //     return list.cardsArr.includes(draggedCard);
            // });
            //
            // let draggedCardArrIndex = trello.listsArr.indexOf(...arrContainingDraggedCard);
            // console.log(`The dragged card was located in list with index ${draggedCardArrIndex}`)
            //
            // let currentCardsArr = trello.listsArr[draggedCardArrIndex].cardsArr;
            // currentCardsArr.splice(currentCardsArr.indexOf(draggedCard), 1);
        //---------------------------------------
        let containerOfCard = draggedCard.parentElement.parentElement;
        let listIndex = containerOfCard.getAttribute('data-list-id');
        let currentCardsArr = trello.listsArr[listIndex].cardsArr;
        currentCardsArr.splice(currentCardsArr.indexOf(draggedCard), 1);
    }

    _removeClassDragging(evt) {
        let draggedCard = evt.target.closest('input');
        draggedCard.classList.remove('dragging');

        let targetCard = evt.target;
        console.log(targetCard);
        let containerOfTargetCard = targetCard.parentElement.parentElement;
        console.log(containerOfTargetCard);
        let listIndex = containerOfTargetCard.getAttribute('data-list-id');
        console.log(listIndex);
        trello.listsArr[listIndex].cardsArr.push(targetCard);
    }

    // ----------------------

    _addSortBtn() {
        const sortBtnWasAdded = this._sortBtnContainer.childElementCount !== 0;
        if (this._container4Cards.childElementCount>=2 && !sortBtnWasAdded) {
            this._sortBtnContainer.append(this._sortBtn);
            this._sortCards = this._sortCardsOnClick.bind(this);
            this._sortBtn.addEventListener('click', this._sortCards);
        }
    }

    _sortCardsOnClick (event) {
        const currentContainer = event.target.parentElement.nextElementSibling;
        const cards = [...currentContainer.querySelectorAll('.card')];
        const allCardsSorted = [...cards].map(input => input.value).sort();

        cards.forEach((card, index) => {
            card.value = allCardsSorted[index]
        });
    }
}

class AddListBtn {
    constructor() {
        const addListBtn = document.createElement("button");
        addListBtn.classList.add('add-list-btn');
        addListBtn.classList.add('background-color');

        addListBtn.innerText = "Add new list";
        addListBtn.addEventListener('click', ()=> {this.addNewList()});
        document.body.prepend(addListBtn);
    }

    addNewList(){
        let trelloContainer = document.querySelector('.trello-container');
        let newList = new List();
        trelloContainer.append(newList._container);

        trello.listsArr.push(newList);
        // trello is an instance of class TrelloContainer. We store all lists, that were created within trello in an array -> trello.listsArr .
    }
}

class TrelloContainer {
    listsArr = [];
    constructor() {
        this._container = document.createElement('div');
        this._container.classList.add('trello-container');
        for (let i=1; i<5; i++) {
            let list = new List();
            this._container.append(list._container);
            this.listsArr.push(list);
        }
        document.body.append(this._container);
    }
}

let newListBtn = new AddListBtn();
let trello = new TrelloContainer();


