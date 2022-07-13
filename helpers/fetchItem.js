const fetchItem = async (itemId) => {
  // seu código aqui
  const url = `https://api.mercadolibre.com/items/${itemId}`;
  if (url.endsWith('undefined')) return new Error('You must provide an url');
  const result = await fetch(url);
  const item = await result.json();
  return item;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
