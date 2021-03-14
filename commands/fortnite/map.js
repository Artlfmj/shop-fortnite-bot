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

        let { body } = await superagent.get("https://fortnite-api.com/v1/map")
        if (args[0] === 'normal') {
            let NormalMap = new Discord.MessageEmbed()
            .setTitle("Voici la map de Fortnite")
            .setImage(body.data.images.blank)
            .setTimestamp()
            .setColor("RANDOM")
            .setFooter('Copyright Intermarket 2021', 'https://cdn.discordapp.com/attachments/745266722692530259/768033163880300574/logo.png')
            message.channel.send(NormalMap)
        }
        else if (args[0] === 'poi') {
            let POIMap = new Discord.MessageEmbed()
            .setTitle("Voici la map de Fortnite")
            .setImage(body.data.images.pois)
            .setTimestamp()
            .setColor("RANDOM")
            .setFooter('Copyright Intermarket 2021', 'https://cdn.discordapp.com/attachments/745266722692530259/768033163880300574/logo.png')
            message.channel.send(POIMap)
        }
        else if (!args.length) {
            let Map = new Discord.MessageEmbed()
            .setTitle("Voici la map de Fortnite")
            .setImage(body.data.images.pois)
            .setTimestamp()
            .setColor("RANDOM")
            .setFooter('Copyright Intermarket 2021', 'https://cdn.discordapp.com/attachments/745266722692530259/768033163880300574/logo.png')
            message.channel.send(Map)
        }
    },
};