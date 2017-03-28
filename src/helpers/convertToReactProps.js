export default function convertToReactProps(key) {
  if (key === 'class') return 'className';
  return key.replace(/([-:].)/g, char => char.slice(1).toUpperCase());
};
