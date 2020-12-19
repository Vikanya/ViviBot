const Discord = require('discord.js');
const prefix = process.env.PREFIX;
const client = new Discord.Client();


client.on('ready', () => {
	console.log('I am ready!');
});


client.on('message', message => {
	if (message.mentions.users.size) {
		message.channel.send(message.mentions.users[0] + ' and ' + client.user);
		if (message.mentions.users[0] === client.user) {
			return message.channel.send(':robot: Fired up and ready to serve.');
		}
	}

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
	if (command === 'ping') {
		if (args.length) {
			message.reply('pong ' + args);
		}
		else {
			message.reply('pong');
		}
	}
});

client.login(process.env.BOT_TOKEN);