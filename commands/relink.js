module.exports = {
	name: 'relink',
	description: 'Checks a linked message for a youtube embed and archives it.',
	args: true,
	usage: '<message link>',
	execute(message, args) {
		console.log(args);
		const channelID = args.substr(29);
		console.log(channelID);

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