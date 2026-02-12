let cartId = localStorage.getItem("cartId") || null;
let cartProducts = [];

// CARGAR CARRITO

async function loadCart() {
  try {
    if (!cartId) {
      const resCreate = await fetch(`/api/cart`, { method: "POST" });
      if (!resCreate.ok) throw new Error("No se pudo crear el carrito");
      const dataCreate = await resCreate.json();
      cartId = dataCreate._id;
      localStorage.setItem("cartId", cartId);
      console.log("Carrito creado:", cartId);
    }

    const res = await fetch(`/api/cart/${cartId}`);
    if (!res.ok) {
      console.error("No se pudo obtener el carrito", res.status);
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

function renderCart(products) {
  const cartItemsEl = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  if (!cartItemsEl) return;

  if (products.length === 0) {
    cartItemsEl.innerHTML = "<p>Carrito vacío</p>";
    if (totalEl) totalEl.innerHTML = "";
    return;
  }

  cartItemsEl.innerHTML = products.map(p => `
    <div class="cart-row">
      <div>
        ${p.productId.title} — $${p.productId.price} x ${p.quantity}
      </div>
      <div class="controls">
        <button class="remove" data-id="${p.productId._id}">Eliminar</button>
      </div>
    </div>
  `).join("");

  const total = products.reduce(
    (acc, p) => acc + p.productId.price * p.quantity,
    0
  );

  if (totalEl) {
    totalEl.innerHTML = `<h3>Total: $${total}</h3>`;
  }

  bindCartButtons();
}


// BOTON ELIMINAR DEL CARRITO

function bindCartButtons() {
  document.querySelectorAll(".remove").forEach(btn => {
    btn.onclick = async () => {
      const pid = btn.dataset.id;
      await fetch(`/api/cart/${cartId}/product/${pid}`, { method: "DELETE" });
      loadCart();
    };
  });
}

// AGREGAR AL CARRITO

document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("add-to-cart")) {
    const pid = e.target.dataset.id;
    console.log("AGREGANDO:", pid);

    const res = await fetch(`/api/cart/${cartId}/product/${pid}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: 1 })
    });

    console.log("STATUS:", res.status);
    const data = await res.json();
    console.log("DATA:", data);

    loadCart();
  }
});
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("view-details")) {
    const pid = e.target.dataset.id;
    window.location.href = `/product/${pid}`;
  }
});
// ELIMINAR CARRITO

document.getElementById("delete-cart")?.addEventListener("click", async () => {
  await fetch(`/api/cart/${cartId}`, { method: "DELETE" });
  localStorage.removeItem("cartId");
  cartId = null;
  cartProducts = [];
  renderCart([]);
});
const logoutBtn = document.getElementById("logout-btn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await fetch("/api/auth/logout", {
      method: "POST"
    });

    window.location.href = "/login";
  });
}
document.getElementById("checkout")?.addEventListener("click", async () => {
  try {
    const res = await fetch("/api/notify/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ cartId })
    });

    const data = await res.json();

    if (res.ok) {
      alert("✅ Gracias por su compra. Email enviado correctamente.");
  await fetch(`/api/cart/${cartId}`, { method: "DELETE" });
  localStorage.removeItem("cartId");
  cartId = null;
  cartProducts = [];
  renderCart([])

    } else {
      alert("Error al enviar el email");
    }

  } catch (error) {
    console.error(error);
    alert("Error inesperado");
  }
});


//INIT
window.addEventListener("DOMContentLoaded", loadCart);
