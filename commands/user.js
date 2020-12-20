const fs = require('fs');
let userList = require('../data/users.json');

module.exports = {
	name: 'user',
    description: 'Give me a description of this user so we can be frens!',
    usage: '[user (tag them with @)] [description (all remaining text)]',
	execute(message, args) {
        if (args.length < 2 ) throw 'Incorrect parameters';
        
        const user = message.mentions.users.first();
        if (!user) return message.channel.send(`Who are we talking about? @Tag the user for this description please!`);

        let didChange = false;

        userList["users"].forEach((person, key) => {
            if (person['username'].toLowerCase() === user.username.toLowerCase()) {
                userList['users'][key]['description'] = args.join(' ');
                didChange = true;
            }
        });

        if (!didChange) {
            newUser = {
                "username": user.username,
                "description": args.join(' ')
            }
            userList['users'].push(newUser);
        }
        
        fs.writeFile("./data/users.json", JSON.stringify(userList), (err, data) => {
            if (err) {
                message.channel.send(`I couldn't add that description. :'( `);
                console.error(`Couldn't write ${url} to users.json`);
            } else {
                message.channel.send(`Thanks! I love learning more about ${user.username}!`);
            }
        });
	},
};