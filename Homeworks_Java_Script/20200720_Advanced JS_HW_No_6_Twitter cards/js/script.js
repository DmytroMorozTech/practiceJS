class List {
    posts = [];
    _numberOfAddedPosts = 100;

    constructor() {
        this._el=document.createElement('div');
        this._el.classList.add('list');
        this._addPostBtn = document.createElement('button');
        this._addPostBtn.classList.add('add-btn');
        this._addPostBtn.innerText = "ADD POST";
        this._addPostBtnIcon = document.createElement('img');
        this._addPostBtnIcon.src="./img/plus-circle-solid.svg";
        this._addPostBtnIcon.classList.add("add-btn-icon");
        this._addPostBtn.prepend(this._addPostBtnIcon);

        // ----------------------
        // На кнопку "Add post" в самом верху страницы вешаем обработчик событий. Чтобы при клике на эту кнопку появлялось модальное окно, в котором пользователь мог бы создать новый пост в ручном режиме.
        this._addPostModalBound = this.addPostModal.bind(this);
        this._addPostBtn.addEventListener('click', this._addPostModalBound);
        // ----------------------
        this._el.prepend(this._addPostBtn);
        document.body.append(this._el);
    }

    appendTo(container) {
        container.append(this._el);
    }

    removePost(item, id) {
        // item - это сам элемент (самый верхний по иерархии), в который обернут post
        // id - это номер поста
        {
            $.ajax({
                url: 'https://jsonplaceholder.typicode.com/posts/' + id,
                method: 'delete',
                success: () => {
                    this.posts.splice(this.posts.indexOf(item), 1);
                    item.destroy();
                }
            })
        }
    }

    editPost(post, id, data) {
        $.ajax({
            url: 'https://jsonplaceholder.typicode.com/posts/' + id,
            method: 'put',
            data,
            //The data to be sent to the server. Optional. This can either be an object or a query string,
            success: (response) => {
                post.updateValue(response);
                post.disableEditMode();
            }
        })
    }

    addNewPostFromServer(post) {
        const item = new Post({
            post,
            onRemove: this.removePost.bind(this),
            onEdit: this.editPost.bind(this),
            // на входе в метод add к нам "прилетает" объект, который содержит всю информацию о посте (включая имя пользователя, опубликовавшего этот пост).
            // Мы хотим расширить функционал поста, который вот-вот будет создан. Поэтому в конструктор класса Post мы также передаем две функции : onRemove  & onEdit. Они обе по контексту привязаны к классу List. Это необходимо, так как при запуске этих функций в дальнейшем они скорее всего будут запущены в другом контексте и не смогут получить доступ к внутренним переменным класса List, например к основному массиву с постами, с которым мы локально будем работать - posts. Этот массив мы объявляем в самом начале класса List.
        });

            item.appendTo(this._el);
            // только что созданный пост сразу же добавляем в DOM.
            this.posts.push(item);
    }

    addNewPostFromUI(post) {
        $.ajax({
            url: 'https://jsonplaceholder.typicode.com/posts/',
            method: 'post',
            post,
            success: (response) => {
                const item = new Post({
                    post,
                    onRemove: this.removePost.bind(this),
                    onEdit: this.editPost.bind(this),
                });

                this._el.firstChild.after(item._el);
                this.posts.unshift(item);
            }
        })
    }

    addPostModal() {
        this._addPostBtn.style.display = 'none';


        this._popUpContainer = document.createElement('div');
        this._popUpContainer.classList.add('popup');
        // ------------------------------------
        this._onBackgroundClickBound = this.onBackgroundClick.bind(this);
        this._popUpContainer.addEventListener('mousedown',this._onBackgroundClickBound);
        // ------------------------------------
        this._popUpBody = document.createElement('div');
        this._popUpBody.classList.add('popup__body');
        this._popUpContainer.append(this._popUpBody);

        this._popUpContent = document.createElement('div')
        this._popUpContent.classList.add('popup__content');
        this._popUpBody.append(this._popUpContent);
        // ---------------------------------------
        this._closePopUpBtn = document.createElement('img');
        this._closePopUpBtn.src="./img/times-solid.svg";
        this._closePopUpBtn.classList.add('popup__close');
        this._popUpContent.append(this._closePopUpBtn);

        this._onCrossMarkClickBound = this.onCrossMarkClick.bind(this);
        this._closePopUpBtn.addEventListener('click',this._onCrossMarkClickBound);
        // ---------------------------------------
        this._popUpTitle = document.createElement('div');
        this._popUpTitle.classList.add('popup__title');
        this._popUpTitle.innerText="Please fill in information about new post:";
        // ---------------------------------------
        this._userNameEdit = document.createElement('input');
        this._userNameEdit.classList.add('input');
        this._userNameEdit.setAttribute('placeholder',"User name");
        this._userNameEdit.setAttribute('required','required');
        // ---------------------------------------
        this._userEmailEdit = document.createElement('input');
        this._userEmailEdit.classList.add('input');
        this._userEmailEdit.setAttribute('placeholder',"User e-mail");
        this._userEmailEdit.setAttribute('required','required');
        // ---------------------------------------
        this._titleEdit = document.createElement('textarea');
        this._titleEdit.classList.add('textarea');
        this._titleEdit.setAttribute('placeholder',"Post title");
        // ---------------------------------------
        this._bodyEdit = document.createElement('textarea');
        this._bodyEdit.classList.add('textarea');
        this._bodyEdit.setAttribute('placeholder',"Post body");
        // -----------------------------------

        // SAVE BUTTON
        // -----------------------------------
        this._saveBtn = document.createElement('button');
        this._saveBtn.classList.add('save-btn');
        this._saveIcon = document.createElement('img');
        this._saveIcon.src="./img/save-regular.svg";
        this._saveIcon.classList.add("save-btn-icon");
        this._saveBtn.innerText = 'SAVE';
        this._saveBtn.prepend(this._saveIcon);
        // -----------------------------------
        this._saveBtn.onclick = () => {
            const data = {
                title: this._titleEdit.value,
                body: this._bodyEdit.value,
                name: this._userNameEdit.value,
                email: this._userEmailEdit.value,
                userId: 1,
                id: this.calculateIdOfNewPost()
                // id нового поста вычисляется динамически, c использованием метода calculateIdOfNewPost.
            };
            // console.log(data);

            this.addNewPostFromUI(data);
            this.removeAddPostModal();
        };

        // ---------------------------------------
        // Вставляем ранее созданные блоки в _popUpContent .
        this._popUpContent.append(this._popUpTitle);
        this._popUpContent.append(this._userNameEdit);
        this._popUpContent.append(this._userEmailEdit);
        this._popUpContent.append(this._titleEdit);
        this._popUpContent.append(this._bodyEdit);
        this._popUpContent.append(this._saveBtn);

        // ---------------------------------------
        document.body.prepend(this._popUpContainer);
        this._popUpContainer.classList.add('activated');

        this._removeAddPostModalBound = this.removeAddPostModal.bind(this);
        this._closePopUpBtn.addEventListener("click", this._removeAddPostModalBound);
        // на крестик в правом верхнем углу в модальном окне "вешаем" обработчик событий, который будет отслеживать click по этому крестику.
    }

    removeAddPostModal() {
        this._addPostBtn.style.display = 'flex';
        this._popUpContainer.remove();
        this._closePopUpBtn.removeEventListener("click", this._removeAddPostModalBound);
    }

    onBackgroundClick(evt) {
        let clickedItem = evt.target;
        // console.log(clickedItem);
        if (clickedItem===this._popUpBody) {
            this.removeAddPostModal();
            this._popUpContainer.removeEventListener('click',this._onBackgroundClickBound);
            // console.log('Function  onBackgroundClick()  was executed. ')
        }
    }

    onCrossMarkClick() {
        this.removeAddPostModal();
        this._closePopUpBtn.removeEventListener('click',this._onCrossMarkClickBound);
        // console.log('Function  onCrossMarkClick()  was executed. ')
    }

    calculateIdOfNewPost() {
        // console.log(`New post's id: ${this.posts.length + 1}`);
        return this._numberOfAddedPosts++;
    }
}

