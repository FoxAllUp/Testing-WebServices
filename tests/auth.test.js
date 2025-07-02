const axios = require("axios");
const { expect } = require("chai");
const { credentials, apiBase } = require("../data/testData");

describe("Auth API", () => {
  let token;

  beforeEach(async function () {
    this.timeout(5000);
    try {
      const response = await axios.post(`${apiBase}/auth`, credentials);
      token = response.data.token;
    } catch (error) {
      console.log("Auth Error:", error.response?.status, error.response?.data);
      throw error;
    }
  });

  it("should create a token", () => {
    expect(token).to.be.a("string");
  });
});
