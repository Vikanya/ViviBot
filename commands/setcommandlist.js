module.exports = {
	name: 'setcommandlist',
	description: 'Lists all commands added with !setcommand.',
	execute(message, args, keyv) {
		try
		{
			console.log("keyv : " + keyv);
			console.log("status : " + keyv.toString());
			keyv.opts.store.query('SELECT * FROM keyv;').then(keys => {
				let finalString = '';
				keys.forEach(element => finalString += element.key.toString().replace('keyv:', '') + ', ');
				//console.log(finalString);
				return message.reply(finalString);
			}).catch(err => {
				console.log("failed keyv all query : " + err)
			});
		}
		catch (error) 
		{
			console.error(error);
			message.reply('Oups y a un truc qui a raté');
		}
	},
};