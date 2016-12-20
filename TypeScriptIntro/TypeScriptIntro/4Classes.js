//4 - CLASSES 
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Person = (function () {
    //Constructor
    function Person(firstName, lastName, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        Person.instances++;
    }
    Object.defineProperty(Person.prototype, "getAge", {
        //Properties
        get: function () {
            return this.age;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Person.prototype, "setAge", {
        set: function (value) {
            this.age = value;
        },
        enumerable: true,
        configurable: true
    });
    //Functions
    Person.prototype.greet = function () {
        //Template strings vs. traditional string concatenation
        return "Howdy! I'm " + this.firstName + " " + this.lastName + "!";
    };
    return Person;
}());
//Fields
Person.instances = 0;
var Employee = (function (_super) {
    __extends(Employee, _super);
    function Employee(firstName, lastName, age, position) {
        var _this = _super.call(this, firstName, lastName, 110) || this;
        _this.position = position;
        return _this;
    }
    Employee.prototype.changePosition = function (newPosition) {
        this.position = newPosition;
    };
    return Employee;
}(Person));
//# sourceMappingURL=4Classes.js.map