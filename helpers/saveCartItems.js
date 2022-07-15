const saveCartItems = (element) => {
  // seu código aqui
  let atual = '';
  element.forEach((item) => {
    atual = `${atual}&&${item.innerText}`;
  });
  localStorage.setItem('cartItems', atual);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
