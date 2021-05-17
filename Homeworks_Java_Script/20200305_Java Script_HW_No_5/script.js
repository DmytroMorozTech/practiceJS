function createNewUser() {
    const newUser = {
        firstName: prompt("Please enter your name:"),
        lastName: prompt("Please enter your last name:"),
        birthday: prompt("Please enter your date of birth in format dd.mm.yyyy:", "dd.mm.yyyy"),
        getAge () {
            const validDateString = this.birthday
                .split('.')
                .reverse()
                .join('-');
            // console.log(validDateString);

            const dateOfBirth = new Date(validDateString); // we assign user's date of birth (in a validated format) to the variable dateOfBirth
            const currentDate = new Date(); // we assign the current date to the variable currentDate
            // const userAge = Math.floor((currentDate - dateOfBirth)/(1000*60*60*24*365));
            let userAge;
            if (currentDate.getMonth()>=dateOfBirth.getMonth() && currentDate.getDate()>=dateOfBirth.getDate()) {
                userAge = currentDate.getFullYear() - dateOfBirth.getFullYear();
            }
            else {
                userAge = currentDate.getFullYear() - dateOfBirth.getFullYear() - 1;
            }

            return userAge;
        },
        getPassword() {
            let str = this.firstName[0].toUpperCase() + this.lastName.toLowerCase() + this.birthday.slice(6,10);
            return str;
        }
    };
    return newUser;
}

let newUser=createNewUser();
console.log(newUser);
console.log(newUser.getAge());
console.log(newUser.getPassword());
