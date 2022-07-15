const getSavedCartItems = () => {
  // seu código aqui
  const local = localStorage.getItem('cartItems').split('&&');  
  return local;
};
if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
