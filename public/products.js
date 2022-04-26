function getAllProducts() {
  return productAPICall("all", "");
}

function getProductsByID(query) {
  // console.log("by id");
  let productList = [];
  productList.push(productAPICall("id", query));

  // console.log(productList);
  return productList;
}

function getProductsByTitle(query) {
  // console.log("by title");
  let productList = [];
  productAPICall("all", query).forEach((item, i) => {
    if (item["title"].includes(query)) {
      productList.push(item);
    }
  });
  // console.log(productList);
  return productList;
}

function getProductsByCategory(query) {
  // console.log("by category");
  let productList = productAPICall("category", query);

  // console.log(productList);
  return productList;
}

function getProductsByPrice(query) {
  // console.log("by price");
  let productList = [];
  productAPICall("all", query).forEach((item, i) => {
    if (item["price"] >= query[0] && item["price"] <= query[1]) {
      productList.push(item);
    }
  });
  // console.log(productList);
  return productList;
}

function getProductsByRating(query) {
  // console.log("by rating");

  let productList = [];
  // sort by query
  // query is {0,1,2,3,4,5} stars
  productAPICall("all", query).forEach((item, i) => {
    if (Math.floor(item["rating"]['rate']) == query) {
      productList.push(item);
    }
  });
  // console.log(productList);
  return productList;
}

function productAPICall(type, query) {
  // console.log("product api call");

  let url = "?type=" + type + "&query=" + query;
  let productsList;
  $.ajax({
    type: "GET",
    url: "/products" + url,
    async: false,
    success: function(data) {
      productsList = data;
    },
    failure: function(data) {console.log("failure");}
  });
  return productsList;
}
