import { useState, useEffect } from "react";
import { getData } from "@/app/Config/functions";
import Expense from "./types";

export const useData = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const dataList = async () => {
      const month = date.toLocaleString("default", { month: "short" });
      const expensesList = await getData();

      const filteredExpenses = expensesList?.filter(
        (item) => item.createdAt.split(",")[1] === month
      );

      setExpenses(filteredExpenses || []);
    };

    dataList();
  }, [date]);

  return { expenses, setDate ,date};
};
