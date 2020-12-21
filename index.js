const fs = require('fs');
const Discord = require('discord.js');
const prefix = process.env.PREFIX;
const EMBED_WAIT = 3000;

const client = new Discord.Client();

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

client.on('ready', () => {
	console.log('I am ready!');
});


client.on('message', message => {
	if (message.author.bot) return;
	if (message.channel.type === 'dm') {
		return message.reply('Don\'t talk to me');
	}
	

	if (message.content.startsWith(prefix)) {
		const args = message.content.slice(prefix.length).trim().split(/ +/);
		const commandName = args.shift().toLowerCase();
		
		const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) return;



		if (command.args && !args.length) {
			let reply = `You didn't provide any arguments, ${message.author}  ᵇᵒˡᵒˢˢ`;
			
			if (command.usage) {
				reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
			}

			return message.channel.send(reply);
		}

		
		try {
			command.execute(message, args);
		} catch (error) {
			console.error(error);
			message.reply('There was an error trying to execute that command! (' + error.name + ': ' + error.message +')');
		}
	}
	else if (message.content.startsWith('http')){
		setTimeout(function(){ 
			if (!message.embeds || message.channel.name.toLowerCase() !== 'releases') return;
			const youtubeEmbed = message.embeds.find(embed => embed && embed.provider.name.toLowerCase() === 'youtube');

			if (!youtubeEmbed) return;

			const newMessage = message.channel.guild.channels.cache
				.find(chan => chan.type === 'text' && chan.name.toLowerCase() === "releases-list")
				.send(youtubeEmbed.url + '\nclique là pour la discussion => ' + message.url);
		}, EMBED_WAIT);
		
		/*
		try {
			
			const filter = (reaction, user) => {
				return ['❌'].includes(reaction.emoji.name) && user.id === message.author.id;
			};

			message.awaitReactions(filter, { max: 1, time: 600000, errors: ['time'] })
			.then(collected => {
				const reaction = collected.first();

				message.channel.send('you reacted');
			})
			.catch(collected => {
				message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
			});
		} catch (error) {
			console.error(error);
		}*/
	}
	else if (message.channel.name.toLowerCase() === 'releases-list') {
		setTimeout(function(){ 
			let wrongMessage = false;
			if (!message.embeds) wrongMessage = true;
			const youtubeEmbed = message.embeds.find(embed => embed && embed.provider.name.toLowerCase() === 'youtube');

			if (!youtubeEmbed) wrongMessage = true;

			console.log('message supprimé : ' + message.content);
			message.reply('👮‍♂️ Pour garder ce channel clean, on évite les messages de discussion.'
				+ '\nPour parler d\'une release, clique sur le lien à côté de celle ci dans ce channel.'
				+ '\n\nUne fois le message lu, clique sur la react ✔ pour effacer ce mesage et le tien.'
				+ '\n(Ils seront automatiquement effacés dans 100s)').then(newMessage => {
						newMessage.react('✔');
						try {
							const filter = (reaction, user) => {
								return ['✔'].includes(reaction.emoji.name) && user.id === message.author.id;
							};

							newMessage.awaitReactions(filter, { max: 1, time: 100000, errors: ['time'] })
							.then(collected => {
								const reaction = collected.first();

								message.delete();
								newMessage.delete();
							})
							.catch(collected => {
								message.delete();
								newMessage.delete();
							});
						} catch (error) {
							console.error(error);
						}
					});

			
			
		}, EMBED_WAIT);
	}
	else if (message.mentions.users.size) {
		/* message.channel.send(message.mentions.users.first() + ' and ' + client.user
			+ ' test ' + (message.mentions.users.first().equals(client.user)));*/
		if (message.mentions.users.first().equals(client.user)) {
			const resultMessage = message.cleanContent.trim().replace(client.user.username, '').replace('@', '').toLowerCase().trim();
			console.log('\'' + message.cleanContent + '\' remove \'' + (client.user.username) + '\' = \'' + resultMessage + '\'');
			if (resultMessage.trim() === 'merci') return message.reply('de rien :Finger_Guns:');
			return message.channel.send(':robot: *Fired up and ready to serve.*');
		}
	}
});

client.login(process.env.BOT_TOKEN);