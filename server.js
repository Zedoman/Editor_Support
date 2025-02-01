require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");

const faqRoutes = require("./routes/faqRoutes");

const app = express();
connectDB();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/faqs", faqRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
