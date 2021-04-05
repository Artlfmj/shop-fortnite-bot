const Discord = require('discord.js')
const superagent = require('superagent');

module.exports = {
    name: "shop-languages",
    aliases: ["aliase"],
    description: "description",
    category: "fortnite",
    guildOnly: true,
    cooldown: 2,
    usage: "Get languages",
    run: async (client, message, args, user, text, prefix) => {
        let { body } = await superagent.get('https://fortool.fr/cm/api/v1/shop/supported');
        message.delete();
        let ShopLanguages = new Discord.MessageEmbed()
        .setTitle("Voici les langues disponibles pour le shop")
        .setColor("RANDOM")
        .setDescription(`FR : ${body.list.fr} \nES : ${body.list.es} \nDE : ${body.list.it} \nFR : ${body.list.it} \nAR : ${body.list.ar} \n`)
        .setFooter("SHOP BOT" , '../images/logo.png')
        message.channel.send(ShopLanguages)
    },
};