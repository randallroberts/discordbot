module.exports = {
    name: 'addGoodBot',
    usage: '<url>',
	description: 'Add a giphy response to the Good Bot command',
	execute(message, args) {
		message.channel.send('Pong.');
	},
};