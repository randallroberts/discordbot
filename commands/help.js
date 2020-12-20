const prefix = process.env.CMD_PREFIX

module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands'],
	usage: '[command name]',
	execute(message, args) {
		const data = [];
		const { commands } = message.client;

		//DM the entire command list to the user
		if (!args.length) {
			data.push('Here\'s a list of everything I can do:');
			data.push(commands.map(command => (command.name !== 'good bot' ? prefix : '') + command.name).join('\n'));
			data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);

			return message.author.send(data, { split: true })
				.then(() => {
					if (message.channel.type === 'dm') return;
					message.reply('I\'ve sent you a DM with all my commands!');
				})
				.catch(error => {
					console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
					message.reply('It seems like I can\'t DM you! Do you have DMs disabled?');
				}
			);
		}

		//Or if they're asking for a specific command, give them that info now
		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('I\'ve never heard of that. Maybe you should ask Randall.');
		}

		data.push(`**Name:** ${command.name}`);

		if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
		if (command.description) data.push(`**Description:** ${command.description}`);
		if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);
		data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);
		if (!command.guildOnly) data.push('You can also DM me this command');

		message.channel.send(data, { split: true });
	},
};