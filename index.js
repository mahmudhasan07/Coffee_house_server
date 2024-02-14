const express = require('express')
const cors = require('cors')
const port = process.env.PORT || 3000
var mysql = require('mysql');
const app = express()

app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
    res.send("Server is running at 3000 port")
})

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "curd"
})


app.get('/coffees', async (req, res) => {
    const sql = "SELECT * FROM `coffee` "
    db.query(sql, (err, data) => {
        if (err) {
            return res.send("Error")
        }
        res.send(data)
    })
})

app.post("/add-coffee", async (req, res) => {
    const curd = req.body
    // console.log(data);
    const sql = "INSERT INTO coffee(`Coffee_name`, `Coffee_price`, `Coffee_image`, `Coffee_note`) VALUES(?)"
    if (curd) {
        const values = [curd?.name, curd?.price, curd?.imgbbURL, curd?.note]
        db.query(sql, [values], (err, data) => {
            if (err) {
                return res.send("don't add in database")
            }
            res.send("success")
            console.log(values);
        })
    }
})


app.put("/update/:id", async(req,res)=>{
    const id = req.params.id
})

app.listen(port, () => {
    console.log(`server is running at ${port}`);
})