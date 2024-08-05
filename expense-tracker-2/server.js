//server.js
const express = require("express");

const bodyParser = require("body-parser");

const cors = require("cors");

const app = express();

const port = 3005;

//Middleware setup
app.use(bodyParser.json());
app.use(cors());

let expenseFormData = [
  {
    id: 101,
    description: "Snacks",
    amount: 800,
    date: "2014-06-10",
    category: "grocery",
    notes: "Haldirams",
  },
  {
    id: 102,
    description: "Milk",
    amount: 80,
    date: "2011-04-17",
    category: "grocery",
    notes: "Amul",
  },
  {
    id: 103,
    description: "Pens",
    amount: 280,
    date: "2011-04-17",
    category: "stationary",
    notes: "Flair Writo Meter",
  },
  {
    id: 104,
    description: "Duffle bag",
    amount: 1500,
    date: "2011-04-17",
    category: "travel",
    notes: "American Tourister",
  },
  {
    id: 105,
    description: "Bill payment",
    amount: 2000,
    date: "2011-04-17",
    category: "other",
    notes: "NA",
  },
];

//Function to generate a unique random 3-digit number to be used as ID
const generateRandom = () => {
  let newId;
  do {
    newId = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
  } while (expenseFormData.some((item) => item.id === newId));
  return newId;
};

//GET endpoint for fetching all the expenses
app.get("/expenses/", (req, res) => {
  res.json(expenseFormData);
});

//GET endpoint to get a specific expense by ID
app.get("/expenses/:id", (req, res) => {
  const idToFetch = parseInt(req.params.id);
  console.log("ID to fetch:", idToFetch);
  const itemToFetch = expenseFormData.find((item) => item.id === idToFetch);

  if (itemToFetch) {
    res.json(itemToFetch); // Return the specific employee details
  } else {
    res.status(404).json({ message: "Item not found" }); // Better error message
  }
  console.log("Item to fetch:", itemToFetch);
});

//POST
app.post("/expenses", (req, res) => {
  const receivedData = req.body;
  console.log("Received data", receivedData);

  const newItem = {
    id: generateRandom(),
    description: receivedData.description,
    amount: receivedData.amount,
    date: receivedData.date,
    category: receivedData.category,
    notes: receivedData.notes,
  };

  //Sent it to the database
  expenseFormData.push(newItem);
  res.status(200).send("Data received successfully");
});

//PATCH
app.patch("/expenses/:id", (req, res) => {
  const idToUpdate = parseInt(req.params.id);

  const itemToUpdate = expenseFormData.find((item) => item.id === idToUpdate);

  if (itemToUpdate) {
    const { description, amount, date, category, notes } = req.body;
    itemToUpdate.description = description;
    itemToUpdate.amount = amount;
    itemToUpdate.date = date;
    itemToUpdate.category = category;
    itemToUpdate.notes = notes;
    // itemToUpdate.date = date;
    console.log("Item to update: ", itemToUpdate);
    res.status(200).send(itemToUpdate);
  } else {
    //If the item is not found, send a 404 response
    res.status(404).send("Item not found");
  }
});

//Delete endpoint to remove an item with a specific ID
app.delete("/expenses/:id", (req, res) => {
  const idToDelete = parseInt(req.params.id);

  //Find the inddex of the item with the secified ID
  const indexToDelete = expenseFormData.findIndex(
    (item) => item.id === idToDelete
  );

  if (indexToDelete !== -1) {
    // If the item is found, remove it from the array
    expenseFormData.splice(indexToDelete, 1);
    res.status(200).send("Data deleted successfully");
  } else {
    //If the item is not found ,send a 404 response
    res.status(404).send("Item not found");
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
