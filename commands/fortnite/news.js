const Discord = require('discord.js')
const superagent = require('superagent');
const FortniteAPI = require("fortnite-api-com");
const configfortnite = {
    apikey: "API-Key",
    language: "fr",
    debug: true
  };

var Fortnite = new FortniteAPI(configfortnite);

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
        const body = await Fortnite.NewsBR('fr')

        let News = new Discord.MessageEmbed()
        .setTitle("News")
        .setImage(body.data.image)
        .setColor("#2f3136")
        .setTimestamp()
        .setFooter('© Copyright Shop 2021', "https://shopbot.ml/assets/bot/logo.png")
        
        message.channel.send(News)

    }
};