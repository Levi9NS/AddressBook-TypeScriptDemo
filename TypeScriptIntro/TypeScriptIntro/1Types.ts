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
var firstName: string = 'Mirjana';
var heightInCentimeters: number = 182.88;
var isActive: boolean = true;
var names: string[] = ['John', 'Paul', 'Ringo', 'Roger'];

var sayHello: (name: string) => string;

// implementation of sayHello function
sayHello = function (name: string) {
    return 'Hello ' + name;
};

// object type annotation
var person: { name: string; heightInCentimeters: number; };

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




window.onload = () => {
    doSomething(1, 2);
    doSomething("foo", "bar");
    doSomething({ someProp: "foo", someOtherProp: "bar" }, 2);
};



