# Cost Manager

**Cost Manager** is a JavaScript-based application designed to help users efficiently manage personal and organizational expenses. The application includes features like expense tracking, report generation, and data visualization using a dynamic pie chart.

---

## Structure

### Add Costs
- **Form Inputs**:
  - **Sum**: Enter the total cost of the expense.
  - **Category**: Select a category from a predefined dropdown list (e.g., Fruits and Vegetables, Utilities, Entertainment).
  - **Description**: Optionally describe the expense.
  - **Date**: Specify the date of the expense.

### Costs Table
- **All Costs Table**:
  - Displays all expenses stored in the database.
  - Columns include ID, Sum, Category, Description, and Date.
- **Actions**:
  - **Edit**: Modify an existing expense. The form switches to edit mode, and upon submission, updates the expense in the database.
  - **Delete**: Remove an expense from the database.

### Report Generator
- **Filter by Month and Year**:
  - Users can generate reports for a specific month and year.
- **Filtered Costs Table**:
  - Displays expenses for the selected period, organized by category.
- **Dynamic Pie Chart**:
  - Visualizes the number of entries per category for the selected time frame.

---

## Features

### Add or Update Costs
- Add a new expense by filling out the form and submitting it.
- Edit an existing expense by clicking the "Edit" button in the costs table, updating the form, and submitting it.

### Costs Table
- View all expenses added to the database.
- Delete expenses directly from the table.

### Report Generator
- Generate a detailed report based on a specific month and year.
- Filtered expenses are displayed in a separate table.

### Dynamic Pie Chart
- Displays a visual summary of the number of entries in each category for the selected time frame.

---

## Technologies Used

- **Programming Language**: JavaScript
- **Frontend**: React
- **Database**: IndexedDB (managed using the `VanillaIDB` class for easy integration)
- **Chart Library**: Chart.js

---

## Installation and Setup

### Clone the Repository
```bash
git clone https://github.com/RonButbul626/Cost-Manager.git
cd Cost-Manager
```

### Install Dependencies
After cloning the repository, install the required dependencies using:
```bash
npm install
```

### Start the Application
To start the application and run it on your local server:
```bash
npm start
```

The application will be accessible at `http://localhost:3000/` in your web browser.

---

## Application Flow

1. **Add Costs**:
   - Navigate to the "Add Costs" section.
   - Fill out the form with details such as sum, category, description, and date.
   - Submit the form to add the expense to the database. The costs table will be updated automatically.

2. **Edit Costs**:
   - Click the "Edit" button next to an expense in the costs table.
   - The expense details will populate the form.
   - Modify the details and submit the form to update the expense in the database.

3. **Delete Costs**:
   - Click the "Delete" button next to an expense to remove it from the database and update the costs table.

4. **Generate Report**:
   - Enter a specific month and year in the report generator.
   - View the filtered expenses in a dedicated table organized by category.
   - A dynamic pie chart will be generated, showing the number of entries in each category.

5. **Dynamic Updates**:
   - Any changes made to expenses (add, edit, or delete) will immediately update the costs table and pie chart.

---

## Enjoy managing your expenses with Cost Manager!
Whether you're tracking personal finances or managing organizational budgets, **Cost Manager** offers an intuitive and efficient solution. Start organizing your expenses today!

