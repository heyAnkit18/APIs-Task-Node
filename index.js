const express = require("express");
const app = express();
const port = 5000;
const users = require("./MOCK_DATA.json");

//routes


app.get("/api/users", (req, res) => {
    res.json(users);
  });

app.get("/users",(req,res)=>{
    const html=`
    <ul> ${users.map((users)=>`<li>${users.first_name}</li>`).join("")}  </ul>
    `
    res.send(html)
})
  
app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
