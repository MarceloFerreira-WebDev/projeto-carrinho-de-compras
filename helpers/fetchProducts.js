const fetchProducts = async (productName) => {
  // seu código aqui  
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${productName}`;
  if (url.endsWith('undefined')) return new Error('You must provide an url');
  const result = await fetch(url);
  const data = await result.json();  
  return data.results;  
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
