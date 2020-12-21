const fs = require('fs');
let insults = require('../data/insults.json');

module.exports = {
    name: 'addinsult',
    usage: '[compliment]',
	description: 'Say something nice and wholesome :)',
	execute(message, args) {
        insults['answers'].push(args.join(' '));
        
        fs.writeFile("./data/insults.json", JSON.stringify(insults), (err, data) => {
            if(err) {
                message.channel.send(`I couldn't add that vicious insult to my list.`);
                console.error(`Couldn't write ${args.join(' ')} to insults.json`);
            } else {
                message.channel.send('Aww, that was a nice one. Thanks for contributing <3');
            }
        });
	},
};