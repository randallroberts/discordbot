module.exports = {
	name: 'deleterole',
    description: 'Delete a role (remove all members first)',
    usage: '[@role]',
    guildOnly: true,
	execute(message, args) {
        const role = message.mentions.roles.first();
        if (!role) throw 'Incorrect parameters';

        if (role.members.size > 0) return message.channel.send("There are still users in this role. " + ((role.members.size > 1) ? "Are " : "Is ") + role.members.map(m=>m.user.tag).join(', ') + " ok with this role being deleted? If so, remove them first.");
        role.delete('The role needed to go')
        .then(deleted => message.channel.send(`${role} was BALEETED!`))
        .catch(console.error);
	},
};