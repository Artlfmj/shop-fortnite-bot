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
        message.channel.startTyping()
        message.delete();
        let guild = message.guild
        let ServerEmbed = new Discord.MessageEmbed()
        .setThumbnail(guild.iconURL({ dynamic: true }))
        .setTitle(`${message.guild.name} (${guild.id})`)
        .addField(`Propriétaire`, message.guild.owner, true)
        .addField(`Nombre de membres`, message.guild.memberCount, true)
        .addField(`Nombre de roles`, message.guild.roles.cache.size, true)
        .setFooter('Demandé par ' + message.author.username)
        .addField('Boosts', guild.premiumSubscriptionCount, true)
        .addField('Région du serveur', guild.region, true)
        .addField('Créé le', guild.createdAt.toLocaleString(), true)
        .addField('ID du serveur', guild.id, true)
        .setTimestamp()
    
        message.channel.send(ServerEmbed)
        message.channel.stopTyping()
    }
}