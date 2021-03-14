
const nodefetch = require('node-fetch')
const Discord = require('discord.js')
const superagent = require('superagent');
const config = require('./blagues.json')
const fetch = import('node-fetch')

module.exports = {
    name: "blague",
    aliases: ["blagues"],
    description: "Envoie blague",
    category: "fun",
    guildOnly: true,
    cooldown: 2,
    usage: "modes",
    run: async (client, message, args, user, text, prefix) => {
    
        fetch('https://www.blagues-api.fr/api/random', {
            headers: {
                'Authorization': `Bearer ${config.blagues}`
            }
        })
        let Blague = new Discord.MessageEmbed()
        .setTitle("Blague")
        .setDescription(`${response.question} \n || ${response.answer} ||`)
        
        message.channel.send(Blague)

    }
};