const itemsList = document.querySelector('.items');
const cartList = document.querySelector('.cart__items');

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  // coloque seu código aqui
  const element = event.target;
  element.parentElement.removeChild(element);
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const addToCart = async (event) => {
  const element = event.target;
  const itemId = getSkuFromProductItem(element.parentElement);
  const price = await fetchItem(itemId);
  const itemObject = {
    sku: itemId,
    name: element.parentElement.querySelector('.item__title').innerText,
    salePrice: price.price,
  };
  cartList.appendChild(createCartItemElement(itemObject));
};

const btnAddToCart = () => {
  const buttonList = document.querySelectorAll('.item__add');
  buttonList.forEach((button) => {
    button.addEventListener('click', addToCart);
  });
};

const createListOfProducts = async () => {
  const list = await fetchProducts('computador');
  const readyList = list.map((element) => ({
    sku: element.id,
    name: element.title,
    image: element.thumbnail,
  }));
  readyList.forEach((element) => {
    itemsList.appendChild(createProductItemElement(element));
  });
  btnAddToCart();
};

window.onload = () => {
  createListOfProducts();
};
