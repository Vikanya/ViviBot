module.exports = {
	name: 'vote',
	description: 'Collection of commands to organise votes.\n__add__: edits the vote message ',
	args: true,
	usage: '<command name> add "<emoji> <option name>" ["<emoji> <option name>"...]\n<command name> remove "<emoji>" ["<emoji>" "<emoji>"...]\n<command name> start',
	
	header: '[VOTE]',
	execute(message, args, keyv, tryfetch = true) {
		if (!keyv.get('qergserrgsegs').then(messageID => {
			if (messageID)
			{
				console.log('id from keyv : ' + messageID);
				message.channel.messages.fetch(messageID).then(voteMessage => {
					if (args.length < 1)
					{
						message.reply('You need at least 1 argument for this command. (type \'!help vote\' for more info)');
					}
					else 
					{
						console.log(voteMessage);
						console.log(voteMessage.content);
						let currentVotes = voteMessage.content.replace(this.header, '').split('\n');

					    let remainingArgs = '';
						switch (args.shift().toLowerCase()){

						  case 'add':
						    
						    remainingArgs = '';
							args.forEach(element => remainingArgs += element);
							remainingArgs = remainingArgs.trim().split('"');
							
							let voteStr1 = '';
							remainingArgs.forEach(async str => {
								console.log(str);
								if (str.length > 0)
								{
									let emoji = str.split('/')[0];
									let name = str.split('/')[1];
									console.log("emoji: " + emoji + " /name: " + name);

									if (currentVotes.every(vote => !vote.includes(emoji)))
									{
										voteStr1 += '\n' + emoji + ' ' + name;
									}/*
									else 
									{
										message.react(emoji);
									}*/

									await voteMessage.react(emoji);
									console.log("reacted ");
								}
							});
							voteMessage.edit(voteMessage.content + voteStr1);
						    break;

						  case 'remove':

						    remainingArgs = '';
							args.forEach(element => remainingArgs += element);
							remainingArgs = remainingArgs.trim().split('"');
							
							remainingArgs.forEach(async str => {
								console.log(str);
								if (str.length > 0)
								{
									console.log("emoji: " + str);

									currentVotes = currentVotes.filter(vote => !vote.includes(str));
									/*
									else 
									{
										message.react(emoji);
									}*/

									await voteMessage.reactions.cache.get(str => str += '\n').remove();
									console.log("reacted ");
								}
							});
							voteMessage.edit(this.header + currentVotes.map().concat());
						    break;

						  case 'start':
						    // code block
						    break;
						  default:
							message.reply('Your command isn\'t using proper arguments. (type \'!help vote\' for more info)');
						}
					}
				}).catch(err => {
					console.log('fetch 1 ' + err);
					if (tryfetch)
					{
						this.fetch(message, args, keyv);
					}
				});
				return;
			}
			else 
			{
				console.log('fetch 2');
				if (tryfetch)
				{
					this.fetch(message, args, keyv);
				}
				return;
			}
		}))
		{
			console.log('fetch 3');
			if (tryfetch)
			{
				this.fetch(message, args, keyv);
			}
			return;
		}
		
	},
	async fetch(message, args, keyv) {
		console.log('fetching for vote message');
		message.channel.messages.fetchPinned().then( messages =>
		{
			console.log('Received ' + messages.size + ' messages');
			let botMessages = messages.filter(m => m.author.bot && m.content.startsWith(this.header));
			console.log(botMessages.size + ' bot messages ' + botMessages);
			if (botMessages.size == 0)
			{
				message.channel.send(this.header).then(voteMessage => 
				{
					voteMessage.pin();
					console.log('1/id ' + voteMessage.id);
					keyv.set('qergserrgsegs', voteMessage.id).then(this.execute(message, args, keyv, true));
				});
			}
			else 
			{
				console.log('2/id ' + botMessages.first().id);
				keyv.set('qergserrgsegs', botMessages.first().id).then(this.execute(message, args, keyv, true));
			}
		})
	},

};