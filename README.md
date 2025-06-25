# Restful Booker API Tests

Automated API testing suite for the **Restful Booker** hotel booking system using Axios, WebdriverIO, Mocha, and Chai.

## 🌐 Tested API
**Restful Booker** - A RESTful web service for practicing API testing
- **Base URL**: https://restful-booker.herokuapp.com
- **Documentation**: https://restful-booker.herokuapp.com/apidoc/index.html
- **Purpose**: Educational hotel booking API with full CRUD operations

## 🛠 Technologies Used

- **[Axios](https://axios-http.com/)** - HTTP client for API requests
- **[WebdriverIO](https://webdriver.io/)** - Test automation framework
- **[Mocha](https://mochajs.org/)** - JavaScript test framework  
- **[Chai](https://www.chaijs.com/)** - Assertion library for readable tests
- **Node.js** - Runtime environment

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation & Running Tests
```bash
# 1. Install dependencies
npm install

# 2. Run all API tests
npm test
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
- **Dates**: 2024-01-01 to 2024-01-02 → 2024-02-01 to 2024-02-02
- **Price**: $100 → $200
- **Extras**: Breakfast → Lunch

## ✅ Test Assertions

Each test validates:
- **HTTP Status Codes** (200, 201, etc.)
- **Response Headers** (Content-Type: application/json)
- **Response Body Structure** (required fields present)
- **Data Accuracy** (values match expectations)

## 📁 Project Structure

```
restful-booker-api-tests/
├── tests/
│   └── api.spec.js          # Main test file with all 5 scenarios
├── wdio.conf.js            # WebdriverIO configuration
├── package.json            # Dependencies and npm scripts
├── .gitignore             # Git ignore rules
└── README.md              # This documentation
```

## 🎯 Assignment Requirements Met

- ✅ **4+ Test Scenarios**: 5 scenarios implemented
- ✅ **Token Reuse**: Auth token created once, used in update/delete
- ✅ **Full CRUD**: Create → Read → Update → Delete operations
- ✅ **Comprehensive Assertions**: Status codes, headers, response body
- ✅ **CLI Script**: `npm test` command in package.json

## 🔧 Configuration

The `wdio.conf.js` is minimal and focused:
- Uses Mocha framework
- Spec reporter for clear output
- 60-second timeout for API calls
- Headless Chrome (not used for API tests but required by wdio)

## 📋 Sample Test Output

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