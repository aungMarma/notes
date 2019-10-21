const fs = require('fs');
const chalk = require('chalk');

const readNote = (title) => {
	const notes = loadNotes();
	const noteToRead = notes.find((note) => note.title === title);
	if (noteToRead) {
		console.log(chalk.inverse(noteToRead.title));
		console.log(chalk.blue(noteToRead.body));
	} else {
		console.log(chalk.red.inverse(`No note found!`));
	}
};

const listNotes = () => {
	const notes = loadNotes();
	console.log(chalk.inverse('Your notes'));
	notes.forEach((note) => console.log(chalk.blue(note.title)));
};

const removeNote = (title) => {
	const notes = loadNotes();
	const nonRemovedNotes = notes.filter((note) => note.title !== title);
	if (notes.length > nonRemovedNotes.length) {
		saveNotes(nonRemovedNotes);
		console.log(chalk.green.inverse('Note removed successfully!'));
	} else {
		console.log(chalk.red.inverse(`No note found!`));
	}
};

const addNote = (title, body) => {
	const notes = loadNotes();
	const duplicateNote = notes.find((note) => note.title === title);
	if (!duplicateNote) {
		notes.push({
			title,
			body
		});
		saveNotes(notes);
		console.log(chalk.green.inverse('New note added!'));
	} else {
		console.log(chalk.red.inverse(`Note title taken!`));
	}
};

const saveNotes = (notes) => {
	try {
		const notesJSON = JSON.stringify(notes);
		fs.writeFileSync('notes.json', notesJSON);
	} catch (error) {
		console.log(chalk.red.inverse("Notes can't be saved now"));
	}
};

const loadNotes = () => {
	try {
		const notesBuffer = fs.readFileSync('notes.json');
		const notesJSON = notesBuffer.toString();
		const notes = JSON.parse(notesJSON);
		return notes;
	} catch (error) {
		return [];
	}
};

module.exports = {
	addNote: addNote,
	removeNote: removeNote,
	listNotes: listNotes,
	readNote: readNote
};
