'use strict'

/**
 * Higher order function
 */
function addTwo(value) {
  return value + 2
}

function timesTwo(value) {
  return value * 2
}

const addTwoAndTimesTwo = compose(addTwo, timesTwo)

console.log(addTwoAndTimesTwo(40))


/**
 * Function decorator
 * ES5
 */
function Person() {}

Person.prototype.setName = fluent(function (first, last) {
  this.first = first
  this.last = last
})

Person.prototype.sayName = fluent(function () {
  console.log(this.first, this.last)
})

const p = new Person()
p.setName('Joe', 'Doe').sayName().setName('Jane', 'Doe').sayName()

/**
 * Function decorator
 * ES6
 */
class Person {

  @decorateWith(fluent)
  setName(first, last) {
    this.first = first
    this.last = last
  }

  @decorateWith(fluent)
  sayName() {
    console.log(this.first, this.last)
  }
}

const p = new Person()
p.setName('Jane', 'Doe').sayName().setName('John', 'Doe').sayName()
