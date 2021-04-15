//Here the command starts
const Discord = require('discord.js')
module.exports = {
    //definition
    name: "config", //the name of the command 
    category: "moderation", //the category this will be listed at, for the help cmd
    aliases: [""], //every parameter can be an alias
    cooldown: 2, //this will set it to a 2 second cooldown
    usage: "", //this is for the help command for EACH cmd
    description: "", //the description of the command

    //running the command with the parameters: client, message, args, user, text, prefix
    run: async (client, message, args, user, text, prefix) => {
        message.delete()
       const Info = new Discord.MessageEmbed()
       .setTitle("Cette fonctionnalité n'est pas encore disponible")
       .setColor("#2f3136")
       message.channel.send(Info)
    }
}