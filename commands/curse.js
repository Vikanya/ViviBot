const prefix = process.env.PREFIX;

module.exports = {
	name: 'curse',
	description: 'Curse your text.',
	args: true,
	usage: '<phrase>',
	execute(message, args) {
		const data = [];
		const { commands } = message.client;


		let remainingArgs = '';
		args.forEach(element => remainingArgs += element + ' ');
		remainingArgs = remainingArgs.trim();
		
		console.log(remainingArgs + " " + remainingArgs.length);

		for (let i = remainingArgs.length - 1; i >= 0; i--) 
		{
			console.log("before " + remainingArgs);
 			remainingArgs = remainingArgs.slice(0, i) + "\u0" + (Math.ceil(Math.random() * (879 - 768) + 768)).toString(16) + remainingArgs.slice(i);
			console.log("after  " + remainingArgs);
		}

		

		message.channel.send(remainingArgs, { split: true });
	},
};