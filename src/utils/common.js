//장바구니 추가
export const handleCart = (
  value,
  cartItem,
  setCartItem,
  defaultPrice,
  setDefaultPrice,
  setIsOpen,
  isOpen,
) => {
  const findSameId = cartItem.findIndex((i) => i.id === value.id);
  if (findSameId === -1) {
    setCartItem([...cartItem, { ...value, count: value.count + 1 }]);
    setDefaultPrice([...defaultPrice, { id: value.id, price: value.price }]);
  } else {
    const addCountItem = cartItem.map((item) => {
      if (value.id === item.id) {
        const idx = defaultPrice.findIndex((i) => i.id === item.id);
        return {
          ...item,
          count: item.count + 1,
          price:
            defaultPrice[idx].id === item.id &&
            defaultPrice[idx].price * (item.count + 1),
        };
      } else return item;
    });
    setCartItem(addCountItem);
  }

  setIsOpen(!isOpen);
};

//찜목록 추가
export const handleFavorite = (
  value,
  isFavoriteClicked,
  setIsFavoriteClicked,
  favoriteItem,
  setFavoriteItem,
) => {
  let sampleFavorite = isFavoriteClicked;
  sampleFavorite[value.id - 1] = !sampleFavorite[value.id - 1];
  setIsFavoriteClicked(sampleFavorite);

  if (sampleFavorite[value.id - 1]) {
    setFavoriteItem([...favoriteItem, value]);
  } else {
    setFavoriteItem(favoriteItem.filter((el) => el.id !== value.id));
  }
};
