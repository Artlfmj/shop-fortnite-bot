//Here the command starts
const Discord = require('discord.js')
module.exports = {
    //definition
    name: "emergencystop", //the name of the command 
    category: "bot", //the category this will be listed at, for the help cmd
    aliases: [""], //every parameter can be an alias
    cooldown: 2, //this will set it to a 2 second cooldown
    usage: "OWNER ONLY", //this is for the help command for EACH cmd
    description: "", //the description of the command

    //running the command with the parameters: client, message, args, user, text, prefix
    run: async (client, message, args, user, text, prefix) => {
       if(message.author.id === "634099784428552213"){
           message.channel.send("Extinction des feux")
           client.destroy("Nzk3NDE4NDQ4NTE3OTg4MzYy.X_mLzQ.EFdTxB9aS4-LZ2JAoDheM2pXz3A");

       }
       else{
           message.channel.send("ERREUR | Vous n'avez pas le droit d'utiliser cette commande.")
       }
    }
}