//Here the command starts
const Discord = require('discord.js')
const superagent = require('superagent')
module.exports = {
    //definition
    name: "skin", //the name of the command 
    category: "minecraft", //the category this will be listed at, for the help cmd
    aliases: [""], //every parameter can be an alias
    cooldown: 2, //this will set it to a 2 second cooldown
    usage: "skin", //this is for the help command for EACH cmd
    description: "Get Minecraft skin of player", //the description of the command

    //running the command with the parameters: client, message, args, user, text, prefix
    run: async (client, message, args, user, text, prefix) => {
        message.delete();
       const { body } = await superagent.get(`https://minecraft-api.com/api/skins/${args[0]}/body/10.5/10/10.25/25.12/12/json`)
       console.log(body)
       const Embed = new Discord.MessageEmbed()
       .setTitle(`Skin de ${args[0]}`)
       .setImage(`https://minecraft-api.com/api/skins/${args[0]}/body/10.5/10`)
       message.channel.send(Embed)
    }
}