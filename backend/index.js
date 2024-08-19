const express = require('express')
const app = express()


app.get('/api/todo', (req, res) => {
    res.json("hy get methord")
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


const PORT = 5000;
app.listen(PORT, () => console.log(`server is running on ${PORT}`))