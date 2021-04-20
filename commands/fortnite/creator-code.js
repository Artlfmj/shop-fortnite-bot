//Here the command starts
const Discord = require('discord.js')
const superagent = require('superagent');
module.exports = {
    //definition
    name: "creator-code", //the name of the command 
    category: "fortnite", //the category this will be listed at, for the help cmd
    aliases: [""], //every parameter can be an alias
    cooldown: 2, //this will set it to a 2 second cooldown
    usage: "creator-code [CREATOR TO CHECK]", //this is for the help command for EACH cmd
    description: "", //the description of the command

    //running the command with the parameters: client, message, args, user, text, prefix
    run: async (client, message, args, user, text, prefix) => {
        message.channel.startTyping()
        const wait = new Discord.MessageEmbed()
        .setTitle("VEUILLEZ PATIENTER LES DONNEES SONT EN COURS DE CHARGEMENT")
        const msg = await message.channel.send(wait)
       const creatorinfo = await superagent.get(`https://fortnite-api.com/v2/creatorcode?name=${args[0]}`)
       
       const data = new Discord.MessageEmbed()
       .setTitle(`Informations sur le code créateur : ${args[0]}`)
       .setColor("#2f3136")
       .addField("Code", creatorinfo.body.data.code, true)
       .addField("Propriétaire", creatorinfo.body.data.account.name, true)
       .addField("Statut", creatorinfo.body.data.status, true)
       .setThumbnail(message.author.displayAvatarURL())
       if (creatorinfo.body.data.verified === true){
        data.addField("Verifié", "Oui", true)
       }
       if (creatorinfo.body.data.verified === false){
        data.addField("Verifié", "Non", true)
       }
       msg.edit(data)
       message.channel.stopTyping()
    }
}