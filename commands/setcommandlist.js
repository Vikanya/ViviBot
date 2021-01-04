module.exports = {
	name: 'setcommandlist',
	description: 'Lists all commands added with the !setcommand command.',
	execute(message, args, keyv) {
		try
		{
			keyv.opts.store.query('SELECT * FROM keyv;').then(keys => {
				let finalString = '';
				keys.forEach(element => finalString += element.key + ', ');
				console.log(finalString);				
			});
		}
		catch (error) 
		{
			console.error(error);
			message.reply('En fait c\'est pas possible avec le système que j\'utilise.');
		}
	},
};