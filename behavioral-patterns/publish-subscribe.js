/**
 * Also known as pub-sub, Pub/Sub
 *
 * In this pattern, senders of messages, called publishers, do not program
 * the messages to be sent directly to specific receivers, called subscribers.
 * The publisher and subscriber don't know about each other's identity. There
 * is a third component, called "broker" or "message broker" or "event bus",
 * which is known by both the publisher and subscriber, which filters all
 * incoming messages and distributes them accordingly.
 *
 * The process of selecting messages for reception and processing is called
 * filtering. Most popular methods of filtering: topic-based and content-based.
 *
 * With this approach, components are loosely coupled as opposed to Observer
 * pattern, as they don’t know each other. This pattern is mostly implemented
 * in an asynchronous way (using message queue).
 */

const PubSub = (function() {
  const cache = {}
  let uid = -1

  /**
   * PubSub.publish('App.loaded', [app])
   */
  const publish = (topic, args = []) => {
    if (!cache[topic]) {
      return false
    }

    const subscribers = cache[topic]
    let subscribersLength = subscribers ? subscribers.length : 0

    while (subscribersLength--) {
      subscribers[subscribersLength].callback(topic, args)
    }

    return true
  }

  /**
   * PubSub.subscribe('Article.added', function () {})
   * PubSub.subscribe('Article.added', Articles.validate)
   */
  const subscribe = (topic, callback) => {
    if (!cache[topic]) {
      cache[topic] = []
    }

    const token = (++uid).toString()
    cache[topic].push({
      token,
      callback
    })

    return [topic, token]
  }

  /**
   * const handle = PubSub.subscribe('Article.added', Articles.validate)
   * PubSub.unsubscribe(handle)
   */
  const unsubscribe = (handle, isCompletely = false) => {
    const [
      topic,
      token
    ] = handle

    if (cache[topic]) {
      for (let i = cache[topic].length - 1; i >= 0; i -= 1) {
        if (cache[topic][i].token === token) {
          cache[topic].splice(i, 1)
          if (isCompletely) {
            delete cache[topic]
          }
          return token
        }
      }
    }

    return false
  }

  return {
    publish,
    subscribe,
    unsubscribe
  }
})()

// Example

const testSubscriber = function (topics, data) {
  console.log(`topics: ${data}`)
}

const testSubscription = PubSub.subscribe('example', testSubscriber)

PubSub.publish('example', 'hello world!')
PubSub.publish('example', ['test','a','b','c'])
PubSub.publish('example', [{ color: 'blue' }, { text: 'hello' }])

PubSub.unsubscribe(testSubscription)
PubSub.publish('example', 'hello again!') // this doesn't get executed
