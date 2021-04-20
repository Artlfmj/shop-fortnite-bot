//Here the command starts
const Discord = require('discord.js')
const FortniteAPI = require("fortnite-api-io");
const fs = require('fs');
const BasePaginator = require('discord-paginator.js')
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
       console.log(itemsupcoming)
       const Embed = new Discord.MessageEmbed()
       .setTitle("Voici les items qui sortiront prochainement")
       .setColor("#2f3136")
       embeds = [
           Embed
       ]
       items.forEach(items => {
           items.name = new Discord.MessageEmbed()
           .setTitle(items.name)
           .addField("ID", items.id , true)
           .addField("Type d'objet" , items.type, true)
           .addField("Rareté" , items.rarity, true)
           .addField("Pack" , "Nom: " + items.set + "\nS'il a été leak vous pouvez le trouver en faisant la commande ``s!bundles`` ", true)
           .addField("Description" , items.description, true)
           .addField("Reactif", items.reactive , true)
           .setImage(items.images.icon)
           .setColor("#2f3136")
            embeds.push(items.name)


        });
        const Paginator = new BasePaginator({
            pages: embeds, //the pages
            timeout: 120000, //the timeout for the reaction collector ended (in ms)
            page: 'Page {current}/{total}', //Show the page counter to the message
            filter: (reaction, user) => user.id == message.author.id //to filter the reaction collector
        })
    
        Paginator.spawn(message.channel)
        msg.delete()
     
        message.channel.stopTyping()
    }
}