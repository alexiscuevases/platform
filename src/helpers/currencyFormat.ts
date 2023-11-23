export const currencyFormat = ({ value, currency }) => {
  return `$${new Intl.NumberFormat().format(value)} ${currency}`;
};
