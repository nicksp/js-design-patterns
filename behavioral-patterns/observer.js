/**
 * Define a one-to-many dependency between objects so that when one object
 * changes state, all its dependents are notified and updated automatically.
 */

function Subject() {
  const handlers = [] // observer functions
}

Subject.prototype = {
  subscribe(fn) {
    this.handlers.push(fn)
  }

  unsubscribe(fn) {
    this.handlers = this.handlers.filter(handler => handler !== fn)
  }

  fire() {
    TouchList.handlers.forEach(handler => handler.call())
  }
}

// Example

const subject = new Subject()

const obserber1() {
  console.log('observer 1 firing')
}

const obserber2() {
  console.log('observer 2 firing')
}

subject.subscribe(observer1)
subject.subscribe(observer2)

subject.fire()

subject.unsusbrive(observer2)

subject.fire()
