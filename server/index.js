const express = require('express');
const app = express();
const cors = require('cors');
const connectDb = require('./config/db');
const router = require('./router/todo');
require('dotenv').config();

const cors = require("cors");
app.use(cors({ origin: "https://todo-list-2y5z.vercel.app/" }));

app.use(express.json());

connectDb();

app.use('/api/todo', router)

app.all('*', (req, res) => {
    res.status(404).json("This page is not found");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server running on http://localhost/${PORT}`));


