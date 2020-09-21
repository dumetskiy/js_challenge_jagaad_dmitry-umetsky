let currencyFormatter = new class CurrencyFormatter {
  formatCurrency(value, currency) {
    currency = currency || this.getDefaultCurrency();

    return currency + ' ' + value.toFixed(2);
  }
  getDefaultCurrency() {
    return '€';
  }
}

export default currencyFormatter;
