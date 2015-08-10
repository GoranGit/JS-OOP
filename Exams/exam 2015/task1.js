/**
 * Created by Goran on 7/9/2015.
 */

function solve(){

    function validateIfUndefined(val, name) {
        name = name || 'Value';
        if (val === undefined) {
            throw new Error(name + ' cannot be undefined');
        }
    };

    function validateStringNonEmpty(val, name) {
        name = name || 'Value';
        validateIfUndefined(val, name);

        if (typeof val !== 'string') {
            throw new Error(name + ' must be a string');
        }
        if(val===''){
            throw  new Error(name + ' must be a non empty string');
        }
    };

    function validateIfNumber(val, name) {
        name = name || 'Value';
        if (typeof val !== 'number') {
            throw new Error(name + ' must be a number');
        }
    };

    function validateString(val, name, minLen, maxLen) {
        name = name || 'Value';
        validateIfUndefined(val, name);

        if (typeof val !== 'string') {
            throw new Error(name + ' must be a string');
        }

        if (val.length < minLen
            || maxLen < val.length) {
            throw new Error(name + ' must be between ' + minLen +
                ' and ' + maxLen + ' symbols');
        }
    };

    function validateOnlyDigits(val,name){

        validateIfUndefined(val,name);


        var reg = /^[0-9]*$/;
        if(!reg.test(val)){
            throw new Error(name + ' must be a number');
        };
    };
    
    function validateStringDigitsExactLen(value,name,len1,len2){

        validateOnlyDigits(value,name);
        if(value.length!==len1 && value.length!==len2){
            throw new Error(name + ' must be '+len1+' or '+len2+' long!');
        }

    };

    function validatePositiveNumber(val, name) {
        name = name || 'Value';
        validateIfUndefined(val, name);
        validateIfNumber(val, name);

        if (val <= 0) {
            throw new Error(name + ' must be positive number');
        }
    }

    function validateBetweenFirstAndSecondNumber(value,name,first,second){
        validateIfUndefined(value,name);
        validateIfNumber(value,name);
        if(value<first||value>second){
            throw new Error(name + ' must be a number between '+first+' and '+second);
        }
    }

    function validateProperties() {
        var args = arguments,
            obj = args[0];

        for (var ind = 1, len = args.length; ind < len; ind += 1) {
            if (!obj.hasOwnProperty('_'+args[ind])||!obj.hasOwnProperty(args[ind])) {

                throw {
                    name: 'InvalidObjectError',
                    message: 'InvalidObjectError'
                };
            }
        }
    }

    function validateMinNumOfCharacters(val,name,minNum){
        validateIfUndefined(val,name);
        validateStringNonEmpty(val,name);
    }

    function getSortingFunction(firstParameter, secondParameter) {
        return function (first, second) {
            if (first[firstParameter] < second[firstParameter]) {
                return -1;
            }
            else if (first[firstParameter] > second[firstParameter]) {
                return 1;
            }

            if (first[secondParameter] < second[secondParameter]) {
                return 1;
            }
            else if (first[secondParameter] > second[secondParameter]) {
                return -1;
            }
            else {
                return 0;
            }
        }
    }


    var item =  (function () {
      var nextItemID = 1;

        var item = {
            init: function (description,name) {
                this.name = name;
                this.description = description;
                this.id = nextItemID++;
                return this;
            },
            get name() {
                return this._name;
            },
            set name(value) {
                validateString(value,'name',2,40);
                this._name = value;
            },
            get description() {
                return this._description;
            },
            set description(value) {
                validateStringNonEmpty(value,'description');
                this._description = value;
            }
        };

        return item;
    }());

    var book = (function (parent) {
        var book = Object.create(parent);
        Object.defineProperty(book, 'init', {
            value: function (description, name, isbn, genre) {
                parent.init.call(this, description, name);
                this.isbn = isbn;
                this.genre = genre;
                return this;
            }
        });

        Object.defineProperty(book, 'isbn', {
            get: function () {
                return this._isbn;
            },
            set: function (value) {
                validateStringDigitsExactLen(value,'isbn',10,13);
                this._isbn = value;
            }
        });

        Object.defineProperty(book, 'genre', {
            get: function () {
                return this._genre;
            },
            set: function (value) {
                validateString(value,'genre',2,20);
                this._genre = value;
            }
        });



        return book;
    }(item));

    var media = (function (parent) {
        var media = Object.create(parent);
        Object.defineProperty(media, 'init', {
            value: function (description,name,duration,rating) {
                parent.init.call(this,description,name);
                this.duration = duration;
                this.rating = rating;
                return this;
            }
        });

        Object.defineProperty(media, 'duration', {
            get: function () {
                return this._duration;
            },
            set: function (value) {
                validatePositiveNumber(value,'duration');
                this._duration = value;
            }
        });

        Object.defineProperty(media, 'rating', {
            get: function () {
                return this._rating;
            },
            set: function (value) {
                validateBetweenFirstAndSecondNumber(value,'rating',1,5);
                this._rating = value;
            }
        });
        return media;
    }(item));

    var catalog = (function () {
        var nextId = 1;

        var catalog = {
            init: function (name) {
                this.name = name;
                this.items = [];
                this.id = nextId++;
                return this;
            },
            get name() {
                return this._name;
            },
            set name(value) {
                validateString(value,'name',2,40);
                this._name = value;
            },
            add: function (items) {
                var res = [];
                if(arguments.length===0){
                    throw  new Error('No arg passed in add function!');
                }
                validateIfUndefined(arguments[0],'Array items');

                if(Array.isArray(arguments[0])){
                    if(arguments[0].length ===0){
                        throw  new Error('Array of arguments can not be  empty');
                    }
                    arguments = arguments[0];
                }

                for(var i = 0,len=arguments.length;i<len;i+=1){
                    validateProperties(arguments[i],'description','name','id')
                    res.push(arguments[i]);
                }
                [].push.apply(this.items,res);

                return this;
            },
            find: function (id) {
                validateIfUndefined(id, 'find');

                if(typeof id ==='number') {
                    var index = -1;

                    validateIfNumber(id, 'find');

                    for (var i = 0, len = this.items.length; i < len; i += 1) {
                        if (this.items[i].id === id) {
                            index = i;
                        }
                    }
                    if (index === -1) {
                        return null;
                    } else {
                        return this.items[index];
                    }
                }else
                if(typeof id ==='object'){
                    var result = [];
                    if(id.id!=='undefined'&&id.name!=='undefined'){
                        for(var j= 0,len = this.items.length;j<len;j+=1){
                            if(this.items[j].id===id.id && this.items[j].name===id.name){
                                result.push(this.items[j]);
                            }
                        }
                        return result;
                    }else{
                        if(id.id!=='undefined'){

                            for(var j= 0,len = this.items.length;j<len;j+=1){
                                if(this.items[j].id===id.id){
                                    result.push(this.items[j]);
                                }
                            }
                            return result;
                        }else{
                            if(id.name!=='undefined'){
                                for(var j= 0,len = this.items.length;j<len;j+=1){
                                    if(this.items[j].name===id.name){
                                        result.push(this.items[j]);
                                    }
                                }
                                return result;
                            }else{
                                throw  new Error();
                            }
                        }
                    }
                }
                else{
                    throw  new Error('id not a number or object');
                }

            },
            search: function (pattern) {
                var result = [],regExpression;
                validateStringNonEmpty(pattern,'Search function');

                var patternToLower = pattern.toLowerCase();



                for(var i= 0,len=this.items.length;i<len;i+=1){
                    var descToLower = this.items[i].description.toLowerCase(),
                     nameToLower = this.items[i].name.toLowerCase(),
                      d = descToLower.search(patternToLower),
                     n =  nameToLower.search(patternToLower);
                    if(d!==-1 || n!==-1){
                        result.push(this.items[i]);
                    }
                }
                return result;
            }
        };

        return catalog;
    }());

    var bookCatalog = (function (parent) {
        var bookCatalog = Object.create(parent);
        Object.defineProperty(bookCatalog, 'init', {
            value: function (name) {
                parent.init.call(this, name);
                return this;
            }
        });
        Object.defineProperty(bookCatalog, 'add', {
            value: function (books) {

                if(arguments.length===0){
                    throw  new Error('No arg passed in add function!');
                }
                validateIfUndefined(arguments[0],'Array items');

                if(Array.isArray(arguments[0])){
                    if(arguments[0].length ===0){
                        throw  new Error('Array of arguments can not be  empty');
                    }
                    arguments = arguments[0];
                }

                for(var i = 0,len=arguments.length;i<len;i+=1){
                    validateProperties(arguments[i],'isbn','genre');
                }
                parent.add.call(this, books);
                return this;
            }
        });
        Object.defineProperty(bookCatalog, 'getGenres', {
            value: function () {
                var res = [];
                for(var i= 0,len=this.items.length;i<len;i+=1){
                    if(res.indexOf(this.items[i].genre.toLowerCase())===-1){
                        res.push(this.items[i].genre.toLowerCase());
                    }
                }
                return res;
            }
        });
        Object.defineProperty(bookCatalog, 'find', {
            value: function(options){
                var result = [];
                validateIfUndefined(options, 'find');
                if(typeof options ==='object') {
                    if(options.genre!==undefined && options.id===undefined && options.name===undefined){

                        for(var j= 0,len = this.items.length;j<len;j+=1){
                            if(this.items[j].genre===options.genre){
                                result.push(this.items[j]);
                            }
                        }
                        return result;
                    }else{

                        if(options.genre!==undefined){
                            var res2 = parent.find.call(this, options);
                            for(var k = 0,len2 = res2.length;k<len2;k+=1){
                                if(res2[k].genre === options.genre){
                                    result.push(res2[k]);
                                }
                            }
                            return result;
                        }
                    }
                    return parent.find.call(this, options);
                }
            }
        });

        return bookCatalog;
    }(catalog));

    var mediaCatalog = (function (parent) {
        var mediaCatalog = Object.create(parent);
        Object.defineProperty(mediaCatalog, 'init', {
            value: function (name) {
                parent.init.call(this, name);
                return this;
            }
        });

        Object.defineProperty(mediaCatalog, 'add', {
            value: function (medias) {
                if(arguments.length===0){
                    throw  new Error('No arg passed in add function!');
                }
                validateIfUndefined(arguments[0],'Array items');

                if(Array.isArray(arguments[0])){
                    if(arguments[0].length ===0){
                        throw  new Error('Array of arguments can not be  empty');
                    }
                    arguments = arguments[0];
                }

                for(var i = 0,len=arguments.length;i<len;i+=1){
                    validateProperties(arguments[i],'duration','rating');
                }
                parent.add.call(this, medias);
                return this;
            }
        });


        Object.defineProperty(mediaCatalog, 'getTop', {
            value: function(count){
                var res = this.items.slice();
                res.sort(function(x,y){
                    return x.rating - y.rating;
                });
                var result = res.map(function(item){return {id:item.id,name:item.name};});
                return result.slice(0,count);
            }
        });

        Object.defineProperty(mediaCatalog, 'getSortedByDuration', {
            value: function () {
                var res = this.items.slice();
                res.sort(getSortingFunction('id','duration'));

                return res;
            }
        });

        return mediaCatalog;
    }(catalog));


    return {
        getBook: function (name, isbn, genre, description) {
            return Object.create(book).init(description,name,isbn,genre);
        },
        getMedia: function (name, rating, duration, description) {
            return Object.create(media).init(description,name,duration,rating);
        },
        getBookCatalog: function (name) {
            return Object.create(bookCatalog).init(name);
        },
        getMediaCatalog: function (name) {
            return Object.create(mediaCatalog).init(name);
        }
    };
}




var module = solve();
var catalog = module.getBookCatalog('John\'s catalog');

var book1 = module.getBook('The secrets of the JavaScript Ninja', '1234567890', 'IT', 'A book about JavaScript');
var book2 = module.getBook('JavaScript: The Good Parts', '0123456789', 'IT', 'A good book about JS');
catalog.add(book1);
catalog.add(book2);

console.log(catalog.find(book1.id));
//returns book1

console.log(catalog.find({id: book2.id, genre: 'IT'}));
//returns book2

console.log(catalog.search('js'));
// returns book2

console.log(catalog.search('javascript'));
//returns book1 and book2

console.log(catalog.search('Te sa zeleni'))
//returns []
