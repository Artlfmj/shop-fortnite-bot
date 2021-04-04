//Here the command starts
const Discord = require('discord.js')
const superagent = require('superagent')
module.exports = {
    //definition
    name: "status", //the name of the command 
    category: "fun", //the category this will be listed at, for the help cmd
    aliases: [""], //every parameter can be an alias
    cooldown: 2, //this will set it to a 2 second cooldown
    usage: "", //this is for the help command for EACH cmd
    description: "", //the description of the command

    //running the command with the parameters: client, message, args, user, text, prefix
    run: async (client, message, args, user, text, prefix) => {
       if(args[0] === "minecraft"){
        message.delete();
           const minecraft = await superagent.get("https://status.mojang.com/check")
           const Status = new Discord.MessageEmbed()
           .setTitle("Status des serveurs Minecraft")
           .addField("Minecraft.net", minecraft.minecraft)
           message.channel.send(minecraft)
       }
    }
}