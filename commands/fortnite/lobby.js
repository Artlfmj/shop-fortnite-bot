//Here the command starts
const Discord = require('discord.js')
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
       if(!args.length){
           const Info = new Discord.MessageEmbed()
           .setTitle("Lobbys Fortnite")
           .setColor("#2f3136")
           .setDescription("Voici les images des lobbys disponibles \n \nPour avoir l'image du lobby, faites  **s!lobby ``10, 12, 13, 14, Halloween, 15, Noel, 16``**")
           message.channel.send(Info)
       }
       if(args[0] === "10"){
           const SaisonDIX = new Discord.MessageEmbed()
           .setTitle("Lobby Fortnite Saison X")
           .setImage("https://shopbot.ml/assets/lobbys/Saison_10.png")
           .setColor("#2f3136")
           .setFooter("© Copyright Shop 2021")
           .setTimestamp()
           message.channel.send(SaisonDIX)
       }
       if(args[0] === "X"){
        const SaisonDIX = new Discord.MessageEmbed()
        .setTitle("Lobby Fortnite Saison X")
        .setImage("https://shopbot.ml/assets/lobbys/Saison_10.png")
        .setColor("#2f3136")
        .setFooter("© Copyright Shop 2021")
        .setTimestamp()
        message.channel.send(SaisonDIX)
        }
        if(args[0] === "12"){
            const SaisonDOUZE = new Discord.MessageEmbed()
            .setTitle("Lobby Fortnite Saison 2 Chapitre 2")
            .setImage("https://shopbot.ml/assets/lobbys/Saison_12.png")
            .setColor("#2f3136")
            .setFooter("© Copyright Shop 2021")
            .setTimestamp()
            message.channel.send(SaisonDOUZE)
        }
        if(args[0] === "13"){
            const SaisonTREIZE = new Discord.MessageEmbed()
            .setTitle("Lobby Fortnite Saison 3 Chapitre 2")
            .setImage("https://shopbot.ml/assets/lobbys/Saison_13.png")
            .setColor("#2f3136")
            .setFooter("© Copyright Shop 2021")
            .setTimestamp()
            message.channel.send(SaisonTREIZE)
        }
        if(args[0] === "14"){
            const SaisonQUATORZE = new Discord.MessageEmbed()
            .setTitle("Lobby Fortnite Saison 4 Chapitre 2")
            .setImage("https://shopbot.ml/assets/lobbys/Saison_14.png")
            .setColor("#2f3136")
            .setFooter("© Copyright Shop 2021")
            .setTimestamp()
            message.channel.send(SaisonQUATORZE)
        }
        if(args[0] === "Halloween"){
            const SaisonHalloween = new Discord.MessageEmbed()
            .setTitle("Lobby Fortnite Saison 4 Chapitre 2 Halloween")
            .setImage("https://shopbot.ml/assets/lobbys/Saison_14_halloween.png")
            .setColor("#2f3136")
            .setFooter("© Copyright Shop 2021")
            .setTimestamp()
            message.channel.send(SaisonHalloween)
        }
        if(args[0] === "15"){
            const SaisonQUINZE = new Discord.MessageEmbed()
            .setTitle("Lobby Fortnite Saison 5 Chapitre 2")
            .setImage("https://shopbot.ml/assets/lobbys/Saison_15.png")
            .setColor("#2f3136")
            .setFooter("© Copyright Shop 2021")
            .setTimestamp()
            message.channel.send(SaisonQUINZE)
        }
        if(args[0] === "Noel"){
            const SaisonNoel = new Discord.MessageEmbed()
            .setTitle("Lobby Fortnite Saison 5 Chapitre 2 Noel")
            .setImage("https://shopbot.ml/assets/lobbys/Saison_15_Noel.png")
            .setColor("#2f3136")
            .setFooter("© Copyright Shop 2021")
            .setTimestamp()
            message.channel.send(SaisonNoel)
        }
        if(args[0] === "16"){
            const SaisonSEIZE = new Discord.MessageEmbed()
            .setTitle("Lobby Fortnite Saison 6 Chapitre 2")
            .setImage("https://shopbot.ml/assets/lobbys/Saison_16.png")
            .setColor("#2f3136")
            .setFooter("© Copyright Shop 2021")
            .setTimestamp()
            message.channel.send(SaisonSEIZE)
        }
       
    }
}