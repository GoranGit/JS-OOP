/* Task Description */
/*
 * Create an object domElement, that has the following properties and methods:
 * use prototypal inheritance, without function constructors
 * method init() that gets the domElement type
 * i.e. `Object.create(domElement).init('div')`
 * property type that is the type of the domElement
 * a valid type is any non-empty string that contains only Latin letters and digits
 * property innerHTML of type string
 * gets the domElement, parsed as valid HTML
 * <type attr1="value1" attr2="value2" ...> .. content / children's.innerHTML .. </type>
 * property content of type string
 * sets the content of the element
 * works only if there are no children
 * property attributes
 * each attribute has name and value
 * a valid attribute has a non-empty string for a name that contains only Latin letters and digits or dashes (-)
 * property children
 * each child is a domElement or a string
 * property parent
 * parent is a domElement
 * method appendChild(domElement / string)
 * appends to the end of children list
 * method addAttribute(name, value)
 * throw Error if type is not valid
 * method removeAttribute(attribute)
 * throw Error if attribute does not exist in the domElement
 */


/* Example

 var meta = Object.create(domElement)
 .init('meta')
 .addAttribute('charset', 'utf-8');

 var head = Object.create(domElement)
 .init('head')
 .appendChild(meta)

 var div = Object.create(domElement)
 .init('div')
 .addAttribute('style', 'font-size: 42px');

 div.content = 'Hello, world!';

 var body = Object.create(domElement)
 .init('body')
 .appendChild(div)
 .addAttribute('id', 'cuki')
 .addAttribute('bgcolor', '#012345');

 var root = Object.create(domElement)
 .init('html')
 .appendChild(head)
 .appendChild(body);

 console.log(root.innerHTML);
 Outputs:
 <html><head><meta charset="utf-8"></meta></head><body bgcolor="#012345" id="cuki"><div style="font-size: 42px">Hello, world!</div></body></html>
 */


function solve() {
    var domElement = (function () {
        var domElement = {
            init: function (type) {
                this.type = type;
                this.children = [];
                this.attributes = [];
                this.parent = '';
                return this;
            }

        };

        Object.defineProperty(domElement, 'type', {
            set: function (val) {
                if (val.match(/^[A-z0-9]+$/)) {
                    this._type = val;
                }
                else {
                    throw  new Error();
                }
            },
            get: function () {
                return this._type;
            }

        });

        Object.defineProperty(domElement, 'innerHTML', {
            get: function () {
                var sortedAttributes = this.attributes.sort(function (a, b) {
                    if (a.name < b.name) {
                        return -1;
                    }
                    else {
                        return 1;
                    }
                });
                var attributesHtml = '';
                for (var i = 0, len = sortedAttributes.length; i < len; i += 1) {
                    attributesHtml += ' ' + sortedAttributes[i].name + '=\"' + sortedAttributes[i].value + '\"';
                }
                if (this.children.length === 0) {
                    return '<' + this.type + attributesHtml + '>' + this.content + '</' + this.type + '>'
                } else {
                    var childrenInner = '';
                    for (var i = 0, len = this.children.length; i < len; i += 1) {
                        if (typeof this.children[i] === 'object') {
                            childrenInner += this.children[i].innerHTML;
                        } else {
                            childrenInner += this.children[i];
                        }
                    }
                    return '<' + this.type + attributesHtml + '>' + childrenInner + '</' + this.type + '>'
                }
            }
        });

        Object.defineProperty(domElement, 'content', {
            set: function (val) {
                if (this.children.length === 0) {
                    this._content = val;
                }
            },
            get: function () {
                if (this._content === undefined)
                    return '';
                else
                    return this._content;
            }

        });

        Object.defineProperty(domElement, 'appendChild', {
            value: function (domOrString) {
                if (typeof domOrString === 'object') {
                    var that = this;
                    domOrString.parent = that;
                }
                this.children.push(domOrString);
                return this;
            }
        });

        Object.defineProperty(domElement, 'addAttribute', {
            value: function (name, value) {
                if (!name.match(/^[A-z0-9-]+$/)) {
                    throw  new Error();
                }
                var attribute = {name: name, value: value};
                var indexSameStudent;

                if (this.attributes.some(function (item, index) {
                        indexSameStudent = index;
                        return item.name === name;

                    })) {
                    this.attributes.splice(indexSameStudent, 1, attribute);
                }
                else {
                    this.attributes.push(attribute);
                }
                return this;
            }

        });

        Object.defineProperty(domElement, 'removeAttribute', {
            value: function (attribute) {
                var indexOfAttribute;
                if (!this.attributes.some(function (x, index) {
                        indexOfAttribute = index;
                        return attribute === x.name
                    })) {
                    throw  new Error();
                } else {

                    this.attributes.splice(indexOfAttribute, 1);
                    return this;

                }
            }
        })


        return domElement;
    }());
    return domElement;
}
var domElement = solve();
var meta = Object.create(domElement).init('meta').addAttribute('charset', 'utf-8');

var head = Object.create(domElement)
    .init('head')
    .appendChild(meta)

var div = Object.create(domElement)
    .init('div')
    .addAttribute('style', 'font-size: 42px');

div.content = 'Hello, world!';

var body = Object.create(domElement)
    .init('body')
    .appendChild(div)
    .addAttribute('id', 'myid')
    .removeAttribute('id')
    .addAttribute('bgcolor', '#012345');

var root = Object.create(domElement)
    .init('html')
    .appendChild(head)
    .appendChild(body);

console.log(root.innerHTML);

module.exports = solve;
