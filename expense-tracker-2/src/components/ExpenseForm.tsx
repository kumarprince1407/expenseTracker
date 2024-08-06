//ExpenseForm.tsx
import React, { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import {
  useAddExpense,
  useUpdateExpense,
  useDeleteExpense,
} from "../api/formOperations";

// type InputProps = {
//   value: string | number;
// };

interface NewExpense {
  description: string;
  amount: number;
  date: string;
  category: string;
  notes: string;
}

interface ExpenseFormProps {
  existingExpense?: NewExpense;
  expenseId?: string;
}

// export const ExpenseForm = (props: InputProps) => {
//   const [formData, setFormData] = useState({
//     description: "",
//     amount: "",
//     date: "",
//     category: "",
//     note: "",
//   });

export const ExpenseForm: React.FC<ExpenseFormProps> = ({
  existingExpense,
  expenseId,
}) => {
  const [formData, setFormData] = useState<NewExpense>({
    description: existingExpense?.description || "",
    amount: existingExpense?.amount || 0,
    date: existingExpense?.date || "",
    category: existingExpense?.category || "",
    notes: existingExpense?.notes || "",
  });

  const { mutate: addExpense } = useAddExpense();
  const { mutate: updateExpense } = useUpdateExpense(expenseId || "");
  const { mutate: deleteExpense } = useDeleteExpense();

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (expenseId) {
      updateExpense(formData);
    } else {
      addExpense(formData);
    }
    navigate("/");
  };

  const handleDelete = () => {
    if (expenseId) {
      deleteExpense(expenseId);
    }
  };

  const navigateToDashBoard = () => {
    navigate("/");
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? parseFloat(value) : value,
    }));
  };

  return (
    <>
      {/* <h2 className="analytics_text text-2xl text-blue-400 mt-2"> */}
      <h2 className=" text-5xl text-blue-400 mt-2">Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <div className="buttonContainer">
          <button
            onClick={navigateToDashBoard}
            className="w-[14vw] h-[4vh] mt-[5vh] mb-[2vh] text-[#f5f5f5] bg-[#7CD9F5] rounded-[4px]"
          >
            Go To Dashboard
          </button>
        </div>
        <div>
          <div className="flex flex-col items-start justify-start min-h-screen">
            <div
              className="expenseForm flex flex-col justify-around w-[55vw] h-[70vh]" //Removed the border
            >
              <div className="item_description flex justify-between items-center mb-2 mt-10">
                <label className="label text-2xl ml-[10%]">Description:</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="border rounded-[20%] p-2 mr-[10%]"
                />
              </div>
              <div className="item_amount flex justify-between items-center mb-2 ">
                <label className="label text-2xl" style={{ marginLeft: "10%" }}>
                  Amount:
                </label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="border p-2 rounded-tl-[20px] rounded-tr-[20px] rounded-bl-[20px] rounded-br-[20px] mr-[10%]"
                />
              </div>
              <div className="item_date flex justify-between items-center mb-2">
                <label className="label text-2xl ml-[10%]">Date:</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="border p-2 rounded-tl-[20px] rounded-tr-[20px] rounded-bl-[20px] rounded-br-[20px] mr-[10%] w-[51.5%]"
                />
              </div>
              <div className="item_category flex justify-between items-center mb-2">
                <label className="label text-2xl" style={{ marginLeft: "10%" }}>
                  Category:
                </label>
                <select
                  // type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="border p-2 rounded-tl-[20px] rounded-tr-[20px] rounded-bl-[20px] rounded-br-[20px] mr-[10%]"
                >
                  <option value="">Select a category</option>
                  <option value="grocery">Grocery</option>
                  <option value="stationary">Stationary</option>
                  <option value="travel">Travel</option>
                  <option value="miscellaneous">Miscellaneous</option>
                  <option value="others">Others</option>
                </select>
              </div>
              <div className="item_note flex justify-between items-center mb-2">
                <label className="label text-2xl ml-[10%]">
                  Notes(Optional):
                </label>
                <input
                  type="text"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="border p-2 rounded-tl-[20px] rounded-tr-[20px] rounded-bl-[20px] rounded-br-[20px] mr-[10%]"
                />
              </div>
              <div className="add_button flex justify-evenly items-center">
                <button
                  type="submit"
                  className="w-[14vw] h-[4vh] mt-[1vh] mb-[2vh] text-[#f5f5f5] bg-[#A6E9D3] rounded-[4px]"
                >
                  {expenseId ? "Update" : "Add"} Expense
                </button>
                {expenseId && (
                  <button type="button" onClick={handleDelete}>
                    Delete Expense
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
