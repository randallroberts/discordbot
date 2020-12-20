const fs = require('fs');
const commandList = require('./data/commands.json');
let goodBot = require('./data/goodBot.json');
const prefix = commandList['prefix'];

function addGoodBot(url) {
    goodBot['answers'].push(url);
    fs.writeFile("./data/goodBot.json", JSON.stringify(goodBot), (err, data) => {
        if(err) {
            console.error("File not found, or the write failed", err);
            return false;
        } else {
            return true;
        }
    });
}

function getCommand(cmd) {
    return commandList['commands'][cmd];
}

function helpCommand (cmd) {
    const command = getCommand(cmd);
    let response = prefix + cmd + (!!command['params'].trim() ? ': ' + command['params'] : '') + '\n';
    response += command['desc'] + '\n\n';
    
    return (response);
}

module.exports = {

    addDoggo: (url) => {
        return addGoodBot(url) ? "Oh boy, oh boy, oh boy!" : 'Uh oh, that didn\'t work...';
    },

    getCommands: () => {
        return Object.entries(commandList['commands']);
    },

    getPrefix: () => {
        return prefix;
    },

    goodBot: () => {
        return goodBot['answers'][Math.floor(Math.random() * (goodBot['answers'].length))];
    },

    helpCommand: helpCommand,

    helpCommandAll: function helpCommandAll() {
        let response = 'Looks like you need a hand! Here\'s everything I know how to do:\n\n';
        Object.keys(commandList['commands']).forEach(item => {
            response += helpCommand(item);
        })
        return response;
    },
};

