const fs = require('fs');
const chalk = require('chalk');

const getNotes = function() {
	console.log('Your notes ...');
};

const removeNote = function(title) {
	const notes = loadNotes();
	const nonRemovedNotes = notes.filter(function(note) {
		return note.title !== title;
	});
	if (notes.length > nonRemovedNotes.length) {
		saveNotes(nonRemovedNotes, true);
		console.log(chalk.green.inverse('Note removed successfully!'));
	} else {
		console.log(chalk.yellow.inverse(`There is no note with title ${chalk.blue(title)}!`));
	}
};

const addNote = function(title, body) {
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
	} else {
		console.log(chalk.yellow.inverse(`Note title ${chalk.blue(title)} taken!`));
	}
};

const saveNotes = function(notes, remove) {
	const notesJSON = JSON.stringify(notes);
	fs.writeFileSync('notes.json', notesJSON);
	if (remove === undefined || remove === false) {
		console.log(chalk.green.inverse('New note added successfully!'));
	}
};

const loadNotes = function() {
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
