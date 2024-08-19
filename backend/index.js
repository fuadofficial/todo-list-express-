const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors());
app.use(express.json())

const todoList = [
    {
        id: '1',
        todo: 'I phone',
        isCompleted: false,
    },
]

app.get('/api/todo', (req, res) => {
    res.status(200).json(todoList)
})
app.all('*', (req, res) => {
    res.status(404).json("This page is not found")
})

// app.post('/api/todo', (req, res) => {
//     res.json("hy")
// })

// app.put('/api/todo', (req, res) => {
//     res.json("hy")
// })

// app.delete('/api/todo', (req, res) => {
//     res.json("hy")
// })


const PORT = 3000;
app.listen(PORT, () => console.log(`server is running on ${PORT}`))