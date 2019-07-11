# Full Stack Developer Challenge
Interview Challenge for PayPay Fullstack position. Done by Johannes Jarbratt.

## Requirements
Design a web application that allows employees to submit feedback toward each other's performance review.

*Partial solutions are acceptable.*  It is not necessary to submit a complete solution that implements every requirement.

## Assumptions
1. Without any design requirements, functionality shall be priorizied before design.
2. There does not have to be any validation or authorization on the endpoint.
3. There does not have to be any login page for the user.
4. The Employees should have names and a position.
5. When an employee is added to take part of another employees review, the employee should only be able to view and edit the review they are writing.
6. Due to time constraints, the front end does not have to look pretty.
7. Tests are not needed.
8. The backend URL and PORT should be hardcoded. (No need to setup .env file)

## Self reflection / Things I should have done differently.
- I should have made the table `performance_reviews` and `reviews_to_reviewer` into one table. It would have simplified the select and insert queries. It would also still be very logical if not more.
- Work division between frontend and backend.

## File structure
Backend server is rund from `index.js` in the root folder.

root
 |- clinet (frontend)
 |
 |- database (all files related to database)
 |
 |- server (backend related files)


### Backend

#### Employee API Endpoints
- [x] List of performance reviews requiring feedback
- [x] Submit feedback

#### Admin API Endpoints
- [x] Add Employees Endpoint
- [x] Delete Employees Endpoint
- [x] Update/ Employees Endpoint
- [x] View Employees Endpoint
- [x] View  Performance Reviews Endpoint
* [ ] Add Performance Reviews Endpoint
* [ ] Update  Performance Reviews Endpoint
* [ ] Endpoint to Assign Employees to Participate in Another employee's performance review

### Frontend
#### Employee View
- [x] Employee can: List of performance reviews requiring feedback
- [x] Employee: Submit feedback

#### Admin Views
- [x] Admin can: View Employees
- [x] Admin can: View  Performance Reviews
- [x] Admin can: Add Employees
- [x] Admin can: Delete Employees
- [x] Admin can: Update Employees
- [ ] Admin can: Add Performance Reviews
- [ ] Admin can: Update  Performance Reviews
- [ ] Admin can: Assign Employees to Participate in Another employee's performance review

## Setup
### MySQL & Knex
You will have to setup a MySQL database. Name of the database should be put into the Knex configure file located at `/database/config.js`. You will also have to setup `user` and `password` for the database. Do this in the same `config.js` file.

To create `config.js`, please refer to `config.example.js`.

If the host is not on `localhost`, please do also input the correct host address.

**The database schema is as follows:**
![Database Schema](/images/Schema20190707.png)

### Setting Up the Environment
To install all backend dependencies, run yarn in the root folder and in the client folder:
```
yarn
cd client
yarn
cd ..
```

From root run the migration files to initiate all tables and seed them:
```
yarn db:migrate:latest
yarn db:seeds:run
```

## Running the application
You have to run both the frontend server and the backend server. Do that from two different terminal windows.

**For backend server run from root folder:**
```
yarn dev:start
```
for hot reloading server, **or** 
```
yarn start
```
for server without hot reloading.

**For frontend server, from client folder:**
```
yarn start
```


## Server Side API
### ADMIN API: Delete Employee from Database
Send a DELETE HTTP request to `/api/admin/employees/:employeeID`,  where employeeID is the ID of the employee to be removed.

### ADMIN API: Update an Employee
Send a PUT HTTP request to `/api/admin/employees/:employeeID`, where employeeID is the ID of the employee whoes info should be updated. Send info to be updated in the body of the request.
```
{
    "first_name": "new first name",
    "last_name": "new last name",
    "position_id": "new position id (as integer)"
}
```

### ADMIN API: Add an Employee
Send a PUT HTTP request to `/api/admin/employees/`, where employeeID is the ID of the employee whoes info should be updated. Send info to be updated in the body of the request.
```
{
    "first_name": "first name",
    "last_name": "last name",
    "position_id": "position id (as integer)"
}
```

### ADMIN API: Get all reviews written **by** an employee
Send a GET HTTP request to `/api/admin/:employeeID/evaluations/`, where employeeID is the ID of the employee whoes reviews you want to see.

Example respons:
```
[
  {
    "review": 1,
    "evaluation": "Excellent Fullstack Engineer",
    "reviewed": 3,
    "first_name": "Johannes",
    "last_name": "Jarbratt",
    "title": "Programmer"
  },
  {
    "review": 3,
    "evaluation": "Hard worker",
    "reviewed": 2,
    "first_name": "Toshi",
    "last_name": "Ninomae",
    "title": "Programmer"
  }
]
```

### ADMIN API: Get all reviews written **about** an employee
Send a GET HTTP request to `/api/admin/evaluations/:employeeID/`, where employeeID is the ID of the employee whoes reviews you want to see.

Example respons:
```
[
  {
    "review": 3,
    "evaluation": "Hard worker",
    "reviewed": 2,
    "first_name": "Toshi",
    "last_name": "Ninomae",
    "title": "Programmer",
    "reviewers_first_name": "Tomoko",
    "reviewers_last_name": "Tanaka"
  },
  {
    "review": 4,
    "evaluation": "",
    "reviewed": 2,
    "first_name": "Toshi",
    "last_name": "Ninomae",
    "title": "Programmer",
    "reviewers_first_name": "Johannes",
    "reviewers_last_name": "Jarbratt"
  }
]
```

### ADMIN API: Get list of all employees
Send a GET HTTP request to `/api/admin/employees`.

Example response:
```
[
  {
    "id": 1,  // Employee ID
    "first_name": "Tomoko",
    "last_name": "Tanaka",
    "title": "Manager"
  },
  {
    "id": 2,
    "first_name": "Toshi",
    "last_name": "Ninomae",
    "title": "Programmer"
  },
  {
    "id": 3,
    "first_name": "Johannes",
    "last_name": "Jarbratt",
    "title": "Manager"
  }
]
```

### Employee API: Gett all pending reviews that the employee should write
Send a GET HTTP request to `/api/employees/:employeeID/evaluations/pending`.

Response will be an empty array if there are no pending reviews. The response will be an array with pending reviews if there are pending reviews. Example:
```
[
  {
    "review": 4, // Id of the review
    "evaluation": "", // Evaluation to be written
    "reviewed": 2, // employeeID of person to be reviewed
    "first_name": "Toshi", // First name of person to be reviewed
    "last_name": "Ninomae", // Last name of person to be reviewed
    "title": "Programmer" // Title of person to be reviewed
  }
]

```

### Employee API: Write/Update a review:
Send a POST HTTP request to `/api/employees/:employeeID/evaluations/:review`.

`:employeeID` is the employee ID of the person writing the review. `:review` is the ID of the reivew.

You have to send the review (evaluation) in the body:
```
{
    "evaluation": "The content is to be written here"
}
```
