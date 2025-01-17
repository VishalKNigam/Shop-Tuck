let tbody = document.getElementById("tablebody");
let imageURL = "../Images/bell-icon.png";
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
let totalPrice = 0;
let baseURL = `https://famous-hare-woolens.cyclic.app/product`;

// async function fetchAndRender() {
//     let res = await fetch(baseURL, {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json"
//         }
//     });
//     res = await res.json();
// }


// fetchAndRender();

const getTable = (pro) => {
    pro.forEach(element => {
        tbody.append(getRows(element));
    });
}

getTable(cartItems);

const getRows = (item) => {
    let pr = document.createElement("tr");

    let productinfo = document.createElement("div");
    let product = document.createElement("td");
    let image = document.createElement("img");
    image.src = item.filename;
    image.style.width = "10%";
    product.textContent = item.description;
    productinfo.style.width = "100%";
    productinfo.style.display = "flex";
    productinfo.style.alignItems = "center";
    productinfo.append(image, product);

    let quantity = document.createElement("td");
    const quantityContainer = document.createElement("div");
    quantityContainer.classList.add("quantity-container");

    const decreaseQuantityButton = document.createElement("button");
    decreaseQuantityButton.classList.add("quantity-button", "decrease-button");
    decreaseQuantityButton.textContent = "-";
    decreaseQuantityButton.addEventListener("click", () => {
      if (item.quantity > 1) {
        item.quantity--;
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        displayCartItems(cartItems);
        totalPrices(item)
      }
    });

    const quantityElement = document.createElement("span");
    quantityElement.classList.add("quantity");
    quantityElement.textContent = item.quantity;
    quantityContainer.appendChild(quantityElement);

    const increaseQuantityButton = document.createElement("button");
    increaseQuantityButton.classList.add("quantity-button", "increase-button");
    increaseQuantityButton.textContent = "+";
    increaseQuantityButton.addEventListener("click", () => {
      item.quantity++;
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      displayCartItems(cartItems);
      totalPrices(item)
    });
    quantityContainer.appendChild(increaseQuantityButton, quantityElement, decreaseQuantityButton);
    quantity.appendChild(quantityContainer);

    let price = document.createElement("td");
    price.textContent = item.price;

    pr.append(productinfo, quantity, price);

    return pr;
}


// ---------------------------------------------------------------------------------------------------------------
