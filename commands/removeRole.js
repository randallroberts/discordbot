module.exports = {
    name: 'removerole',
    aliases: ['remrole'],
    description: 'Remove a user from a role',
    usage: '[@role] [@user]',
	execute(message, args) {
        const user = message.mentions.members.first();
        const role = message.mentions.roles.first();
        
        if (!user || !role) throw 'Incorrect parameters';

        try {
            user.roles.remove(role);
        }
        catch (error) {
            console.error(error);
            return message.channel.send(`I wasn't able to remove ${user.user.username} from ${role}!`);
        }

        message.channel.send(`User ${user.user.username} was removed from ${role}!`);
	},
};