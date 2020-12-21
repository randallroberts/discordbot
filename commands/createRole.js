module.exports = {
	name: 'createrole',
    description: 'Create a new role (no spaces)',
    usage: '[role]',
    guildOnly: true,
	execute(message, args) {
        if (!Array.isArray(args) || args.length !== 1) throw 'Incorrect parameters';

        try {
            message.guild.roles.create({
                data: {
                    name: args[0],
                    color: "grey",
                },
                reason: args[0],
            })
        }
        catch (error) {
            console.error(error);
            return message.channel.send(`I wasn't able to create ${args[0]}!`);
        }

        message.channel.send(`${args[0]} was created.`);
	},
};