const commandList = require('./data/commands.json');
const goodBot = require('./data/goodBot.json');
const prefix = commandList['prefix'];

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

