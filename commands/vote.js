module.exports = {
	name: 'vote',
	description: 'Collection of commands to organise votes.',
	args: true,
	usage: '<command name> add <emoji> <option name> [<emoji> <option name>...]\n<command name> remove <emoji> [<emoji> <emoji>...]\n<command name> start',
	execute(message, args, keyv) {
		if (args.length < 1)
		{
			message.reply('You need at least 1 argument for this command. (type \'!help vote\' for more info)');
		}
		else 
		{
			switch (args[1])
			  case 'add':
			    // code block
			    break;
			  case 'remove':
			    // code block
			    break;
			  case 'start':
			    // code block
			    break;
			  default:
				message.reply('Your command isn\'t using proper arguments. (type \'!help vote\' for more info)');
			}
		}
	},
	previousVoteMessageId: '',
	init() {
		console.log('init command');
	}
};