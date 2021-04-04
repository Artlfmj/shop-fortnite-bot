const Discord = require('discord.js')
const superagent = require('superagent');

module.exports = {
    name: "updated",
    aliases: ["aliase"],
    description: "Envoie map",
    category: "fortnite",
    guildOnly: true,
    cooldown: 2,
    usage: "updated",
    run: async (client, message, args, user, text, prefix) => {
        
        const arguments = message.content.slice(prefix.length).trim().split(' ');
        message.delete();
        
        if (args[0] === 'last') {
            
            let Lastupdated = new Discord.MessageEmbed()
            .setTitle("Voici les cosmetiques mis à jour dans la derniere version")
	        .setImage('https://shopbot.ml/assets/updated/1610update.jpeg')
            .setTimestamp()
            .setColor("RANDOM")
            .setFooter('Copyright Intermarket 2021')
            message.channel.send(Lastupdated)
        }
        else if (args[0] === '16.10') {
            let Update = new Discord.MessageEmbed()
            .setTitle("Voici les cosmetiques mis à jour dans cette version")
            .setImage("https://shopbot.ml/assets/updated/1610update.jpeg")
            .setTimestamp()
            .setColor("RANDOM")
            .setFooter('Copyright Intermarket 2021')
            message.channel.send(Update)
        }
        else if (!args.length) {
            let Map = new Discord.MessageEmbed()
            .setTitle("Voici les sometiques mis à jour dans la derniere version")
            .setImage("https://shopbot.ml/assets/updated/1610update.jpeg")
            .setTimestamp()
            .setColor("RANDOM")
            .setFooter('Copyright Intermarket 2021')
            message.channel.send(Map)
        }
    },
};