require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  // implemente seus testes aqui
  test('se a função é uma função', () => {
    expect(typeof(fetchProducts)).toBe('function');
  });

  test('se fetch foi chamada ao executar a função com o argumento "computador"', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledTimes(1);
  })

  test('se fetch foi chamado com o link correto', () => {
    const link = 'https://api.mercadolibre.com/sites/MLB/search?q=computador'
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(link);
  })

  test('se o retorno da função com o argumento "computador" é o esperado', async () => {
    const expected = computadorSearch;
    const atual = await fetchProducts('computador')
    expect(atual).toEqual(expected);
  })

  test('se retorna o erro correto ao chamar a função sem nenhum parâmetro', async () => {
    const expectedError = new Error ('You must provide an url');
    const atual = await fetchProducts();
    expect(atual).toEqual(expectedError);
  })
});
