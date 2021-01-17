module.exports = {
	name: 'vote',
	description: 'Collection of commands to organise votes.',
	args: true,
	usage: '<command name> add <emoji> <option name> [<emoji> <option name>...]\n<command name> remove <emoji> [<emoji> <emoji>...]\n<command name> start',
	execute(message, args, keyv) {
		console.log(this.previousVoteMessage);
		if (this.previousVoteMessage === ''){
			keyv.get('qergserrgsegs').then(messageID => {
				if (messageID)
				{
					this.previousVoteMessage = messageID;
					//this.execute(message, args, keyv);
					return;
				}
				else 
				{
					this.fetch(message, args, keyv);
					//this.execute(message, args, keyv);
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
	previousVoteMessage: '',
	fetch(message, args, keyv) {
		console.log('fetching for vote message');
		message.channel.messages.fetchPinned().then( messages =>
		{
			console.log('Received ' + messages.size + ' messages');
			let botMessages = messages.filter(m => m.author.bot && m.content.startsWith('[VOTE]'));
			console.log(botMessages.size + ' bot messages');
			if (botMessages.size == 0)
			{
				message.channel.send('[VOTE]\nNo Vote options have been added.').then(voteMessage => 
				{
					botmessages.add(previousVoteMessage);
					this.previousVoteMessage.pin();
				});
			}
			this.previousVoteMessage = voteMessage;
			console.log(this.previousVoteMessage);
		})
	},

};