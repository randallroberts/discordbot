const fs = require('fs');
let goodBot = require('../data/goodBot.json');

module.exports = {
    name: 'addgoodbot',
    usage: '[url]',
	description: 'Add a giphy response to the Good Bot command',
	execute(message, args) {
        if (!Array.isArray(args) || args.length !== 1) throw 'Incorrect parameters';

        const url = args[0].toLowerCase();
        goodBot['answers'].push(url);
        fs.writeFile("./data/goodBot.json", JSON.stringify(goodBot), (err, data) => {
            if(err) {
                message.channel.send('I couldn\'t add this. :\'( ');
                console.error(`Couldn't write ${url} to goodBot.json`);
            } else {
                message.channel.send('Oh boy, oh boy, oh boy!');
            }
        });
	},
};