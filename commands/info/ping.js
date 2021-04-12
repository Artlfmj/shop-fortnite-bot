//Here the command starts
const Discord = require("discord.js")
module.exports = {
    //definition
    name: "ping", //the name of the command 
    category: "info", //the category this will be listed at, for the help cmd
    aliases: ["latency"], //every parameter can be an alias
    cooldown: 2, //this will set it to a 2 second cooldown
    usage: "ping", //this is for the help command for EACH cmd
    description: "Gives you information on how fast the Bot can respond to you", //the description of the command

    //running the command with the parameters: client, message, args, user, text, prefix
    run: async (client, message, args, user, text, prefix) => {
        //creating a temporary message
        const pong = new Discord.MessageEmbed()
        .setTitle("Chargement des statistiques...")
        .setColor("#2f3136")
        const msg = await message.channel.send(pong); 
        //editing it to the actual latency
        const Ping = new Discord.MessageEmbed()
        .setTitle(`Le ping du bot est de ${Math.round(client.ws.ping)}ms`)
        .setColor("#2f3136")
        msg.edit(Ping)
        const log = new Discord.MessageEmbed()
        .setTitle(`Utilisation de la commande Ping | ${client.user.username}`)
        .setTimestamp()
        .setDescription(`La commande ping a été utilisée`) 
        .addField("Salon d'utilisation", message.channel, true)
        .addField("Utilisateur", message.author.username, true)
        .addField("Serveur", message.guild.name, true)
        .addField("Date", new Date(), true)
        .setColor("BLUE")
        client.channels.cache.get("828915153432084510").send(log)
    }
}
