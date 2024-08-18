import { createContext, useState } from "react";

export const ItemContext = createContext();
export const AmountContext = createContext();
export const IsIncomeContext = createContext();
export const IsSubmitContext = createContext();
export const TransactionsContext = createContext();
export const IdContext = createContext();

export const ElementProvider = ({ children }) => {
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState(0);
  const [isIncome, setIsIncome] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [id, setId] = useState(0);

  return (
    <TransactionsContext.Provider value={{ transactions, setTransactions }}>
      <ItemContext.Provider value={{ item, setItem }}>
        <AmountContext.Provider value={{ amount, setAmount }}>
          <IsIncomeContext.Provider value={{ isIncome, setIsIncome }}>
              <IsSubmitContext.Provider value={{ isSubmit, setIsSubmit }}>
                <IdContext.Provider value={{ id, setId }}>
                    {children}
                </IdContext.Provider>
              </IsSubmitContext.Provider>
          </IsIncomeContext.Provider>
        </AmountContext.Provider>
      </ItemContext.Provider>
    </TransactionsContext.Provider>
  );
};
