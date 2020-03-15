/**
 * Define an interface for creating an object, but let subclasses decide which
 * class to instantiate. Factory Method lets a class defer instantiation to
 * subclasses.
 */

function Developer(name) {
  this.name = name
  this.type = 'Developer'
}

function Tester(name) {
  this.name = name
  this.type = 'Tester'
}

function EmployeeFactory() {
  this.create = (name, type) => {
    switch (type) {
      case 1:
        return new Developer(name)
      case 2:
        return new Tester(name)
    }
  }
}

// Example usage

const employeeFactory = new EmployeeFactory()
const employees = []

employees.push(employeeFactory.create('Erich', 1))
employees.push(employeeFactory.create('John', 2))

function printMessage() {
  console.log(`Hey! I'm ${this.name} and I'm a ${this.type}`)
}

employees.forEach(emp => printMessage.call(emp))
