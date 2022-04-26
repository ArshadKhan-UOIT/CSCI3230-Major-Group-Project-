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

$(document).ready(function() {
    let brand_product_list, ul, li, card;

    let products = [];
    products = getAllProducts();
    console.log(products);
    console.log(products[0]);
    console.log(products[0].id);


    // fetch('https://fakestoreapi.com/products')
    // .then(res => res.json())
    // .then(json => {

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

        /*
        <button name="button" type="submit" class="pure-button add-to-cart-btn" data-disable-with="Waiting" onclick="send_add_cart_to_ga_event([{&quot;id&quot;:369207,&quot;name&quot;:&quot;Adjustable Mesh Luxurious Office Chair with Footrest - Black - Moustache®&quot;,&quot;category&quot;:&quot;Ergonomic Chairs&quot;,&quot;brand&quot;:&quot;Moustache®&quot;,&quot;variant&quot;:&quot;MOFC-HLC-1168F-1&quot;,&quot;price&quot;:&quot;189.99&quot;,&quot;quantity&quot;:1}])">Add To Cart</button>
        */
        let btn = document.createElement("button");
        btn.setAttribute('id', '' + products[i].id);
        btn.setAttribute('class', 'add-to-cart-button');
        btn.innerHTML = "Add To Cart";
        btn.type = "submit";
        btn.name = "formBtn";

        card.appendChild(a);

        card.appendChild(btn);

        li.appendChild(card)
        ul.appendChild(li);


    }

    brand_product_list.appendChild(ul);

    document.body.appendChild(brand_product_list);

    $(".add-to-cart-button").click(function(event) {
        console.log("Add cart button clicked!");
        let productID = event.target.id;
        console.log(productID);

    });

    // $(".product-list-item").hover(function(event) {
    //     console.log("Mouse Hovering");
    //     let productID = event.target.id
    //     console.log(productID);
    //     $(this).css({
    //         'color':'blue',
    //         'background-color':'blue',

    //     });
    //     let elementID = '#' + productID;
    //     $("h6 #" + productID).addClass("product-text-hov");
    //     $('' + '#' + productID).removeClass("product-text");
    //     // $(".product-text").css({
    //     //     'overflow':'None',
    //     //     'white-space': 'Normal',
    //     //     'display': 'block',
    //     //     'text-overflow': 'None',
    //     //     'width': '100%',
    //     // });
    // });

    // });


});
