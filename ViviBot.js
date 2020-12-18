const Discord = require('discord.js');
// const { prefix, token } = require('./config.json');
const client = new Discord.Client();


client.on('ready', () => {
	console.log('I am ready!');
});


client.on('message', message => {
	if (message.content === 'ping') {
		message.reply('pong');
	}
});
/*
client.on('message', message => {
	if (message.content === `${prefix}ping`) {
		message.reply('pong');
	}
});*/

client.login(process.env.BOT_TOKEN);
//client.login('Nzg5MjE1NjI1MDExNTI3NzEx.X9u0Uw.22PNhXba_N2ynQDU0mMAmqooOUY');