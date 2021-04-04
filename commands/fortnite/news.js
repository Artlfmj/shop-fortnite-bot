const Discord = require('discord.js')
const superagent = require('superagent');

module.exports = {
    name: "actus",
    aliases: ["news"],
    description: "Envoie actus",
    category: "fortnite",
    guildOnly: true,
    cooldown: 2,
    usage: "actus",
    run: async (client, message, args, user, text, prefix) => {
        
        const arguments = message.content.slice(prefix.length).trim().split(' ');
        message.delete();
        let { body } = await superagent.get('https://fortnite-api.com/v2/news');
        if(args[0] === "br"){
            if(body.status === '200'){
                const News = new Discord.MessageEmbed()
                .setTitle("News")
                .setImage(body.data.br.image)
                .setColor("RANDOM")
                .setTimestamp()
                .setFooter('Copyright Intermarket 2021')
                message.channel.send(News)
                
            }
            else if(body.status != "200"){
                const STATUS = new Discord.MessageEmbed()
                .setTitle("ERREUR | Les actus n'ont pas pu être atteints")
                .setDescription("Nous vous prions de nous excuser mais les news ne sont pas atteignables. Merci de réessayer plus tard")
                message.channel.send(STATUS)
                
            }
            
        }
        else if(args[0] === "stw"){
            let News = new Discord.MessageEmbed()
            .setTitle("News")
            .setImage(body.data.stw.image)
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter('Copyright Intermarket 2021')
            message.channel.send(News)
            
        }
        else if(args[0] === "creative"){
            let News = new Discord.MessageEmbed()
            .setTitle("News")
            .setImage(body.data.creative.image)
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter('Copyright Intermarket 2021')
            message.channel.send(News)
            
        }
        else if (!args.length) {
            let News = new Discord.MessageEmbed()
            .setTitle("News")
            .setImage(body.data.br.image)
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter('Copyright Intermarket 2021')
            message.channel.send(News)
            
        }
        
        
        
        

    }
};