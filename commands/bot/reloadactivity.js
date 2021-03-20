//Here the command starts
const Discord = require('discord.js')
module.exports = {
    //definition
    name: "reloadactivity", //the name of the command 
    category: "bot", //the category this will be listed at, for the help cmd
    aliases: ["latency"], //every parameter can be an alias
    cooldown: 10, //this will set it to a 2 second cooldown
    usage: "ping", //this is for the help command for EACH cmd
    description: "RELOAD ACTIVITY. OWNER ONLY", //the description of the command

    //running the command with the parameters: client, message, args, user, text, prefix
    run: async (client, message, args, user, text, prefix) => {
        if(message.author.id === "634099784428552213"){
            let member = message.member;

            
            const createTicketEmbed = new Discord.MessageEmbed()
            .setTitle("**Quelle activité souhaitez vous reload?**")
            .setThumbnail(message.author.avatarURL({ dynamic: true }))
            .setColor("#E12800")
            .setDescription("`📨`: BETA\n`📝`: SHOP CLASSIQUE\n`❌`: Annuler")
            .setFooter(message.author.username)
            .setTimestamp()
          
          message.channel.send(createTicketEmbed).then(async msg => {
           await msg.react("📨"); await msg.react("📝"); await msg.react("❌");
    
            const filter = (reaction, user) => ["📨", "📝", "❌"].includes(reaction.emoji.name) && user.id === message.author.id;
            let reaction = (await msg.awaitReactions(filter, {max: 1})).first();
            switch(reaction.emoji.name) {
              case "📨": 
              msg.delete()
              client.user.setActivity(`BETA SHOP | VERSION 1.2.1 en beta`, { type: "WATCHING"})
                break;
              case "📝": 
              msg.delete()
              client.user.setActivity(`SHOP s!help | VERSION 1.2`, { type: "WATCHING"}) 
                break;
              case "❌": 
              msg.delete()
                message.channel.send("Annulé avec succès ✅")
                break;
    }});   
    }
}
}