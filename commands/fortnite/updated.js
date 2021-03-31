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

        
        if (args[0] === 'last') {
            const attachment = new Discord.MessageAttachment('./db/updated/1610updated.jpeg', '1610.jpeg');
            let Lastupdated = new Discord.MessageEmbed()
            .setTitle("Voici les cosmetiques mis à jour dans cette version")
	        .setImage('attachment://1610.jpeg')
            .setTimestamp()
            .setColor("RANDOM")
            .setFooter('Copyright Intermarket 2021')
            message.channel.send(Lastupdated)
        }
        else if (args[0] === 'poi') {
            let POIMap = new Discord.MessageEmbed()
            .setTitle("Voici la map de Fortnite")
            .setImage("https://media.fortniteapi.io/images/map.png?showPOI=true")
            .setTimestamp()
            .setColor("RANDOM")
            .setFooter('Copyright Intermarket 2021')
            message.channel.send(POIMap)
        }
        else if (!args.length) {
            let Map = new Discord.MessageEmbed()
            .setTitle("Voici la map de Fortnite")
            .setImage("https://media.fortniteapi.io/images/map.png?showPOI=true")
            .setTimestamp()
            .setColor("RANDOM")
            .setFooter('Copyright Intermarket 2021')
            message.channel.send(Map)
        }
    },
};