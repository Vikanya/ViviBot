const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();


client.on('ready', () => {
	console.log('I am ready!');
});


client.on('message', message => {
	if (message.content === `${prefix}ping`) {
		message.reply('pong');
	}
});

client.login(process.env.BOT_TOKEN);