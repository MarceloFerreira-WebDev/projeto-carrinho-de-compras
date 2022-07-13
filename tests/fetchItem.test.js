require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  // implemente seus testes aqui
  test('se é uma função', () => {
    expect(typeof(fetchItem)).toBe('function');
  })
  test('se fetch foi chamado', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledTimes(1);
  })
  test('se fetch foi chamado com o endpoint correto', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  })
  test('se o objeto retornado da função tem a estrutura correta', async () => {
    expected = await fetchItem('MLB1615760527');
    expect(expected).toEqual(item);
  })
  test('se retorna o erro correto ao chamar a função sem nenhum parâmetro', async () => {
    const expectedError = new Error ('You must provide an url');
    const atual = await fetchItem();
    expect(atual).toEqual(expectedError);
  })
});
