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
    host: "bcu9r9tzbhawxrrxvaak-mysql.services.clever-cloud.com",
    user: "u9zo0lu8dxyok57k",
    password: "l2y3SNogRCTG94up2ix2",
    database: "bcu9r9tzbhawxrrxvaak"
})

// db.connect((err) => {
//     if (err) {
//         console.error('Error connecting to MySQL:');
//     }
//     console.log('Connected to MySQL database');
// });


app.get('/coffees', async (req, res) => {
    const sql = "SELECT * FROM `coffee` "
    db.query(sql, (err, data) => {
        // console.log(data);
        res.send(data)
        if (err) {
            return res.send("Error")
        }
    })
})

app.post("/add-coffee", async (req, res) => {
    const curd = req.body
    console.log(curd);
    const sql = "INSERT INTO coffee(`Coffee_name`, `Coffee_price`, `Coffee_image`, `Coffee_note`) VALUES(?)"
    if (curd) {
        const values = [curd?.name, curd?.price, curd?.imgbbURL, curd?.note]
        db.query(sql, [values], (err, data) => {
            if (err) {
                return res.send("don't add in database")
            }
            res.send("success")
            // console.log(values); 
        })
    }
})


app.put("/update/:id", async(req,res)=>{
    const id = req.params.id
    const data = req.body.data
    console.log(data);
    console.log(id);
})

app.listen(port, () => {
    console.log(`server is running at ${port}`);
})