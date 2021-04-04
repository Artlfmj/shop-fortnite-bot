const Discord = require('discord.js')
const superagent = require('superagent');

module.exports = {
    name: "news-languages",
    aliases: ["aliase"],
    description: "description",
    category: "fortnite",
    guildOnly: true,
    cooldown: 2,
    usage: "Get languages",
    run: async (client, message, args, user, text, prefix) => {
        let { body } = await superagent.get('https://fortool.fr/cm/api/v1/news/supported');
        message.delete();
        let ShopLanguages = new Discord.MessageEmbed()
        .setTitle("Voici les langues disponibles pour le news")
        .setColor("RANDOM")
        .setDescription(`FR : ${body.list.fr} \nES : ${body.list.es} \nDE : ${body.list.it} \nFR : ${body.list.it} \nAR : ${body.list.ar} \n`)
        message.channel.send(ShopLanguages)
    },
};