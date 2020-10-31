const express = require("express");
const {uuid, isUuid}= require("uuidv4")
const cors = require("cors");

// const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.status(200).json(repositories)
});

app.post("/repositories", (request, response) => {
  const {title, url, techs}=request.body;
  const rep={
    id: uuid(),
    title,
    url,
    techs,
    likes:0
  }
  repositories.push(rep);
  return response.status(200).json(rep);
});

app.put("/repositories/:id", (request, response) => {
  const {id}=request.params;
  const {title, url, techs}=request.body;
  if(!isUuid(id)){
    response.status(400).json({error:"invalid ID"})
  }

  const repIndex=repositories.findIndex(instance=>instance.id===id);
  const rep={
    id,
    title,
    url,
    techs,
    likes:repositories[repIndex].likes
  }
  repositories[repIndex]=rep;
  return response.status(200).json(rep);
});

app.delete("/repositories/:id", (request, response) => {
  const {id}=request.params;
  const {title, url, techs}=request.body;
  if(!isUuid(id)){
    response.status(400).json({error:"invalid ID"})
  }

  const repIndex=repositories.findIndex(instance=>instance.id===id);
  
  repositories.splice(repIndex,1);
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const {id}= request.params;
  if(!isUuid(id)){
    response.status(400).json({error:"invalid ID"})
  }
  const repIndex=repositories.findIndex(instance=>instance.id===id);
  repositories[repIndex].likes+=1;
  return response.status(200).json(repositories[repIndex]);
});

module.exports = app;
