import React from "react";
import { html, Page, eagerImport } from "webpack-mfe-shared";

// ----------------------------------------------------------------------------
// Shared components
// ----------------------------------------------------------------------------
const CheckoutButton = React.lazy(eagerImport(
  // eslint-disable-next-line import/no-unresolved
  () => import("app_checkout/components/checkout-button")
));

// ----------------------------------------------------------------------------
// Components
// ----------------------------------------------------------------------------
// Static placeholder data.
const CART_ITEMS = [
  { emoji: "🐶", id: "dog", name: "dog", quantity: 1, price: 1 },
  { emoji: "🎉", id: "tada", name: "tada", quantity: 1, price: 2 },
  { emoji: "🦖", id: "T-Rex", name: "T-Rex", quantity: 2, price: 3 }
];
const total = CART_ITEMS.reduce((tot, { quantity, price }) => tot + quantity * price, 0);

const CartPage = () => html `
  <${Page} name="Cart">
    <div className="pure-u-1-3"></div>
    <div className="pure-u-1-3">
      <table className="pure-table">
      <thead>
        <tr>
          <th>Item</th>
          <th>Name</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        ${CART_ITEMS.map((data) => html `
          <tr key="cart-item-${data.id}">
            <td>${data.emoji}</td>
            <td>${data.name}</td>
            <td>${data.quantity} x</td>
            <td>$${data.price}.00</td>
          </tr>
        `)}
        <tr key="cart-summary" style=${{ borderTop: "1px solid #cbcbcb" }}>
          <td colSpan="3">Total</td>
          <td>$${total}.00</td>
        </tr>
        <tr key="cart-checkout" style=${{ borderTop: "1px solid #cbcbcb" }}>
          <td colSpan="4" style=${{ textAlign: "center" }}>
            <${React.Suspense} fallback=${null}>
              <${CheckoutButton} />
            </${React.Suspense}>
          </td>
        </tr>
      </tbody>
      </table>

    </div>
    <div className="pure-u-1-3"></div>
  </${Page}>
`;

export default CartPage;
