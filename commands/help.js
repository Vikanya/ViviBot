const prefix = process.env.PREFIX;

module.exports = {
	name: 'help',
	description: 'List all commands or gives info bout a specific command.',
	usage: '[command name]',
	execute(message, args) {
		const data = [];
		const { commands } = message.client;

		if (!args.length) {
			data.push('> __**Command list :**__');
			data.push(commands.map(command => command.name).join('\n'));
			data.push(`\nUse \'${prefix}help [command name]\' to get info on a specific command`);

			return message.channel.send(data, { split: true });	
		}
		else {
			const name = args[0].toLowerCase();
			const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

			if (!command) {
				return message.reply('There\'s no command with this name or alias');
			}

			data.push(`> __**Name:**__ ${command.name}\n`);

			if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
			if (command.description) data.push(`**Description:** ${command.description}`);
			if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

			message.channel.send(data, { split: true });
		}
	},
};