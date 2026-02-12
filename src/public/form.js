// MOTION EFFECT
document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".container");
    const btnSignIn = document.getElementById("btn-sign-in");
    const btnSignUp = document.getElementById("btn-sign-up");

    btnSignIn.addEventListener("click", () => {
        container.classList.remove("toggle");
    });

    btnSignUp.addEventListener("click", () => {
        container.classList.add("toggle");
    });
});
//DARK MODE
const darkMode = document.querySelector(".dark-mode");
const body = document.body;
darkMode.addEventListener("click", () => {
    body.classList.toggle("active");
});

// LOGIN

const loginForm = document.querySelector(".sign-in");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(loginForm);
    const data = Object.fromEntries(formData);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || "Error al iniciar sesión");
        return;
      }

      alert("Login exitoso 🎉");
      window.location.href = "/";

    } catch (error) {
      console.error(error);
      alert("Error del servidor");
    }
  });
}

// REGISTER

const registerForm = document.querySelector(".sign-up");

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(registerForm);
    const data = Object.fromEntries(formData);

    try {
      const res = await fetch("/api/users/register", {   
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || "Error al registrarse");
        return;
      }

      alert("Usuario creado correctamente 🎉");
      registerForm.reset();

    } catch (error) {
      console.error(error);
      alert("Error del servidor");
    }
  });
}
