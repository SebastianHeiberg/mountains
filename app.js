const fs = require("fs/promises");
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

app.get("/mountains", async (req, res) => {
  //read all mountains
  const mountainslist = await readMountains();

  res.status(200);
  return res.send({ data: mountainslist });
});

app.get("/mountains/:id", async (req, res) => {
  const pathVarMountainId = Number(req.params.id);

  if (!pathVarMountainId) {
    res.send({ error: "the mountain id must be a number" });
  }

  //read all mountains
  const mountains = await readMountains();

  //find the one chosen mountain
  const foundMountain = mountains.mountains.find(
    (mountain) => mountain.id === Number(req.params.id)
  );

  //handle if not found
  if (!foundMountain) {
    res.status(200);
    res.send({ Message: "mountain not found" });
  } else {
    res.status(200);
    return res.send({ data: foundMountain });
  }
});

app.post("/mountains", async (req, res) => {
  const name = req.body.name;
  const height = req.body.height;
  const continent = req.body.continent;

  if (!name || !height || !continent) {
    res.status(400);
    res.send({ message: "Info is missing" });
  } else {
    //make a new mountain with a uniqe id
    const idCounter = await readIdCounter();

    const mountain = {
      name: name,
      height: height,
      continent: continent,
      id: idCounter.counter,
    };

    //read all mountains
    const mountains = await readMountains();

    //push the new one
    mountains.mountains.push(mountain);

    //save mountains
    saveMountains(mountains);

    //increment id
    incrementAndSaveIdCounter(idCounter);

    //return new mountain
    res.status(200);
    res.send({ data: mountain });
  }
});

app.patch("/mountains/:id", async (req, res) => {
  const pathVarMountainId = Number(req.params.id);

  if (!pathVarMountainId) {
    res.send({ error: "the mountain id must be a number" });
  }

  //read all mountains
  const mountains = await readMountains();

  //find the one chosen
  const foundMountain = mountains.mountains.find(
    (mountain) => mountain.id === Number(req.params.id)
  );

  //handle if not found
  if (!foundMountain) {
    res.status(200);
    res.send({ Message: "mountain not found" });
  } else {
    //update the mountain
    if (req.body.height) {
      foundMountain.height = req.body.height;
    }
    if (req.body.name) {
      foundMountain.name = req.body.name;
    }
    if (req.body.continent) {
      foundMountain.continent = req.body.continent;
    }

    //save the mountain
    saveMountains(mountains);

    res.status(200);
    return res.send({ data: foundMountain });
  }
});

app.delete("/mountains/:id", async (req, res) => {
  const pathVarMountainId = Number(req.params.id);

  if (!pathVarMountainId) {
    res.send({ error: "the mountain id must be a number" });
  }

  //Reads all the mountains
   const mountains = await readMountains();

    //filter the chosen mountain out
    const listRemainingMountains = mountains.mountains.filter(
      (mountain) => mountain.id !== Number(req.params.id)
    );
    const filteredMountains = { mountains: listRemainingMountains };

    //handle if wrong id was given
    if (filteredMountains.mountains.length === mountains.mountains.length){
      res.status(400)
      res.send({message: "No matching id found"})
    } else { 
    saveMountains(filteredMountains);
    res.status(200);
    return res.send({ data: "Deleted Mountain with id: " + pathVarMountainId });
  }
  });


function saveMountains(mountains) {
  fs.writeFile(`data/mountains.json`, JSON.stringify(mountains), (err) => {
    if (err) {
      res.status(500);
      return res.json(`Error writing file`);
    }
  });
}

async function readMountains() {
  const mountains = await fs.readFile(`data/mountains.json`, "utf-8", (err) => {
    if (err) {
      console.log("failed to read file");
    }
  });

  const mountainsJson = JSON.parse(mountains);
  return mountainsJson;
}

function incrementAndSaveIdCounter(idCounter) {
  idCounter.counter++;

  fs.writeFile(`data/idCounter.json`, JSON.stringify(idCounter), (err) => {
    if (err) {
      res.status(500);
      return res.json(`Error writing file`);
    }
  });
}

async function readIdCounter() {
  const idCounter = await fs.readFile(`data/idCounter.json`, "utf-8", (err) => {
    if (err) {
      console.log("failed to read file");
    }
  });

  const idJson = JSON.parse(idCounter);
  return idJson;
}
