module.exports = {
	name: 'vote',
	description: 'Collection of commands to organise votes.',
	args: true,
	usage: '<command name> add <emoji> <option name> [<emoji> <option name>...]\n<command name> remove <emoji> [<emoji> <emoji>...]\n<command name> start',
	execute(message, args, keyv) {
		if (previousVoteMessageId == ''){
			keyv.get('qergserrgsegs').then(resultGet => {
				if (messageID)
				{
					previousVoteMessageId = messageID;
					execute(message, args, keyv);
					return;
				}
				else 
				{
					fetch(message, keyv);
					execute(message, args, keyv);
					return;
				}
			});
		}
		if (args.length < 1)
		{
			message.reply('You need at least 1 argument for this command. (type \'!help vote\' for more info)');
		}
		else 
		{
			switch (args[1]){
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
	fetch(message, keyv) {
		console.log('fetching for vote message');
		message.channel.messages.fetchPinned().then( messages =>
		{
			console.log('Received ' + messages.size + ' messages');
		})
	}
};