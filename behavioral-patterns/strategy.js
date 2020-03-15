/**
 * Define a family of algorithms, encapsulate each one, and make them
 * interchangeable. Strategy lets the algorithm vary independently from clients
 * that use it.
 */

function Fedex() {
  this.calculate = package => {
    // Fedex calculations...
    return 2.64
  }
}

function UPS() {
  this.calculate = package => {
    // UPS calculations...
    return 1.45
  }
}

function USPS() {
  this.calculate = package => {
    // USPS calculations...
    return 4.8
  }
}

function Shipping() {
  this.company = null
  this.setStrategy = company => {
    this.company = company
  }
  this.calculate = package => {
    return this.company.calculate(package)
  }
}

const fedex = new Fedex()
const ups = new UPS()
const usps = new USPS()

const package = { from: 'Moscow', to: 'Rostov', weight: 1.56 }

// naive way
// fedex.calculate(package)
// ups.calculate(package)
// usps.calculate(package)

const shipping = new Shipping()

shipping.setStrategy(fedex)
console.log(`Fedex: ${shipping.calculate(package)}`)

shipping.setStrategy(ups)
console.log(`UPS: ${shipping.calculate(package)}`)

shipping.setStrategy(usps)
console.log(`USPS: ${shipping.calculate(package)}`)
