let userList = require('../data/users.json');

module.exports = {
	name: 'whois',
    description: 'I\'ll tell you who that user is IRL',
    usage: '[user]',
	execute(message, args) {
        if (!Array.isArray(args) || args.length !== 1) throw 'Incorrect parameters';

        const user = message.mentions.users.first();
        userList["users"].forEach((person, key) => {
            if (person['username'].toLowerCase() === user.username.toLowerCase()) {
                return message.channel.send(`**${user['username']}**: ${userList['users'][key]['description']}`);
            }
        });
        
        if (!user) return message.channel.send(`Sorry, I don't know \`${username}\` yet, ${message.author}. Maybe someone can use !user [description] to introduce them to me?`);
	},
};