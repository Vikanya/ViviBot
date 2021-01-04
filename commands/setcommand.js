module.exports = {
	name: 'setcommand',
	description: 'creates/changes a command that will make the bot say <something>.',
	args: true,
	usage: '<command name> <message>',
	execute(message, args, keyv) {
		if (args.length != 2)
		{
			message.reply('You need 2 arguments for this command. (type \'!help setcommand\' for more info)');
		}
		else 
		{
			keyv.get(args[0]).then(resultGet => {
				console.log(resultGet);
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
										const result = keyv.set(args[0], args[1]);
										if (result)
										{
											newMessage.edit(args[0] + ' command successfully set !');
										}
										else
										{
											newMessage.edit('There was an error setting the command');
										}
									})
									.catch(console.error);
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
									})
									.catch(console.error);
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
										newMessage.edit(resultGet);
									})
									.catch(console.error);
								} catch (error) {
									console.error(error);
								}
							});
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
			});
		}
	},
};