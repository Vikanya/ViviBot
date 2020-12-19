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
		message.reply('Don\'t talk to me');
	}
	

	if (message.content.startsWith(prefix)) {
		const args = message.content.slice(prefix.length).trim().split(/ +/);
		const commandName = args.shift().toLowerCase();
		
		if (!client.commands.has(commandName)) return;

		const command = client.commands.get(commandName);

		if (command.args && !args.length) {
			let reply = `You didn't provide any arguments, ${message.author}!`;
		}

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
		
		try {
			command.execute(message, args);
		} catch (error) {
			console.error(error);
			message.reply('There was an error trying to execute that command!');
		}
	}
	else {
		if (message.mentions.users.size) {
			/* message.channel.send(message.mentions.users.first() + ' and ' + client.user
				+ ' test ' + (message.mentions.users.first().equals(client.user)));*/
			if (message.mentions.users.first().equals(client.user)) {
				return message.channel.send(':robot: *Fired up and ready to serve.*');
			}
		}
	}

});

client.login(process.env.BOT_TOKEN);