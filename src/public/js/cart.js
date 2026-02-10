let cartId = "6970322872bca2d4333a94b4";
let cartProducts = [];

// ========================
// CARGAR CARRITO
// ========================
async function loadCart() {
  try {
    const res = await fetch(`/api/cart/${cartId}`);
    if (!res.ok) {
      console.error("NO SE PUDO OBTENER EL CARRITO", res.status);
      return;
    }

    const data = await res.json();
    console.log("CARRITO:", data);

    cartProducts = data.products || [];
    renderCart(cartProducts);

  } catch (err) {
    console.error(err);
  }
}

// ========================
// RENDERIZAR CARRITO
// ========================
function renderCart(products) {
  const cartItemsEl = document.getElementById("cart-items");
  if (!cartItemsEl) return;

  if (products.length === 0) {
    cartItemsEl.innerHTML = "<p>Carrito vacío</p>";
    return;
  }

  cartItemsEl.innerHTML = products.map(p => `
    <div class="cart-row">
      <div>
        ${p.productId.title} — $${p.productId.price} x ${p.quantity}
      </div>
      <div class="controls">
        <button class="increment" data-id="${p.productId._id}">+</button>
        <button class="decrement" data-id="${p.productId._id}">-</button>
        <button class="remove" data-id="${p.productId._id}">Eliminar</button>
      </div>
    </div>
  `).join("");

  bindCartButtons();
}

// ========================
// BOTONES DEL CARRITO
// ========================
function bindCartButtons() {

  document.querySelectorAll(".increment").forEach(btn => {
    btn.onclick = async () => {
      const pid = btn.dataset.id;

      await fetch(`/api/cart/${cartId}/product/${pid}`, {
        method: "PUT"
      });

      loadCart();
    };
  });

  document.querySelectorAll(".decrement").forEach(btn => {
    btn.onclick = async () => {
      const pid = btn.dataset.id;

      const prod = cartProducts.find(p => p.productId._id === pid);
      if (!prod) return;

      if (prod.quantity > 1) {
        await fetch(`/api/cart/${cartId}/product/${pid}`, {
          method: "PUT"
        });
      }

      loadCart();
    };
  });

  document.querySelectorAll(".remove").forEach(btn => {
    btn.onclick = async () => {
      const pid = btn.dataset.id;

      await fetch(`/api/cart/${cartId}/product/${pid}`, {
        method: "DELETE"
      });

      loadCart();
    };
  });
}
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("view-details")) {
    const pid = e.target.dataset.id;
    window.location.href = `/product/${pid}`;
  }
});

// ========================
// AGREGAR AL CARRITO (GLOBAL)
// ========================
document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("add-to-cart")) {
    const pid = e.target.dataset.id;
    console.log("AGREGANDO:", pid);

    const res = await fetch(`/api/cart/${cartId}/product/${pid}`, {
      method: "POST"
    });

    console.log("STATUS:", res.status);

    loadCart();
  }
});

// ========================
// ELIMINAR CARRITO
// ========================
document.getElementById("delete-cart")?.addEventListener("click", async () => {
  await fetch(`/api/cart/${cartId}`, { method: "DELETE" });
  cartProducts = [];
  renderCart([]);
});

// ========================
// INIT
// ========================
window.addEventListener("DOMContentLoaded", loadCart);
