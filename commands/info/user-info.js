//Here the command starts
const Discord = require('discord.js')
module.exports = {
    //definition
    name: "userinfo", //the name of the command 
    category: "info", //the category this will be listed at, for the help cmd
    aliases: ["user-info"], //every parameter can be an alias
    cooldown: 2, //this will set it to a 2 second cooldown
    usage: "", //this is for the help command for EACH cmd
    description: "", //the description of the command

    //running the command with the parameters: client, message, args, user, text, prefix
    run: async (client, message, args, user, text, prefix) => {
        message.channel.startTyping()
       const Wait = new Discord.MessageEmbed()
       .setTitle("VEUILLEZ PATIENTER | Chargement des informations")
       .setColor("#2f3136")
       const msg = await message.channel.send(Wait)
       const USERINFO = new Discord.MessageEmbed()
       .setTitle(`${message.author.username} | ${message.author.id}`)
       .setAuthor(message.author.tag)
        .setThumbnail(message.author.displayAvatarURL({dynamic: true, size: 512}))
        .addField(`Nom de l'utilisateur`, (message.author.username))
        .addField(`Tag`, message.author.tag)
        .addField(`ID`, message.author.id)
        .addField(`Statut`, message.author.presence.status)
        .addField(`Compte crée le`, message.author.createdAt)
        .setFooter('Demandé par ' + message.author.username, message.author.iconURL)
        .setColor("#2f3136")
        .setTimestamp()
        msg.edit(USERINFO)
        message.channel.stopTyping()
    }
}