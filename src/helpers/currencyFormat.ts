export const currencyFormat = ({ value, currency }): string => {
  return `$${new Intl.NumberFormat().format(value)} ${currency}`;
};
