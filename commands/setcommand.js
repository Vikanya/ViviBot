const Keyv = require('keyv');

const keyv = new Keyv();
keyv.on('error', err => console.error('Keyv connection error:', err));

module.exports = {
	name: 'setcommand',
	description: 'creates/changes a command that will make the bot say <something>.',
	args: true,
	usage: '<command name> <message>',
	execute(message, args) {
		if (args.length != 2)
		{
			message.reply('You need 2 arguments for this command. (type \'!help setcommand\' for more info)');
		}
		else 
		{
			const result = keyv.set(args[0], args[1]);
			if (result)
			{
				message.reply(args[0] + ' command successfully set !');
			}
			else
			{
				message.reply('There was an error setting the command');
			}
		}
	},
};