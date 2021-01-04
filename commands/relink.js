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

		const channel = message.channel.guild.channels.resolve(channelID);
		console.log('channel : ' + channel);
		const linkedMessage = channel.fetch(messageID);
		console.log('linked message : ' + linkedMessage);

		if (!linkedMessage.embeds) return;
		const youtubeEmbed = linkedMessage.embeds.find(embed => embed && embed.provider.name.toLowerCase() === 'youtube');

		if (!youtubeEmbed) return;

		const newMessage = linkedMessage.channel.guild.channels.cache
			.find(chan => chan.type === 'text' && chan.name.toLowerCase() === "releases-list")
			.send(youtubeEmbed.url + '\nclique là pour la discussion => ' + linkedMessage.url);
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