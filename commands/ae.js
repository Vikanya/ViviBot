const prefix = process.env.PREFIX;

module.exports = {
	name: 'ae',
	description: 'That\'s my Nævis it\'s my Nævis, you lead, we follow.',
	args: true,
	usage: '_[aefication level] <phrase>',
	execute(message, args) {
		const data = [];
		const { commands } = message.client;
		let level = 0;

		if (args[0][0] == "_") {
			level = args.shift();
		}

		let remainingArgs = '';
		args.forEach(element => remainingArgs += element + ' ');
		remainingArgs = remainingArgs.trim();
		
		console.log(remainingArgs);
		console.log(typeof remainingArgs);
		let text = remainingArgs.replace(/ae/g, "æ");
		text = text.replace(/a/g, "æ");
		text = text.replace(/Ae/g, "Æ");
		text = text.replace(/AE/g, "Æ");
		text = text.replace(/A/g, "Æ");


		message.channel.send(text, { split: true });
	},
};