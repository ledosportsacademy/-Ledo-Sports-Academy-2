# Ledo Sports Academy Management System

A comprehensive management system for Ledo Sports Academy with features for managing members, activities, donations, expenses, experiences, weekly fees, and gallery.

## Features

- Hero slideshow management
- Activities and events management
- Member management
- Donation tracking
- Expense tracking
- Experience log
- Weekly fee management
- Photo gallery
- Admin dashboard with statistics

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB Atlas account (or local MongoDB installation)

## Installation

1. Clone the repository

```bash
git clone <repository-url>
cd ledo-sports-academy
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

The `.env` file is already configured with the MongoDB connection string. If you need to modify it, update the values in the `.env` file.

4. Initialize the database with sample data

```bash
npm run init-db
```

5. Start the server

```bash
npm start
```

Alternatively, you can use the setup script to install dependencies, initialize the database, and start the server in one command:

```bash
node start.js
```

Or

```bash
npm run setup
```

The application will be available at `http://localhost:5000`

## Frontend Integration

The frontend is integrated with the backend API. There are two versions of the frontend:

1. **Static Data Version**: Uses hardcoded data (for development and testing)
   - `index.html` with `app.js`

2. **API Integration Version**: Connects to the backend API
   - `index-with-api.html` with `api.js` and `app-with-api.js`

To use the API integration version, open `http://localhost:5000/index-with-api.html` in your browser.

## API Endpoints

### Hero Slides
- `GET /api/heroes` - Get all hero slides
- `GET /api/heroes/:id` - Get a specific hero slide
- `POST /api/heroes` - Create a new hero slide
- `PUT /api/heroes/:id` - Update a hero slide
- `DELETE /api/heroes/:id` - Delete a hero slide

### Activities
- `GET /api/activities` - Get all activities
- `GET /api/activities/status/:status` - Get activities by status
- `GET /api/activities/:id` - Get a specific activity
- `POST /api/activities` - Create a new activity
- `PUT /api/activities/:id` - Update an activity
- `DELETE /api/activities/:id` - Delete an activity

### Members
- `GET /api/members` - Get all members
- `GET /api/members/:id` - Get a specific member
- `POST /api/members` - Create a new member
- `PUT /api/members/:id` - Update a member
- `DELETE /api/members/:id` - Delete a member

### Donations
- `GET /api/donations` - Get all donations
- `GET /api/donations/:id` - Get a specific donation
- `POST /api/donations` - Create a new donation
- `PUT /api/donations/:id` - Update a donation
- `DELETE /api/donations/:id` - Delete a donation
- `GET /api/donations/stats/total` - Get total donations

### Expenses
- `GET /api/expenses` - Get all expenses
- `GET /api/expenses/category/:category` - Get expenses by category
- `GET /api/expenses/:id` - Get a specific expense
- `POST /api/expenses` - Create a new expense
- `PUT /api/expenses/:id` - Update an expense
- `DELETE /api/expenses/:id` - Delete an expense
- `GET /api/expenses/stats/total` - Get total expenses
- `GET /api/expenses/stats/by-category` - Get expenses by category with totals

### Experiences
- `GET /api/experiences` - Get all experiences
- `GET /api/experiences/:id` - Get a specific experience
- `POST /api/experiences` - Create a new experience
- `PUT /api/experiences/:id` - Update an experience
- `DELETE /api/experiences/:id` - Delete an experience

### Weekly Fees
- `GET /api/weekly-fees` - Get all weekly fees
- `GET /api/weekly-fees/member/:memberId` - Get weekly fees for a specific member
- `POST /api/weekly-fees` - Create a new weekly fee record
- `POST /api/weekly-fees/:id/payments` - Add a payment to a member's weekly fee record
- `PUT /api/weekly-fees/:id/payments/:paymentId` - Update a payment status
- `DELETE /api/weekly-fees/:id` - Delete a weekly fee record
- `GET /api/weekly-fees/stats/payments` - Get payment statistics

### Gallery
- `GET /api/gallery` - Get all gallery items
- `GET /api/gallery/top5` - Get top 5 gallery items
- `GET /api/gallery/album/:album` - Get gallery items by album
- `GET /api/gallery/:id` - Get a specific gallery item
- `POST /api/gallery` - Create a new gallery item
- `PUT /api/gallery/:id` - Update a gallery item
- `PUT /api/gallery/:id/top5` - Update top 5 status and order
- `DELETE /api/gallery/:id` - Delete a gallery item

## Development

For development, you can use the nodemon server which automatically restarts when changes are detected:

```bash
npm run dev
```

## License

This project is licensed under the MIT License.