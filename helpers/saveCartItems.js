const saveCartItems = (element) => {
  // seu código aqui
  localStorage.setItem('cartItems', JSON.stringify(element));  
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
