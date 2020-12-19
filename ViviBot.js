const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();


client.on('ready', () => {
	console.log('I am ready!');
});


client.on('message', message => {
	if (message.content.startsWith(prefix + 'ping')) {
		message.reply('pong ' + message.content.slice(prefix.length + 4));
	}
});

client.login(process.env.BOT_TOKEN);