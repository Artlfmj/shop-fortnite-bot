const Discord = require('discord.js')
const superagent = require('superagent');
const FortniteAPI = require("fortnite-api-com");
const BasePaginator = require('discord-paginator.js')
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
       message.delete()
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
            let NewsBR = new Discord.MessageEmbed()
                .setTitle("News BR")
                .setImage(br.data.image)
                .setColor("RANDOM")
                .setTimestamp()
                .setFooter('Copyright Intermarket 2021')
               
                let NewsCreative = new Discord.MessageEmbed()
                .setTitle("News Creative")
                .setImage(creative.data.image)
                .setColor("RANDOM")
                .setTimestamp()
                .setFooter('Copyright Intermarket 2021')
                
                let NewsSTW = new Discord.MessageEmbed()
                .setTitle("News STW")
                .setImage(stw.data.image)
                .setColor("RANDOM")
                .setTimestamp()
                .setFooter('Copyright Intermarket 2021')
                
                embeds = [
                    NewsBR,
                    NewsCreative,
                    NewsSTW
                ]
                const Paginator = new BasePaginator({
                    pages: embeds, //the pages
                    timeout: 120000, //the timeout for the reaction collector ended (in ms)
                    page: 'Page {current}/{total}', //Show the page counter to the message
                    filter: (reaction, user) => user.id == message.author.id //to filter the reaction collector
                })
            
                Paginator.spawn(message.channel)

        }
        
        
        
        

    }
};

///const STATUS = new Discord.MessageEmbed()
///.setTitle("ERREUR | Les actus n'ont pas pu être atteints")
///.setDescription("Nous vous prions de nous excuser mais les news ne sont pas atteignables. Merci de réessayer plus tard")
///message.channel.send(STATUS)
///console.log("br check bad")