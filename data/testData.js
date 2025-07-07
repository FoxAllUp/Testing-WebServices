require('dotenv').config();

module.exports = {
  credentials: {
    username: process.env.API_USERNAME,
    password: process.env.API_PASSWORD,
  },
  booking: {
    firstname: 'John',
    lastname: 'Doe',
    totalprice: 150,
    depositpaid: true,
    bookingdates: {
      checkin: '2025-12-01',
      checkout: '2025-12-05',
    },
    additionalneeds: 'Breakfast',
  },
  bookingUpdate: {
    firstname: 'Jane',
    lastname: 'Smith',
    totalprice: 200,
    depositpaid: false,
    bookingdates: {
      checkin: '2025-12-02',
      checkout: '2025-12-06',
    },
    additionalneeds: 'Lunch',
  },
  apiBase: 'https://restful-booker.herokuapp.com',
};
