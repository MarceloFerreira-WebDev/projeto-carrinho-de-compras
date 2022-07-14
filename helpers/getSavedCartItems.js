const getSavedCartItems = () => {
  // seu código aqui
  const local = localStorage.getItem('cartItems');
  console.log(local.split(','));  
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
