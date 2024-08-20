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
        todo: 'realme',
        isCompleted: true,
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
    const todoItem = {
        id: uuidv4(),
        todo: todo,
        isCompleted: false
    }
    todoList.push(todoItem)
    res.json(todoList)
});


app.put('/api/todo', (req, res) => {
    const { id, todo, isCompleted } = req.body
    const isExist = todoList.find(data => data.id === id)
    if (isExist) {
        todoList.forEach((todoItem) => {
            if (todoItem.id === id) {
                todoItem.todo = todo
                todoItem.isCompleted = isCompleted || false
            }
        })
        return res.json(todoList)
    }
    res.status(404).json({
        message: `Item with id : ${id} doesn't exsit`,
    })
})

app.delete('/api/todo', (req, res) => {
    const { id } = req.body;
    const todoIndex = todoList.findIndex((item) => item.id === id)
    if (todoIndex !== -1) {
        todoList.splice(todoIndex, 1)
        return res.json(todoList)
    }
    res.status(404).json({
        message: `Item : ${id} , doesn't exsit`,
    })
})

app.all('*', (req, res) => {
    res.status(404).json("This page is not found")
})

const PORT = 3000;
app.listen(PORT, () => console.log(`server is running on ${PORT}`))