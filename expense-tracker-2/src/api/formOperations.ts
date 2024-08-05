//formOperations.ts
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
  notes?: string;
}

interface NewExpense {
  description: string;
  amount: number;
  date: string;
  category: string;
  notes?: string;
}
// const fetchExpenses = () => {
//   return axios.get<Expense[]>("https://localhost/3005/expenses");
// };

const fetchExpenses = async (): Promise<Expense[]> => {
  const response = await axios.get<Expense[]>("http://localhost:3005/expenses");
  return response.data;
};

//
// const fetchExpenseById = (id: string) => {
//   return axios.get<Expense>(`https://localhost/3005/expenses/${id}`);
// };
const fetchExpenseById = async (id: string): Promise<Expense> => {
  const response = await axios.get<Expense>(
    `http://localhost:3005/expenses/${id}`
  );
  return response.data;
};

//Add
// const addExpense = (newExpense: NewExpense) => {
//   return axios.post<Expense>("https://localhost/3005/expenses", newExpense);
// };
const addExpense = async (newExpense: NewExpense): Promise<Expense> => {
  const response = await axios.post<Expense>(
    "http://localhost:3005/expenses",
    newExpense
  );
  return response.data;
};

//Update
// const updateExpense = (id: string, updatedExpense: Partial<Expense>) => {
//   //ASK:Partial
//   return axios.patch<Expense>(
//     `https://localhost:3005/expenses/${id}`,
//     updatedExpense
//   );
// };
const updateExpense = async (
  id: string,
  updatedExpense: Partial<Expense>
): Promise<Expense> => {
  const response = await axios.patch<Expense>(
    `http://localhost:3005/expenses/${id}`,
    updatedExpense
  );
  return response.data;
};

//Delete
// const deleteExpense = (id: string) => {
//   return axios.delete(`https://localhost:3005/expenses/${id}`);
// };
const deleteExpense = async (id: string): Promise<void> => {
  await axios.delete(`http://localhost:3005/expenses/${id}`);
};

//Custom hook to use in Dashboard.tsx to get all expenses
export const useExpenseData = () => {
  return useQuery<Expense[], Error>({
    queryKey: ["expenses-data"],
    queryFn: fetchExpenses,
  });
};

//Custom hook to use in ExpenseForm.tsx to add an expense
export const useAddExpense = () => {
  const queryClient = useQueryClient();
  return useMutation<Expense, Error, NewExpense>({
    mutationFn: addExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["expenses-data"], //
      });
    },
  });
};

//Custom hook to use in ExpenseForm.tsx to update an expense
export const useUpdateExpense = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation<Expense, Error, Partial<Expense>>({
    mutationFn: (updatedExpense: Partial<Expense>) =>
      updateExpense(id, updatedExpense),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["expenses-data"],
      });
    },
  });
};

export const useDeleteExpense = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: deleteExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["expenses-data"],
      });
    },
  });
};

export {
  fetchExpenses,
  fetchExpenseById,
  addExpense,
  updateExpense,
  deleteExpense,
};
