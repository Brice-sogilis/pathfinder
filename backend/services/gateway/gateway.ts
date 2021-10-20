import express from 'express';
import cors from 'cors';

let app = express();
app.use(express.json());
app.use(cors());

app.get("/health", function(req, res) {
    res.sendStatus(200);
});

app.get("/grid", async function(req, res) {
    res.sendStatus(501);
});

app.get("/grid/:name", async function (req, res) {
    res.sendStatus(501);
});

app.delete("/grid/:name", async function name(req, res) {
    res.sendStatus(501);
});

app.delete("/grid", async function(req, res) {
    res.sendStatus(501);
});

app.post("/grid", async function(req, res) {
    res.sendStatus(501);
});

app.listen(8888);
export {app}