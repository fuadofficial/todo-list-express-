const express = require('express')
const app = express()
const cors = require('cors')
const { v4: uuidv4 } = require('uuid');

app.use(cors());
app.use(express.json())

const todoList = [
    {
        id: '1',
        todo: 'i phone',
        isCompleted: false,
    },
    {
        id: '2',
        todo: 'vivo',
        isCompleted: false,
    },
]

app.get('/api/todo', (req, res) => {
    res.status(200).json(todoList)
})

app.post('/api/todo', (req, res) => {
    const { todo } = req.body;
    if (!("todo" in req.body)) {
        res.status(400).json({
            message: `${JSON.stringify(req.body)}: This attribute is not accepted, Required attribute : todo`
        })
        return;
    }
    const todoItem =
    {
        id: uuidv4(),
        todo: todo,
        isCompleted: false
    }
    todoList.push(todoItem)
    res.json(todoList)
});

app.all('*', (req, res) => {
    res.status(404).json("This page is not found")
})

// app.put('/api/todo', (req, res) => {
//     res.json("hy")
// })

// app.delete('/api/todo', (req, res) => {
//     res.json("hy")
// })


const PORT = 3000;
app.listen(PORT, () => console.log(`server is running on ${PORT}`))