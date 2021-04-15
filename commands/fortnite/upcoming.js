//Here the command starts
const Discord = require('discord.js')
const FortniteAPI = require("fortnite-api-io");
const fs = require('fs');
const fortniteAPI = new FortniteAPI("5322113d-12065afe-cd591053-39cf2335")

module.exports = {
    //definition
    name: "upcoming", //the name of the command 
    category: "fortnite", //the category this will be listed at, for the help cmd
    aliases: [""], //every parameter can be an alias
    cooldown: 2, //this will set it to a 2 second cooldown
    usage: "upcoming", //this is for the help command for EACH cmd
    description: "Obtenir les derniers cosmetiques", //the description of the command

    //running the command with the parameters: client, message, args, user, text, prefix
    run: async (client, message, args, user, text, prefix) => {
        message.delete()
        const WAIT = new Discord.MessageEmbed()
        .setTitle("VEUILLEZ PATIENTER LES ITEMS SONT EN COURS DE CHARGEMENT")
        const msg = await message.channel.send(WAIT)
        message.channel.startTyping()
        
       const itemsupcoming = await fortniteAPI.listUpcomingItems()
       const items = itemsupcoming.items
       const Embed = new Discord.MessageEmbed()
       .setTitle("Voici les items qui sortiront prochainement")
       .setColor("#2f3136")
       items.forEach(items => {
            Embed.addField(items.name, "ID: " + items.id + "\n" + "Type d'objet: " +  items.type + "\n" + "Rareté: " + items.rarity + "\n" + "Description : " + items.description)
        });
        msg.edit(Embed)
        message.channel.stopTyping()
    }
}