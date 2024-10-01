import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const port = 4001;
const API_URL = "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,racist,explicit&format=txt";

app.use(cors());
app.use(express.urlencoded({ extended: true}));

// Random joke generator
app.get("/random", async(req, res) => {
    try {
        const response = await axios.get(API_URL);
        const jokeText = response.data;

        if (jokeText.includes('\n')) {
            // two part joke
            const jokes = jokeText.split('\n').filter(joke => joke);
            const structuredJoke = {
                type: "twopart",
                setup: jokes[0],
                delivery: jokes[1]
            };
            res.json(structuredJoke);
        } else {
            //single joke
            const structuredJoke = {
                type: "single",
                joke: jokeText
            };
            res.json(structuredJoke);
        }
    } 
    catch(error) {
        console.error("Error fetching joke:", error);
        res.status(500).json({ error: "Failed to fetch joke."})
    }
});

// callback function with port
app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});


