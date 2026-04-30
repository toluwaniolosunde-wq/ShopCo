export function formatPrice(value) {
  return `$${Math.round(value)}`;
}

export function getOriginalPrice(product) {
  return Math.round(product.price * (1.18 + (product.id % 4) * 0.08));
}

export function getDiscountPercent(product) {
  const originalPrice = getOriginalPrice(product);
  return Math.round(((originalPrice - product.price) / originalPrice) * 100);
}

export function getShortTitle(title, wordCount = 5) {
  const words = title.split(' ');

  if (words.length <= wordCount) {
    return title;
  }

  return `${words.slice(0, wordCount).join(' ')}...`;
}

export function getFashionProducts(products = []) {
  const fashionProducts = products.filter((product) =>
    product.category.toLowerCase().includes('clothing'),
  );

  return fashionProducts.length ? fashionProducts : products;
}

export function getNewArrivals(products = []) {
  return getFashionProducts(products).slice(0, 4);
}

export function getTopSelling(products = []) {
  return [...getFashionProducts(products)]
    .sort((firstProduct, secondProduct) => {
      const secondRating = secondProduct.rating?.rate ?? 0;
      const firstRating = firstProduct.rating?.rate ?? 0;

      return secondRating - firstRating;
    })
    .slice(0, 4);
}

export function getRelatedProducts(products = [], currentId) {
  return getFashionProducts(products)
    .filter((product) => product.id !== currentId)
    .slice(0, 4);
}

export function getCategoryLabel(category = '') {
  if (!category) {
    return 'Shop';
  }

  return category
    .replace("men's clothing", 'Men')
    .replace("women's clothing", 'Women')
    .replace('jewelery', 'Jewellery')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function getColorOptions(category = '') {
  if (category.includes("men's")) {
    return ['#4f4631', '#314f4a', '#31344f'];
  }

  if (category.includes("women's")) {
    return ['#b65e7b', '#d89bb0', '#4d506a'];
  }

  return ['#232323', '#7f8c8d', '#d5ae74'];
}

export function getGalleryImages(product) {
  return [product.image, product.image, product.image];
}
