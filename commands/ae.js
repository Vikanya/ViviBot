const prefix = process.env.PREFIX;

module.exports = {
	name: 'ae',
	description: 'Naevis it\'s my Naevis, you lead, we follow.',
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
		let text = remainingArgs.replace(/a/g, "æ");


		message.channel.send(text, { split: true });
	},
};