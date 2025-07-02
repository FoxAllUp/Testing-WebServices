module.exports = {
  credentials: {
    username: "admin",
    password: "password123",
  },
  booking: {
    firstname: "Richard",
    lastname: "Test",
    totalprice: 150,
    depositpaid: true,
    bookingdates: {
      checkin: "2025-07-01",
      checkout: "2025-07-05",
    },
    additionalneeds: "Breakfast",
  },
  apiBase: "https://restful-booker.herokuapp.com",
};
