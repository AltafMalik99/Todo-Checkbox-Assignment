const express = require("express");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use(express.static("public"));

let todos = [
    {
        id: 1,
        title: "Learn Node.js",
        status: false
    },
    {
        id: 2,
        title: "Learn Express.js",
        status: false
    },
    {
        id: 3,
        title: "Complete Todo Assignment",
        status: false
    }
];

app.get("/", (req, res) => {
    res.render("index", { todos });
});

app.post("/todo/:id", (req, res) => {
    const id = Number(req.params.id);
    const { status } = req.body;

    const todo = todos.find((item) => item.id === id);

    if (!todo) {
        return res.status(404).json({
            message: "Todo not found"
        });
    }

    todo.status = status;

    console.log("Todo:", todo.title);
    console.log("Status:", todo.status ? "Checked" : "Unchecked");

    res.json({
        message: "Todo status updated",
        todo: todo
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});