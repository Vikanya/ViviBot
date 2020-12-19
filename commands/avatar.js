module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(message, args) {
			if (args.length) {
				message.reply('pong ' + args);
			}
			else {
				message.reply('pong');
			}
	},
};