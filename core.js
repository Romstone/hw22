class Products {
    #id;
    constructor(id, title, manufacture, price) {
        this.#id = id;
        this._title = title;
        this._manufacture = manufacture;
        this._price = price;
    }


    get id() {
        return this.#id;
    }

    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }

    get manufacture() {
        return this._manufacture;
    }

    set manufacture(value) {
        this._manufacture = value;
    }

    get price() {
        return this._price;
    }

    set price(value) {
        this._price = value;
    }
}

class Milk extends Products {

    constructor(id, title, manufacture, price, fat) {
        super(id, title, manufacture, price);
        this._fat = fat;
    }

    get fat() {
        return this._fat;
    }

    set fat(value) {
        this._fat = value;
    }
}

class Chocolate extends Products {
    constructor(id, title, manufacture, price, kind) {
        super(id, title, manufacture, price);
        this._kind = kind;
    }
    get kind() {
        return this._kind;
    }

    set kind(value) {
        this._kind = value;
    }
}

class Wine extends Products {
    constructor(id, title, manufacture, price, alcohol) {
        super(id, title, manufacture, price);
        this._alcohol = alcohol;
    }

    get alcohol() {
        return this._alcohol;
    }

    set alcohol(value) {
        this._alcohol = value;
    }
}

class Store {
    constructor() {
        this.store = [];
    }
    addProduct(product) {
        if (this.store.find(item => item.id === product.id))
            return false;
        else {
            this.store.push(product);
            return true;
        }
    }
    getAllProducts() {
        return [...this.store];
    }
    getByType(type) {
        let res = this.store.filter(product => product.constructor.name === type);
        return [...res];
    }
}

const myStore = new Store();
const milk1 = new Milk(111, 'Milk1', 'Tnuva', 15, 15);
const choc1 = new Chocolate(112, 'Chocolate1', 'Nesk', 10, 'Black');
const wine1 = new Wine(113, 'Wine1', 'Latrune', 34, 15);
myStore.addProduct(milk1);
myStore.addProduct(choc1);
myStore.addProduct(wine1);



