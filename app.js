const fs = require("fs");
const express = require("express");
const app = express();
app.use(express.json());

const PORT = 8000;
app.listen(PORT, (err) => {
  if (err) {
    console.log("Error starting the sever: ", err);
  }
  console.log("server is running on port", PORT);
});

app.get("/mountains",  async (req, res) => {
  
    const mountains = await loadMountains()
    console.log("this is my mountains:",mountains)
    res.status(200);
    return res.send({ data: mountains});
  });


app.get("/mountains/:id", (req, res) => {
  const pathVarMountainId = Number(req.params.id);

  if (!pathVarMountainId) {
    res.send({ error: "the mountain id must be a number" });
  }

  fs.readFile(`data/mountains.json`, "utf-8", (err, data) => {
    if (err) {
      res.status(500);
      return res.json(`Error reading file`);
    }
    
    const mountains = JSON.parse(data).mountains
    const foundMountain = mountains.find(
      (mountain) => mountain.id === Number(req.params.id)
    );

    res.status(200);
    return res.send( { data: foundMountain});

  });

});

//post
app.post("/mountains", (req, res) => {
  
  const mountains = [];

 
  
  console.log(req.body.name)
  res.send(req.body)
})


//patch

//delete
app.delete("/mountains/:id", (req, res) => {
  const pathVarMountainId = Number(req.params.id);

  if (!pathVarMountainId) {
    res.send({ error: "the mountain id must be a number" });
  }

  fs.readFile(`data/mountains.json`, "utf-8", (err, data) => {
    if (err) {
      res.status(500);
      return res.json(`Error reading file`);
    }
    
    const mountains = JSON.parse(data).mountains
    const remainingMountains = mountains.filter(
      (mountain) => mountain.id !== Number(req.params.id)
    );


    fs.writeFile(`data/mountains.json`, JSON.stringify(remainingMountains), (err) => {

      if (err) {
      res.status(500);
      return res.json(`Error writing file`);
    }}
    );

    res.status(200);
    return res.send( { data: 'Mountain deleted'});

  });

});


 function loadMountains () {
  fs.readFile(`data/mountains.json`, "utf-8", (err, data) => {
    if (err) {
      res.status(500);
      return res.json(`Error reading file`);
    }
    return JSON.parse(data) })
}


