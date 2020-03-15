/**
 * Define an object that encapsulates how a set of objects interact. Mediator
 * promotes loose coupling by keeping objects from referring to each other
 * explicitly, and it lets you vary their interaction independently.
 */

function Member(name) {
  this.name = name
  this.chatroom = null
}

Member.prototype = {
  send(message, toMember) {
    this.chatroom.send(message, this, toMember)
  },

  receive(message, fromMember) {
    console.log(`${fromMember.name} to ${this.name}: ${message}`)
  }
}

// Mediator
function Chatroom() {
  this.members = {}
}

Chatroom.prototype = {
  addMember(member) {
    this.members[member.name] = member
    member.chatroom = this
  }

  send(message, fromMember, toMember) {
    toMember.receive(message, fromMember)
  }
}

// Example

const chat = new Chatroom()

const bob = new Member('Bob')
const tim = new Member('Tim')
const john = new Member('John')

chat.addMember(bob)
chat.addMember(tim)
chat.addMember(john)

bob.send('hey, John!', john)
john.send('What\'s up, Bob', bob)
tim.send('John, u allright?', john)
