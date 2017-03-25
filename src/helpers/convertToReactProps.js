export default function convertToReactProps(key) {
  return key.replace(/([-:].)/g, char => char.slice(1).toUpperCase());
};
