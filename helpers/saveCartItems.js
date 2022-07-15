const saveCartItems = (element) => {
  // seu código aqui
  let atual = '';
  element.forEach((item) => {
    atual = `${atual}&&${item.innerText}`;
  });
  localStorage.setItem('cartItems', atual);
  console.log(atual);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
