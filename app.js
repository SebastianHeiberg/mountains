const {request, response} = require("express")

const app = require("express")()

app.listen(8000)

app.get("/", (req, res) => {
    res.send({Message : "Welcome to the index page"})
} )

app.get("/mountains", (req, res) => {
    res.send({mountains})
})

app.get("/mountains/:id", (req, res) => {
    const id = req.params.id

    if (id < 0 || id > mountains.length){
        res.send({Message : "No mountain of that id exists"})
    } else {
        const mountain = mountains[id]
        res.send({mountain})
    }   
})



const mountains = [
    {
      "name": "Mount Everest",
      "height": 8848,
      "continent": "Asia"
    },
    {
      "name": "Aconcagua",
      "height": 6962,
      "continent": "South America"
    },
    {
      "name": "Kilimanjaro",
      "height": 5895,
      "continent": "Africa"
    },
    {
      "name": "Denali",
      "height": 6190,
      "continent": "North America"
    },
    {
      "name": "Mount Elbrus",
      "height": 5642,
      "continent": "Europe"
    },
    {
      "name": "Mount Fuji",
      "height": 3776,
      "continent": "Asia"
    },
    {
      "name": "Mount McKinley",
      "height": 6194,
      "continent": "North America"
    },
    {
      "name": "Mont Blanc",
      "height": 4808,
      "continent": "Europe"
    },
    {
      "name": "Andes Mountains",
      "height": 6960,
      "continent": "South America"
    },
    {
      "name": "Himalayas",
      "height": 8500,
      "continent": "Asia"
    }
  ]
  
