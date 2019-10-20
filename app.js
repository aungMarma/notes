const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes');

// Customize yargs version
yargs.version('1.1.0');

// Commands: add, remove, read, list, edit

// Create add command
yargs.command({
	command: 'add',
	describe: 'Add a new note',
	// Options for add command
	builder: {
		title: {
			describe: 'Note title',
			demandOption: true,
			type: 'string'
		},
		body: {
			describe: 'Note content',
			demandOption: true,
			type: 'string'
		}
	},
	handler: function(argv) {
		notes.addNote(argv.title, argv.body);
	}
});

// Create remove command
yargs.command({
	command: 'remove',
	describe: 'Remove a note',
	builder: {
		title: {
			describe: 'Note title',
			demandOption: true,
			type: 'string'
		}
	},
	handler: function(argv) {
		notes.removeNote(argv.title);
	}
});

// Create read command
yargs.command({
	command: 'read',
	describe: 'Read a note',
	handler: function() {
		console.log('Reading a note');
	}
});

// Create list command
yargs.command({
	command: 'list',
	describe: 'List all notes',
	handler: function() {
		console.log('Listing all notes');
	}
});

yargs.parse(); // !important
