import React, { useState } from 'react';

export default function TransactionForm() {

  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  return (
    <>
      <h3>Transaction</h3>
      <form>
        <label>
          <span>Transaction label:</span>
          <input
            type="text"
            required
            onChange={e => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Amount in $:</span>
          <input
            type="number"
            required
            onChange={e => setAmount(e.target.value)}
            value={amount}
          />
        </label>
      </form>
    </>
  )
}
