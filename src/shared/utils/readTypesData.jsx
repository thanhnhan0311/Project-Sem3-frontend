export const readTypesData = (query) => {
  let data;
  if (query.isLoading && localStorage.getItem("types") != null) {
    data = JSON.parse(localStorage.getItem("types"));
  }

  if (query.isLoading && localStorage.getItem("types") == null) {
    data = [];
  }

  if (query.isSuccess) {
    data = query.data.data;
  }
  query;

  return data;
};
