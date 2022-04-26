function createPage(data) {
  data.forEach((item, i) => {
    console.log(item);
  });

  let img = $("#picture");
  let title = $("#title");
  let price = $("#price");
  let desc = $("#description");
  let rating = $("#rating");
  let reviews = $("#numReviews");


  img.attr("src", data[0]["image"]);
  title.text(data[0]["title"]);
  price.text(data[0]["price"]);
  desc.text(data[0]["description"]);
  rating.text(data[0]["rating"]["rate"]);
  reviews.text(data[0]["rating"]["count"]);

}




$(document).ready(function() {
  console.log("start");

  // get id of item being viewed from the url
  itemID = document.location.href.split("=")[1];
  console.log(itemID);

  createPage(getProductsByID(itemID));

});
