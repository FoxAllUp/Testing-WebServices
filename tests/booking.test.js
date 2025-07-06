const axios = require("axios");
const { expect } = require("chai");
const { credentials, booking, bookingUpdate, apiBase } = require("../data/testData.js");

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

    await new Promise((resolve) => setTimeout(resolve, 100));

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
    expect(res.data.totalprice).to.equal(booking.totalprice);
    expect(res.data.depositpaid).to.equal(booking.depositpaid);
    expect(res.data.bookingdates.checkin).to.equal(booking.bookingdates.checkin);
    expect(res.data.bookingdates.checkout).to.equal(booking.bookingdates.checkout);
    expect(res.data.additionalneeds).to.equal(booking.additionalneeds);
  });

  it("should update a booking", async function () {
    const res = await axios.put(
      `${apiBase}/booking/${bookingId}`,
      bookingUpdate,
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
    expect(res.data.firstname).to.equal(bookingUpdate.firstname);
    expect(res.data.lastname).to.equal(bookingUpdate.lastname);
    expect(res.data.totalprice).to.equal(bookingUpdate.totalprice);
    expect(res.data.depositpaid).to.equal(bookingUpdate.depositpaid);
    expect(res.data.bookingdates.checkin).to.equal(bookingUpdate.bookingdates.checkin);
    expect(res.data.bookingdates.checkout).to.equal(bookingUpdate.bookingdates.checkout);
    expect(res.data.additionalneeds).to.equal(bookingUpdate.additionalneeds);
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
    await new Promise((resolve) => setTimeout(resolve, 100));
  });
});
