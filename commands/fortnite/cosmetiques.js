///https://fortnite-api.com/v2/cosmetics/br

const Discord = require('discord.js')
const superagent = require('superagent');

module.exports = {
    name: "cosmetiques",
    aliases: ["aliase"],
    description: "Envoie cosmetiques",
    category: "fortnite",
    guildOnly: true,
    cooldown: 2,
    usage: "modes",
    run: async (client, message, args, user, text, prefix) => {
        const arguments = message.content.slice(prefix.length).trim().split(' ');

        let { body } = await superagent.get('https://fortnite-api.com/v2/cosmetics/br');

        let Cosmetiques = new Discord.MessageEmbed()
        .setTitle("Cosmetiques")
        .setDescription(body.data.name)
        .setImage(body.data.images.icon)
        .setFooter('Copyright Intermarket 2021', '../images/logo.png')
        
        message.channel.send(Cosmetiques)

    }
};