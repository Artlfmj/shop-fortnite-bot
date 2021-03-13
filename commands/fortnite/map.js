const Discord = require('discord.js')
const superagent = require('superagent');

module.exports = {
    name: "map",
    aliases: ["aliase"],
    description: "Envoie map",
    category: "fortnite",
    guildOnly: true,
    cooldown: 2,
    usage: "s!map",
    run: async (client, message, args, user, text, prefix) => {
        let { body } = await superagent.get("https://fortnite-api.com/v1/map")
        if([args(0)] === "normal"){
            let NormalMap = new Discord.MessageEmbed()
            .setTitle("Voici la map de Fortnite")
            .setImage(body.data.images.blank)
            .setTimestamp()
            .setFooter('Copyright Intermarket 2021', 'https://cdn.discordapp.com/attachments/745266722692530259/768033163880300574/logo.png')
        }
        if([args(0)] === "noms"){
            let NormalMap = new Discord.MessageEmbed()
            .setTitle("Voici la map de Fortnite")
            .setImage(body.data.images.pois)
            .setTimestamp()
            .setFooter('Copyright Intermarket 2021', 'https://cdn.discordapp.com/attachments/745266722692530259/768033163880300574/logo.png')
        }
    },
};