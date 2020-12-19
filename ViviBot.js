const Discord = require('discord.js');
const prefix = process.env.PREFIX;
const client = new Discord.Client();


client.on('ready', () => {
	console.log('I am ready!');
});


client.on('message', message => {
	if (message.author.bot) return;

	if (message.mentions.users.size) {
		/* message.channel.send(message.mentions.users.first() + ' and ' + client.user
			+ ' test ' + (message.mentions.users.first().equals(client.user)));*/
		if (message.mentions.users.first().equals(client.user)) {
			return message.channel.send(':robot: *Fired up and ready to serve.*');
		}
	}

	if (!message.content.startsWith(prefix)) return;

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
	else if (command === 'avatar') {
		message.channel.send('Your avatar');
		/*if (!message.mentions.users.size) {
			return message.channel.send('Your avatar: ' + message.author.displayAvatarURL({ format: 'png', dynamic: true }));
		}

		const avatarList = message.mentions.users.map(user => {
			return `${user.username}'s avatar: <${user.displayAvatarURL({ format: 'png', dynamic: true })}>`;
		});

		// send the entire array of strings as a message
		// by default, discord.js will `.join()` the array with `\n`
		message.channel.send(avatarList);*/
	}
});

client.login(process.env.BOT_TOKEN);