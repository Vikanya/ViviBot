/*var redisScan = require('redisscan');

module.exports = {
	name: 'setcommandlist',
	description: 'Lists all commands added with !setcommand.',
	execute(message, args, redis) {
		try
		{
			var listMess = '';
			redis.keys('*').then(res => {
				console.log(res.toString());
				console.log(res.toString().replace(/,/g, " | "));
				message.reply(res.toString().replace(/,/g, " | "));
			});

			//
		}
		catch (error) 
		{
			console.error(error);
			message.reply('Oups y a un truc qui a raté');
		}
	},
};*/