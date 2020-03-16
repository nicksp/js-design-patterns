/**
 * Define a one-to-many dependency between objects so that when one object
 * changes state, all its dependents are notified and updated automatically.
 */

class Subject {
  constructor() {
    this.handlers = [] // observer functions
  }

  subscribe(fn) {
    this.handlers.push(fn)
  }

  unsubscribe(fn) {
    this.handlers = this.handlers.filter(handler => handler !== fn)
  }

  fire() {
    this.handlers.forEach(handler => handler.call())
  }
}

// Example

const subject = new Subject()

const observer1 = () => {
  console.log('observer 1 firing')
}

const observer2 = () => {
  console.log('observer 2 firing')
}

subject.subscribe(observer1)
subject.subscribe(observer2)

subject.fire()

subject.unsubscribe(observer2)

subject.fire()