class Post {
    constructor({post,onRemove,onEdit}) {
    // В конструкторе мы сразу создаем образец нашего поста.
        this._onEdit = onEdit;
        // у каждого экземпляра класса Post (то есть по сути - у нашего поста) будет внутреннее свойство _onEdit, которое будет хранить в себе ф-цию onEdit (bound to "this" context of class List).
        this._data = post;
        this._el= document.createElement('div');
        this._el.classList.add("post");
        // ----------------------------
        this._postIdContainer = document.createElement('span');
        this._postIdContainer.classList.add('post-id-container');
        this._postIdContainer.innerText = `Post ID: ${this._data.id}`;
        // ----------------------------
        this._titleText = document.createElement('p');
        this._titleText.classList.add('post-title');
        this._titleText.innerText = this._data.title;
        // ----------------------------
        this._bodyText = document.createElement("p");
        this._bodyText.classList.add("post-body");
        this._bodyText.innerText = post.body;
        // ----------------------------
        this._userInfo = document.createElement("div");
        this._userInfo.classList.add('user-info');
        this._userName = document.createElement("span");
        this._userName.classList.add('user-name');
        this._userName.innerText = post.name;

        this._emailIcon = document.createElement('img');
        this._emailIcon.src="./img/envelope-regular.svg";
        this._emailIcon.classList.add("email-icon");

        this._userEmailLink = document.createElement('a');
        this._userEmail = post.email;
        this._userEmailLink.setAttribute('href',`mailto:${this._userEmail}`);
        this._userEmailLink.innerText = this._userEmail;
        this._userEmailLink.prepend(this._emailIcon);
        this._userEmailLink.classList.add("user-email");

        this._userInfo.append(this._userName);
        this._userInfo.append(this._userEmailLink);
        // ----------------------------
        // Edit panel
        this._editPanel = document.createElement('div');
        this._editPanel.classList.add('edit-panel');
        // ----------------------------
        // Edit Btn
        this._editBtn = document.createElement('button');
        this._editBtn.classList.add('edit-btn');
        this._editBtnIcon = document.createElement('img');
        this._editBtnIcon.src="./img/edit-regular.svg";
        this._editBtnIcon.classList.add('edit-btn-icon');
        this._editBtn.innerText = "Edit";
        this._editBtn.prepend(this._editBtnIcon);
        this._enableEditModeBound = this.enableEditMode.bind(this);
        this._editBtn.addEventListener('click',this._enableEditModeBound);
        // ---------------------------------
        //Delete Btn
        this._deleteBtn = document.createElement('button');
        this._deleteBtn.classList.add('delete-btn');
        this._deleteBtnIcon = document.createElement('img');
        this._deleteBtnIcon.src="./img/trash-alt-regular.svg";
        this._deleteBtnIcon.classList.add('delete-btn-icon');
        this._deleteBtn.innerText = "Delete";

        this._deleteBtn.prepend(this._deleteBtnIcon); // Daniil calles it remove Btn
        this._deleteBtn.onclick = () => onRemove(this, this._data.id);  //!!!!!!!!!!!!!
        // ---------------------------------
        this._editPanel.append(this._editBtn);
        this._editPanel.append(this._deleteBtn);
        // -----------------------------------------------
        this._el.append(this._postIdContainer);
        this._el.append(this._userInfo);
        this._el.append(this._titleText);
        this._el.append(this._bodyText);
        this._el.append(this._editPanel);
    }

