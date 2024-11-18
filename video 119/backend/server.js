import express from "express";
import cors from 'cors'

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req,res)=>{
    res.send("jfkd")
})

app.post('/', (req,res)=>{
    console.log(req.body);
    res.send({data :req.body});
})

app.listen(3000,() =>{
    console.log(`server is listening on port 3000 http://localhost:3000`);
})
