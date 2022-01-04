const prefix = process.env.PREFIX;

module.exports = {
	name: 'cartonrouge',
	description: 'CARTON ROUGE',
	args: true,
	usage: '<user> [max messages (15)] [max time (120 sec)]',
	execute(message, args) {

			if (!message.mentions.users.size) {
				return message.channel.send('Mentionne la personne à sanctionner stp.');
			}

			let maxMessage = 15;
			let maxTime = 120;

			if (args[0] && !isNaN(args[0]))
			{
				maxMessage = Math.min(args[0], 100);
			}
			if (args[1] && !isNaN(args[1]))
			{
				maxTime = Math.min(args[1], 300);
			}

			const filter = m => (m.author == message.mentions.users[1]);
			const collector = message.channel.createMessageCollector({ filter, time: maxTime });

			collector.on('collect', m => {
				console.log(`Collected ${m.content}`);
			});

			collector.on('end', collected => {
				console.log(`Collected ${collected.size} items`);
			});
	},
};