const prefix = process.env.PREFIX;

module.exports = {
	name: 'curse',
	description: 'Curse your text.',
	args: true,
	usage: '<phrase>',
	execute(message, args) {
		const data = [];
		const { commands } = message.client;

		let level = 5;

		if (args[0][0] == "_") {
			level = args.shift().replace("_", "");
		}

		let remainingArgs = '';
		args.forEach(element => remainingArgs += element + ' ');
		remainingArgs = remainingArgs.trim();
		
		console.log(remainingArgs + " " + remainingArgs.length);

		for (let i = remainingArgs.length; i > 0; i--) 
		{
			//console.log("before " + remainingArgs);
			let text = remainingArgs.slice(0, i);

			for (let j = 0; j < level; j++)
			{
 				text += String.fromCharCode(Math.ceil(Math.random() * (879 - 768) + 768));
			} 
 			text += remainingArgs.slice(i);

 			remainingArgs = text;
 			//remainingArgs = remainingArgs.slice(0, i) + String.fromCharCode(Math.ceil(Math.random() * (879 - 768) + 768)) + remainingArgs.slice(i);
			//console.log("after  " + remainingArgs);
		}

		

		message.channel.send(remainingArgs, { split: true });
	},
};