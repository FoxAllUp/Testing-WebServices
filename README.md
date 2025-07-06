# Restful Booker API Tests

Automated API testing suite for the **Restful Booker** hotel booking system using Axios, Mocha, and Chai.

## 🌐 Tested API

**Restful Booker** - A RESTful web service for practicing API testing

- **Base URL**: https://restful-booker.herokuapp.com
- **Documentation**: https://restful-booker.herokuapp.com/apidoc/index.html
- **Purpose**: Educational hotel booking API with full CRUD operations

## 🛠 Technologies Used

- **[Axios](https://axios-http.com/)** - HTTP client for API requests
- **[Mocha](https://mochajs.org/)** - JavaScript test framework
- **[Chai](https://www.chaijs.com/)** - Assertion library for readable tests
- **[Mochawesome](https://github.com/adamgruber/mochawesome-report-generator)** - HTML reporter
- **[JUnit](https://junit.org/)** - XML reporting
- **[Dotenv](https://www.dotenv.org/)** - Environment variables loader
- **Node.js** - Runtime environment

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation & Running Tests

```bash
# 1. Install dependencies
npm install

# 2. Run API tests using Mocha
npm run test:all

```

## 🧪 Test Scenarios

The test suite covers a complete booking lifecycle with **5 test scenarios**:

1. **🔐 Authentication** - Create auth token with admin credentials
2. **➕ Create Booking** - Add new hotel booking with guest details
3. **🔍 Get Booking** - Retrieve booking information by ID
4. **✏️ Update Booking** - Modify existing booking (requires authentication)
5. **🗑️ Delete Booking** - Remove booking from system (requires authentication)

### Test Data Used
- **Guest**: John Doe → Jane Smith (after update)
- **Dates**: 2025-12-01 to 2025-12-05 → 2025-12-02 to 2025-12-06
- **Price**: $150 → $200
- **Extras**: Breakfast → Lunch

## ✅ Test Assertions

Each test validates:
- **HTTP Status Codes** (200, 201, etc.)
- **Response Headers** (Content-Type: application/json)
- **Response Body Structure** (required fields present)
- **Data Accuracy** (values match expectations)

## 📁 Project Structure

```

testing-webservices/
├── data/
│ └── testData.js          # Used data for testing
├── tests/
│ └── auth.test.js         # Test file for authentication
│ └── booking.test.js      # Test file for booking steps
├── package.json           # Dependencies and npm scripts
├── .gitignore             # Git ignore rules
└── README.md              # This documentation


```

## 🎯 Assignment Requirements Met

- ✅ **4+ Test Scenarios**: 5 scenarios implemented
- ✅ **Token Reuse**: Auth token created once, used in update/delete
- ✅ **Full CRUD**: Create → Read → Update → Delete operations
- ✅ **Comprehensive Assertions**: Status codes, headers, response body
- ✅ **CLI Script**: `npm run test:all` runs Mocha-based API tests.

## 🔧 Configuration

### Mocha Configuration
- Mocha is used for API testing with Axios and Chai.
- Tests are located in the `tests/` directory.
- Run tests with the command: `npm run test:all`.

## 📋 Sample Test Output

### Mocha Test Output

```

Restful Booker API Tests
✓ should create a token
✓ should create a booking  
✓ should get booking by ID
✓ should update the booking
✓ should delete the booking

5 passing (2s)

```

---

**Note**: This is an educational project for learning API testing fundamentals with familiar JavaScript testing tools. 