function roundToHalf(value) {
  var converted = parseFloat(value);
  var decimal = (converted - parseInt(converted, 10));
  decimal = Math.round(decimal * 10);
  if (decimal == 5) { return (parseInt(converted, 10)+0.5); }
  if ( (decimal < 3) || (decimal > 7) ) {
      return Math.round(converted);
  } else {
      return (parseInt(converted, 10)+0.5);
  }
}

function createPage(data) {
  // data.forEach((item, i) => {
  //   console.log(item);
  // });

  let img = $("#picture");
  let title = $("#title");
  let price = $("#price");
  let desc = $("#description");

  img.attr("src", data[0]["image"]);
  title.text(data[0]["title"]);
  price.text("$" + data[0]["price"]);
  desc.text(data[0]["description"]);
  
  let reviewsDiv = $("#reviews");

  let dec = roundToHalf(data[0]["rating"]["rate"]);

  for (let i=0; i<5; i++) {
      let star = $("<span>");
      if (dec >= 1.0) {
          star.attr('class','fa fa-star checked');
      }
      else if (dec <= 1.0 && dec >= 0.5) {
          star.attr('class','fa fa-star-half-o checked');
      }   else {
          star.attr('class','fa fa-star-o unchecked');
      }
      reviewsDiv.append(star);
      dec = dec - 1.0;
  }

  let reviewText = $("<span>");
  reviewText.text(" " + data[0]["rating"]["rate"] + " " + data[0]["rating"]["count"] + " reviews")

  reviewsDiv.append(reviewText);

}




$(document).ready(function() {
  console.log("start");

  // get id of item being viewed from the url
  itemID = document.location.href.split("=")[1];
  console.log(itemID);

  createPage(getProductsByID(itemID));

});
