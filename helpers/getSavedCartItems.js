const getSavedCartItems = () => {
  // seu código aqui
  if (localStorage.length > 0) {
    console.log(localStorage.length);
    const local = localStorage.getItem('cartItems').split('&&');  
    return local;
  }
};
if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