    onBackgroundClick(evt) {
        let clickedItem = evt.target;
        // console.log(clickedItem);
        if (clickedItem===this._popUpBody) {
            this.disableEditMode();
            this._popUpContainer.removeEventListener('click',this._onBackgroundClickBound);
            // console.log('Function  onBackgroundClick()  was executed. ')
        }
    }

    onCrossMarkClick() {
        this.disableEditMode();
        this._closePopUpBtn.removeEventListener('click',this._onCrossMarkClickBound);
        // console.log('Function  onCrossMarkClick()  was executed. ')
    }

    enableEditMode() {
        this._popUpContainer = document.createElement('div');
        this._popUpContainer.classList.add('popup');
        // ------------------------------------
        this._onBackgroundClickBound = this.onBackgroundClick.bind(this);
        this._popUpContainer.addEventListener('mousedown',this._onBackgroundClickBound);
        // добавляем на модальное окно (pop-up) обработчик событий: если при открытом модальном окне пользователь нажмет на кнопку мыши и не попадет по модальному окну, то модальное окно исчезнет.
        // ------------------------------------
        this._popUpBody = document.createElement('div');
        this._popUpBody.classList.add('popup__body');
        this._popUpContainer.append(this._popUpBody);

        this._popUpContent = document.createElement('div')
        this._popUpContent.classList.add('popup__content');
        this._popUpBody.append(this._popUpContent);
        // ---------------------------------------
        this._closePopUpBtn = document.createElement('img');
        this._closePopUpBtn.src="./img/times-solid.svg";
        this._closePopUpBtn.classList.add('popup__close');
        this._popUpContent.append(this._closePopUpBtn);

        this._onCrossMarkClickBound = this.onCrossMarkClick.bind(this);
        this._closePopUpBtn.addEventListener('click',this._onCrossMarkClickBound);
        // ---------------------------------------
        this._popUpTitle = document.createElement('div');
        this._popUpTitle.classList.add('popup__title');
        this._popUpTitle.innerText="Here you may edit the post:";

        // ---------------------------------------
        this._userNameEdit = document.createElement('input')
        this._userNameEdit.classList.add('input');
        this._userNameEdit.value = this._data.name;

        this._userEmailEdit = document.createElement('input');
        this._userEmailEdit.classList.add('input');
        this._userEmailEdit.value = this._data.email;

        this._titleEdit = document.createElement('textarea');
        this._titleEdit.classList.add('textarea');
        this._titleEdit.value = this._data.title;

        this._bodyEdit = document.createElement('textarea');
        this._bodyEdit.classList.add('textarea');
        this._bodyEdit.value = this._data.body;
        // -----------------------------------
        // SAVE BUTTON
        this._saveBtn = document.createElement('button');
        this._saveBtn.classList.add('save-btn');
        this._saveIcon = document.createElement('img');
        this._saveIcon.src="./img/save-regular.svg";
        this._saveIcon.classList.add("save-btn-icon");
        this._saveBtn.innerText = 'SAVE';
        this._saveBtn.prepend(this._saveIcon);

        this._saveBtn.onclick = () => {
            const data = {
                title: this._titleEdit.value,
                body: this._bodyEdit.value,
                name: this._userNameEdit.value,
                email: this._userEmailEdit.value
            };
            this._onEdit(this, this._data.id, data);
        };

        // ---------------------------------------
        // Вставляем ранее созданные блоки в _popUpContent .
        this._popUpContent.append(this._popUpTitle);
        this._popUpContent.append(this._userNameEdit);
        this._popUpContent.append(this._userEmailEdit);
        this._popUpContent.append(this._titleEdit);
        this._popUpContent.append(this._bodyEdit);
        this._popUpContent.append(this._saveBtn);

        // ---------------------------------------
        document.body.prepend(this._popUpContainer);
        this._popUpContainer.classList.add('activated');

        this._closePopUpBtn.addEventListener("click",this.disableEditMode.bind(this));
        // на крестик в правом верхнем углу в модальном окне "вешаем" обработчик событий, который будет отслеживать click по этому крестику.
    }

