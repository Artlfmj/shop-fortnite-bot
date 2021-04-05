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
        message.delete();
        let Stats = new Discord.MessageEmbed()
        .setTitle("Statistiques du joueur")
        .setColor('#0099ff')
        .setDescription('Voici les statistiques du joueur concerné')
        .addFields(
        { name: 'Regular field title', value: 'Some value here' },
        { name: '​', value: '​' },
        { name: 'Inline field title', value: 'Some value here', inline: true },
        { name: 'Inline field title', value: 'Some value here', inline: true },
        )
        .setTimestamp()
        .setFooter('Some footer text here', 'https://i.imgur.com/hnrWVnt.png');
        
        message.channel.send(Stats)

    }
};