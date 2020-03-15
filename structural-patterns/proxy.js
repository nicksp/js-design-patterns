/**
 * Provide a surrogate or placeholder for another object to control access to
 * it.
 */

 // External API service
function CryptocurrencyAPI() {
  this.getValue = coin => {
    console.log('Calling external API...')
    switch (coin) {
      case 'Bitcoin':
        return '$8500'
      case 'Litecoin':
        return '$50'
      case 'Etherium':
        return '$175'
      default:
        throw new Error('Unknown cryptocurrency provided.')
    }
  }
}

// Network consuming and non-optimised way of making API requests
// const api = new CryptocurrencyAPI()

// api.getValue('Bitcoin')
// api.getValue('Etherium')
// api.getValue('Bitcoin')
// api.getValue('Etherium')
// api.getValue('Bitcoin')
// api.getValue('Etherium')
// api.getValue('Bitcoin')
// api.getValue('Etherium')

// A proxy allows us for example to add an extra functionality in between and, say, cut down on the number of external API requests by a lot.

function CryptocurrencyProxy {
  this.api = new CryptocurrencyAPI()
  this.cache = {}

  this.getValue = coin => {
    if (!this.cache[coin]) {
      this.cache[coin] = this.api.getValue(coin)
    }
    return this.cache[coin]
  }
}

// Example

const proxy = new CryptocurrencyProxy()

console.log(proxy.getValue('Bitcoin')) // Calling from external API...
console.log(proxy.getValue('Etherium')) // Calling from external API...
console.log(proxy.getValue('Bitcoin')) // Calling from cache
console.log(proxy.getValue('Etherium')) // Calling from cache
