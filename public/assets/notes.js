let saveNoteBtn = document.querySelector(".save-note");
let newNoteBtn = document.querySelector("new-note");
let recall_notes = document.querySelector("recall");

getSave = () => {
  let textarea = document.getElementById("note-textarea").value;
  let title = document.getElementById("titleNote").value;
  if (title == "" || textarea == "") {
    alert("PLS FILL BOTH INPUTS");
  }
  const note = {
    title: title,
    body: textarea,
  };
  fetch("/api/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
};

getNote = async () => {
  await fetch("/api/notes", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      var div1 = document.createElement("div");
      var div = document.createElement("div");
      div.className = "form-group";
      var label = document.createElement("label");
      label.className = "col-sm-2 control-label";
      document.querySelector(".inputGroup").style.display = "none";
      for (i = 0; i < data.length; i++) {
        div1.className = "createdNotes";
        var commentText = document.createElement("div");
        var H1tag = document.createElement("h1");
        var H2tag = document.createElement("h2");
        H1tag.textContent = data.title;
        commentText.id = "inputText";
        commentText.rows = "1";
        div.appendChild(label);
        div1.appendChild(H1tag);
        div1.appendChild(H2tag);
        H1tag.appendChild(document.createTextNode(data[i].title));
        H2tag.appendChild(document.createTextNode(data[i].body));
        div.appendChild(div1);
      }
      document.body.appendChild(div1);
    });
};
createNotes = () => {
  document.querySelector(".createdNotes").remove();
  document.querySelector(".inputGroup").style.display = "block";
};
