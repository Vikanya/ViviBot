const prefix = process.env.PREFIX;

module.exports = {
	name: 'ae',
	description: 'That\'s my Nævis it\'s my Nævis, you lead, we follow.',
	args: true,
	usage: '_[aefication level] <phrase>',
	execute(message, args) {
		const data = [];
		const { commands } = message.client;
		let level = 1;

		if (args[0][0] == "_") {
			level = args.shift().replace("_", "");
		}

		let remainingArgs = '';
		args.forEach(element => remainingArgs += element + ' ');
		remainingArgs = remainingArgs.trim();
		
		console.log(remainingArgs);
		console.log(level);
		console.log(typeof level);
		let text = remainingArgs.replace(/ae/g, "æ");
		text = text.replace(/a/g, "æ");
		text = text.replace(/Ae/g, "Æ");
		text = text.replace(/AE/g, "Æ");
		text = text.replace(/A/g, "Æ");
		if (level >= 2)
		{
			text = text.replace(/oe/g, "œ");
			text = text.replace(/o/g, "œ");
			text = text.replace(/Oe/g, "Œ");
			text = text.replace(/OE/g, "Œ");
			text = text.replace(/O/g, "Œ");
			text = text.replace(/ue/g, "ᵫ");
			text = text.replace(/u/g, "ᵫ");
			text = text.replace(/Ue/g, "ᵫ");
			text = text.replace(/UE/g, "ᵫ");
			text = text.replace(/U/g, "ᵫ");
		}

		message.channel.send(text, { split: true });
	},
};