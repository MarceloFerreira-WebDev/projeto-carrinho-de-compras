const getSavedCartItems = () => {
  // seu código aqui
  if (localStorage.getItem('cartItems') !== null) {
    const local = localStorage.getItem('cartItems').split('&&');  
    return local;
}
return [];
};
if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
