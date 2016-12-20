//1 - TYPES
//optional typing - any
var someVar;
someVar = 2;
someVar = 'Now I am a string';
someVar = {};
//type inference based on the assignment
var someBool = false;
var someString = 'Lorem ipsum';
var someNumber = 123;
var someArray = [1, 2, 3];
//explicit typing - annotations
var firstName = 'Mirjana';
var heightInCentimeters = 182.88;
var isActive = true;
var names = ['John', 'Paul', 'Ringo', 'Roger'];
var sayHello;
// implementation of sayHello function
sayHello = function (name) {
    return 'Hello ' + name;
};
// object type annotation
var person;
// Implementation of a person object
person = {
    name: 'Mark',
    heightInCentimeters: 183
};
//Why are types useful?
function doSomething(x, y) {
    console.log(x + ' ' + y);
    return x + y;
}
window.onload = function () {
    doSomething(1, 2);
    doSomething("foo", "bar");
    doSomething({ someProp: "foo", someOtherProp: "bar" }, 2);
};
//# sourceMappingURL=1Types.js.map