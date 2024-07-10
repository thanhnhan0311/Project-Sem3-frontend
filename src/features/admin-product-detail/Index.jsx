import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import TextEditor from "./components/TextEditor/TextEditor";
import CustomInput from "./components/Input/CustomInput";
import SelectInput from "@/shared/components/Input/SelectInput";
import { css } from "styled-components";
import variant_options from "./data/variant_options";
import { FaPlus } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { BiImageAdd } from "react-icons/bi";
import { ReadCategoryRequest } from "@/shared/api/categoryApi";
import useCreateProductReducer from "./hooks/useCreateProduct";
import { readCategoriesData } from "@/shared/utils/readCategoriesData";
import { ReadTypeRequest } from "@/shared/api/typeApi";
import { readTypesData } from "@/shared/utils/readTypesData";
import variant_detail_sample from "./data/variant_detail_sample";
import cartesian from "./utils/cartesian";
import { CiImageOn } from "react-icons/ci";
import TextInput from "@/shared/components/Input/TextInput";
import ErrorPopUp from "@/shared/components/PopUp/ErrorPopUp";
import ImagePopUp from "./components/CustomPopUp/ImagePopUp";
import VariantDetailPopUp from "./components/CustomPopUp/VariantDetailPopUp";
import { MdOutlineModeEdit } from "react-icons/md";
import SalePricePopUp from "./components/CustomPopUp/SalePricePopUp";
import ComparePricePopUp from "./components/CustomPopUp/ComparePricePopUp";
import AmountPopUp from "./components/CustomPopUp/AmountPopUp";
import Switch from "@/shared/components/Input/Switch";
import { Tooltip } from "react-tooltip";
import { FaRegQuestionCircle } from "react-icons/fa";
import { GetProductVariantDetailRequest } from "../ProductDetail/api/productDetailApi";
import { GetProductAdminDetailRequest } from "./api/editProductApi";
import { useSearchParams } from "react-router-dom";
import WaitingPopUp from "@/shared/components/PopUp/WaitingPopUp";
import { DeleteImageRequest, UploadImageRequest } from "./api/editProductApi";
import { Link } from "react-router-dom";
import InputCheckBox from "@/shared/components/Input/InputCheckBox";
import formatDollar from "@/shared/utils/FormatDollar";
import { EditProductRequest } from "./api/editProductApi";
import SuccessPopUp from "@/shared/components/PopUp/SuccessPopUp";
import { useNavigate } from "react-router-dom";
import { AdminRequest } from "@/shared/api/adminApi";

const StyledFaRegQuestionCircle = styled(FaRegQuestionCircle)`
  cursor: pointer;
  color: #0057a0;
  font-size: 13px;
`;

const Container = styled.div`
  width: 75rem;
  margin: auto;
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  font-size: 14px;

  > h4 {
    font-size: 1.4rem;
    font-weight: 400;
  }

  * hr {
    border: none;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }

  & h5,
  h4 {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 3rem;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  > div {
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    background-color: white;
    border-radius: 3px;
  }
`;

const Right = styled.div`
  > div {
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    background-color: white;
    position: sticky;
    top: 0;
  }
`;

const ShowInfo = styled.div`
  padding: 10px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 10px;

  > h5 {
    font-size: 16px;
    font-weight: 600;
  }
`;

const ContentItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  & h5 {
    color: #6c798f;
    font-weight: 700;
    font-size: 15px;
  }

  ${(props) => {
    if (props.$split == true) {
      return css`
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;

        > div {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
      `;
    }
  }}
`;

const InputCheckContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 10px;

  > input {
    cursor: pointer;
    width: 15px;
    height: 15px;
    background-color: blue;
  }
`;

const VariantItemContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 3rem;
  padding: 0 10px;

  & h5 {
    padding-bottom: 5px;
  }
