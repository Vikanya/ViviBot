module.exports = {
	name: 'setcommandlist',
	description: 'Lists all commands added with the !setcommand command.',
	execute(message, args, keyv) {
		try
		{
			console.log(keyv.opts.store.query('SELECT * FROM keyv;'));
		}
		catch (error) 
		{
			console.error(error);
			message.reply('En fait c\'est pas possible avec le système que j\'utilise.');
		}
	},
};