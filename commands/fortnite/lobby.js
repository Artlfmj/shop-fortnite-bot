//Here the command starts
const Discord = require('discord.js')
const BasePaginator = require('discord-paginator.js')
module.exports = {
    //definition
    name: "lobby", //the name of the command 
    category: "fortnite", //the category this will be listed at, for the help cmd
    aliases: [""], //every parameter can be an alias
    cooldown: 2, //this will set it to a 2 second cooldown
    usage: "", //this is for the help command for EACH cmd
    description: "", //the description of the command

    //running the command with the parameters: client, message, args, user, text, prefix
    run: async (client, message, args, user, text, prefix) => {
        const Info = new Discord.MessageEmbed()
           .setTitle("Lobbys Fortnite")
           .setColor("#2f3136")
           .setDescription("Voici les images des lobbys disponibles \n \nPour avoir l'image du lobby, faites  **s!lobby ``10, 12, 13, 14, Halloween, 15, Noel, 16``**")

           const SaisonDIX = new Discord.MessageEmbed()
           .setTitle("Lobby Fortnite Saison X")
           .setImage("https://shopbot.ml/assets/lobbys/Saison_10.png")
           .setColor("#2f3136")
           .setFooter("© Copyright Shop 2021")
           .setTimestamp()

           const SaisonDOUZE = new Discord.MessageEmbed()
           .setTitle("Lobby Fortnite Saison 2 Chapitre 2")
           .setImage("https://shopbot.ml/assets/lobbys/Saison_12.png")
           .setColor("#2f3136")
           .setFooter("© Copyright Shop 2021")
           .setTimestamp()

           const SaisonTREIZE = new Discord.MessageEmbed()
           .setTitle("Lobby Fortnite Saison 3 Chapitre 2")
           .setImage("https://shopbot.ml/assets/lobbys/Saison_13.png")
           .setColor("#2f3136")
           .setFooter("© Copyright Shop 2021")
           .setTimestamp()

           const SaisonQUATORZE = new Discord.MessageEmbed()
            .setTitle("Lobby Fortnite Saison 4 Chapitre 2")
            .setImage("https://shopbot.ml/assets/lobbys/Saison_14.png")
            .setColor("#2f3136")
            .setFooter("© Copyright Shop 2021")
            .setTimestamp()

            const SaisonHalloween = new Discord.MessageEmbed()
            .setTitle("Lobby Fortnite Saison 4 Chapitre 2 Halloween")
            .setImage("https://shopbot.ml/assets/lobbys/Saison_14_halloween.png")
            .setColor("#2f3136")
            .setFooter("© Copyright Shop 2021")
            .setTimestamp()

            const SaisonQUINZE = new Discord.MessageEmbed()
            .setTitle("Lobby Fortnite Saison 5 Chapitre 2")
            .setImage("https://shopbot.ml/assets/lobbys/Saison_15.png")
            .setColor("#2f3136")
            .setFooter("© Copyright Shop 2021")
            .setTimestamp()

            const SaisonNoel = new Discord.MessageEmbed()
            .setTitle("Lobby Fortnite Saison 5 Chapitre 2 Noel")
            .setImage("https://shopbot.ml/assets/lobbys/Saison_15_Noel.png")
            .setColor("#2f3136")
            .setFooter("© Copyright Shop 2021")
            .setTimestamp()
            const SaisonSEIZE = new Discord.MessageEmbed()
            .setTitle("Lobby Fortnite Saison 6 Chapitre 2")
            .setImage("https://shopbot.ml/assets/lobbys/Saison_16.png")
            .setColor("#2f3136")
            .setFooter("© Copyright Shop 2021")
            .setTimestamp()

       if(!args.length){
           
           embeds = [
                Info,
                SaisonDIX,
                SaisonDOUZE,
                SaisonTREIZE,
                SaisonQUATORZE,
                SaisonHalloween,
                SaisonQUINZE,
                SaisonNoel,
                SaisonSEIZE
            ]
        
            const Paginator = new BasePaginator({
             pages: embeds, //the pages
             timeout: 120000, //the timeout for the reaction collector ended (in ms)
             page: 'Page {current}/{total}', //Show the page counter to the message
             filter: (reaction, user) => user.id == message.author.id //to filter the reaction collector
         })
     
         Paginator.spawn(message.channel) //to spawn the paginator to specific text channel
       }
       if(args[0] === "10"){
           
           message.channel.send(SaisonDIX)
       }
       if(args[0] === "X"){
            message.channel.send(SaisonDIX)
        }
        if(args[0] === "12"){
            message.channel.send(SaisonDOUZE)
        }
        if(args[0] === "13"){
           
            message.channel.send(SaisonTREIZE)
        }
        if(args[0] === "14"){
            
            message.channel.send(SaisonQUATORZE)
        }
        if(args[0] === "Halloween"){
            
            message.channel.send(SaisonHalloween)
        }
        if(args[0] === "15"){
            
            message.channel.send(SaisonQUINZE)
        }
        if(args[0] === "Noel"){
            
            message.channel.send(SaisonNoel)
        }
        if(args[0] === "16"){
            
            message.channel.send(SaisonSEIZE)
        }
       
    }
}