import { GetAdminProductRequest } from "./api/productAdminApi";
import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ProductPagination from "./components/pagination/ProductPagination";
import { useNavigate } from "react-router-dom";
import WaitingIcon from "@/shared/components/AnimationIcon/WaitingIcon";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineExpandMore } from "react-icons/md";
import { MdOutlineExpandLess } from "react-icons/md";
import NumberInput from "@/shared/components/Input/NumberInput";
import React from "react";
import TextInput from "@/shared/components/Input/TextInput";
import { IoFilterOutline } from "react-icons/io5";
import SelectInput from "@/shared/components/Input/SelectInput";
import { readCategoriesData } from "@/shared/utils/readCategoriesData";
import SelectMultiple from "./components/inputs/SelectMultiple";
import { ReadCategoryRequest } from "@/shared/api/categoryApi";
import ErrorPopUp from "@/shared/components/PopUp/ErrorPopUp";
import { UpdateVariantRequest } from "./api/productAdminApi";
import SuccessPopUp from "@/shared/components/PopUp/SuccessPopUp";
import { AdminRequest } from "@/shared/api/adminApi";
import ReviewPopUp from "./components/popup/ReviewPopUp";

const Container = styled.div`
  margin: auto;
  width: 75rem;
  font-size: 14px;
  padding: 3rem 0;

  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  > h4 {
    font-size: 1.4rem;
    font-weight: 400;
  }

  > button {
    cursor: pointer;
    background-color: #2962ff;
    display: flex;
    align-items: center;
    gap: 5px;
    color: white;
    border: none;
    font-size: 15px;
    padding: 10px;
    border-radius: 5px;
  }

  > button:hover {
    background-color: #0052cc;
  }
`;

const Content = styled.div`
  background-color: white;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  min-height: 50rem;
`;

const Footer = styled.div`
  padding: 2rem 2rem;
`;

const TableContent = styled.table`
  border-collapse: collapse;
  width: 100%;

  font-size: 0.9em;

  overflow: hidden;

  thead tr {
    background-color: #0091ea;
    color: #ffffff;
    text-align: left;
    font-weight: bold;
  }

  th,
  td {
    padding: 12px 15px;
  }

  tbody tr {
    border-bottom: 1px solid #dddddd;
  }

  tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
  }

  tbody tr:last-of-type {
    border-bottom: 2px solid #009879;
  }

  tbody tr.active-row {
    font-weight: bold;
    color: #009879;
  }

  & td > button {
    background-color: inherit;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: none;
    cursor: pointer;
  }
`;

const DisplayName = styled.td`
  display: flex;
  align-items: center;
  gap: 1rem;

  > div:nth-of-type(2) {
    display: flex;
    flex-direction: column;
  }

  > div:nth-of-type(1) {
    width: 3rem;
    height: 3rem;
    flex-shrink: 0;
  }

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Variants = styled.div``;

const VariantDetail = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  column-gap: 5px;
  margin: 10px 0;
  align-items: center;

  & button {
    text-align: right;
  }
`;

const SaveButton = styled.div`
  background-color: #2962ff;
  color: white;
  padding: 10px 1rem;
  width: fit-content;
  border-radius: 5px;
  cursor: pointer;
`;

const FilterBar = styled.div`
  padding: 1rem 0.9rem;
  display: grid;
  grid-template-columns: 1fr 7fr 1fr;

  gap: 0.6rem;
  margin-bottom: 1rem;
`;

const FilterCotainer = styled.div`
  position: relative;

  > button {
    font-size: 16px;
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    cursor: pointer;
    padding: 6px 2rem;
    display: flex;
    align-items: center;
    gap: 6px;
    > svg {
      font-size: 1.6rem;
    }
  }
`;

const FilterDropDown = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transform: translateY(10px);
  background-color: white;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  padding: 1rem;
  width: 20rem;
  z-index: 1;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #911a8b;

  &:hover {
    color: red;
  }
`;

const ShowReviewButton = styled.button`
  &:hover {
    color: red;
  }
