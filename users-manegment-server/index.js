const express=require('express');
const app=express();
const cors=require('cors');
const port=process.env.PORT || 3000;
app.use(cors())
app.use(express.json())
app.get('/',(req,res)=>{
    res.send('users server is running')
})
const users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
  { id: 3, name: "Charls", email: "charlie@example.com" }
];
app.get('/users',(req,res)=>{
    res.send(users)
})
app.post('/users',(req,res)=>{
 console.log('user post method');
 console.log(req.body);
 const newuser = req.body;
 newuser.id=users.length+1;
 users.push(newuser)
 res.send(newuser)

})

app.listen(port,()=>{
    console.log(`users server in running port:${port}`);
})