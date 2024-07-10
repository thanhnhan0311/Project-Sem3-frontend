import React from "react";
import { useReducer } from "react";

export default function useCreateProductReducer() {
  const ACTIONS = {
    CHANGE_NAME: "CHANGE_NAME",
    CHANGE_DESCRIPTION: "CHANGE_DESCRIPTION",
    CHANGE_PRICE: "CHANGE_PRICE",
    CHANGE_SALE_PRICE: "CHANGE_SALE_PRICE",
    CHANGE_IMAGES: "CHANGE_IMAGES",
    CHANGE_VARIANTS: "CHANGE_VARIANTS",
    CHANGE_UNIT: "CHANGE_UNIT",
    CHANGE_ACTIVE: "CHANGE_ACTIVE",
    CHANGE_VARIANT_DETAIL: "CHANGE_VARIANT_DETAIL",
    CHANGE_CATEGORY: "CHANGE_CATEGORY",
    CHANGE_WARRANTY: "CHANGE_WARRANTY",
    CHANGE_AMOUNT: "CHANGE_AMOUNT",
  };

  function reducer(state, action) {
    switch (action.type) {
      case ACTIONS.CHANGE_NAME:
        return { ...state, productName: action.next };
      case ACTIONS.CHANGE_DESCRIPTION:
        return { ...state, description: action.next };
      case ACTIONS.CHANGE_PRICE:
        return { ...state, price: action.next };
      case ACTIONS.CHANGE_IMAGES:
        return { ...state, images: action.next };
      case ACTIONS.CHANGE_VARIANTS:
        return { ...state, variants: action.next };
      case ACTIONS.CHANGE_UNIT:
        return { ...state, unit: action.next };
      case ACTIONS.CHANGE_ACTIVE:
        return { ...state, active: action.next };
      case ACTIONS.CHANGE_SALE_PRICE:
        return { ...state, salePrice: action.next };
      case ACTIONS.CHANGE_VARIANT_DETAIL:
        return { ...state, variant_detail: action.next };
      case ACTIONS.CHANGE_CATEGORY:
        return { ...state, category: action.next };
      case ACTIONS.CHANGE_WARRANTY:
        return { ...state, warrantyTime: action.next };
      case ACTIONS.CHANGE_AMOUNT:
        return { ...state, amount: action.next };
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    productName: "",
    category: {},
    description: "",
    price: 0,
    salePrice: 0,
    images: [],
    variants: [],
    variant_detail: [],
    unit: "",
    active: true,
    warrantyTime: 0,
    amount: 0,
  });

  return [state, dispatch, ACTIONS];
}
