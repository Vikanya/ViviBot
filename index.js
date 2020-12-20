const fs = require('fs');
const Discord = require('discord.js');
const prefix = process.env.PREFIX;

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
		if (!message.embeds || message.channel.name.toLowerCase() !== 'releases') return;
		const youtubeEmbed = message.embeds.find(embed => embed && embed.provider.name.toLowerCase() === 'youtube');

		if (!youtubeEmbed) return;

		await const newMessage = message.channel.guild.channels.cache
			.find(chan => chan.type === 'text' && chan.name.toLowerCase() === "releases-list")
			.send(youtubeEmbed.url + '\noriginal mesage : ' + message.url)
			.then(mess => mess.react('❌'));
		
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
	else if (message.mentions.users.size) {
		/* message.channel.send(message.mentions.users.first() + ' and ' + client.user
			+ ' test ' + (message.mentions.users.first().equals(client.user)));*/
		if (message.mentions.users.first().equals(client.user)) {
			return message.channel.send(':robot: *Fired up and ready to serve.*');
		}
	}
});

client.login(process.env.BOT_TOKEN);