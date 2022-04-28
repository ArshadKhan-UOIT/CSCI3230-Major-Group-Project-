function roundToHalf(value) {
  let converted = parseFloat(value);
  let decimal = (converted - parseInt(converted, 10));
  decimal = Math.round(decimal * 10);
  if (decimal == 5) { return (parseInt(converted, 10)+0.5); }
  if ( (decimal < 3) || (decimal > 7) ) {
      return Math.round(converted);
  } else {
      return (parseInt(converted, 10)+0.5);
  }
}

function createPage(data) {
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
          star.attr("class","fa fa-star checked");
      }
      else if (dec <= 1.0 && dec >= 0.5) {
          star.attr("class","fa fa-star-half-o checked");
      }   else {
          star.attr("class","fa fa-star-o unchecked");
      }
      reviewsDiv.append(star);
      dec = dec - 1.0;
  }

  let reviewText = $("<span>");
  reviewText.text(" " + data[0]["rating"]["rate"] + " " + data[0]["rating"]["count"] + " reviews")

  reviewsDiv.append(reviewText);

  let category = data[0]["category"];

  let similarProducts = getProductsByCategory(category);
  createSimilarProducts(similarProducts);
}

function createSimilarProducts(products) {

  let ul = $("#list");
  ul.attr("class","brand-product-ul");

  for (let i=0; i<4; i++) {
    let li = $("<li>");
    li.attr("id","" + products[i]["id"]);
    li.attr("class","product-list-item");

    card = $("<div>");
    card.attr("class","card");
    card.attr("id","" + products[i]["id"]);

    let a = $("<a>");
    a.title = "" + products[i]["title"];
    a.href = "" + "item?id=" + products[i]["id"];
    a.attr("id","" + products[i]["id"]);
    a.attr("class","product-link");

    let imgDiv = $("<div>");
    imgDiv.attr("class","imgDiv");
    let img = $("<img>");
    img.attr("src", products[i]["image"]);
    img.attr("class","imgSrc");

    imgDiv.append(img);
    a.append(imgDiv);

    let h6 = $("<h6>");
    h6.text(products[i]["title"]);
    h6.attr("class","product-text");
    h6.attr("id","" + products[i]["id"]);
    a.append(h6);

    let rates = $("<div>");
    rates.attr("class","rates");
    let dec = roundToHalf(products[i]["rating"]["rate"]);
    for (let j=0; j<5; j++) {
        let star = $("<span>");
        if (dec >= 1.0) {
            star.attr("class","fa fa-star checked");
        }
        else if (dec <= 1.0 && dec >= 0.5) {
            star.attr("class","fa fa-star-half-o checked");
        }   else {
            star.attr("class","fa fa-star-o unchecked");
        }
        rates.append(star);
        dec = dec - 1.0;
    }
    let reviews = $("<span>");
    reviews.text(" " + products[i]["rating"]["rate"] + " " + products[i].rating.count + " Reviews");
    rates.append(reviews);
    a.append(rates);

    let br = $("<br>");
    a.append(br);

    let product_list_price = $("<div>");
    product_list_price.attr("class","product-list-price");

    br = $("<br>");
    product_list_price.append(br);

    let former_price = $("<span>");
    former_price.attr("class","former-price");
    let f_price = (products[i]["price"] * 1.2);
    f_price = f_price.toFixed(2);
    former_price.text("$" + f_price);
    product_list_price.append(former_price);

    a.append(product_list_price);

    let current_price = $("<span>");
    current_price.attr("class","current-price");
    let c_price = products[i]["price"];
    c_price = c_price.toFixed(2);
    current_price.text("$" + c_price);
    product_list_price.append(current_price);

    a.append(product_list_price);

    let btn_a = $("<a>");
    btn_a.title = "" + products[i]["title"];
    // btn_a.href = "" + "cart?id=" + products[i]["id"];
    btn_a.attr("id","" + products[i]["id"]);
    btn_a.attr("class","add-to-cart-button btn btn-primary");
    btn_a.text("Add To Cart");

    card.append(a);

    card.append(btn_a);

    li.append(card)
    ul.append(li);
  }

}

$(document).ready(function() {
  console.log("start");

  // get id of item being viewed from the url
  let itemID = document.location.href.split("=")[1];
  // console.log(itemID);

  createPage(getProductsByID(itemID));

  var modal = document.getElementById("myModal");

  let cartItemsList = [];
  $(".add-to-cart-button").click(function(event) {
    console.log("Add cart button clicked!");
    let productID = event.target.id;
    console.log(productID);
    cartItemsList.push(productID);
    modal.style.display = "block";
    let modal_cart_message = document.getElementById("modal-cart-message");
    modal_cart_message.textContent = "Cart Items: " + cartItemsList.length + " Item(s)";
  });

  $(".close").click(function() {
    modal.style.display = "none";
  });

  $(document).click(function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });

});
