function createNewUser() {
    const newUser ={
        firstName: prompt("Please enter your name:"),
        lastName: prompt("Please enter your last name:"),
        getLogin (){
            return (newUser.firstName[0] + newUser.lastName).toLowerCase();
        }
    };
    return newUser;
}

let newUser=createNewUser(); //Создаем обьект newUser путем присвоения ему значения, возвращаемого функцией createNewUser()
console.log(newUser);
console.log(newUser.getLogin());

let newUser2 = createNewUser();
console.log(newUser2.getLogin());
