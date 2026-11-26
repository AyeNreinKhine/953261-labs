
// 953261 Lab 2 — Kad Café data functions
// Rules for this file:
//   • Use array methods (map, filter, find, reduce, some, ...). No for / while loops.
//   • Never change (mutate) the arrays or objects you are given — return new ones.
//   • Each function must RETURN its result. Run `npm test` after every task.

// Task 1 — map
// Return an array of item names, in menu order.
// menuNames(menu) → ["Thai Iced Tea", "Americano", ...]
export function menuNames(menu) {
  return menu.map((item) => item.name);
}

// Task 2 — filter
// Return only the items whose `available` is true.
export function availableItems(menu) {
  return menu.filter((item) => item.available === true);
}

// Task 3 — find
// Return the item with this id, or undefined if there is none.
// findItem(menu, "F01") → { id: "F01", name: "Khao Soi", ... }
export function findItem(menu, id) {
  return menu.find((item) => item.id === id);
}

// Task 4 — filter + map
// Return the NAMES of the available items in one category.
// availableIn(menu, "dessert") → ["Mango Sticky Rice", "Coconut Ice Cream"]
export function availableIn(menu, category) {
  return menu
    .filter((item) => item.available === true && item.category === category)
    .map((item) => item.name);
}

// Task 5 — template literal + destructuring
// Return one line of text for the menu board:
//   "Thai Iced Tea — 45 THB"
//   "Butterfly Pea Soda — 50 THB (sold out)"     ← when available is false
// Hint: start with  const { name, price, available } = item;
export function menuLine(item) {
  const { name, price, available } = item;

  return available
    ? `${name} — ${price} THB`
    : `${name} — ${price} THB (sold out)`;
}

// Task 6 — spread
// Return a NEW item with the price reduced by `percent`, rounded to a whole baht.
// The original item must not change.
// withDiscount({ ..., price: 45 }, 10) → { ..., price: 41 }   (45 × 0.9 = 40.5 → 41)
export function withDiscount(item, percent) {
  const discountedPrice = Math.round(item.price * (1 - percent / 100));

  return {
    ...item,
    price: discountedPrice,
  };
}

// Helper functions for Tasks 7, 8, and 9
function getOrderItems(order) {
  return order.items ?? order.lines ?? order.orderItems ?? [];
}

function getItemId(line) {
  return line.itemId
    ?? line.menuItemId
    ?? line.menuId
    ?? line.productId
    ?? line.item?.id
    ?? line.menuItem?.id
    ?? line.id;
}

function getQuantity(line) {
  return line.qty ?? line.quantity ?? 1;
}

// Task 7 — reduce + find
// Return the total price of one order in baht.
// Each line costs  (price of that menu item) × qty.
// orderTotal(orders[0], menu) → 160   (2 × 45 + 1 × 70)
export function orderTotal(order, menu) {
  return getOrderItems(order).reduce((total, line) => {
    const itemId = getItemId(line);

    const found = menu.find((item) => item.id === itemId);

    const price = found?.price
      ?? line.price
      ?? line.item?.price
      ?? line.menuItem?.price
      ?? 0;

    return total + price * getQuantity(line);
  }, 0);
}

// Task 8 — map + reduce   (this is quiz Q10 again!)
// Return the average order total, rounded to 2 decimal places.
// Return 0 when there are no orders.
export function averageOrder(orders, menu) {
  if (!orders || orders.length === 0) {
    return 0;
  }

  const totals = orders.map((order) => orderTotal(order, menu));

  const sum = totals.reduce((total, value) => total + value, 0);

  return Number((sum / orders.length).toFixed(2));
}

// ───────────── Stretch (optional) ─────────────

// Task 9 — return the NAME of the item with the highest total quantity sold.
export function bestSeller(orders, menu) {
  if (!orders || orders.length === 0 || !menu || menu.length === 0) {
    return undefined;
  }

  const qtyById = orders
    .flatMap((order) => getOrderItems(order))
    .reduce((acc, line) => {
      const itemId = getItemId(line);

      if (itemId === undefined) {
        return acc;
      }

      return {
        ...acc,
        [itemId]: (acc[itemId] ?? 0) + getQuantity(line),
      };
    }, {});

  const ids = Object.keys(qtyById);

  if (ids.length === 0) {
    return undefined;
  }

  const topId = ids.reduce((best, id) =>
    qtyById[id] > qtyById[best] ? id : best
  );

  const topItem = menu.find((item) => item.id === topId);

  return topItem ? topItem.name : undefined;
}

// Task 10 — group item names by category:
// { drink: ["Thai Iced Tea", ...], food: [...], dessert: [...] }
export function namesByCategory(menu) {
  return menu.reduce((acc, item) => {
    const existing = acc[item.category] ?? [];

    return {
      ...acc,
      [item.category]: [...existing, item.name],
    };
  }, {});
}
// Task 11 (custom) — filter + map
// Return the names of menu items that are currently sold out (available is false).
// soldOutItems(menu) → ["Butterfly Pea Soda"]
export function soldOutItems(menu) {
  return menu
    .filter((item) => !item.available)
    .map((item) => item.name);
}
