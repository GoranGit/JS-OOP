/* Task Description */
/* 
 Create a function constructor for Person. Each Person must have:
 *	properties `firstname`, `lastname` and `age`
 *	firstname and lastname must always be strings between 3 and 20 characters, containing only Latin letters
 *	age must always be a number in the range 0 150
 *	the setter of age can receive a convertible-to-number value
 *	if any of the above is not met, throw Error
 *	property `fullname`
 *	the getter returns a string in the format 'FIRST_NAME LAST_NAME'
 *	the setter receives a string is the format 'FIRST_NAME LAST_NAME'
 *	it must parse it and set `firstname` and `lastname`
 *	method `introduce()` that returns a string in the format 'Hello! My name is FULL_NAME and I am AGE-years-old'
 *	all methods and properties must be attached to the prototype of the Person
 *	all methods and property setters must return this, if they are not supposed to return other value
 *	enables method-chaining
 */
function solve() {
    var Person = (function () {

        function Person(firstname, lastname, age) {
            this.firstname = firstname;
            this.lastname = lastname;
            this.age = age;
        }

        Object.defineProperty(Person.prototype, 'firstname', {
            set: function (value) {
                if (value.length > 3 && value.length < 20) {
                    if (value.match(/^[a-zA-Z]+$/g)) {
                        this._firstname = value;
                        return this;
                    }
                    throw new Error();
                }
                throw new Error();
            },
            get: function () {
                return this._firstname;
            }
        });
        Object.defineProperty(Person.prototype, 'lastname', {
            set: function (value) {
                if (value.length > 3 && value.length < 20) {
                    if (value.match(/^[a-zA-Z]+$/g)) {
                        this._lastname = value;
                        return this;
                    }
                    throw new Error();
                }
                throw new Error();
            },
            get: function () {
                return this._lastname;
            }
        })
        Object.defineProperty(Person.prototype, 'age', {
            set: function (value) {
                var number = Number(value);
                if (number >= 0 && number <= 150) {
                    this._age = number;
                    return this;
                }
                throw new Error();
            },
            get: function () {
                return this._age;
            }
        });

        Object.defineProperty(Person.prototype, 'fullname', {
            get: function () {
                return this.firstname + " " + this.lastname;
            },
            set: function (value) {
                var firstLastName = value.split(' ');
                this.firstname = firstLastName[0];
                this.lastname = firstLastName[1];
                return this;
            }
        });
        Person.prototype.introduce = function () {
            return 'Hello! My name is ' + this.fullname + ' and I am ' + this.age + '-years-old';
        }
        return Person;
    }());
    return Person;
};

module.exports = solve;