`;

const VariantContainer = styled.div`
  padding: 0px 20px;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  > button {
    color: #2962ff;
    display: flex;
    align-items: center;
    background-color: white;
    border: none;
    gap: 1rem;
    font-size: 15px;
    cursor: pointer;
    width: 100%;
  }
`;

const SelectVariant = styled.div`
  > div {
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 35px;
    column-gap: 1rem;

    > svg {
      color: #e55e5e;
      padding: 10px;
      width: 35px;
      height: 35px;
      cursor: pointer;
      &:hover {
        background-color: #edeff2;
      }
    }
  }
`;

const VariantValue = styled.div`
  > input {
    margin-bottom: 20px;
  }

  > button {
    align-self: flex-start;
    cursor: pointer;
    color: blue;
    background-color: white;
    border-radius: 5px;
    padding: 5px 10px;
    border: 1px solid rgba(0, 0, 255, 0.4);

    &:hover {
      background-color: rgba(0, 0, 255, 0.6);
      color: white;
    }
  }

  > div {
    display: grid;
    grid-template-columns: 1fr 1.5rem;
    column-gap: 10px;
    margin-bottom: 1rem;
    align-items: center;

    > svg {
      height: 1.3rem;
      width: 1.3rem;
      cursor: pointer;
    }
  }
`;

const ImageContainer = styled.div`
  > input {
    display: none;
  }
`;

const AddImageButton = styled.button`
  background-color: white;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  gap: 10px;
  padding: 3rem 2rem;
  border: 1px dotted rgba(0, 0, 0, 0.2);

  > span {
    color: rgba(0, 0, 255, 0.5);
    font-size: 16px;
  }

  > svg {
    font-size: 45px;
    opacity: 0.3;
  }
`;

const Images = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-rows: 9rem;
  gap: 10px;

  > div:nth-of-type(1) {
    grid-column: 1/3;
    grid-row: 1/3;
  }

  > div {
    border: 1px dotted rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  & img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const UnitContainer = styled.div`
  > div {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: 10rem;
  }
`;

const VariantDetailContainer = styled.div``;

const VariantDetailGrid = styled.div`
  display: grid;
  grid-template-columns: 3rem 1fr;
  align-items: center;

  > div:nth-of-type(1) {
    display: flex;
    justify-content: center;
    padding-left: 3px;
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const VariantDetail = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 1rem;

  align-items: center;

  > div:nth-of-type(1) {
    display: flex;
    gap: 10px;
    align-items: center;

    > svg {
      font-size: 3rem;
      opacity: 0.4;
      border: 1px solid rgba(0, 0, 0, 0.4);
      padding: 10px;
      cursor: pointer;
    }
  }

  > div:nth-of-type(2) {
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: flex-end;

    > p:nth-of-type(1) {
      font-weight: 500;
    }

    > p:nth-of-type(2) {
      opacity: 0.6;
      font-size: 13px;
    }
  }

  & img {
    width: 3rem;
    height: 3rem;
  }

  cursor: pointer;
`;

const DoneContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 1rem;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  > p {
    font-weight: 600;
  }

  > div:nth-of-type(1) {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    > button {
      border: none;
      padding: 2px 15px;
      box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
    }
  }

  > div:nth-of-type(2) {
    text-align: right;
    > button {
      cursor: pointer;
      border-radius: 5px;
      padding: 2px 10px;
      border: none;
      background-color: white;
      box-shadow: rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.9) 0px 0px 0px 1px;
    }

    > button:hover {
      background-color: #edeff2;
    }
  }
`;

const ImageLayout = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0);
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
  padding: 5px;

  > svg {
    display: none;
    font-size: 1.2rem;
    background-color: white;
    padding: none;
    border-radius: 5px;
  }

  > svg:nth-of-type(1) {
    width: 2rem;
    height: 2rem;
    margin-left: 30px;
    background-color: rgba(0, 0, 0, 0);
    color: white;
    border: 2px dotted rgba(255, 255, 255, 1);
  }

  &:hover {
    background: rgba(0, 0, 0, 0.4);
  }

  &:hover svg {
    display: block;
  }
