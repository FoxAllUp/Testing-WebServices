const axios = require("axios");
const { expect } = require("chai");
const { credentials, booking, apiBase } = require("../data/testData");

describe("Booking API", () => {
  let token;
  let bookingId;

  beforeEach(async function () {
    this.timeout(10000);

    try {
      const authResponse = await axios.post(`${apiBase}/auth`, credentials);
      token = authResponse.data.token;
    } catch (error) {
      console.log("Auth Error:", error.response?.status, error.response?.data);
      throw error;
    }

    await new Promise((resolve) => setTimeout(resolve, 10));

    try {
      const createResponse = await axios.post(`${apiBase}/booking`, booking, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      bookingId = createResponse.data.bookingid;
    } catch (error) {
      console.log(
        "Booking Creation Error:",
        error.response?.status,
        error.response?.data
      );
      throw error;
    }
  });

  it("should create a booking", async function () {
    const res = await axios.post(`${apiBase}/booking`, booking, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    expect(res.status).to.equal(200);
    expect(res.headers["content-type"]).to.include("application/json");
    expect(res.data).to.have.property("bookingid").that.is.a("number");
    expect(res.data).to.have.nested.property(
      "booking.firstname",
      booking.firstname
    );
    expect(res.data).to.have.nested.property(
      "booking.lastname",
      booking.lastname
    );
  });

  it("should get a booking by id", async function () {
    const res = await axios.get(`${apiBase}/booking/${bookingId}`, {
      headers: {
        Accept: "application/json",
      },
    });

    expect(res.status).to.equal(200);
    expect(res.headers["content-type"]).to.include("application/json");
    expect(res.data.firstname).to.equal(booking.firstname);
    expect(res.data.lastname).to.equal(booking.lastname);
  });

  it("should update a booking", async function () {
    const updatedBooking = {
      ...booking,
      firstname: "UpdatedName",
      lastname: `Test-${Date.now()}`,
    };

    const res = await axios.put(
      `${apiBase}/booking/${bookingId}`,
      updatedBooking,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Cookie: `token=${token}`,
        },
      }
    );

    expect(res.status).to.equal(200);
    expect(res.headers["content-type"]).to.include("application/json");
    expect(res.data.firstname).to.equal(updatedBooking.firstname);
    expect(res.data.lastname).to.equal(updatedBooking.lastname);
  });

  it("should delete a booking", async function () {
    const res = await axios.delete(`${apiBase}/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${token}`,
      },
    });

    expect(res.status).to.equal(201);

    try {
      await axios.get(`${apiBase}/booking/${bookingId}`);
      throw new Error("Booking should not exist");
    } catch (err) {
      expect(err.response.status).to.equal(404);
    }
  });

  afterEach(async function () {
    await new Promise((resolve) => setTimeout(resolve, 10));
  });
});
