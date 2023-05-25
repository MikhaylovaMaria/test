const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
  const notes = await getNotes();
  const note = {
    title,
    id: Date.now().toString(),
  };
  notes.push(note);
  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.green("Note was added"));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
  const notes = await getNotes();
  console.log(chalk.bgBlue("its list notes:"));
  notes.forEach((note) => {
    console.log(chalk.blue(note.id, note.title));
  });
}

async function removeNotes(id) {
  const notes = await getNotes();
  await fs.writeFile(
    notesPath,
    JSON.stringify(notes.filter((n) => n.id !== String(id)))
  );
}

async function editNote(id, title) {
  const notes = await getNotes();
  const newNotes = notes.map((n) => {
    if (n.id === id) {
      return { ...n, title: title };
    }
    return n;
  });
  await fs.writeFile(notesPath, JSON.stringify(newNotes));
}
module.exports = {
  addNote,
  printNotes,
  removeNotes,
  getNotes,
  editNote,
};
