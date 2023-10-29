import React, { useEffect, useState } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import { toast } from 'react-toastify';

export default function TransactionForm({ uid }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const { addDocument, response } = useFirestore('transactions');

  const handleSubmit = (e) => {
    e.preventDefault();
    const transactionData = {
      uid,
      name,
      amount
    };
    addDocument(transactionData);
  }

  // Reset the form fields when success
  useEffect(() => {
    if (response.success) {
      setName('');
      setAmount('');
      toast.success("Transaction Added Successfully", { autoClose: 2000 });
    } else if (response.error) {
      toast.error("Transaction Failed", { autoClose: 2000 });
    }
  }, [response.success, response.error]);

  return (
    <>
      <h3>Add Transaction</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Transaction label:</span>
          <input
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Amount in PKR:</span>
          <input
            type="number"
            required
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
          />
        </label>
        <button type="submit">Add Transaction</button>
      </form>
    </>
  );
}
