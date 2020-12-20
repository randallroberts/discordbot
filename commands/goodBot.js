let goodBot = require('../data/goodBot.json');

module.exports = {
    name: 'good bot',
    aliases: ['goodbot'],
    usage: '',
    description: 'Tell me I\'m a good bot',
    cooldown: 2,
	execute(message, args) {
		message.channel.send(goodBot['answers'][Math.floor(Math.random() * (goodBot['answers'].length))]);
	},
};