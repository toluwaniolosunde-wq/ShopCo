import { getColorOptions, getFashionProducts } from './productHelpers';

const starterSizes = ['Large', 'Medium', 'Large'];
const starterColorLabels = ['White', 'Red', 'Blue'];

export function buildStarterCartItems(products = []) {
  return getFashionProducts(products)
    .slice(0, 3)
    .map((product, index) => {
      const color = getColorOptions(product.category)[index % 3];
      const size = starterSizes[index] ?? 'Large';
      const colorLabel = starterColorLabels[index] ?? 'Black';

      return {
        itemKey: `${product.id}-${color}-${size}`,
        productId: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        color,
        colorLabel,
        size,
        quantity: 1,
      };
    });
}

export function formatMoney(value) {
  return `$${Math.round(value)}`;
}
