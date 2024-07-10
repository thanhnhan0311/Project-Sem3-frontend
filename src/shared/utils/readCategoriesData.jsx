export const readCategoriesData = (query) => {
  let data;
  if (query.isLoading && localStorage.getItem("categories") != null) {
    data = JSON.parse(localStorage.getItem("categories"));
  }

  if (query.isLoading && localStorage.getItem("categories") == null) {
    data = [];
  }

  if (query.isSuccess) {
    data = query.data.data;
  }
  query;

  return data;
};
