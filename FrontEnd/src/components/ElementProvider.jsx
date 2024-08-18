import { createContext, useState } from "react";

export const TransactionsContext = createContext();

export const ElementProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);

  return (
    <TransactionsContext.Provider value={{ transactions, setTransactions }}>
      {children}
    </TransactionsContext.Provider>
  );
};