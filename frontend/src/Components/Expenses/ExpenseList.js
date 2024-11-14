import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import ExpenseListStyled from './ExpenseListStyled';
import autoTable from 'jspdf-autotable';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    // Fetch expenses and incomes data from backend
    const fetchTransactions = async () => {
      try {
        const [expensesResponse, incomesResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/v1/get-expenses'),
          axios.get('http://localhost:5000/api/v1/get-incomes')
        ]);

        // Combine and sort by createdAt in descending order
        const combinedTransactions = [
          ...expensesResponse.data.map(item => ({ ...item, type: 'expense' })),
          ...incomesResponse.data.map(item => ({ ...item, type: 'income' }))
        ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setExpenses(expensesResponse.data);
        setIncomes(incomesResponse.data);
        setFilteredTransactions(combinedTransactions);
      } catch (error) {
        console.error("Error fetching transactions", error);
      }
    };

    fetchTransactions();
  }, []);

  // Filter transactions by date range
  const handleFilter = () => {
    if (startDate && endDate) {
      const filtered = filteredTransactions.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        return transactionDate >= new Date(startDate) && transactionDate <= new Date(endDate);
      });
      setFilteredTransactions(filtered);
    } else {
      setFilteredTransactions([...expenses, ...incomes]);
    }
  };

  // Generate PDF summary of filtered transactions
  const downloadPDF = () => {
    const doc = new jsPDF();
  
    // Define the columns for the table
    const columns = ["#", "Title", "Category", "Amount", "Date"];
  
    // Prepare data for income and expenses tables
    const incomeData = filteredTransactions
      .filter(transaction => transaction.type === 'income')
      .map((transaction, index) => [
        index + 1,
        transaction.title,
        transaction.category,
        `${transaction.amount}`,
        new Date(transaction.date).toLocaleDateString()
      ]);
  
    const expenseData = filteredTransactions
      .filter(transaction => transaction.type === 'expense')
      .map((transaction, index) => [
        index + 1,
        transaction.title,
        transaction.category,
        `${transaction.amount}`,
        new Date(transaction.date).toLocaleDateString()
      ]);
  
    // Add title and income table on the first page
    doc.setFontSize(16);
    doc.text("Income Summary", 14, 15);
    doc.setFontSize(12);
    autoTable(doc, {  // Call autoTable and pass doc as the first parameter
      head: [columns],
      body: incomeData,
      startY: 25,
      theme: 'striped'
    });
  
    // Add a new page and expense table
    doc.addPage();
    doc.setFontSize(16);
    doc.text("Expense Summary", 14, 15);
    doc.setFontSize(12);
    autoTable(doc, {  // Use autoTable here as well
      head: [columns],
      body: expenseData,
      startY: 25,
      theme: 'striped'
    });
  
    // Save the PDF document
    doc.save("transaction_summary.pdf");
  };
  
  

  return (
    <ExpenseListStyled>
      <div>
        <h2>Transactions</h2>
        <div className='filter-section'>
          <label>Start Date: </label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          <label>End Date: </label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          <button onClick={handleFilter}>Filter</button>
        </div>
        <div className='download-button'>
            <button onClick={downloadPDF}>Download Summary as PDF</button>
        </div>
        <ul>
          {filteredTransactions.map(transaction => (
            <li key={transaction._id}>
              <strong>{transaction.title}</strong> - {transaction.category} - ₹{transaction.amount} - {transaction.type} - {new Date(transaction.date).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </div>
    </ExpenseListStyled>
  );
};

export default ExpenseList;
