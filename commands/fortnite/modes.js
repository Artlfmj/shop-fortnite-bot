const Discord = require('discord.js')
const superagent = require('superagent');
const Fortnite = require("fortnite-api-com")
const FortniteAPI = require("fortnite-api-io");
const fs = require('fs');
const fortniteAPI = new FortniteAPI("5322113d-12065afe-cd591053-39cf2335")

module.exports = {
    name: "modes",
    aliases: ["aliase"],
    description: "Envoie map",
    category: "fortnite",
    guildOnly: true,
    cooldown: 2,
    usage: "modes",
    run: async (client, message, args, user, text, prefix) => {
        
        const obj = await fortniteAPI.listCurrentGameModes()
        
        let ModesEmbed = new Discord.MessageEmbed()
        .setTitle("Modes de jeux actuellements disponibles:")
        .setDescription("Voici les modes de jeux disponbles sur Fortnite actuellement")
        .setColor("#2f3136")
        
        obj.modes.forEach(async (item) => {
            if(item.enabled && item.name && item.description){
                ModesEmbed.addField(item.name , item.description + `\n\n[Cliquez ici pour l'image](${item.image})`, false )
            }
        });
        
        message.channel.send(ModesEmbed)

    }
};