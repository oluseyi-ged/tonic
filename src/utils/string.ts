export function toUpperCaseFirstLetter(val: string) {
  return val[0].toUpperCase() + val.substr(1, val.length - 1);
}

export const formatter: any = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function isObjectEmpty(obj) {
  return Object?.keys(obj)?.length === 0;
}

export function capitalizeFirstLetter(word) {
  // Check if the input is not an empty string
  if (word.length === 0) {
    return '';
  }

  // Capitalize the first letter and convert the rest to lowercase
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}
