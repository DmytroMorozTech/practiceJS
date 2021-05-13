// ES6 standard was followed.

class Hamburger {
    constructor(size,stuffing){
        if (!size && !stuffing) {
            throw new HamburgerException("Size and stuffing were not given!");
        }
        else if (!size) {
            throw new HamburgerException("No size given!");
        }
        else if(size!==Hamburger.SIZE_SMALL && size!==Hamburger.SIZE_LARGE) {
            throw new HamburgerException(`Invalid size: ${size}`);
        }
        else if (size && !stuffing) {
            throw new HamburgerException("No stuffing given!");
        }
        else if(stuffing!==Hamburger.STUFFING_CHEESE && stuffing!==Hamburger.STUFFING_SALAD && stuffing!==Hamburger.STUFFING_POTATO) {
            throw new HamburgerException(`Invalid stuffing: ${stuffing}`);
        }

        this.size = size;
        this.stuffing = stuffing;
        this.toppings=[];
    }

    // ---------------------------
    // SIZES
    static SIZE_SMALL = {
        name: "SIZE_SMALL",
        price: 50,
        calories: 20
    };

    static SIZE_LARGE = {
        name: 'SIZE_LARGE',
        price: 100,
        calories: 40
    }
    // ---------------------------
    //STUFFINGS
    static STUFFING_CHEESE = {
        name: "STUFFING_CHEESE",
        price: 10,
        calories: 20
    };
    static STUFFING_SALAD = {
        name: "STUFFING_SALAD",
        price: 20,
        calories: 5
    };
    static STUFFING_POTATO = {
        name: "STUFFING_SALAD",
        price: 15,
        calories: 10
    };
    // ---------------------------
    //TOPPINGS
    static TOPPING_SPICE = {
        name: "TOPPING_SPICE",
        price: 15,
        calories: 0
    }

    static TOPPING_MAYO = {
        name: 'TOPPING_MAYO',
        price: 20,
        calories: 5
    }

    addTopping(topping) {
    //we may add several toppings provided that they are different.
        try {
            if (this.toppings.includes(topping)) {
                throw new HamburgerException(`Duplicate topping: ${topping.name}`);
            }

            this.toppings.push(topping);
            console.log(`Topping ${topping.name} was added.`)
        }
        catch(err) {
            console.error(`${err.message}`);
        }
    }

    removeTopping(topping) {
    // remove topping on condition that it already was added.
        try {
            let toppings = this.toppings;
            if (!toppings.includes(topping)) {
                throw new HamburgerException("This topping was not added before. Nothing to remove!");
            }
            toppings.splice(toppings.indexOf(topping), 1);
            console.log(`Topping ${topping.name} was removed.`)
        }

        catch(err) {
            console.error(`${err.message}`);
        }
    }

    getToppings() {
        return this.toppings.map((item)=> item.name).join(",");
    }

    getSize() {
        return this.size.name;
    }

    getStuffing() {
        return this.stuffing.name;
    }

    calculatePrice() {
        let toppingsPrice = this.toppings.reduce(function(acc,topping){
            return acc + topping.price;
        },0);
        let currentPrice = this.size.price + this.stuffing.price + toppingsPrice;
        console.log(`Current price: ${currentPrice}`);
    }

    calculateCalories() {
        let toppingsCalories = this.toppings.reduce(function(acc,topping){
            return acc + topping.calories;
        },0);
        let currentCalories = this.size.calories + this.stuffing.calories + toppingsCalories;
        console.log("Number of calories: " + currentCalories);
    }
}

//-------------------------------------
class HamburgerException extends Error {
    constructor(message) {
        super(message);
    }
}
//-------------------------------------

// Workflow sample goes below.
// If you want to try these methods in manual mode, please comment out everything below.
let hamburger = new Hamburger(Hamburger.SIZE_LARGE,Hamburger.STUFFING_POTATO);

console.log(hamburger);
hamburger.calculatePrice();
hamburger.calculateCalories();
hamburger.getSize();
hamburger.getToppings();
console.log("------------------------------");
// Next step: we add topping "TOPPING_MAYO" and get updated data about hamburger (price and calories).
hamburger.addTopping(Hamburger.TOPPING_MAYO);
hamburger.getToppings();
hamburger.calculatePrice();
hamburger.calculateCalories();
hamburger.getToppings();
console.log("------------------------------");
// Next step: we add topping "TOPPING_SPICE" and get updated data about hamburger (price and calories).
hamburger.addTopping(Hamburger.TOPPING_SPICE);
hamburger.getToppings();
hamburger.calculatePrice();
hamburger.calculateCalories();
hamburger.getToppings();
hamburger.addTopping(Hamburger.TOPPING_SPICE);
// Attempt to add TOPPING_SPICE once again. Throws an error "Duplicate topping: TOPPING_SPICE".
console.log("------------------------------");
hamburger.removeTopping(Hamburger.TOPPING_SPICE);
hamburger.getToppings();
hamburger.calculatePrice();
hamburger.calculateCalories();

hamburger.removeTopping("Best topping ever!");
// This command will return a message 'This topping was not added before. Nothing to remove!'

console.log("------------------------------");

try {
    let hamburger2 = new Hamburger("",Hamburger.STUFFING_SALAD);
    // Attempt to create a new instance of hamburger without passing argument "size" to function;
    // This action will return an error "No size given!"
}
catch(err) {
    console.error(`${err.message}`);
}

console.log("------------------------------");
try {
    let hamburger3 = new Hamburger(Hamburger.SIZE_SMALL,"");
    // Attempt to create a new instance of hamburger without passing argument "stuffing" to function;
    // This action will return an error "No stuffing given!"
}
catch(err) {
    console.error(`${err.message}`);
}

console.log("------------------------------");

try {
    let hamburger4 = new Hamburger("", "");
    // Attempt to create a new instance of hamburger without passing arguments "size" and "stuffing" to function;
    // This action will return an error "Size and stuffing were not given!"
}
catch(err) {
    console.error(`${err.message}`);
}












