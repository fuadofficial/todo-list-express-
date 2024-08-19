const express = require('express')
const app = express()

app.get('/',(req,res)=>{
    res.json("hy")
})

const PORT = 5000;
app.listen(PORT, () => console.log(`server is running on ${PORT}`))