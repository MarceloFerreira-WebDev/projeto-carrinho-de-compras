const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  // implemente seus testes aqui
  test('se o storage muda quando adiciona ou remove um item', () => {
    saveCartItems([{name: 'marcelo', image: 'url.com'}]);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', '[{\"name\":\"marcelo\",\"image\":\"url.com\"}]')
  })
});
