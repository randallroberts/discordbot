module.exports = {
	name: 'addrole',
    description: 'Add a user to a role',
    usage: '[@role] [@user]',
    guildOnly: true,
	execute(message, args) {
        const user = message.mentions.members.first();
        const role = message.mentions.roles.first();
        
        if (!user || !role) throw 'Incorrect parameters';

        try {
            user.roles.add(role);
        }
        catch (error) {
            console.error(error);
            return message.channel.send(`I wasn't able to assign ${user.user.username} to ${role}!`);
        }

        message.channel.send(`User ${user.user.username} was added to ${role}!`);
	},
};