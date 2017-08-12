'use strict';

class Item {
    constructor(name, weight, value, quantity) {
        this.name = name;
        this.weight = weight;
        this.value = value;
        this.quantity = quantity;
    }

    toString() {
        return  this.name + ", " +
            this.weight + "lbs, $" +
            this.value + " (" +
            this.quantity + ")";
    }

    clone() {
        return new Item(this.name, this.weight, this.value, this.quantity);
    }
}