function roundToHalf(value) {
    var converted = parseFloat(value); // Make sure we have a number
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



  result =   productAPICall("category", query,rating)
  
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
  
$(document).ready(function() {
 
 $("#sub").click(function(event){

 
  $(".brand-product-list").remove();


var txt = $('#category').find(":selected").text();
var element = document.getElementById('price');
var price_estimate = element.options[element.selectedIndex].value;
var rate_element = document.getElementById('rating');
var review = rate_element.options[rate_element.selectedIndex].value;

//let price_estimate = String(price);

var price_fix = 0;
if(price_estimate=='hundred')
{
 price_fix = 100;
}
else if(price_estimate =='two_hundreds'){
   price_fix = 200;

}
else{
   price_fix = 200.1
}


    let brand_product_list , ul, li, card;
var val= String(txt);

let products = []

  
var stri = `${val}`;
    products = getProductsByCategory(stri,price_fix,review);

  
        
    brand_product_list = document.createElement('div');
    brand_product_list.setAttribute('class','brand-product-list');
    
    ul = document.createElement('ul');

    // console.log(json);
    // console.log(json[0]);
    // console.log(json.length);
    // console.log(json[0].rating[0]);
    // console.log(json[0].rating.rate);
    // console.log(roundToHalf(json[17].rating.rate));
    // console.log(json[16].id);
    // console.log(roundToHalf(json[16].rating.rate));

    for (let i=0; i<products.length; i++) {
        li = document.createElement('li');
        li.setAttribute('id','' + products[i].id);
        
        card = document.createElement('div');
        card.setAttribute('class','card');

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
        card.appendChild(imgDiv);

        var h6 = document.createElement('h6');
        h6.textContent = products[i].title;
        card.appendChild(h6);

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
        card.appendChild(rates);

        let br = document.createElement('br');
        card.appendChild(br);
      

        var product_list_price = document.createElement('div');
        product_list_price.setAttribute('class','product-list-price');
        
        var former_price = document.createElement('span');
        former_price.setAttribute('class','former-price');
        var f_price = products[i].price + 5.0;
        f_price = f_price.toFixed(2);
        former_price.textContent = "$" + f_price;
        product_list_price.appendChild(former_price);

        card.appendChild(product_list_price);

        var current_price = document.createElement('span');
        current_price.setAttribute('class','current-price');
        var c_price = products[i].price;
        c_price = c_price.toFixed(2);
        current_price.textContent = "$" + c_price;
        product_list_price.appendChild(current_price);
    

        card.appendChild(product_list_price);
        
        card.appendChild(br);
      

        var btn_area = document.createElement('div');
        btn_area.setAttribute('class','button1');
        
        var btn = document.createElement('button');
      btn.setAttribute('id','btn1')
        btn.innerHTML ="Add to cart"
  //    document.getElementById("btn1").style.background='#000000';

        card.appendChild(btn);



        li.appendChild(card)
        ul.appendChild(li);


    }

    brand_product_list.appendChild(ul);

    document.body.appendChild(brand_product_list);



     });

});
