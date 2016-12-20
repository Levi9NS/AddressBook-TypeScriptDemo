//3 - CLASSES IN PLAIN JAVASCRIPT

//Is this really a constructor?
function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}

Person.prototype.sayHi = function () {
    console.log('Hello! I am ' + this.firstName + ' ' + this.lastName + '!');
}

//How can I inherit from a Person
function Developer(firstName, lastName, position) {
    Person.call(this, firstName, lastName);
    this.position = position;
}

Developer.prototype = new Person(); //What happens if I forget this line of code?

Developer.prototype.sayHi = function () {
    console.log('I am ' + this.firstName + ' ' + this.lastName + ', and my position is' + this.position + '.');
}


