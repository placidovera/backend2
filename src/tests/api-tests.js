
const BASE_URL = "http://localhost:8080";

// 🔥 helper para requests
async function request(method, url, body = null, token = null) {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    options.headers["Authorization"] = `Bearer ${token}`;
  }

  if (body) {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(url, options);
  const data = await res.json().catch(() => ({}));

  return { status: res.status, data };
}

// =========================
// 🧪 AUTH TESTS
// =========================

export async function testRegister() {
  console.log("🔹 TEST REGISTER");

  const { status, data } = await request(
    "POST",
    `${BASE_URL}/api/users/register`,
    {
      first_name: "Test",
      email: "test@test.com",
      password: "123456",
    }
  );

  console.log(status, data);
  return data;
}

export async function testLogin() {
  console.log("🔹 TEST LOGIN");

  const { status, data } = await request(
    "POST",
    `${BASE_URL}/api/auth/login`,
    {
      email: "test@test.com",
      password: "123456",
    }
  );

  console.log(status, data);
  return data.token;
}

export async function testLogout(token) {
  console.log("🔹 TEST LOGOUT");

  const { status, data } = await request(
    "POST",
    `${BASE_URL}/api/auth/logout`,
    {},
    token
  );

  console.log(status, data);
}

// =========================
// 🐶 PETS TESTS
// =========================

export async function testGetPets() {
  console.log("🔹 TEST GET PETS");

  const { status, data } = await request(
    "GET",
    `${BASE_URL}/api/pets`
  );

  console.log(status, data);
  return data;
}

export async function testCreatePet(token) {
  console.log("🔹 TEST CREATE PET");

  const { status, data } = await request(
    "POST",
    `${BASE_URL}/api/pets`,
    {
      name: "Luna",
      species: "Cat",
      breed: "Siames",
      age: 2,
      size: "pequeño",
      description: "Gato de prueba",
      status: "disponible",
      images: ["https://example.com/luna.jpg"],
      vaccinated: true,
      stock: 1,
    },
    token
  );

  console.log(status, data);
  return data;
}

// =========================
// ❤️ ADOPTIONS TEST
// =========================

export async function testAdoption(token, uid, pid) {
  console.log("🔹 TEST ADOPTION");

  const { status, data } = await request(
    "POST",
    `${BASE_URL}/api/adoptions/${uid}/${pid}`,
    null,
    token
  );

  console.log(status, data);
  return data;
}

// =========================
// 🚀 RUN ALL TESTS
// =========================

async function run() {
  console.log("\n🚀 STARTING API TESTS\n");

  const register = await testRegister();
  const token = await testLogin();

  await testGetPets();

  const pet = await testCreatePet(token);

  await testAdoption(
    token,
    register._id,
    pet._id
  );

  await testLogout(token);

  console.log("\n✅ TESTS FINISHED\n");
}

run();