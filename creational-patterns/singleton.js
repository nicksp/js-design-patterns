/**
 * Ensure a class has only one instance and provide a global point of access to
 * it.
 */

const Singleton = (function () {
  let procManager

  function ProcessManager() {
    this.numCounts = 0
  }

  function createProcessManager() {
    procManager = new ProcessManager()
    return procManager
  }

  return {
    getInstance() {
      if (!procManager) {
        procManager = createProcessManager()
      }
      return procManager
    }
  }
}())

const processManager = Singleton.getInstance()
const processManager2 = Singleton.getInstance()

console.log(processManager === processManager2) // true
