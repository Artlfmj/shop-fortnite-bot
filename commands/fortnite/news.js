const Discord = require('discord.js')
const superagent = require('superagent');

module.exports = {
    name: "actus",
    aliases: ["news"],
    description: "Envoie actus",
    category: "fortnite",
    guildOnly: true,
    cooldown: 2,
    usage: "actus",
    run: async (client, message, args, user, text, prefix) => {
        const arguments = message.content.slice(prefix.length).trim().split(' ');

        let { body } = await superagent.get('https://fortnite-api.com/v2/news/br');

        let News = new Discord.MessageEmbed()
        .setTitle("News")
        .setImage(body.data.image)
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter('Copyright Intermarket 2021')
        
        message.channel.send(News)

    }
};