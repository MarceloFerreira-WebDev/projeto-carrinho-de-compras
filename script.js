const itemsList = document.querySelector('.items');
const cartList = document.querySelector('.cart__items');
const atualPrice = document.querySelector('.total-price');
const emptyBtn = document.querySelector('.empty-cart');

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

const createProductItemElement = ({ sku, name, image, price }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('p', 'item__title', name));
  section.appendChild(
    createCustomElement(
      'span', 'item__price', `R$ ${price.toFixed(2).toString().replace('.', ',')}`,
    ),
  );
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho'));

  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const getTotalPrice = () => {  
  const cart = getSavedCartItems();
  if (cart) {
    const subTotal = JSON.parse(cart).reduce((acc, curr) => acc + curr.salePrice, 0);
    atualPrice.innerText = `Subtotal R$ ${subTotal.toFixed(2).toString().replace('.', ',')}`;
  } else {
    atualPrice.innerText = 'Subtotal R$ 0,00';
  }
};

const cartItemClickListener = (event) => {
  // coloque seu código aqui
  const element = event.target;
  element.parentElement.parentElement.removeChild(element.parentElement);
  const cart = JSON.parse(getSavedCartItems());
  const newCart = cart
    .filter((item) => item.name !== element.parentElement.childNodes[1].innerText);
  saveCartItems(newCart);
  getTotalPrice();
};

const createCartItemElement = ({ name, salePrice, image }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.appendChild(createProductImageElement(image));
  li.appendChild(createCustomElement('p', 'item__title', name));
  li.appendChild(
    createCustomElement(
      'p', 'item__price', `R$ ${salePrice.toFixed(2).toString().replace('.', ',')}`,
    ),
  );
  removeItemBtn = li.appendChild(createCustomElement('button', 'remove-item-btn', 'x'));
  removeItemBtn.addEventListener('click', cartItemClickListener);
  return li;
};

const addToCart = async (event) => {
  const element = event.target;
  const itemId = getSkuFromProductItem(element.parentElement);
  const item = await fetchItem(itemId);
  const itemObject = {
    sku: itemId,
    name: element.parentElement.querySelector('.item__title').innerText,
    salePrice: item.price,
    image: item.thumbnail,
  };
  cartList.appendChild(createCartItemElement(itemObject));
  const cart = JSON.parse(getSavedCartItems());
  if (cart) {
    saveCartItems([...cart, itemObject]);
  } else { saveCartItems([itemObject]); }
  getTotalPrice();
};

const btnAddToCart = () => {
  const buttonList = document.querySelectorAll('.item__add');
  buttonList.forEach((button) => {
    button.addEventListener('click', addToCart);
  });
};

const addLoadingText = () => {
  const loading = document.createElement('p');
  loading.className = 'loading';
  loading.innerText = 'carregando...';
  return loading;
};

const removeLoadingText = () => {
  const loading = document.querySelector('.loading');
  itemsList.removeChild(loading);
};

const createListOfProducts = async () => {
  itemsList.appendChild(addLoadingText());
  const list = await fetchProducts('computador');
  const readyList = list.map((element) => ({
    sku: element.id,
    name: element.title,
    image: element.thumbnail,
    price: element.price,
  }));
  readyList.forEach((element) => {
    itemsList.appendChild(createProductItemElement(element));
  });
  btnAddToCart();
  removeLoadingText();
};

const createSavedCart = () => {
  const savedItems = getSavedCartItems();
  if (savedItems !== null) {
    const separedItems = JSON.parse(savedItems);
    for (let i = 0; i < separedItems.length; i += 1) {
      cartList.appendChild(createCartItemElement(separedItems[i]));
    }
  }
};

const clearCart = () => {  
  while (cartList.firstChild) {
    cartList.removeChild(cartList.lastChild);
  }
  saveCartItems([]);
  getTotalPrice();
};

emptyBtn.addEventListener('click', clearCart);

window.onload = () => {
  createListOfProducts();
  createSavedCart();
  getTotalPrice();
};
