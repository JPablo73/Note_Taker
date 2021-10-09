const fs = require("fs");

// imported 'uuid' for unique id
const { v4: uuidv4 } = require("uuid");

// routes
module.exports = (app) => {
  //get request
  app.get("/api/notes", (req, res) => {
    console.log("\n Executing GET notes request");

    let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

    console.log(
      "\n GET request - Returning notes data: " + JSON.stringify(data)
    );

    res.json(data);
  });

  //POST request
  app.post("/api/notes", (req, res) => {
    const newNote = req.body;

    console.log("\n POST request - New Note : " + JSON.stringify(newNote));

    newNote.id = uuidv4();

    let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

    data.push(newNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(data));

    console.log("\n Added new note to 'db.json' file!");

    res.json(data);
  });

  //DELETE request
  app.delete("/api/notes/:id", (req, res) => {
    let noteId = req.params.id.toString();

    console.log(`\n Delete note request for noteId: ${noteId}`);

    let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

    const newData = data.filter((note) => note.id.toString() !== noteId);

    fs.writeFileSync("./db/db.json", JSON.stringify(newData));

    console.log(`\n Deleted note with id : ${noteId}`);

    res.json(newData);
  });
};