`;

const ImageItem = styled.div`
  position: relative;
`;

const VariantImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const VariantDetailHeader = styled.div`
  display: grid;
  grid-template-columns: 3rem 1fr auto;
  padding: 1rem;
  align-items: center;

  > div {
    position: relative;
  }
`;

const EditButton = styled.div`
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  padding: 8px 1rem;
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 10px;

  > svg {
    font-size: 15px;
  }

  &:hover {
  }
`;

const DropDown = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  transform: translate(-3.3rem, 10px);
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  width: 12rem;
  z-index: 1;

  > button {
    padding: 10px 1rem;
    text-align: left;
    width: 100%;
    cursor: pointer;
    background-color: white;
    border: none;
  }

  > button:hover {
    background-color: rgba(0, 0, 255, 0.6);
  }
`;

const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0.4rem 0;

  > input {
  }
`;

const ConfirmButton = styled.button`
  cursor: pointer;
  color: white;
  background-color: #2962ff;
  border: none;
  padding: 0.3rem 0;
  border-radius: 5px;

  &:hover {
    background-color: #0052cc;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 1rem;

  > button {
    flex: 1;
  }
`;

const DiscardButton = styled.button`
  cursor: pointer;
  border: 1px solid black;
  background-color: white;
  border-radius: 5px;
  padding: 0.3rem 0;
  font-weight: 600;
`;

const StyledLink = styled(Link)`
  width: fit-content;
  padding: 10px;
  border: 1px solid black;
`;

const regex = /^-?\d+(\.\d+)?$/;

const moneyRegex = /^(?=.*\d)\d*(?:\.\d*)?$/;

export default function AdminProductDetail() {
  const adminRequest = AdminRequest();
  const navigate = useNavigate();
  if (adminRequest.data.data.roleTypeId == 5) {
    navigate("/");
    return;
  }
  const editProductRequest = EditProductRequest();
  const readCategoryRequest = ReadCategoryRequest();
  const readTypeRequest = ReadTypeRequest();
  const [searchParams, setSearchParams] = useSearchParams();
  const getProductVariantDetailRequest = GetProductVariantDetailRequest(searchParams.get("id"));
  const getProductAdminDetailRequest = GetProductAdminDetailRequest(searchParams.get("id"));
  const uploadImageRequest = UploadImageRequest();
  const deleteImageRequest = DeleteImageRequest();
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const categoryRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const [showVariant, setShowVariant] = useState(false);
  const [showUnit, setShowUnit] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imagePopUp, setImagePopUp] = useState(false);
  const [chonsenImageState, setChosenImageState] = useState(null);
  const [variantDetailPopUp, setVariantDetailPopUp] = useState(false);
  const [chosenVariantDetail, setChosenVariantDetail] = useState(null);
  const [dropDown, setDropDown] = useState(false);
  const [editPrice, setEditPrice] = useState(false);
  const [editComparePrice, setEditComparePrice] = useState(false);
  const [editAmount, setEditAmount] = useState(false);
  const [showWarranty, setShowWarranty] = useState(false);
  const [variantChosen, setVariantChosen] = useState([]);

  const [state, dispatch, ACTIONS] = useCreateProductReducer();
  const inputRef = useRef();

  const onClickAddImage = () => {
    inputRef.current.click();
  };

  const handleImageChange = (ev) => {
    const allowedFileTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];

    if (ev.target.files.length > 0) {
      const isValidFileType = Array.from(ev.target.files).every((file) =>
        allowedFileTypes.includes(file.type)
      );

      if (!isValidFileType) {
        setImageError(true);

        return;
      }

      const formData = new FormData();

      [...ev.target.files].forEach((newFile) => formData.append("Images", newFile));

      formData.append("ProductId", getProductAdminDetailRequest.data.data.id);

      uploadImageRequest.mutate(formData, {
        onSuccess: (response) => {
          if (response.status == 200) {
            dispatch({ type: ACTIONS.CHANGE_IMAGES, next: [...state.images, ...response.data] });
            ev.target.files = null;
          }
        },
      });
    }
  };

  const transformCategoriesData = () => {
    const data = readCategoriesData(readCategoryRequest);

    const option = [];

    for (let item of data) {
      option.push({ value: item.id, label: item.name });
    }

    return option;
  };

  const checkVariantExist = () => {
    return state.variants.find((item) => item.value.find((itemValue) => itemValue != ""));
  };

  const initialTransformToVariantDetail = (variants, productData) => {
    const allVariants = [];

    for (let variant of variants) {
      if (!variant.value.find((item) => item != "")) {
        continue;
      }
      allVariants.push(variant.value.filter((item) => item != ""));
    }

    const variantDetail = cartesian(...allVariants);

    dispatch({
      type: ACTIONS.CHANGE_VARIANT_DETAIL,
      next: variantDetail.map((item) => {
        const variant = Array.isArray(item) ? item : [item];

        const detail = productData.variants.find((item) => {
          if (variant.length == 1) {
            return item.variantAttributes[0].attributeValue == variant[0];
          }

          if (variant.length == 2) {
            return (
              item.variantAttributes[0].attributeValue == variant[0] &&
              item.variantAttributes[1].attributeValue == variant[1]
            );
          }

          if (variant.length == 3) {
            return (
              item.variantAttributes[0].attributeValue == variant[0] &&
              item.variantAttributes[1].attributeValue == variant[1] &&
              item.variantAttributes[2].attributeValue == variant[2]
            );
          }
        });

        return {
          variant: variant,
          ...detail,
        };
      }),
    });
  };

  const onCreateProduct = () => {
    if (state.productName.length == 0) {
      setErrorMessage("Product need to have a name");
      setError(true);
      return;
    }

    if (state.images.length == 0) {
      setErrorMessage("Product need atlest one image");
      setError(true);
      return;
    }

    if (state.variants.length != 0 && state.variant_detail.length == 0) {
      setErrorMessage("You need to add variant or turn off variants");
      setError(true);

      return;
    }

    if (state.variants.length == 0 && state.variant_detail.length == 0 && state.price == 0) {
      setErrorMessage("Product need to be priced");
      setError(true);
      return;
    }

    const variantWithOutPrice = state.variant_detail.find((item) => {
      return item.price == 0;
    });

    if (variantWithOutPrice) {
      setErrorMessage(`Every variant need to have a price`);
      setError(true);
      return;
    }

    const wrongVariantPrice = state.variant_detail.find((item) => {
      return Number(item.salePrice) != 0 && Number(item.salePrice) < Number(item.price);
    });

    if (wrongVariantPrice) {
      setErrorMessage(`Variant price can't be larger than compare price`);
      setError(true);
      return;
    }

    if (Number(state.salePrice) != 0 && Number(state.price) > Number(state.salePrice)) {
      setErrorMessage(`Price can't be larger than compare price`);
      setError(true);
      return;
    }

    const formData = new FormData();
    formData.append("ProductId", searchParams.get("id"));
    formData.append("ProductName", state.productName);
    formData.append("Category", state.category.value);
    formData.append("Description", state.description ? state.description : "<p></p>");
    formData.append("Price", state.price ? state.price : 0);
    formData.append("SalePrice", state.salePrice ? state.salePrice : 0);
    formData.append("Amount", state.amount ? state.amount : 0);
    formData.append("Unit", state.unit ? state.unit : "");
    formData.append("Active", state.active);
    formData.append("Warranty", state.warrantyTime ? state.warrantyTime : 0);

    state.images.forEach((item) => formData.append("Images", item));
    state.variants.forEach((item) => {
      var copy = item;
      copy.id = item.option.value;
      formData.append("variantsJSON[]", JSON.stringify(copy));
    });
    state.variant_detail.forEach((item) => {
      formData.append("VariantDetailsJSON[]", JSON.stringify(item));
    });

    editProductRequest.mutate(formData, {
      onSuccess: (response) => {
        if (response.status == 200) {
          setUpdateSuccess(true);
          getProductAdminDetailRequest.refetch();
        }
      },
      onError: (response) => {
        console.log(response);
      },
    });
  };

  useEffect(() => {
    if (getProductAdminDetailRequest.isSuccess && getProductVariantDetailRequest.isSuccess) {
      const data = getProductAdminDetailRequest.data.data;
      const variantData = getProductVariantDetailRequest.data.data;

      dispatch({ type: ACTIONS.CHANGE_NAME, next: data.name });
      dispatch({ type: ACTIONS.CHANGE_DESCRIPTION, next: data.description });
      dispatch({
        type: ACTIONS.CHANGE_CATEGORY,
        next: categoryRef.current.props.options.find((item) => item.value == data.categoryId),
      });

      dispatch({
        type: ACTIONS.CHANGE_IMAGES,
        next: data.productImages.map((item) => item.imageName),
      });

      dispatch({
        type: ACTIONS.CHANGE_WARRANTY,
        next: data.warrantyDuration,
      });

      dispatch({
        type: ACTIONS.CHANGE_UNIT,
        next: data.unit,
      });

      if (data.unit) {
        setShowUnit(true);
      }

      if (data.warrantyDuration) {
        setShowWarranty(true);
      }

      if (variantData.length != 0) {
        setShowVariant(true);
        const variants = [];

        for (let item of variantData) {
          variants.push({
            done: true,
            value: item.values,
            option: variant_options.find((option) => item.variant == option.label),
          });
        }

        dispatch({ type: ACTIONS.CHANGE_VARIANTS, next: variants });

        initialTransformToVariantDetail(variants, data);
      }

      if (variantData.length == 0) {
        dispatch({ type: ACTIONS.CHANGE_PRICE, next: data.variants[0].price });
        dispatch({ type: ACTIONS.CHANGE_SALE_PRICE, next: data.variants[0].salePrice });
        dispatch({ type: ACTIONS.CHANGE_AMOUNT, next: data.variants[0].availableQuanity });
      }

      dispatch({ type: ACTIONS.CHANGE_ACTIVE, next: data.isActive });
    }
  }, [getProductAdminDetailRequest.status, getProductVariantDetailRequest.status]);

  if (getProductAdminDetailRequest.isLoading || getProductVariantDetailRequest.isLoading) {
    return <WaitingPopUp />;
  }

  return (
    <>
      <Container>
        <h4>{state.productName}</h4>
        <Content>
          <Left>
            <ContentContainer>
              <h5>General info</h5>
              <hr />
              <ContentItem>
                <h5 data-tooltip-id="my-tooltip-1">Product name</h5>
                <CustomInput
                  placeholder={"Input product name"}
                  state={state.productName}
                  setState={(value) => dispatch({ type: ACTIONS.CHANGE_NAME, next: value })}
                />
              </ContentItem>
              <ContentItem $split={true}>
                <div>
                  <h5>Category</h5>
                  <SelectInput
                    selectRef={categoryRef}
                    options={transformCategoriesData()}
                    state={state.category}
                    setState={(value) => {
                      dispatch({ type: ACTIONS.CHANGE_CATEGORY, next: value });
                    }}
                  />
                </div>
              </ContentItem>
              <ContentItem>
                <h5>Description</h5>
                <hr />
                <TextEditor
                  state={state.description}
                  setState={(value) => dispatch({ type: ACTIONS.CHANGE_DESCRIPTION, next: value })}
                />
              </ContentItem>
            </ContentContainer>
            <ContentContainer>
              <h5>
                Product images <StyledFaRegQuestionCircle data-tooltip-id="product_images" />
              </h5>
              <hr />
              <ImageContainer>
                {state.images.length > 0 && (
                  <Images>
                    {state.images.map((item, index) => {
                      return (
                        <ImageItem key={index}>
                          <ImageLayout>
                            <AiOutlineClose
                              onClick={() => {
                                dispatch({
                                  type: ACTIONS.CHANGE_IMAGES,
                                  next: state.images.filter((image, position) => position != index),
                                });
                                state.variant_detail.forEach((item) => {
                                  if (item.image == index) {
                                    item.image = null;
                                  }
                                });
                                dispatch({
                                  type: ACTIONS.CHANGE_VARIANT_DETAIL,
                                  next: state.variant_detail,
                                });
                                const findImage =
                                  getProductAdminDetailRequest.data.data.productImages.find(
                                    (imageData) => imageData.imageName == item
                                  );

                                deleteImageRequest.mutate({ imageId: findImage.id });
                              }}
                            />
                          </ImageLayout>
                          <img src={import.meta.env.VITE_API_IMAGE_PATH + item} />
                        </ImageItem>
                      );
                    })}
                    <AddImageButton onClick={onClickAddImage}>
                      <BiImageAdd />
                    </AddImageButton>
                  </Images>
                )}

                {state.images.length == 0 && (
                  <AddImageButton onClick={onClickAddImage}>
                    <BiImageAdd />
                    <span>Add Image</span>
                  </AddImageButton>
                )}
                <input ref={inputRef} onChange={handleImageChange} type="file" multiple />
              </ImageContainer>
            </ContentContainer>
            {showVariant || (
              <ContentContainer>
                <h5>Product Price</h5>
                <hr />
                <ContentItem>
                  <ContentItem $split={true}>
                    <div>
                      <h5>Sale price</h5>
                      <TextInput
                        state={state.price}
                        setState={(value) => {
                          if (moneyRegex.test(value) || value == "") {
                            dispatch({ type: ACTIONS.CHANGE_PRICE, next: value });
                          }
                        }}
                        placeholder={"0 $"}
                      />
                    </div>
                    <div>
                      <h5>Compare price</h5>
                      <TextInput
                        state={state.salePrice}
                        setState={(value) => {
                          if (moneyRegex.test(value) || value == "") {
                            dispatch({ type: ACTIONS.CHANGE_SALE_PRICE, next: value });
                          }
                        }}
                        placeholder={"0 $"}
                      />
                    </div>
                    <div>
                      <h5>Amount</h5>
                      <TextInput
                        state={state.amount}
                        setState={(value) => {
                          if (regex.test(value) || value == "") {
                            dispatch({ type: ACTIONS.CHANGE_AMOUNT, next: value });
                          }
                        }}
                        placeholder={"0 $"}
                      />
                    </div>
                  </ContentItem>
                </ContentItem>
              </ContentContainer>
            )}
            <ContentContainer>
              <h5>Product Unit</h5>
              <hr />
              <ContentItem>
                <InputCheckContainer>
                  <InputCheckBox
                    checked={showUnit}
                    onChange={() => {
                      setShowUnit((prev) => {
                        if (prev) {
                          dispatch({ type: ACTIONS.CHANGE_UNIT, next: "" });
                        }

                        return !prev;
                      });
                    }}
                    type="checkbox"
                  />
                  <span>
                    Variants with multiple units of measurement (e.g., cans, packs, cases...).
                  </span>
                </InputCheckContainer>
                {showUnit && (
                  <UnitContainer>
                    <hr />
                    <div>
                      <h5>Basic unit</h5>
                      <TextInput
                        state={state.unit}
                        setState={(value) => dispatch({ type: ACTIONS.CHANGE_UNIT, next: value })}
                        placeholder={"Input basic unit"}
                      />
                    </div>
                  </UnitContainer>
                )}
              </ContentItem>
            </ContentContainer>
            <ContentContainer>
              <h5>Warrant</h5>
              <hr />
              <ContentItem>
                <InputCheckContainer>
                  <InputCheckBox
                    onChange={() => {
                      setShowWarranty((prev) => {
                        if (prev) {
                          dispatch({ type: ACTIONS.CHANGE_WARRANTY, next: 0 });
                        }

                        return !prev;
                      });
                    }}
                    checked={showWarranty}
                    type="checkbox"
                  />
                  <span>Include a warranty with this product</span>
                </InputCheckContainer>

                {showWarranty && (
                  <UnitContainer>
                    <hr />
                    <div>
                      <h5>Warranty duration </h5>
                      <TextInput
                        state={state.warrantyTime}
                        setState={(value) => {
                          if (regex.test(value) || value == "") {
                            dispatch({ type: ACTIONS.CHANGE_WARRANTY, next: value });
                          }
                        }}
                        placeholder={"Duration in month"}
                      />
                    </div>
                  </UnitContainer>
                )}
              </ContentItem>
            </ContentContainer>
            {state.variants.length != 0 && (
              <ContentContainer>
                <h5>Variants</h5>
                <hr />
                <ContentItem>
                  {showVariant && (
                    <VariantContainer>
                      {state.variants.map((variant, variantIndex) => {
                        if (variant.done == true) {
                          return (
                            <DoneContainer>
                              <p>{variant.option.label}</p>
                              <div>
                                {variant.value.map((item, index) => {
                                  if (item != "") {
                                    return <button key={index}>{item}</button>;
                                  }
                                })}
                              </div>
                              <div></div>
                            </DoneContainer>
                          );
                        }
                      })}
                      {checkVariantExist() && (
                        <VariantDetailContainer>
                          <VariantDetailHeader>
                            <div>
                              <InputCheckBox
                                checked={
                                  variantChosen.length == state.variant_detail.length ? true : false
                                }
                                onChange={() => {
                                  if (variantChosen.length == state.variant_detail.length) {
                                    setVariantChosen([]);
                                  } else {
                                    setVariantChosen(state.variant_detail);
                                  }
                                }}
                              />
                            </div>
                            <div>{state.variant_detail.length} Variants</div>
                            <div>
                              <EditButton onClick={() => setDropDown((prev) => !prev)}>
                                <MdOutlineModeEdit />
                                Edit Variant
                              </EditButton>
                              {dropDown && (
                                <DropDown>
                                  <button
                                    disabled={variantChosen.length == 0}
                                    onClick={() => {
                                      setDropDown(false);
                                      setEditPrice(true);
                                    }}
                                  >
                                    Edit price
                                  </button>
                                  <button
                                    disabled={variantChosen.length == 0}
                                    onClick={() => {
                                      setEditComparePrice(true);
                                      setDropDown(false);
                                    }}
                                  >
                                    Edit compare at price
                                  </button>
                                  <button
                                    disabled={variantChosen.length == 0}
                                    onClick={() => {
                                      setEditAmount(true);
                                      setDropDown(false);
                                    }}
                                  >
                                    Edit amount
                                  </button>
                                </DropDown>
                              )}
                            </div>
                          </VariantDetailHeader>
                          <hr />
                          {state.variant_detail.map((item, key) => {
                            return (
                              <VariantDetailGrid key={key}>
                                <div>
                                  <InputCheckBox
                                    onChange={() =>
                                      setVariantChosen((prev) => {
                                        if (prev.includes(item)) {
                                          return prev.filter((i) => i != item);
                                        }
                                        return [...prev, item];
                                      })
                                    }
                                    checked={variantChosen.includes(item)}
                                  />
                                </div>
                                <VariantDetail
                                  onClick={(ev) => {
                                    ev.stopPropagation();
                                    setChosenVariantDetail(item);
                                    setVariantDetailPopUp(true);
                                  }}
                                >
                                  <div>
                                    {item.variantImage !== null ? (
                                      <VariantImage
                                        onClick={(ev) => {
                                          ev.stopPropagation();
                                          setChosenImageState(item);
                                          setImagePopUp(true);
                                        }}
                                        src={
                                          import.meta.env.VITE_API_IMAGE_PATH + item.variantImage
                                        }
                                      />
                                    ) : (
                                      <CiImageOn
                                        onClick={(ev) => {
                                          ev.stopPropagation();
                                          setChosenImageState(item);
                                          setImagePopUp(true);
                                        }}
                                      />
                                    )}
                                    {item.variant.join("/")}
                                  </div>
                                  <div>
                                    <p>{formatDollar(item.price)} $ </p>
                                    <p>{item.availableQuanity} sellable in inventory</p>
                                  </div>
                                </VariantDetail>
                              </VariantDetailGrid>
                            );
                          })}
                        </VariantDetailContainer>
                      )}
                    </VariantContainer>
                  )}
                </ContentItem>
              </ContentContainer>
            )}
          </Left>
          <Right>
            <ShowInfo>
              <ContentItem>
                <h5>Status</h5>
                <hr />
                <ActionContainer>
                  <Switch
                    state={state.active}
                    setState={() => {
                      dispatch({ type: ACTIONS.CHANGE_ACTIVE, next: !state.active });
                    }}
                  />
                  Product Active
                </ActionContainer>
                <hr />

                <ButtonContainer>
                  <ConfirmButton onClick={() => onCreateProduct()}>Save</ConfirmButton>
                  {getProductAdminDetailRequest.data.data.isActive && (
                    <DiscardButton
                      onClick={() =>
                        navigate(`/productdetail?id=${getProductAdminDetailRequest.data.data.id}`)
                      }
                    >
                      View on website
                    </DiscardButton>
                  )}
                </ButtonContainer>
              </ContentItem>
            </ShowInfo>
          </Right>
        </Content>
      </Container>
      {imagePopUp && (
        <ImagePopUp
          action={() => setImagePopUp(false)}
          images={state.images}
          state={chonsenImageState.variantImage}
          setState={(image) => {
            chonsenImageState.variantImage = image;
            dispatch({
              type: ACTIONS.CHANGE_VARIANT_DETAIL,
              next: state.variant_detail,
            });
          }}
        />
      )}
      {variantDetailPopUp && (
        <VariantDetailPopUp
          state={chosenVariantDetail}
          action={() => setVariantDetailPopUp(false)}
          setState={() => {
            dispatch({ type: ACTIONS.CHANGE_VARIANT_DETAIL, next: state.variant_detail });
          }}
        />
      )}
      {editPrice && (
        <SalePricePopUp
          action={() => setEditPrice(false)}
          state={variantChosen}
          setState={() => {
            dispatch({ type: ACTIONS.CHANGE_VARIANT_DETAIL, next: state.variant_detail });
          }}
        />
      )}
      {editComparePrice && (
        <ComparePricePopUp
          action={() => setEditComparePrice(false)}
          state={variantChosen}
          setState={() => {
            dispatch({ type: ACTIONS.CHANGE_VARIANT_DETAIL, next: state.variant_detail });
          }}
        />
      )}
      {editAmount && (
        <AmountPopUp
          setState={() => {
            dispatch({ type: ACTIONS.CHANGE_VARIANT_DETAIL, next: state.variant_detail });
          }}
          state={variantChosen}
          action={() => setEditAmount(false)}
        />
      )}
      <Tooltip
        id="product_images"
        place="bottom"
        content="jpeg, png, webp 1:1 ratio for better quality, First image always use as cover"
      />
      <Tooltip
        id="change_image"
        place="top"
        style={{ fontSize: "11px" }}
        content="Change this image"
      />
      {imageError && (
        <ErrorPopUp
          header={"Invalid Type"}
          message={"Invalid file type! Please select a valid image file"}
          action={() => setImageError(false)}
        />
      )}
      {updateSuccess && (
        <SuccessPopUp action={() => setUpdateSuccess(false)} message={"Update product success"} />
      )}
      {error && <ErrorPopUp message={errorMessage} action={() => setError(false)} />}
    </>
  );
}
