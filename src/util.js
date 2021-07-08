export const SECTION_ENUM = Object.freeze({
  ABOUT: 'about',
  PRODUCTS: 'products',
  ACCESSCONTROL: 'accesscontrol',
  DESIGN: 'design',
  RESOURCE: 'resource',
  MYHAGER: 'myhager',
});

export function replaceId(path, id) {
  return path.replace(/(\/)(:.*?)(\/|$)/, `$1${id}$3`);
}

export function capitalize(s) {
  if (s.length === 0) {
    return s;
  }
  return s[0].toUpperCase() + s.slice(1);
}

export function toPascal(s) {
  const parts = s.split('_');
  return parts.map(x => capitalize(x)).join('');
}

export function getObjectMethods(obj) {
  return Object.getOwnPropertyNames(obj)
    .concat(Object.getOwnPropertySymbols(obj).map(s => s.toString()))
    .sort()
    .filter((p, i, arr) => typeof obj[p] === 'function'
      && p !== 'constructor'
      && (i === 0 || p !== arr[i - 1]));
}
