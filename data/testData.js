require("dotenv").config();

module.exports = {
  credentials: {
    username: process.env.API_USERNAME,
    password: process.env.API_PASSWORD
  },
  booking: {
    firstname: "John",
    lastname: "Doe",
    totalprice: 150,
    depositpaid: true,
    bookingdates: {
      checkin: "2025-12-01",
      checkout: "2025-12-05",
    },
    additionalneeds: "Breakfast",
  },
  apiBase: "https://restful-booker.herokuapp.com",
};
