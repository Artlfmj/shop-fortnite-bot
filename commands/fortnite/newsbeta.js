const Discord = require('discord.js')
const superagent = require('superagent');

module.exports = {
    name: "newsbeta",
    aliases: ["actusbeta"],
    description: "Envoie actus",
    category: "fortnite",
    guildOnly: true,
    cooldown: 2,
    usage: "actus",
    run: async (client, message, args, user, text, prefix) => {
        
        const arguments = message.content.slice(prefix.length).trim().split(' ');
        message.delete()
        if(arguments[0] === "br"){
            let { br } = await superagent.get('https://fortnite-api.com/v2/news/br');
            console.log("fetch br")
            if(br.status === '200'){
                const News = new Discord.MessageEmbed()
                .setTitle("News")
                .setImage(br.data.image)
                .setColor("RANDOM")
                .setTimestamp()
                .setFooter('Copyright Intermarket 2021')
                message.channel.send(News)
                console.log("br check good")
                
            }
            else if(br.status != "200"){
                const STATUS = new Discord.MessageEmbed()
                .setTitle("ERREUR | Les actus n'ont pas pu être atteints")
                .setDescription("Nous vous prions de nous excuser mais les news ne sont pas atteignables. Merci de réessayer plus tard")
                message.channel.send(STATUS)
                console.log("br check bad")
                
            }
            
        }
        else if(arguments[0] === "stw"){
            let {  stw } = await superagent.get('https://fortnite-api.com/v2/news/stw');
            console.log("fetch stw")
            if(stw.status === "200"){
                let News = new Discord.MessageEmbed()
                .setTitle("News")
                .setImage(stw.data.image)
                .setColor("RANDOM")
                .setTimestamp()
                .setFooter('Copyright Intermarket 2021')
                message.channel.send(News)
                console.log("stw check good")
            }
            else if(stw.status != "200"){
                const STATUS = new Discord.MessageEmbed()
                .setTitle("ERREUR | Les actus n'ont pas pu être atteints")
                .setDescription("Nous vous prions de nous excuser mais les news ne sont pas atteignables. Merci de réessayer plus tard")
                message.channel.send(STATUS)
                console.log("stw check bad")
                
            }
            
        }
        
        else if(arguments[0] === "creative"){
            let { creative } = await superagent.get('https://fortnite-api.com/v2/news/creative');
            console.log("fetch creative")
            if(creative.status === "200"){
                let News = new Discord.MessageEmbed()
                .setTitle("News")
                .setImage(creative.data.image)
                .setColor("RANDOM")
                .setTimestamp()
                .setFooter('Copyright Intermarket 2021')
                message.channel.send(News)
                console.log("creative check good")
            }
            else if(creative.status != "200"){
                const STATUS = new Discord.MessageEmbed()
                .setTitle("ERREUR | Les actus n'ont pas pu être atteints")
                .setDescription("Nous vous prions de nous excuser mais les news ne sont pas atteignables. Merci de réessayer plus tard")
                message.channel.send(STATUS)
                console.log("creative check bad")
                
            }
            
        }
        else if (!arguments.length) {
            let { body } = await superagent.get('https://fortnite-api.com/v2/news');
            console.log("fetch body")
            if(body.status === "200"){

                let News = new Discord.MessageEmbed()
                .setTitle("News")
                .setImage(body.data.br.image)
                .setColor("RANDOM")
                .setTimestamp()
                .setFooter('Copyright Intermarket 2021')
                message.channel.send(News)
                console.log("check good")

            }
            else if(body.status != "200"){
                const STATUS = new Discord.MessageEmbed()
                .setTitle("ERREUR | Les actus n'ont pas pu être atteints")
                .setDescription("Nous vous prions de nous excuser mais les news ne sont pas atteignables. Merci de réessayer plus tard")
                message.channel.send(STATUS)
                console.log("check bad")
                
            }
            
        }
        
        
        
        

    }
};