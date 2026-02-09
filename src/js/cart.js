
let cartId = null;
let cartProducts = []; 

// CARGAR CARRITO
async function loadCart() {
  try {
    const res = await fetch("/api/cart");
    if (!res.ok) {
      console.error("NO SE PUDO OBTENER EL CARRITO", res.status);
      return;
    }
    const data = await res.json();
    cartId = data.cartId;
    cartProducts = data.products;   
    renderCart(cartProducts);
  } catch (err) {
    console.error(err);
  }
}

// RENDERIZAR CARRITO
function renderCart(products) {
  const cartItemsEl = document.getElementById("cart-items");

  if (!cartItemsEl) return; 

  cartItemsEl.innerHTML = products
    .map(p => `
      <div class="cart-row" data-id="${p.productId?._id}">
        <div>${p.productId ? p.productId.title : 'Producto'} — $${p.productId ? p.productId.price : '0'} x ${p.quantity}</div>
        <div class="controls">
          <button class="increment" data-id="${p.productId?._id}">+</button>
          <button class="decrement" data-id="${p.productId?._id}">-</button>
          <button class="remove" data-id="${p.productId?._id}">Eliminar</button>
        </div>
      </div>
    `).join("");

  bindButtons();
}

// ASIGNAR BOTONES
function bindButtons() {
  // Incrementar
  document.querySelectorAll(".increment").forEach(btn => {
    btn.onclick = async () => {
      const pid = btn.dataset.id;
      await fetch(`/api/cart/${cartId}/products/${pid}/increment`, { method: "PUT" });
      socket.emit("cartUpdated");
      loadCart();
    };
  });

  // Decrementar
  document.querySelectorAll(".decrement").forEach(btn => {
    btn.onclick = async () => {
      const pid = btn.dataset.id;
      await fetch(`/api/cart/${cartId}/products/${pid}/decrement`, { method: "PUT" });
      socket.emit("cartUpdated");
      loadCart();
    };
  });

  // Eliminar producto desde productos o carrito
  document.querySelectorAll(".remove").forEach(btn => {
    btn.onclick = async () => {
      const pid = btn.dataset.id;
      await fetch(`/api/cart/${cartId}/products/${pid}`, { method: "DELETE" });
      socket.emit("cartUpdated");
      loadCart();
    };
  });

  // AGREGAR AL CARRITO
  document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.onclick = async () => {
      const pid = btn.dataset.id;

      const exists = cartProducts.some(p => p.productId && p.productId._id === pid);

      if (exists) {
        await fetch(`/api/cart/${cartId}/products/${pid}/increment`, { method: "PUT" });
      } else {
        await fetch(`/api/cart/${cartId}/products/${pid}`, { method: "POST" });
      }

      socket.emit("cartUpdated");
      loadCart();
    };
  });

  // VER DETALLES
  document.querySelectorAll(".view-details").forEach(button => {
    button.onclick = () => {
      const productId = button.getAttribute('data-id');
      window.location.href = `/product/${productId}`;
    };
  });

}
document.getElementById("delete-cart")?.addEventListener("click", async () => {
  await fetch(`/api/cart/${cartId}`, { method: "DELETE" });
  socket.emit("cartUpdated");
  loadCart();
});

// INICIALIZAR
window.addEventListener("DOMContentLoaded", () => {
  loadCart();
});


