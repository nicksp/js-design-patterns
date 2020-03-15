/**
 * Represent an operation to be performed on the elements of an object
 * structure. Visitor lets you define a new operation without changing the
 * classes of the elements on which it operates.
 */

function Employee(name, salary) {
  this.name = name
  this.salary = salary
}

Employee.prototype = {
  getSalary() {
    return this.salary
  }

  setSalary(salary) {
    this.salary = salary
  },

  accept(visitorFn) {
    visitorFn(this)
  }
}

// Example

const john = new Employee('John', 5000)
console.log(john.getSalary()) // -> 5000

// Now let's try to extend functionality of our Employee class

// Visitor function
function ExtraSalary(emp) {
  emp.setSalary(emp.getSalary() * 2)
}

john.accept(ExtraSalary)
console.log(john.getSalary()) // -> 10000
