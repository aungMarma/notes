const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
	console.log('Your notes ...');
};

const removeNote = (title) => {
	const notes = loadNotes();
	const nonRemovedNotes = notes.filter(function(note) {
		return note.title !== title;
	});
	if (notes.length > nonRemovedNotes.length) {
		saveNotes(nonRemovedNotes);
		console.log(chalk.green.inverse('Note removed successfully!'));
	} else {
		console.log(chalk.red.inverse(`No note found!`));
	}
};

const addNote = (title, body) => {
	const notes = loadNotes();
	const duplicateNotes = notes.filter(function(note) {
		return note.title === title;
	});
	if (duplicateNotes.length === 0) {
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
	// getNotes: getNotes,
	addNote: addNote,
	removeNote: removeNote
};
