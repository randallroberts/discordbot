const fs = require('fs');
let insults = require('../data/insults.json');

module.exports = {
	name: 'reminsult',
	aliases: ['removeinsult'],
    usage: '[string (exact)]',
	description: 'Remove that vicious reprimand you added',
	execute(message, args) {
        const comment = args.join(' ');
        insults['answers'].pop(comment);
        fs.writeFile("./data/insults.json", JSON.stringify(insults), (err, data) => {
            if(err) {
                message.channel.send(`I couldn't remove ${comment}. :'( `);
                console.error(`Couldn't write ${comment} to insults.json`);
            } else {
                message.channel.send('Was it that bad?! :-O');
            }
        });
	},
};