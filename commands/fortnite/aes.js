//Here the command starts
const Discord = require('discord.js')
const FortniteAPI = require("fortnite-api-com");
const configfortnite = {
    apikey: "API-Key",
    language: "en",
    debug: true
  };

const Fortnite = new FortniteAPI(configfortnite);


module.exports = {
    //definition
    name: "aes", //the name of the command 
    category: "fortnite", //the category this will be listed at, for the help cmd
    aliases: [""], //every parameter can be an alias
    cooldown: 2, //this will set it to a 2 second cooldown
    usage: "", //this is for the help command for EACH cmd
    description: "", //the description of the command

    //running the command with the parameters: client, message, args, user, text, prefix
    run: async (client, message, args, user, text, prefix) => {
        
       
        const AES = await Fortnite.AES()
        const aes = new Discord.MessageEmbed()
        .setTitle("Clés AES Disponibles")
        .setDescription("Ici vous pourrez trouver toutes les clés AES disponibles à ce jour")
        .addField("Version principale:", AES.data.mainKey,true)
        .setColor("#2f3136")
        const dyn = AES.data.dynamicKeys
        dyn.forEach(dyn => {
            aes.addField(dyn.pakFilename, dyn.key, false )
        });
        message.channel.send(aes)
    }
}