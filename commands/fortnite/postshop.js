//Here the command starts
const servers = require('../../api/data/shop/servers.json')
const Discord = require('discord.js')
module.exports = {
    //definition
    name: "postshop", //the name of the command 
    category: "admin", //the category this will be listed at, for the help cmd
    aliases: [""], //every parameter can be an alias
    cooldown: 2, //this will set it to a 2 second cooldown
    usage: "", //this is for the help command for EACH cmd
    description: "", //the description of the command

    //running the command with the parameters: client, message, args, user, text, prefix
    run: async (client, message, args, user, text, prefix) => {
       
    const Shop = new Discord.MessageEmbed()
    .setTitle("Shop du" + new Date())

    servers.data.map(serverids => {
        console.log(serverids)
        client.channels.cache.get(serverids.id).send(Shop)
    });
        
    }
}