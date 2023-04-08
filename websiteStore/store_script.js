if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-r')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeItem)
    }

    var quantityInputs = document.getElementsByClassName('item-quantity')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('btn-add')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var shopName = shopItem.getElementsByClassName('shop-name')[0].innerText
    var shopPrice = shopItem.getElementsByClassName('shop-price')[0].innerText
    var shopImg = shopItem.getElementsByClassName('shop-img')[0].src
    addItemToCart(shopName, shopPrice, shopImg)
    updateTotal()
}

function addItemToCart(shopName, shopPrice, shopImg) {
    var cartItem = document.createElement('div')
    cartItem.classList.add('item')
    var cartContainer = document.getElementsByClassName('cart-container')[0]
    var cartContents = `
        <div class="item">
            <img class="item-img" src="${shopImg}" alt="Shirt">
            <span class="item-name">${shopName}</span>
            <span class="item-price">${shopPrice}</span>
            <label>Quantity:</label>
            <input class="item-quantity" type="number" value="1" min="1">
            <button class="btn-r" type="button">Remove Item</button>
        </div>`
    cartItem.innerHTML = cartContents
    cartContainer.append(cartItem)
}

function removeItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.remove()
    updateTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateTotal()
}

function updateTotal() {
    var cartItemContainer = document.getElementsByClassName('item-container')[0]
    var cartItems = cartItemContainer.getElementsByClassName('item')
    var total = 0
    for (var i = 0; i < cartItems.length; i++) {
        var cartItem = cartItems[i]
        var priceElement = cartItem.getElementsByClassName('item-price')[0]
        var quantityElement = cartItem.getElementsByClassName('item-quantity')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('total-price')[0].innerText = '$' + total
}
