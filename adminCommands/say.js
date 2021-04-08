module.exports = {
	name: 'say',
	description: 'Makes the bot say a message in trhe specified channel.',
	args: true,
	usage: '<server id> <channel id> <mesage>',
	execute(message, args) {
		server = message.guild;
		channel = message.channel;

		console.log("say " + message.client);

		if (args[0].length == 18 && !isNaN(args[0]))
		{
			if (args[1].length == 18 && !isNaN(args[1]))
			{
				server = message.client.guilds.resolve(args.shift());
				channel = server.channels.resolve(args.shift());
			}
			else 
			{
				channel = server.channels.resolve(args.shift());
			}
		}

		let remainingArgs = '';
		args.forEach(element => remainingArgs += element + ' ');
		remainingArgs = remainingArgs.trim();

		channel.send(remainingArgs);
			

	},
};