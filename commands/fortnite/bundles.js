//Here the command starts
const Discord = require('discord.js')
const bundles = require("../../api/data/shop/bundles.json")
const BasePaginator = require('discord-paginator.js')
module.exports = {
    //definition
    name: "bundles", //the name of the command 
    category: "fortnite", //the category this will be listed at, for the help cmd
    aliases: [""], //every parameter can be an alias
    cooldown: 2, //this will set it to a 2 second cooldown
    usage: "", //this is for the help command for EACH cmd
    description: "Obtenir toutes les informations des packs", //the description of the command

    //running the command with the parameters: client, message, args, user, text, prefix
    run: async (client, message, args, user, text, prefix) => {
        const info = new Discord.MessageEmbed()
        .setTitle("Bundles")
        .setDescription("Afin de visualiser les bundles actuels et à venir cliquez sur les réactions ci-dessous")
       const EmbedDispo = new Discord.MessageEmbed()
       .setTitle("Bundles disponibles pour l'instant")
       .setColor("#2f3136")
       .setFooter("© Copyright Shop 2021")
        const bundledispo = bundles.data.disponible
        bundledispo.forEach(bundledispo =>
                EmbedDispo.addField(bundledispo.name, bundledispo.description + `\n\n **Prix: ${bundledispo.price}** \n[Cliquez ici pour l'image](${bundledispo.image})`, false)
            )
        const bundleupcoming = new Discord.MessageEmbed()
        .setTitle("Bundles bientot disponibles")
        .setColor("#2f3136")
        .setFooter("© Copyright Shop 2021")
        const bundlesoon = bundles.data.upcoming
        bundlesoon.forEach(bundlesoon =>
                bundleupcoming.addField(bundlesoon.name, bundlesoon.description + `\n\n **Prix: ${bundlesoon.price}** \n[Cliquez ici pour l'image](${bundlesoon.image})`, false)
            )
       embeds = [
           info,
           EmbedDispo,
           bundleupcoming
       ]
       
       const Paginator = new BasePaginator({
            pages: embeds, //the pages
            timeout: 120000, //the timeout for the reaction collector ended (in ms)
            page: 'Page {current}/{total}', //Show the page counter to the message
            filter: (reaction, user) => user.id == message.author.id //to filter the reaction collector
        })
    
        Paginator.spawn(message.channel) //to spawn the paginator to specific text channel
    }
}