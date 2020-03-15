/**
 * Provide a way to access the elements of an aggregate object sequentially
 * without exposing its underlying representation.
 */

const items = [1, 'string', false, 3.14]

function Iterator(collection) {
  this.items = collection
  this.currentIndex = 0
}

Iterator.prototype = {
  hasNext() {
    return this.currentIndex < this.items.length
  }

  next() {
    return this.items[this.currentIndex++]
  }
}

const iter = new Iterator(items)
while (iter.hasNext()) {
  console.log(iter.next())
}
