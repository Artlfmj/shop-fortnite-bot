const Discord = require('discord.js')
const superagent = require('superagent');

module.exports = {
    name: "stats",
    aliases: ["aliase"],
    description: "Envoie stats",
    category: "fortnite",
    guildOnly: true,
    cooldown: 2,
    usage: "stats",
    run: async (client, message, args, user, text, prefix) => {
        let { body } = await superagent.get('https://fortnite-api.com/v1/stats/br/v2');

        let Stats = new Discord.MessageEmbed()
        .setTitle("Modes de jeux")
        .setDescription(body.data.name)
        
        message.channel.send(Stats)

    }
};