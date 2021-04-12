const Discord = require('discord.js')
const superagent = require('superagent');
const Fortnite = require("fortnite-api-com")
const FortniteAPI = require("fortnite-api-io");
const fs = require('fs');
const fortniteAPI = new FortniteAPI("5322113d-12065afe-cd591053-39cf2335")

module.exports = {
    name: "modes",
    aliases: ["mode"],
    description: "Envoie modes",
    category: "fortnite",
    guildOnly: true,
    cooldown: 2,
    usage: "modes",
    run: async (client, message, args, user, text, prefix) => {
        message.delete()
        message.channel.startTyping()
        const wait = new Discord.MessageEmbed()
        .setTitle("Chargement des modes de jeux | VEUILLEZ PATIENTER...")
        .setColor("#2f3136")
        const msg = await message.channel.send(wait)
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
        
        msg.edit(ModesEmbed)
        message.channel.stopTyping()

    }
};