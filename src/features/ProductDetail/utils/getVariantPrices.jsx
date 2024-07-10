export const getSalePrices = (product) => {
  const variants = product.variants;
  let minPrice = variants[0].salePrice;
  let maxPrice = variants[0].salePrice;

  for (let i = 0; i < variants.length; i++) {
    if (Number(variants[i].salePrice) > Number(maxPrice)) {
      maxPrice = variants[i].salePrice;
    }

    if (Number(variants[i].salePrice) < Number(minPrice)) {
      minPrice = variants[i].salePrice;
    }
  }

  if (minPrice == maxPrice) {
    return [minPrice];
  }

  return [minPrice, maxPrice];
};

export const getPrices = (product) => {
  const variants = product.variants;
  let minPrice = variants[0].price;
  let maxPrice = variants[0].price;

  for (let i = 0; i < variants.length; i++) {
    if (Number(variants[i].price) > Number(maxPrice)) {
      maxPrice = variants[i].price;
    }

    if (Number(variants[i].price) < Number(minPrice)) {
      minPrice = variants[i].price;
    }
  }

  if (minPrice == maxPrice) {
    return [minPrice];
  }

  return [minPrice, maxPrice];
};
