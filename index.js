require('dotenv').config();
const goodBot = require('./data/goodBot.json');
const commandList = require('./data/commands.json');

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'good bot') {
    msg.channel.send(goodBot['answers'][Math.floor(Math.random() * (goodBot['answers'].length))]);
  }

  const prefix = commandList['prefix'];

  //commands all require a ! in front, otherwise exit the event listener
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;

  const args = msg.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();

  if (command === 'help') {
    let response = 'Looks like you need a hand! Here\'s everything I know how to do:\n\n';
    commandList["commands"].forEach(item => {
      response += prefix + item["command"] + (!!item["params"].trim() ? ': ' + item["params"] : '') + '\n';
      response += item['desc'] + '\n\n';
    })
    // if (!args.length) {
    //   return msg.channel.send(`You didn't provide any arguments, ${msg.author}!`);
    // }
  
    msg.channel.send(response);
  }
});

client.login(process.env.BOT_TOKEN);