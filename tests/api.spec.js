const axios = require("axios");
const { expect } = require("chai");

describe("Restful Booker API Tests", () => {
  const baseURL = "https://restful-booker.herokuapp.com";
  let token = "";
  let bookingId = "";

  const newBooking = {
    firstname: "John",
    lastname: "Doe",
    totalprice: 100,
    depositpaid: true,
    bookingdates: {
      checkin: "2024-01-01",
      checkout: "2024-01-02",
    },
    additionalneeds: "Breakfast",
  };

  const updatedBooking = {
    firstname: "Jane",
    lastname: "Smith",
    totalprice: 200,
    depositpaid: false,
    bookingdates: {
      checkin: "2024-02-01",
      checkout: "2024-02-02",
    },
    additionalneeds: "Lunch",
  };

  it("should create a token", async () => {
    const response = await axios.post(`${baseURL}/auth`, {
      username: "admin",
      password: "password123",
    });
    expect(response.status).to.equal(200);
    expect(response.headers["content-type"]).to.include("application/json");
    expect(response.data).to.have.property("token");
    expect(response.data.token).to.be.a("string");

    token = response.data.token;
  });

  it("should create a booking", async () => {
    const response = await axios.post(`${baseURL}/booking`, newBooking, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    expect(response.status).to.equal(200);
    expect(response.headers["content-type"]).to.include("application/json");
    expect(response.data).to.have.property("bookingid");
    expect(response.data).to.have.property("booking");
    expect(response.data.booking.firstname).to.equal("John");
    expect(response.data.booking.lastname).to.equal("Doe");

    bookingId = response.data.bookingid;
  });

  it("should get booking by ID", async () => {
    const response = await axios.get(`${baseURL}/booking/${bookingId}`, {
      headers: {
        Accept: "application/json",
      },
    });
    expect(response.status).to.equal(200);
    expect(response.headers["content-type"]).to.include("application/json");
    expect(response.data.firstname).to.equal("John");
    expect(response.data.lastname).to.equal("Doe");
    expect(response.data.totalprice).to.equal(100);
  });

  it("should update the booking", async () => {
    const response = await axios.put(
      `${baseURL}/booking/${bookingId}`,
      updatedBooking,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Cookie: `token=${token}`,
        },
      }
    );
    expect(response.status).to.equal(200);
    expect(response.headers["content-type"]).to.include("application/json");
    expect(response.data.firstname).to.equal("Jane");
    expect(response.data.lastname).to.equal("Smith");
    expect(response.data.totalprice).to.equal(200);
  });

  it("should delete the booking", async () => {
    const response = await axios.delete(`${baseURL}/booking/${bookingId}`, {
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${token}`,
      },
    });
    expect(response.status).to.equal(201);
    expect(response.data).to.equal("Created");
  });
});
