const axios = require('axios');
const { expect } = require('chai');

describe('Restful Booker API Tests', () => {
    const baseURL = 'https://restful-booker.herokuapp.com';
    let token = '';
    let bookingId = '';

    // Test data
    const newBooking = {
        firstname: 'John',
        lastname: 'Doe',
        totalprice: 100,
        depositpaid: true,
        bookingdates: {
            checkin: '2024-01-01',
            checkout: '2024-01-02'
        },
        additionalneeds: 'Breakfast'
    };

    const updatedBooking = {
        firstname: 'Jane',
        lastname: 'Smith',
        totalprice: 200,
        depositpaid: false,
        bookingdates: {
            checkin: '2024-02-01',
            checkout: '2024-02-02'
        },
        additionalneeds: 'Lunch'
    };

    it('should create a token', async () => {
        try {
            const response = await axios.post(`${baseURL}/auth`, {
                username: 'admin',
                password: 'password123'
            });

            console.log('Auth response:', response.status, response.data);

            // Check status code
            expect(response.status).to.equal(200);
            
            // Check headers
            expect(response.headers['content-type']).to.include('application/json');
            
            // Check body
            expect(response.data).to.have.property('token');
            expect(response.data.token).to.be.a('string');
            
            // Save token for next tests
            token = response.data.token;
            console.log('Token created:', token);
        } catch (error) {
            console.log('Auth error:', error.response?.status, error.response?.data);
            throw error;
        }
    });

    it('should create a booking', async () => {
        try {
            console.log('Creating booking with data:', newBooking);
            const response = await axios.post(`${baseURL}/booking`, newBooking, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            console.log('Create booking response:', response.status, response.data);

            // Check status code
            expect(response.status).to.equal(200);
            
            // Check headers
            expect(response.headers['content-type']).to.include('application/json');
            
            // Check body
            expect(response.data).to.have.property('bookingid');
            expect(response.data).to.have.property('booking');
            expect(response.data.booking.firstname).to.equal('John');
            expect(response.data.booking.lastname).to.equal('Doe');
            
            // Save booking ID for next tests
            bookingId = response.data.bookingid;
            console.log('Booking created with ID:', bookingId);
        } catch (error) {
            console.log('Create booking error:', error.response?.status, error.response?.data);
            throw error;
        }
    });

    it('should get booking by ID', async () => {
        try {
            console.log('Getting booking with ID:', bookingId);
            const response = await axios.get(`${baseURL}/booking/${bookingId}`, {
                headers: {
                    'Accept': 'application/json'
                }
            });

            console.log('Get booking response:', response.status, response.data);

            // Check status code
            expect(response.status).to.equal(200);
            
            // Check headers
            expect(response.headers['content-type']).to.include('application/json');
            
            // Check body
            expect(response.data.firstname).to.equal('John');
            expect(response.data.lastname).to.equal('Doe');
            expect(response.data.totalprice).to.equal(100);
        } catch (error) {
            console.log('Get booking error:', error.response?.status, error.response?.data);
            throw error;
        }
    });

    it('should update the booking', async () => {
        try {
            console.log('Updating booking with ID:', bookingId, 'using token:', token);
            const response = await axios.put(`${baseURL}/booking/${bookingId}`, updatedBooking, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Cookie': `token=${token}`
                }
            });

            console.log('Update booking response:', response.status, response.data);

            // Check status code
            expect(response.status).to.equal(200);
            
            // Check headers
            expect(response.headers['content-type']).to.include('application/json');
            
            // Check body
            expect(response.data.firstname).to.equal('Jane');
            expect(response.data.lastname).to.equal('Smith');
            expect(response.data.totalprice).to.equal(200);
        } catch (error) {
            console.log('Update booking error:', error.response?.status, error.response?.data);
            throw error;
        }
    });

    it('should delete the booking', async () => {
        try {
            console.log('Deleting booking with ID:', bookingId, 'using token:', token);
            const response = await axios.delete(`${baseURL}/booking/${bookingId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `token=${token}`
                }
            });

            console.log('Delete booking response:', response.status, response.data);

            // Check status code
            expect(response.status).to.equal(201);
            
            // Check body
            expect(response.data).to.equal('Created');
        } catch (error) {
            console.log('Delete booking error:', error.response?.status, error.response?.data);
            throw error;
        }
    });
});