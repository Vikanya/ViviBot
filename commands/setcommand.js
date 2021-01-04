module.exports = {
	name: 'setcommand',
	description: 'creates/changes a command that will make the bot say <something>.',
	args: true,
	usage: '<command name> <message>',
	execute(message, args, keyv) {
		if (args.length < 2)
		{
			message.reply('You need 2 arguments for this command. (type \'!help setcommand\' for more info)');
		}
		else 
		{
			let newCommandName = args.pop();
			let remainingArgs = '';
			args.forEach(element => remainingArgs += element + ' ');
			keyv.get(newCommandName).then(resultGet => {
				if (resultGet)
				{
					message.reply('Cette commande existe déjà, react ✔ pour la remplacer, ❌ pour annuler'
						+ ', ou 👀 pour voir la commande actuelle.').then(newMessage => {
								newMessage.react('✔');
								try {
									const filter = (reaction, user) => {
										return ['✔'].includes(reaction.emoji.name) && user.id === message.author.id;
									};

									newMessage.awaitReactions(filter, { max: 1, time: 100000, errors: ['time'] })
									.then(collected => {
										const result = keyv.set(newCommandName, remainingArgs);
										if (result)
										{
											newMessage.edit(newCommandName + ' command successfully set !');
										}
										else
										{
											newMessage.edit('There was an error setting the command');
										}
										newMessage.reactions.removeAll();
									})
									.catch(err => console.log('error : ' + err));
								} catch (error) {
									console.error(error);
								}

								newMessage.react('❌');
								try {
									const filter = (reaction, user) => {
										return ['❌'].includes(reaction.emoji.name) && user.id === message.author.id;
									};

									newMessage.awaitReactions(filter, { max: 1, time: 100000, errors: ['time'] })
									.then(collected => {
										newMessage.edit('Command edition aborted.');
										newMessage.reactions.removeAll();
									})
									.catch(err => console.log('error : ' + err));
								} catch (error) {
									console.error(error);
								}

								newMessage.react('👀');
								try {
									const filter = (reaction, user) => {
										return ['👀'].includes(reaction.emoji.name) && user.id === message.author.id;
									};

									newMessage.awaitReactions(filter, { max: 1, time: 100000, errors: ['time'] })
									.then(collected => {
										newMessage.edit('current command : \n' + resultGet);
										newMessage.reactions.cache.get('👀').remove();
									})
									.catch(err => console.log('error : ' + err));
								} catch (error) {
									console.error(error);
								}
							});
				}
				else 
				{
					const result = keyv.set(newCommandName, remainingArgs);
					if (result)
					{
						message.reply(newCommandName + ' command successfully set !');
					}
					else
					{
						message.reply('There was an error setting the command');
					}
				}
			});
		}
	},
};