const express  = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const db = mysql.createPool({
    host:"localhost",
    user: "root",
    password: "Noodle@123",
    database: "task",
});

app.use(cors());

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/api/get" , (req, res) => {
    const sqlGet = "SELECT * FROM task_table";
    db.query(sqlGet , (error , result) => {
        res.send(result);
    })
})

    
    app.get("/", (req, res) => {
        // const sqlInsert = "INSERT INTO task_table(task, priority) VALUES ('fill water 6:30 ', 'high')";
       
        // db.query(sqlInsert, (err, result) => {
        //     if (err) {
        //         console.log("Error inserting row:", err);
        //         res.status(500).send("Error inserting row");
        //     } else {
        //         console.log("New row inserted:", result);
        //         res.send("Row inserted successfully");
        //     }
        // });
        
    });
    
   

app.listen(5000 , () => {
    console.log("server is running on port 5000"); 
});