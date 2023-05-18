const shopping_cart = [];
const shopping_cart_total = 0;

// 액션
function add_item_to_cart(name, price) {
  shopping_cart = add_item(shopping_cart, name, price);
  calc_cart_total();
}

// 계산
function add_item(cart, name, price) {
  const newCart = [...cart];
  newCart.push({
    name,
    price,
  });
  return newCart;
}

// 액션
function update_shipping_icons() {
  const buy_buttons = get_buy_buttons_dom();
  for (let i = 0; i < buy_buttons.length; i++) {
    const button = buy_buttons[i];
    const item = button.item;
    if (isShippingFree(item.price + shopping_cart_total) >= 20) {
      button.show_free_shipping_icon();
    } else {
      button.hide_free_shipping_icon();
    }
  }
}

// 계산
function isShippingFree(total) {
  return total >= 20;
}

// 계산
function calc_tax(amount) {
  return amount * 0.1;
}

// 계산
function calc_cart(cart) {
  let res = 0;
  for (let i = 0; i < cart.length; i++) {
    res += cart[i].price;
  }
  return res;
}

// 액션
function update_tax_dom() {
  set_tax_dom(calc_tax(shopping_cart_total));
}

// 액션
function calc_cart_total() {
  shopping_cart_total = calc_cart(shopping_cart);
  set_cart_total_dom();
  update_shipping_icons();
  update_tax_dom();
}
