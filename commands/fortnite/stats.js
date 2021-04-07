const Discord = require('discord.js')
const superagent = require('superagent');
const fs = require('fs');
const fetch = require('node-fetch');

module.exports = {
    name: "stats",
    aliases: ["stastistiques"],
    description: "Envoie stats",
    category: "fortnite",
    guildOnly: true,
    cooldown: 2,
    usage: "stats",
    run: async (client, message, args, user, text, prefix) => {
        message.delete()
        const Wait = new Discord.MessageEmbed()
        .setTitle("CHARGEMENT DES STATISTIQUES")
        .setTimestamp()
        const msg = await message.channel.send(Wait)
        message.channel.startTyping()
        let { body } = await superagent.get(`https://fortnite-api.com/v1/stats/br/v2?name=${args[0]}&image=all`);
        let Stats = new Discord.MessageEmbed()
        .setTitle("Statistiques du joueur")
        .setColor('#0099ff')

        .setDescription('Voici les statistiques globales du joueur concerné')
        .addFields(
        { name: `Kills globaux`, value: body.data.stats.all.overall.kills, inline: true },
        { name: 'Top 1​', value: body.data.stats.all.overall.wins, inline: true },
        { name: "Parties", value: body.data.stats.all.overall.matches , inline: true },
        { name: 'Ratio de kill', value: body.data.stats.all.overall.kd + "%", inline: true },
        )
        .addField("Pourcentage de victoires", body.data.stats.all.overall.winRate, true)
        .setTimestamp()
        .setImage(body.data.image)
        message.channel.stopTyping()
        msg.edit(Stats)
       

    }
};