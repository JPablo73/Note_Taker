const fs = require("fs");

// imported 'uuid' for unique id
const { v4: uuidv4 } = require("uuid");

// routes
module.exports = function (app) {
  //get request
  app.get("/api/notes", (request, response) => {
    console.log("\n Executing GET notes request");

    let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

    console.log(
      "\n GET request - Returning notes data: " + JSON.stringify(data)
    );

    response.json(data);
  });

  //POST request
  app.post("/api/notes", (request, response) => {
    const newNote = request.body;

    console.log("\n POST request - New Note : " + JSON.stringify(newNote));

    newNote.id = uuidv4();

    let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

    data.push(newNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(data));

    console.log("\n Added new note to 'db.json' file!");

    response.json(data);
  });

  //DELETE request
  app.delete("/api/notes/:id", (request, response) => {
    let noteId = request.params.id.toString();

    console.log(`\n DELETE note request for noteId: ${noteId}`);

    let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

    const newData = data.filter((note) => note.id.toString() !== noteId);

    fs.writeFileSync("./db/db.json", JSON.stringify(newData));

    console.log(`\n Deleted note with id : ${noteId}`);

    response.json(newData);
  });
};
