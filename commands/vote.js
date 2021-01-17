module.exports = {
	name: 'vote',
	description: 'Collection of commands to organise votes.',
	args: true,
	usage: '<command name> add "<emoji> <option name>" ["<emoji> <option name>"...]\n<command name> remove <emoji> [<emoji> <emoji>...]\n<command name> start',
	execute(message, args, keyv) {
		if (!keyv.get('qergserrgsegs').then(messageID => {
			if (messageID)
			{
				console.log(messageID);
				message.channel.messages.fetch(messageID).then(voteMessage => {
					if (args.length < 1)
					{
						message.reply('You need at least 1 argument for this command. (type \'!help vote\' for more info)');
					}
					else 
					{
						switch (args.shift().toLowerCase()){
						  case 'add':
						    let remainingArgs = '';
							args.forEach(element => remainingArgs += element);
							remainingArgs = remainingArgs.trim().split('"');
							remainingArgs.forEach(str => {
								console.log(str);
							});
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
				});
				return;
			}
			else 
			{
				this.fetch(message, args, keyv);
				return;
			}
		}))
		{
			this.fetch(message, args, keyv);
			return;
		}
		
	},
	fetch(message, args, keyv) {
		console.log('fetching for vote message');
		message.channel.messages.fetchPinned().then( messages =>
		{
			console.log('Received ' + messages.size + ' messages');
			let botMessages = messages.filter(m => m.author.bot && m.content.startsWith('[VOTE]'));
			console.log(botMessages.size + ' bot messages ' + botMessages);
			if (botMessages.size == 0)
			{
				message.channel.send('[VOTE]\nNo Vote options have been added.').then(voteMessage => 
				{
					botMessages.add(voteMessage);
					voteMessage.pin();
					keyv.set('qergserrgsegs', voteMessage.id);
				});
			}
			else 
			{
				keyv.set('qergserrgsegs', botMessages[0].id);
			}
		})
	},

};