import request from "supertest";
import { expect } from "chai";
import sinon from "sinon";

const BASE_URL = "http://localhost:8080";

// =========================
// VARIABLES GLOBALES
// =========================

let token = "";
let userId = "";
let petId = "";

// =========================
// AUTH TESTS
// =========================

describe("🧪 AUTH TESTS", () => {

  it("Debe registrar un usuario correctamente", async () => {

    try {

      const userMock = {
        first_name: "Test",
        email: `test${Date.now()}@test.com`,
        password: "123456"
      };

      const response = await request(BASE_URL)
        .post("/api/users/register")
        .send(userMock);

      console.log("✅ REGISTER RESPONSE:");
      console.log(response.body);

      expect(response.status).to.equal(201);
      expect(response.body).to.have.property("_id");

      userId = response.body._id;

    } catch (error) {

      console.error("❌ ERROR EN REGISTER:");
      console.error(error);

      throw error;
    }

  });

  it("Debe loguear un usuario correctamente", async () => {

    try {

      const loginMock = {
        email: "test@test.com",
        password: "123456"
      };

      const response = await request(BASE_URL)
        .post("/api/auth/login")
        .send(loginMock);

      console.log("✅ LOGIN RESPONSE:");
      console.log(response.body);

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("token");

      token = response.body.token;

    } catch (error) {

      console.error("❌ ERROR EN LOGIN:");
      console.error(error);

      throw error;
    }

  });

  it("Debe hacer logout correctamente", async () => {

    try {

      const response = await request(BASE_URL)
        .post("/api/auth/logout")
        .set("Authorization", `Bearer ${token}`);

      console.log("✅ LOGOUT RESPONSE:");
      console.log(response.body);

      expect(response.status).to.equal(200);

    } catch (error) {

      console.error("❌ ERROR EN LOGOUT:");
      console.error(error);

      throw error;
    }

  });

});

// =========================
// PETS TESTS
// =========================

describe("🐶 PETS TESTS", () => {

  it("Debe obtener mascotas", async () => {

    try {

      const response = await request(BASE_URL)
        .get("/api/pets");

      console.log("✅ GET PETS RESPONSE:");
      console.log(response.body);

      expect(response.status).to.equal(200);

    } catch (error) {

      console.error("❌ ERROR EN GET PETS:");
      console.error(error);

      throw error;
    }

  });

  it("Debe crear una mascota", async () => {

    try {

      const petMock = {
        name: "Luna",
        species: "Cat",
        breed: "Siames",
        age: 2,
        size: "pequeño",
        description: "Gato de prueba",
        status: "disponible",
        images: ["https://example.com/luna.jpg"],
        vaccinated: true,
        stock: 1
      };

      const response = await request(BASE_URL)
        .post("/api/pets")
        .set("Authorization", `Bearer ${token}`)
        .send(petMock);

      console.log("✅ CREATE PET RESPONSE:");
      console.log(response.body);

      expect(response.status).to.equal(201);
      expect(response.body).to.have.property("_id");

      petId = response.body._id;

    } catch (error) {

      console.error("❌ ERROR EN CREATE PET:");
      console.error(error);

      throw error;
    }

  });

});

// =========================
// ADOPTIONS TESTS
// =========================

describe("❤️ ADOPTIONS TESTS", () => {

  it("Debe adoptar una mascota", async () => {

    try {

      const response = await request(BASE_URL)
        .post(`/api/adoptions/${userId}/${petId}`)
        .set("Authorization", `Bearer ${token}`);

      console.log("✅ ADOPTION RESPONSE:");
      console.log(response.body);

      expect(response.status).to.equal(201);

    } catch (error) {

      console.error("❌ ERROR EN ADOPTION:");
      console.error(error);

      throw error;
    }

  });

});

// =========================
// MOCK TEST CON SINON
// =========================

describe("🎭 MOCK TEST", () => {

  it("Debe verificar que una función fue llamada", () => {

    try {

      const fakeFunction = sinon.fake();

      fakeFunction("hola");

      expect(fakeFunction.calledOnce).to.be.true;
      expect(fakeFunction.calledWith("hola")).to.be.true;

      console.log("✅ MOCK TEST OK");

    } catch (error) {

      console.error("❌ ERROR EN MOCK TEST:");
      console.error(error);

      throw error;
    }

  });

});