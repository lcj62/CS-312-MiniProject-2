import express from "express";
import axios from "axios";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;
const JOKE_API_URL = "http://localhost:4001/random"; 

// middleware
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());


app.set("view engine", "ejs");
// direct to index.ejs
app.set("views", path.join(__dirname, "public")); 

app.get("/", (req, res) => {
    res.render("index"); 
});

// fetch a random joke
app.get("/joke", async (req, res) => {
    try {
        const response = await axios.get(JOKE_API_URL);
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching joke:", error.message);
        if (error.message) {
            console.error("Response data:", error.response.data);
        }
        res.status(500).json({ error: "Failed to fetch joke." });
    }
});

// callback function with port
app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});

