import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import helmet from "helmet";
import bodyParser from "body-parser";
import morgan from "morgan";
import dotenv from "dotenv";
import kpiRoutes from "./routes/kpi.js";
import productRoutes from "./routes/product.js";
import KPI from "./models/KPI.js";
import { kpis, products } from "./data/data.js";
import Product from "./models/Product.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const PORT = process.env.PORT || 9000;
app.use("/kpi", kpiRoutes);
app.use("/product", productRoutes);

app.get("/", (req, res) => {
  res.sendStatus(200);
});

mongoose
  .connect(process.env.DB_URL)
  .then(async () => {
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
    await mongoose.connection.db.dropDatabase();
    KPI.insertMany(kpis);
    Product.insertMany(products);
  })
  .catch((err) => console.log(err));
