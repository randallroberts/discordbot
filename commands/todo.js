let goodBot = require('../data/goodBot.json');

module.exports = {
    name: 'todo',
    usage: '',
    description: 'What is Randall going to add next?',
    cooldown: 2,
	execute(message, args) {
        let response = '* Create Channel (require 4+ votes for, by counting emojis)\n';
        response += '* Anonymous feedback, possibly added to this to-do list (Can be done by PM for privacy)\n';
        response += '* Test cooldown default vs specific cooldowns\n';

		message.channel.send(response);
	},
};