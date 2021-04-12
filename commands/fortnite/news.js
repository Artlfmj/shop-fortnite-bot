const Discord = require('discord.js')
const superagent = require('superagent');
const FortniteAPI = require("fortnite-api-com");
const configfortnite = {
    apikey: "API-Key",
    language: "fr",
    debug: true
  };

var Fortnite = new FortniteAPI(configfortnite);

module.exports = {
    name: "news",
    aliases: ["actus"],
    description: "Envoie actus",
    category: "fortnite",
    guildOnly: true,
    cooldown: 2,
    usage: "actus",
    run: async (client, message, args, user, text, prefix) => {
        

        const br = await Fortnite.NewsBR("fr")
        const stw = await Fortnite.NewsSTW("fr")
        const creative = await Fortnite.NewsCreative("fr")
       
        if(args[0] === "br"){
            const News = new Discord.MessageEmbed()
            .setTitle("News")
            .setImage(br.data.image)
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter('Copyright Intermarket 2021')
            message.channel.send(News)
        }
        else if(args[0] === "stw"){
            let News = new Discord.MessageEmbed()
            .setTitle("News")
            .setImage(stw.data.image)
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter('Copyright Intermarket 2021')
            message.channel.send(News)
            
            
        }
        
        else if(args[0] === "creative"){
            let News = new Discord.MessageEmbed()
                .setTitle("News")
                .setImage(creative.data.image)
                .setColor("RANDOM")
                .setTimestamp()
                .setFooter('Copyright Intermarket 2021')
            message.channel.send(News)
                
            
            
        }
        else if (!args.length) {
            let News = new Discord.MessageEmbed()
                .setTitle("News")
                .setImage(br.data.image)
                .setColor("RANDOM")
                .setTimestamp()
                .setFooter('Copyright Intermarket 2021')
                message.channel.send(News)
        }
        
        
        
        

    }
};

///const STATUS = new Discord.MessageEmbed()
///.setTitle("ERREUR | Les actus n'ont pas pu être atteints")
///.setDescription("Nous vous prions de nous excuser mais les news ne sont pas atteignables. Merci de réessayer plus tard")
///message.channel.send(STATUS)
///console.log("br check bad")