    disableEditMode() {
        this._popUpContainer.remove();
        this._closePopUpBtn.removeEventListener("click",this.disableEditMode);
    }

    updateValue(value) {
        this._data = {
            ...this._data,
            ...value
        };

        // value на входе в функцию  - это по сути те данные, которые мы отправили на сервер в качестве новых, отредактированных данных, и которые вернулись к нам обратно в качестве response. Просто в функцию updateValue они заходят в качестве аргумента под названием value.
        this._titleText.innerText = value.title;
        this._bodyText.innerText = value.body;
        this._userName.innerText = value.name;
        this._userEmailLink.innerText = value.email;
    }

    appendTo(container) {
        container.append(this._el);
    }

    destroy() {
        this._el.remove();
        // this method deletes element from DOM.
    }
}

// ---------------------------------------
const list = new List();
// создали экземпляр класса List, который будет единственным на странице.
// в этот элемент мы в дальнейшем будем добавлять все наши статьи, и удалять их из него.

// ------------------
// Ниже отправляем два асинхронных запроса.
// Первый запрос - чтобы получить информацию по пользователям.
let reqUsers = $.getJSON("https://jsonplaceholder.typicode.com/users",
    function(data,status,jqXHR){
        console.log(data);
    });

// Второй запрос - чтобы получить информацию по статьям (постам).
let reqPosts = $.getJSON("https://jsonplaceholder.typicode.com/posts",
    function(data,status,jqXHR){
        console.log(data);
    });

$.when(reqUsers,reqPosts).done(function([users],[posts]) {
    posts.forEach(post => {
        // console.log(post);
        let currentUser = users.find(user => user.id === post.userId);
        let postWithUserAdded = {
            ...post,
            name: currentUser.name,
            email: currentUser.email
        };
        list.addNewPostFromServer(postWithUserAdded);
        // console.log(postWithUserAdded);
    })
})

