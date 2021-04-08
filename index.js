const fs = require('fs');
const Discord = require('discord.js');
const Redis = require("ioredis");
const prefix = process.env.PREFIX;
const EMBED_WAIT = 5000;

const client = new Discord.Client();
const redis = new Redis(process.env.REDIS_URL);
redis.on('error', err => console.error('Redis connection error:', err));

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
	/*try {
		command.init();		
	} catch (error) {
	  console.error(command.name + ' does\'t have an init function: ' + error);
	}*/
}

client.adminCommands = new Discord.Collection();
const adminCommandFiles = fs.readdirSync('./adminCommands').filter(file => file.endsWith('.js'));
for (const file of adminCommandFiles) {
	const adminCommand = require(`./adminCommands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.adminCommands.set(adminCommand.name, adminCommand);
	/*try {
		command.init();		
	} catch (error) {
	  console.error(command.name + ' does\'t have an init function: ' + error);
	}*/
}

client.on('ready', () => {
	console.log('I am ready!');
});


client.on('message', message => {
	if (message.author.bot) return;

	if (message.channel.type === 'dm') {
		/// --------------------------------- HANDLE COMMANDS IN DM ---------------------------------
		if (message.content.startsWith(prefix)) {
			HandleCommands(message);
		}
		else 
		{/// ----------------------------------- HANDLE OTHER DMS -----------------------------------
			console.log(message.author.username + ' ' + message.content);
			return message.reply('Don\'t talk to me');
		}
		return;
	}
	

	/// -------------------------------------- HANDLE COMMANDS --------------------------------------
	if (message.content.startsWith(prefix)) {
		HandleCommands(message);
	}
	/// ---------------------------------- CHECK FOR YOUTUBE EMBEDS ---------------------------------
	else if (message.content.includes('http')){
		setTimeout(function(){ 
			if (!message.embeds || message.channel.name.toLowerCase() !== 'releases') return;
			const youtubeEmbed = message.embeds.find(embed => embed && embed.provider.name.toLowerCase() === 'youtube');

			if (!youtubeEmbed) return;

			const newMessage = message.channel.guild.channels.cache
				.find(chan => chan.type === 'text' && chan.name.toLowerCase() === "releases-list")
				.send(youtubeEmbed.url + '\nclique là pour la discussion => ' + message.url);
		}, EMBED_WAIT);
		
	}
	/// ------------------------------ CHECK MESSAGES IN WRONG CHANNEL ------------------------------
	else if (message.channel.name.toLowerCase() === 'releases-list') {
		setTimeout(function(){ 
			let wrongMessage = false;
			if (!message.embeds) wrongMessage = true;
			const youtubeEmbed = message.embeds.find(embed => embed && embed.provider.name.toLowerCase() === 'youtube');

			if (!youtubeEmbed) wrongMessage = true;

			console.log('message supprimé : ' + message.content + ' from ' + message.author.username);
			message.reply('👮‍♂️ Pour garder ce channel clean, on évite les messages de discussion.'
				+ '\nPour parler d\'une release, clique sur le lien à côté de celle ci dans ce channel.'
				+ '\n\nUne fois le message lu, clique sur la react ✔ pour effacer ce mesage et le tien.'
				+ '\n(Ils seront automatiquement effacés dans 100s)').then(newMessage => {
						newMessage.react('✔');
						try {
							const filter = (reaction, user) => {
								return ['✔'].includes(reaction.emoji.name) && user.id === message.author.id;
							};

							newMessage.awaitReactions(filter, { max: 1, time: 100000, errors: ['time'] })
							.then(collected => {
								const reaction = collected.first();

								message.delete();
								newMessage.delete();
							})
							.catch(collected => {
								message.delete();
								newMessage.delete();
							});
						} catch (error) {
							console.error(error);
						}
					});

			
			
		}, EMBED_WAIT);
	}
	/// ------------------------------------- CHECK BOT MENTIONS ------------------------------------
	else if (message.mentions.users.size) {
		if (message.mentions.users.first().equals(client.user)) {
			let resultMessage = message.cleanContent.replace(client.user.username, '').replace('@', '').toLowerCase().trim();
			
			if (resultMessage.includes('merci')) {
				return message.reply('de rien <:Finger_Guns:774245239178133515>');
			}
			//return message.channel.send(':robot: *Fired up and ready to serve.*');
		}
	}
});

// ================================================================================================== HANDLE COMMANDS FUNCTION
async function HandleCommands(message){
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();
	
	if (message.author.id == "115733686694969351")
	{
		console.log("author det");
		const adminCommand = client.adminCommands.get(commandName)
		|| client.adminCommands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (adminCommand)
		{
			if (adminCommand.args && !args.length) {
				let reply = `You didn't provide any arguments, ${message.author}  ᵇᵒˡᵒˢˢ`;
				
				if (adminCommand.usage) {
					reply += `\nThe proper usage would be: \`${prefix}${adminCommand.name} ${adminCommand.usage}\``;
				}

				return message.channel.send(reply);
			}
			
			try {
				return adminCommand.execute(message, args, redis);
			} catch (error) {
				console.error(error);
				return message.reply('There was an error trying to execute that command! (' + error.name + ': ' + error.message +')');
			}
		}
	}

	const command = client.commands.get(commandName)
	|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command)
	{/// ------------------------------ handle commands from setcommand ------------------------------
		//console.log("try get command " + commandName);
		let commandRedis = await redis.get(commandName);
		//console.log("command : " + commandRedis);
		if (commandRedis)
		{
			return message.channel.send(commandRedis);				
		}
		else
		{
			console.log("failed redis get : " + commandRedis);
		}
	}
	else 
	{/// ---------------------------------- handle regular commands ----------------------------------
		if (command.args && !args.length) {
			let reply = `You didn't provide any arguments, ${message.author}  ᵇᵒˡᵒˢˢ`;
			
			if (command.usage) {
				reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
			}

			return message.channel.send(reply);
		}
		
		try {
			return command.execute(message, args, redis);
		} catch (error) {
			console.error(error);
			return message.reply('There was an error trying to execute that command! (' + error.name + ': ' + error.message +')');
		}
	}
}

client.login(process.env.BOT_TOKEN);