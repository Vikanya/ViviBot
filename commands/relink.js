module.exports = {
	name: 'relink',
	description: 'Checks a linked message for a youtube embed and archives it.',
	args: true,
	usage: '<message link>',
	execute(message, args) {
		console.log(args);
		let IDs =  args[0].substr(29).split('/');
		console.log(IDs);
		const channelID = IDs[1];
		const messageID = IDs[2];
		console.log(channelID);
		console.log(messageID);

/*
		if (isNaN(amount)) {
			return message.reply('that doesn\'t seem to be a valid number.');
		} else if (amount <= 1 || amount > 100) {
			return message.reply('you need to input a number between 1 and 99.');
		}

		message.channel.bulkDelete(amount, true).catch(err => {
			console.error(err);
			message.channel.send('there was an error trying to prune messages in this channel! (' + err.code + ': ' + err.method +')');
		});*/
	},
};