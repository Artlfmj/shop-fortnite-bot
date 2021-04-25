const Discord = require('discord.js')
const superagent = require('superagent');
const Fortnite = require("fortnite-api-com")
const FortniteAPI = require("fortnite-api-io");
const fs = require('fs');
const BasePaginator = require('discord-paginator.js')
const fortniteAPI = new FortniteAPI("5322113d-12065afe-cd591053-39cf2335")

module.exports = {
    name: "modes",
    aliases: ["mode"],
    description: "Envoie modes",
    category: "fortnite",
    guildOnly: true,
    cooldown: 2,
    usage: "modes",
    run: async (client, message, args, user, text, prefix) => {
        message.delete()
        message.channel.startTyping()
        const wait = new Discord.MessageEmbed()
        .setTitle("Chargement des modes de jeux | VEUILLEZ PATIENTER...")
        .setColor("#2f3136")
        const msg = await message.channel.send(wait)
        const obj = await fortniteAPI.listCurrentGameModes()
        
        let ModesEmbed = new Discord.MessageEmbed()
        .setTitle("**Modes de jeux actuellements disponibles:**")
        .setDescription("Voici les modes de jeux disponbles sur Fortnite actuellement \n\n**Pour les voir cliquez sur les fléches afin de vous diriger dans le menu interactif**")
        .setColor("#2f3136")
        

        embeds = [
            ModesEmbed
        ]
        
        obj.modes.forEach(async (item) => {
            if(item.enabled && item.name && item.description){
                item.name = new Discord.MessageEmbed()
                .setTitle(`**${item.name}**`)
                .setColor("#2f3136")
                .addField("ID", item.id, false)
                .addField("Description", item.description, false)
                .addField("Taille d'équipe", item.maxTeamSize, false)
                .addField("Type de mode de jeu", item.gameType, false)
                .setImage(item.image)
                
                
                embeds.push(item.name)
            }
        });
        const Paginator = new BasePaginator({
            pages: embeds, //the pages
            timeout: 120000, //the timeout for the reaction collector ended (in ms)
            page: 'Page {current}/{total}', //Show the page counter to the message
            filter: (reaction, user) => user.id == message.author.id //to filter the reaction collector
        })
    
        Paginator.spawn(message.channel)
        
        msg.delete()
        message.channel.stopTyping()

    }
};