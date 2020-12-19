require('dotenv').config();
const goodBot = require('./data/goodBot.json');

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'good bot') {
    msg.channel.send(goodBot['answers'][Math.floor(Math.random() * (goodBot['answers'].length))]);
  }
});

client.login(process.env.BOT_TOKEN);