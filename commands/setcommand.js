const fs = require('fs');
module.exports = {
	name: 'setcommand',
	description: 'creates/changes a command that will make the bot say <something>.',
	args: true,
	usage: '<command name> <message>',
	execute(message, args) {
		message.reply('Command not yet implemented.');
	},
};