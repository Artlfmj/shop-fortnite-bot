//Here the command starts
const Discord = require('discord.js')

module.exports = {
    //definition
    name: "serverinfo", //the name of the command 
    category: "moderation", //the category this will be listed at, for the help cmd
    aliases: ["server-info"], //every parameter can be an alias
    cooldown: 2, //this will set it to a 2 second cooldown
    usage: "serverinfo", //this is for the help command for EACH cmd
    description: "Gives you information on how fast the Bot can respond to you", //the description of the command

    //running the command with the parameters: client, message, args, user, text, prefix
    run: async (client, message, args, user, text, prefix) => {
        
        let ServerEmbed = new Discord.MessageEmbed()
        .setAuthor(message.guild.name)
        .setThumbnail(message.guild.iconUrl())
        .addField(`Nom du serveur`, (message.guild.name))
        .addField(`Propriétaire`, message.guild.owner)
        .addField(`Nombre de membres`, message.guild.memberCount)
        .addField(`Nombre de roles`, message.guild.roles.cache.size)
        .setFooter('Demandé par ' + message.author.username)
    
        message.channel.send(ServerEmbed)
    }
}