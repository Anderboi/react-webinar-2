import StateModule from "../module";

/**
 * Состояние
 */
class ProductState extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      item: {},
      // name: null,
      // title: null,
      // description: null,
      // price: 0,
      // maidIn: null,
      // category: null,
    };
  }

  async loadItem(id) {
    const response = await fetch(
        `api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`
    );
    const json = await response.json();
    this.setState({
      item: {
        title: json.result.title,
        description: json.result.description,
        madeInTitle: json.result.maidIn.title,
        madeInCode: json.result.maidIn.code,
        category:json.result.category.title,
        edition: json.result.edition,
        price: (json.result.price).toLocaleString('ru-RU', {style: 'currency', currency: 'RUB'})
      }
    }, 'Получение данных товара');
  }
}

export default ProductState;
