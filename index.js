require('dotenv').config();
const cmdUtil = require ('./util');

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'good bot') {
    msg.channel.send(cmdUtil.goodBot());
  }

  //commands all require a ! in front, otherwise exit the event listener
  if (!msg.content.startsWith(cmdUtil.getPrefix()) || msg.author.bot) return;

  const args = msg.content.slice(cmdUtil.getPrefix().length).trim().split(' ');
  const cmd = args.shift().toLowerCase();
  let response = '';

  if (cmd === 'help') {
    response = cmdUtil.helpCommandAll();
  }
  else if (cmd.toLowerCase() === 'adddoggo') {
    if (!!args && args.length !== 1) {
      response = 'Sorry, I\'m confused. Here\'s what I need to do this:\n';
      response += (cmdUtil.helpCommand('addDoggo'));
    }
  }
  else {
    response = "How did you manage to submit a null value?! This is going in the log!"
  }
  
  response && msg.channel.send(response);
});

client.login(process.env.BOT_TOKEN);