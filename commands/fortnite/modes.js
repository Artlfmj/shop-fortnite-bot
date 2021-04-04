const Discord = require('discord.js')
const superagent = require('superagent');

module.exports = {
    name: "modes",
    aliases: ["aliase"],
    description: "Envoie map",
    category: "fortnite",
    guildOnly: true,
    cooldown: 2,
    usage: "modes",
    run: async (client, message, args, user, text, prefix) => {
        const arguments = message.content.slice(prefix.length).trim().split(' ');
        message.delete();
        if (!args.length) {
            return message.channel.send('Vous devez fournir un pseudo');
          };

        
        let { body } = await superagent.get('https://fortnite-api.com/v1/playlists');

        let Modes = new Discord.MessageEmbed()
        .setTitle("Modes de jeux")
        .setDescription(body.data.name)
        
        message.channel.send(Modes)

    }
};