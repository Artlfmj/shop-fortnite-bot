const Discord = require('discord.js')
const superagent = require('superagent');

module.exports = {
    name: "map",
    aliases: ["aliase"],
    description: "Envoie map",
    category: "fortnite",
    guildOnly: true,
    cooldown: 2,
    usage: "map",
    run: async (client, message, args, user, text, prefix) => {
        
        const arguments = message.content.slice(prefix.length).trim().split(' ');
        message.delete();
        
        if (args[0] === 'normal') {
            let NormalMap = new Discord.MessageEmbed()
            .setTitle("Voici la map de Fortnite")
            .setImage("https://media.fortniteapi.io/images/map.png")
            .setTimestamp()
            .setColor("RANDOM")
            .setFooter('Copyright Intermarket 2021')
            message.channel.send(NormalMap)
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