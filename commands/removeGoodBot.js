const fs = require('fs');
let goodBot = require('../data/goodBot.json');

module.exports = {
	name: 'remgoodbot',
	aliases: ['removegoodbot'],
    usage: '[url]',
	description: 'Remove a giphy response to the Good Bot command',
	execute(message, args) {
		if (!Array.isArray(args) || args.length !== 1) throw 'Incorrect parameters';

        const url = args[0].toLowerCase();
        goodBot['answers'].pop(url);
        fs.writeFile("./data/goodBot.json", JSON.stringify(goodBot), (err, data) => {
            if(err) {
                message.channel.send(`I couldn't remove ${url}. :'( `);
                console.error(`Couldn't write ${url} to goodBot.json`);
            } else {
                message.channel.send('Removed that response, but I\'m still a good bot!');
            }
        });
	},
};