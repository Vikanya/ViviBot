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
		console.log('channelID : ' + channelID);
		console.log('messageID : ' + messageID);

		const channel = message.channel.guild.channels.resolve(channelID);
		console.log('channel : ' + channel);
		channel.messages.fetch(messageID).then(linkedMessage => 
		{
			console.log('linked message : ' + linkedMessage.content);

			if (!linkedMessage.embeds) return;
			const youtubeEmbed = linkedMessage.embeds.find(embed => embed && embed.provider.name.toLowerCase() === 'youtube');
			console.log('found an embed : ' + youtubeEmbed);

			if (!youtubeEmbed) return;
			console.log('youtube');

			const newMessage = linkedMessage.channel.guild.channels.cache
				.find(chan => chan.type === 'text' && chan.name.toLowerCase() === "releases-list")
				.send(youtubeEmbed.url + '\nclique là pour la discussion => ' + linkedMessage.url);

		});
	},
};