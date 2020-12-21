let insults = require('../data/insults.json');

module.exports = {
    name: 'insult',
    aliases: ['compliment'],
    usage: '',
    description: "Git'm gud",
    cooldown: 2,
	execute(message, args) {
		message.channel.send(insults['answers'][Math.floor(Math.random() * (insults['answers'].length))]);
	},
};