const currencyFormatter = new class CurrencyFormatter {
  formatCurrency(value, currency) {
    currency = currency || this.constructor.getDefaultCurrency();

    return `${currency} ${value.toFixed(2)}`;
  }

  static getDefaultCurrency() {
    return '€';
  }
}();

export default currencyFormatter;
