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



function getProductsByPrice(query) {
  console.log("by price");
  let productList = [];
  productAPICall("electronics", query).forEach((item, i) => {
    if (item["price"] >= query[0] && item["price"] <= query[1]) {
      productList.push(item);
    }
  });
  console.log(productList);
  return productList;
}

function getProductsByCategory(query,price_fix,rating) {
  //  console.log("by category");
   // let productList = productAPICall("category", query);

  var productList = [];



  result = productAPICall("category", query,rating)
  
  result.forEach((item) => {
    if (item["price"] <=Number(price_fix)&&item["rate"]==Number(rating)) {
      productList.push(item)
    }
    
  });

  return productList;
}

/*
  function getProductsByRating(query) {
    console.log("by rating");
  
    let productList = [];
    // sort by query
    // query is {0,1,2,3,4,5} stars
    productAPICall("category", query).forEach((item, i) => {
      if (Math.floor(item["rating"]['rate']) == query) {
        productList.push(item);
      }
    });
    console.log(productList);
    return productList;
  }
  */

function getProductItems(product_filter) {
  let brand_product_list, ul, li, card;

  let products = [];
  products = product_filter;
  
  console.log(products);
  console.log(products[0]);
  console.log(products[0].id);


  // fetch('https://fakestoreapi.com/products')
  // .then(res => res.json())
  // .then(json => {

  brand_product_list = document.createElement('div');
  brand_product_list.setAttribute('class','brand-product-list');

  ul = document.createElement('ul');
  ul.setAttribute('class','brand-product-ul');
  
  for (let i=0; i<products.length; i++) {
    li = document.createElement('li');
    li.setAttribute('id','' + products[i].id);
    li.setAttribute('class','product-list-item');

    card = document.createElement('div');
    card.setAttribute('class','card');
    card.setAttribute('id','' + products[i].id);

    var a = document.createElement('a');
    a.title = '' + products[i].title;
    a.href = '' + "item?id=" + products[i].id;
    a.setAttribute('id','' + products[i].id);
    a.setAttribute('class','product-link');

    let imgDiv = document.createElement('div');
    imgDiv.setAttribute('class','imgDiv');
    var img = new Image();
    img.src = products[i].image;
    img.setAttribute('class','imgSrc');
    
    // let maxWidth = '260px', minWidth = '260px', maxHeight = '260px', minHeight = '260px';
    // Object.assign(img.style, {
    //     maxWidth,
    //     minWidth,
    //     maxHeight,
    //     minHeight,
    // });
    
    imgDiv.appendChild(img);
    a.appendChild(imgDiv);

    var h6 = document.createElement('h6');
    h6.textContent = products[i].title;
    h6.setAttribute('class','product-text');
    h6.setAttribute('id','' + products[i].id);
    a.appendChild(h6);

    var rates = document.createElement('div');
    rates.setAttribute('class','rates');
    let dec = roundToHalf(products[i].rating.rate);
    for (let j=0; j<5; j++) {
        let star = document.createElement('span');
        if (dec >= 1.0) {
            star.setAttribute('class','fa fa-star checked');
        }
        else if (dec <= 1.0 && dec >= 0.5) {
            star.setAttribute('class','fa fa-star-half-o checked');
        }   else {
            star.setAttribute('class','fa fa-star-o unchecked');
        }
        rates.appendChild(star);
        dec = dec - 1.0;
    }
    var reviews = document.createElement('span');
    reviews.textContent = " " + products[i].rating.rate + " " + products[i].rating.count + " Reviews";
    rates.appendChild(reviews);
    a.appendChild(rates);

    let br = document.createElement('br');
    a.appendChild(br);

    var product_list_price = document.createElement('div');
    product_list_price.setAttribute('class','product-list-price');

    br = document.createElement('br');
    product_list_price.appendChild(br);

    var former_price = document.createElement('span');
    former_price.setAttribute('class','former-price');
    var f_price = (products[i].price * 1.2);
    f_price = f_price.toFixed(2);
    former_price.textContent = "$" + f_price;
    product_list_price.appendChild(former_price);

    a.appendChild(product_list_price);

    var current_price = document.createElement('span');
    current_price.setAttribute('class','current-price');
    var c_price = products[i].price;
    c_price = c_price.toFixed(2);
    current_price.textContent = "$" + c_price;
    product_list_price.appendChild(current_price);

    a.appendChild(product_list_price);

    let btn_a = document.createElement('a');
    btn_a.title = '' + products[i].title;
    // btn_a.href = '' + "cart?id=" + products[i].id;
    btn_a.setAttribute('id','' + products[i].id);
    btn_a.setAttribute('class','add-to-cart-button btn btn-primary');
    btn_a.innerHTML = "Add To Cart";

    card.appendChild(a);

    card.appendChild(btn_a);

    li.appendChild(card)
    ul.appendChild(li);
  }

  brand_product_list.appendChild(ul);

  $("#all-product-items-div").append(brand_product_list);
  // document.body.appendChild(brand_product_list);

}
  
$(document).ready(function() {
  let products = [];
  products = getAllProducts();
  getProductItems(products);

  $("#sub").click(function(event) {

    $(".brand-product-list").remove();

    var txt = $('#category').find(":selected").text();
    var element = document.getElementById('price');
    var price_estimate = element.options[element.selectedIndex].value;
    var rate_element = document.getElementById('rating');
    var review = rate_element.options[rate_element.selectedIndex].value;

    //let price_estimate = String(price);

    var price_fix = 0;
    if (price_estimate == 'hundred')
    {
      price_fix = 100;
    } else if (price_estimate == 'two_hundreds'){
      price_fix = 200;

    } else {
      price_fix = 200.1
    }

    var val = String(txt);
    var stri = `${val}`;

    let products = []
    
    products = getProductsByCategory(stri,price_fix,review);
    getProductItems(products);
    
  });

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

  // $("#shopping-cart-content").append("<p>Hello World</p>");

});
