//4 - CLASSES 


interface IPerson {
    firstName: string;
    lastName: string;
    greet: () => string;
}

class Person implements IPerson {
    //Fields
    static instances = 0;

    //Constructor
    constructor(public firstName: string, public lastName: string, private age: number) {
        Person.instances++;
    }

    //Properties
    get getAge(): number {
        return this.age;
    }
    set setAge(value: number) {
        this.age = value;
    }

    //Functions
    greet() {
        //Template strings vs. traditional string concatenation
        return `Howdy! I'm ${this.firstName} ${this.lastName}!`;
    }
}

class Employee extends Person {
    constructor(firstName: string, lastName: string, age: number, public position: string) {
        super(firstName, lastName, 110);
    }

    changePosition(newPosition: string) {
        this.position = newPosition;
    }
}


