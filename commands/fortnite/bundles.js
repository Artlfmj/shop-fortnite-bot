//Here the command starts
const Discord = require('discord.js')
const bundles = require("../../api/data/shop/bundles.json")
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
       const EmbedDispo = new Discord.MessageEmbed()
       .setTitle("Bundles disponibles pour l'instant")
       .setColor("#2f3136")
        const bundledispo = bundles.data.disponible
        bundledispo.forEach(bundledispo =>
                EmbedDispo.addField(bundledispo.name, bundledispo.description + `\n\n **Prix: ${bundledispo.price}** \n[Cliquez ici pour l'image](${bundledispo.image})`, false)
            )
        const bundleupcoming = new Discord.MessageEmbed()
        .setTitle("Bundles bientot disponibles")
        .setColor("#2f3136")
        const bundlesoon = bundles.data.upcoming
        bundlesoon.forEach(bundlesoon =>
                bundleupcoming.addField(bundlesoon.name, bundlesoon.description + `\n\n **Prix: ${bundlesoon.price}** \n[Cliquez ici pour l'image](${bundlesoon.image})`, false)
            )
        message.channel.send(EmbedDispo)
        message.channel.send(bundleupcoming)
    }
}