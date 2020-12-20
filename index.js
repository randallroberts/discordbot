require('dotenv').config();
const prefix = process.env.CMD_PREFIX;
const fs = require('fs');
// const cmdUtil = require ('./util');
const Discord = require('discord.js');

const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
  //Commands all require a ! in front, otherwise exit the event listener
  //Exception added for "Good bot" command (no prefix)
  //TO DO: Refactor exception commands into an array, if more are added later
  if ((!message.content.startsWith(prefix)
    && message.content.toLowerCase() !== 'good bot')
    || message.author.bot) return;

  let args;
  let cmdName;
  if (message.content.toLowerCase() !== 'good bot') {
    args = message.content.slice(prefix.length).trim().split(/ +/);
    cmdName = args.shift().toLowerCase();
  } else {
    args = [];
    cmdName = 'good bot';
  }
  
  //Get command, and check for command aliases
  const command = client.commands.get(
    cmdName) || 
    client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName)
  );
  if (!command) return;

  //If a command disallows DM execution, let the user know
  if (command.guildOnly && message.channel.type === 'dm') {
    return message.reply(`I'm sorry ${message.author}, I'm afraid I can't do that here. http://gph.is/28RqP3Q`);
  }

  //Validate arguments before executing
  if (command.args && !args.length) {
    let reply = `I need more information, ${message.author}!`;
    
    if (command.usage) {
      reply += `\nHere's what I need to know: \`${prefix}${command.name} ${command.usage}\``;
    }
    
    return message.channel.send(reply);
  }

  //Check if the command is still in cooldown for that user
  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }
  
  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || process.env.COOLDOWN_DEFAULT) * 1000;
  
  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(`I need a quick break, how about giving me ${timeLeft.toFixed(1)} more second(s) to catch my breath before I run \`${command.name}\`?`);
    }
  } else {
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  }

  //Run the command
  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('I don\'t know how to do that. Try !help so I can understand better.');
  }
});

client.login(process.env.BOT_TOKEN);