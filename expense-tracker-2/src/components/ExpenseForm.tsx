//ExpenseForm.tsx
import React, { useState } from "react";
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
      <form onSubmit={handleSubmit}>
        <div>
          <div className="flex items-center justify-center min-h-screen">
            <div
              className="expenseForm rounded border border-black"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                width: "55vw",
                height: "80vh",
              }}
            >
              <div className="item_description flex justify-between items-center mb-10 mt-10">
                <label className="label" style={{ marginLeft: "10%" }}>
                  Description:
                </label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="border rounded p-2 "
                  style={{ marginRight: "10%" }}
                />
              </div>
              <div className="item_amount flex justify-between items-center mb-10 ">
                <label className="label" style={{ marginLeft: "10%" }}>
                  Amount:
                </label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="border rounded p-2"
                  style={{ marginRight: "10%" }}
                />
              </div>
              <div className="item_date flex justify-between items-center mb-4">
                <label className="label" style={{ marginLeft: "10%" }}>
                  Date:
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="border rounded p-2 "
                  style={{ marginRight: "10%", width: "51.5%" }}
                />
              </div>
              <div className="item_category flex justify-between items-center mb-4">
                <label className="label" style={{ marginLeft: "10%" }}>
                  Category:
                </label>
                <select
                  // type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="border rounded p-2 "
                  style={{ marginRight: "10%" }}
                >
                  <option value="">Select a category</option>
                  <option value="Grocery">Grocery</option>
                  <option value="Stationary">Stationary</option>
                  <option value="Travel">Travel</option>
                  <option value="Miscellaneous">Miscellaneous</option>
                  <option value="Others">Others</option>
                </select>
              </div>
              <div className="item_note flex justify-between items-center mb-4">
                <label className="label" style={{ marginLeft: "10%" }}>
                  Notes(Optional):
                </label>
                <input
                  type="text"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="border rounded p-2 "
                  style={{ marginRight: "10%" }}
                />
              </div>
              <div className="add_button flex justify-evenly items-center">
                <button
                  type="submit"
                  style={{
                    width: "14vw",
                    height: "5vh",
                    marginTop: "5vh",
                    color: "whitesmoke",

                    backgroundColor: "#C0F57C",
                    borderRadius: "4px",
                  }}
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
// export default ExpenseForm;
