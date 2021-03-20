//Here the command starts
const Discord = require('discord.js')
module.exports = {
    //definition
    name: "uptime", //the name of the command 
    category: "info", //the category this will be listed at, for the help cmd
    aliases: [""], //every parameter can be an alias or empty for no aliases
    cooldown: 10, //this will set it to a 10 second cooldown
    usage: "uptime", //this is for the help command for EACH cmd
    description: "Returns the duration on how long the Bot is online", //the description of the command

    //running the command with the parameters: client, message, args, user, text, prefix
    run: async (client, message, args, user, text, prefix) => {
        // a sub function to get the time    
        function duration(ms) {
            const sec = Math.floor((ms / 1000) % 60).toString()
            const min = Math.floor((ms / (1000 * 60)) % 60).toString()
            const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
            const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString()
            return `${days.padStart(1, '0')} jour(s), ${hrs.padStart(2, '0')} heure(s), ${min.padStart(2, '0')} minutes, ${sec.padStart(2, '0')} secondes.`
        }
    
        var uptime = new Discord.MessageEmbed()
    
    
        .setTitle(`⚡ Uptime | ${client.user.username} `)
        .addField("Je suis en ligne depuis ", ` ${duration(client.uptime)}`)
        .setFooter(`${client.user.tag}`, client.user.displayAvatarURL)
        .setColor("RANDOM")
        message.channel.send(uptime)
    }
}