`;

const pageOptions = [
  { value: 20, label: "20 items" },
  { value: 50, label: "50 items" },
  { value: 100, label: "100 items" },
];

const filterOption = [
  { value: "none", label: "None" },
  { value: "bestseller", label: "Best Seller" },
  { value: "bestrating", label: "Best Rating" },
  { value: "numbercomment", label: "Number of Comment" },
];

const moneyRegex = /^(?=.*\d)\d*(?:\.\d*)?$/;

export default function AdminProductList() {
  const adminRequest = AdminRequest();
  const navigate = useNavigate();

  if (adminRequest.data.data.roleTypeId == 5) {
    navigate("/admin");
    return;
  }

  const [showReview, setShowReview] = useState();
  const [successUpdate, setSuccessUpdate] = useState(false);
  const updateVariantRequest = UpdateVariantRequest();
  const [zeroPriceError, setZeroPriceError] = useState(false);
  const dropDownRef = useRef();
  const buttonRef = useRef();
  const readCategoryRequest = ReadCategoryRequest();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(searchParams.get("currentpage") || 1);
  const [pageSize, setPageSize] = useState(
    searchParams.get("pagesize")
      ? pageOptions.find((item) => item.value == searchParams.get("pagesize"))
      : null
  );
  const [wrongVariantPrice, setWrongVariantPrice] = useState(false);

  const [showMore, setShowMore] = useState([]);
  const [inputs, setInputs] = useState({});
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [displaySearch, setDisplaySearch] = useState(searchParams.get("search") || "");
  const [onShowDropDown, setOnShowDropDown] = useState(false);
  const [categorySelect, setCategorySelect] = useState([]);
  const [filterSelect, setFilterSelect] = useState(filterOption[0]);

  const getAdminProductRequest = GetAdminProductRequest(
    currentPage,
    pageSize?.value,
    categorySelect?.map((item) => item.value),
    search,
    filterSelect.value
  );

  const onChangePage = (page) => {
    setSearchParams({ currentpage: page, pagesize: pageSize.value, search: search });
    setCurrentPage(page);
  };

  const transformCategoriesData = () => {
    const data = readCategoriesData(readCategoryRequest);

    const option = [];

    for (let item of data) {
      option.push({ value: item.id, label: item.name });
    }

    return option;
  };

  const onMakeChanges = (product) => {
    const variants = product.variants;

    if (variants.find((item) => !item.price || item.price == 0)) {
      setZeroPriceError(true);
      return;
    }

    if (
      variants.find(
        (item) => Number(item.salePrice) != 0 && Number(item.price) > Number(item.salePrice)
      )
    ) {
      setWrongVariantPrice(true);
      return;
    }

    updateVariantRequest.mutate(
      variants.map((item) => {
        if (!item.availableQuanity) {
          item.availableQuanity = 0;
        }

        if (!item.salePrice) {
          item.salePrice = 0;
        }
        return item;
      }),
      {
        onSuccess: (response) => {
          if (response.status == 200) {
            getAdminProductRequest.refetch();
            setSuccessUpdate(true);
          }
          console.log(response);
        },
      }
    );
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearch(displaySearch);
      setSearchParams({
        currentpage: currentPage,
        pagesize: pageSize,
        search: displaySearch,
      });
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [displaySearch]);

  useEffect(() => {
    const event = (ev) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(ev.target) &&
        !buttonRef.current.contains(ev.target)
      ) {
        setOnShowDropDown(false);
      }
    };

    document.addEventListener("mousedown", event);

    return () => {
      document.removeEventListener("mousedown", event);
    };
  }, []);

  return (
    <Container>
      <Header>
        <h4>Products</h4>
        <button onClick={() => navigate("/admin/product-new")}>
          <IoMdAddCircleOutline />
          Add Product
        </button>
      </Header>
      <Content>
        <div>
          <FilterBar>
            <FilterCotainer>
              <button ref={buttonRef} onClick={() => setOnShowDropDown((prev) => !prev)}>
                <IoFilterOutline />
                Filter
              </button>
              {onShowDropDown && (
                <FilterDropDown ref={dropDownRef}>
                  <h4>Filter by categories:</h4>
                  <SelectMultiple
                    state={categorySelect}
                    setState={setCategorySelect}
                    options={transformCategoriesData()}
                  />
                  <h4>Order by </h4>
                  <SelectInput
                    state={filterSelect}
                    setState={setFilterSelect}
                    options={filterOption}
                  />
                </FilterDropDown>
              )}
            </FilterCotainer>
            <TextInput
              state={displaySearch}
              setState={(value) => {
                setDisplaySearch(value);
              }}
              placeholder={"Search"}
            />
            <SelectInput
              state={pageSize}
              options={pageOptions}
              setState={(value) => {
                setSearchParams({
                  currentpage: currentPage,
                  pagesize: value.value,
                  search: search,
                });
                setPageSize(value);
              }}
            />
          </FilterBar>
          <TableContent>
            <thead>
              <tr>
                <th style={{ width: "50%" }}>NAME</th>
                <th>AVAILABLE</th>
                <th>ON STOCK</th>
                <th>ACTIVE</th>
                <th>TYPE</th>
                <th>REVIEW</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {getAdminProductRequest.isSuccess ? (
                getAdminProductRequest.data.data.map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      <tr>
                        <DisplayName>
                          <div>
                            <img
                              src={
                                import.meta.env.VITE_API_IMAGE_PATH +
                                item.productImages[0].imageName
                              }
                            />
                          </div>
                          <div>
                            <StyledLink to={`/admin/product?id=${item.id}`}>{item.name}</StyledLink>{" "}
                            <span>{item.variants.length} variants</span>
                          </div>
                        </DisplayName>
                        <td>
                          {item.variants.reduce((accumulator, currentValue) => {
                            return accumulator + currentValue.availableQuanity;
                          }, 0)}
                        </td>
                        <td>
                          {item.variants.reduce((accumulator, currentValue) => {
                            return accumulator + currentValue.quanity;
                          }, 0)}
                        </td>
                        <td>{item.isActive == true ? "ACTIVE" : "UNACTIVE"}</td>
                        <td>{item.category.name}</td>
                        <td>
                          <ShowReviewButton onClick={() => setShowReview(item.id)}>
                            Show({item.reviews.length})
                          </ShowReviewButton>
                        </td>
                        <td>
                          {!showMore.includes(index) && (
                            <button
                              onClick={() => {
                                setShowMore((prev) => {
                                  if (prev.includes(index)) {
                                    return prev.filter((item) => item != index);
                                  }
                                  return [...prev, index];
                                });

                                setInputs((prev) => {
                                  return { ...prev, [index]: JSON.parse(JSON.stringify(item)) };
                                });
                              }}
                            >
                              More
                              <MdOutlineExpandMore />
                            </button>
                          )}

                          {showMore.includes(index) && (
                            <button
                              onClick={() => {
                                setShowMore((prev) => {
                                  if (prev.includes(index)) {
                                    return prev.filter((item) => item != index);
                                  }
                                  return [...prev, index];
                                });

                                setInputs((prev) => {
                                  return { ...prev, [index]: null };
                                });
                              }}
                            >
                              Hide
                              <MdOutlineExpandLess />
                            </button>
                          )}
                        </td>
                      </tr>
                      {showMore.includes(index) && (
                        <tr>
                          <td colSpan={"100%"}>
                            <Variants>
                              <VariantDetail>
                                <h4></h4>
                                <h4>Sale Price</h4>
                                <h4>Compare Price</h4>
                                <h4>Available Quantity</h4>
                              </VariantDetail>
                              {inputs[index].variants.map((item, index) => {
                                const name = [];
                                item.variantAttributes.forEach((item, i) =>
                                  name.push(item.attributeValue)
                                );
                                return (
                                  <VariantDetail key={index}>
                                    <h4>{name.join("/")}</h4>
                                    <div>
                                      <TextInput
                                        state={item.price}
                                        setState={(value) => {
                                          if (moneyRegex.test(value) || value == "") {
                                            item.price = value;
                                            setInputs({ ...inputs });
                                          }
                                        }}
                                      />
                                    </div>

                                    <div>
                                      <TextInput
                                        state={item.salePrice}
                                        setState={(value) => {
                                          if (moneyRegex.test(value) || value == "") {
                                            item.salePrice = value;
                                            setInputs({ ...inputs });
                                          }
                                        }}
                                      />
                                    </div>
                                    <div>
                                      <NumberInput
                                        state={item.availableQuanity}
                                        setState={(value) => {
                                          item.availableQuanity = value;
                                          setInputs({ ...inputs });
                                        }}
                                      />
                                    </div>
                                  </VariantDetail>
                                );
                              })}
                              <VariantDetail>
                                <span></span>
                                <span></span>
                                <span></span>
                                <SaveButton onClick={() => onMakeChanges(inputs[index])}>
                                  SAVE
                                </SaveButton>
                              </VariantDetail>
                            </Variants>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
              ) : (
                <tr>
                  <td>
                    <WaitingIcon />
                  </td>
                </tr>
              )}
            </tbody>
          </TableContent>
        </div>
        <Footer>
          {getAdminProductRequest.isSuccess && (
            <ProductPagination
              currentPage={currentPage}
              setCurrentPage={onChangePage}
              totalPage={getAdminProductRequest.data.totalPages}
            />
          )}
        </Footer>
      </Content>
      {zeroPriceError && (
        <ErrorPopUp message={"Price cannot be zero"} action={() => setZeroPriceError(false)} />
      )}
      {successUpdate && <SuccessPopUp action={() => setSuccessUpdate(false)} message={"success"} />}
      {wrongVariantPrice && (
        <ErrorPopUp
          message={"price cant be larger than compare price"}
          action={() => setWrongVariantPrice(false)}
        />
      )}
      {showReview && <ReviewPopUp productId={showReview} action={() => setShowReview(null)} />}
    </Container>
  );
}
