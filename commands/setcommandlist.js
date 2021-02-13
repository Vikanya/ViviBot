var redisScan = require('redisscan');

module.exports = {
	name: 'setcommandlist',
	description: 'Lists all commands added with !setcommand.',
	execute(message, args, redis) {
		try
		{
			var listMess = '';
			redis.keys('*').then(res => message.reply(res.toString().replace(',', " | ")));

			//
			/*redis.opts.store.query('SELECT * FROM redis;').then(keys => {
				let finalString = '';
				keys.forEach(element => finalString += element.key.toString().replace('redis:', '') + ', ');
				//console.log(finalString);
				return message.reply(finalString);
			}).catch(err => {
				console.log("failed redis all query : " + err)
			});*/
		}
		catch (error) 
		{
			console.error(error);
			message.reply('Oups y a un truc qui a raté');
		}
	},
};