/**
 * Created by Goran on 7/8/2015.
 */

var vechile = (function () {
    var NextId = 1;

    var vechile = {


        init: function (model, age) {
            this._model = model;
            this._age = age;
            return this;
        },
        get model() {
            return this._model;
        },
        set model(value) {
            var valToLower = value.toLowerCase();
            if(valToLower!=='car'&&valToLower!=='truck'&&valToLower!=='motorcicle'){
                throw  new Error();
            }
                this._model = value;
        },
        get age() {
            return this._age;
        },
        set age(value) {
            if(typeof value!=='number')
            {
                throw  new Error();
            }
            this._age = value;
        }
    }
    return vechile;
}());

(function (parent) {
    var car = Object.create(parent);
    Object.defineProperty(car, 'init', {
        value: function(model,age,color) {
            parent.init.call(this, model, age);
            this.color = color;
        }
    });
    Object.defineProperty(car, 'color', {
        get: function () {
            return this._color;
        },
        set: function (value) {
            if(typeof value!=='string'){
                throw  new Error();
            }
            this._color = value;
        }
    });



    return car;
}(vechile));






var car = Object.create(vechile).init('car',1992);
console.log(car);


var animal = (function () {
    var animal = {
        init: function (name,age) {
            this.name = name;
            this.age = age;
            return this;
        },
        get name() {
            return this._name;
        },
        set name(value) {
            this._name = value;
        },
        get age() {
            return this._age;
        },
        set age(value) {
            this._age = value;
        },
        toString: function () {
            return this.name + this.age;
        }
    };

    return animal;
}());
var dog =(function (parent) {
    var dog = Object.create(parent);
    Object.defineProperty(dog, 'init', {
        value: function (name, age, bred) {
            parent.init.call(this, name, age);
            this.bred = bred;
            return this;
        }
    });

    Object.defineProperty(dog, 'bred', {
        get: function () {
            return this._bred;
        },
        set: function (value) {
            this._bred = value;
        }
    });

    Object.defineProperty(dog, 'toString', {
        value: function () {
            var str = parent.toString.call(this);
            return str + ' '+this.bred;
        }
    });

    return dog;
}(animal));

var Petko = Object.create(dog).init('Petko',23,'canecorso');
console.log(Petko.toString());

(function (parent) {
    var name = Object.create(parent);
    Object.defineProperty(car, 'init', {
        value: function (name, model, price) {
            parent.init.call(this, name, model);
            this.price = price;
            return this;
        }
    });
    Object.defineProperty(car, 'price', {
        get: function () {
            return this._price;
        },
        set: function (value) {
            this._price = value;
        }
    });



    return name;
}(car));


function validateString(val, name, minLen, maxLen) {
    name = name || 'Value';
    validateIfUndefined(val, name);

    if (typeof val !== 'string') {
        throw new Error(name + ' must be a string');
    }

    if (val.length < minLen
        || maxLen < val.length) {
        throw new Error(name + ' must be between ' + minLen + ' and ' + maxLen + ' symbols');
    }
}
function validateIfUndefined(val, name) {
    name = name || 'Value';
    if (val === undefined) {
        throw new Error(name + ' cannot be undefined');
    }
}
function validatePositiveNumber(val, name) {
    name = name || 'Value';
    this.validateIfUndefined(val, name);
    this.validateIfNumber(val, name);

    if (val <= 0) {
        throw new Error(name + ' must be positive number');
    }
}

function validateProperties() {
    var args = arguments,
        obj = args[0];

    for (var ind = 1, len = args.length; ind < len; ind += 1) {
        if (!obj.hasOwnProperty(args[ind])) {
            throw {
                name: 'InvalidObjectError',
                message: 'InvalidObjectError'
            };
        }
    }
}


validateProperties({a:'b'},'b');


console.log(validateString('peshjenksl','Name',5,10));
+0
L-
    '  '