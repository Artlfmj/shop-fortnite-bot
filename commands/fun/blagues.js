
const nodefetch = require('node-fetch')
const Discord = require('discord.js')
const superagent = require('superagent');
const config = require('./blagues.json')
const request = require('request');
const tokenBlaguesAPI = config.blagues;

module.exports = {
    name: "blague",
    aliases: ["blagues"],
    description: "Envoie blague",
    category: "fun",
    guildOnly: true,
    cooldown: 2,
    usage: "modes",
    run: async (client, message, args, user, text, prefix) => {
        message.delete();
        let url = 'https://www.blagues-api.fr/api/' + (args[0] ? ("type/" + args[0] + '/random') : 'random');
            request(url, {
                    headers: {
                        'Authorization': `Bearer ` + tokenBlaguesAPI
                    }
                },
                function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        const jokeBody = JSON.parse(body);
                        let typeBlague = "";
                        switch (jokeBody.type) {
                            case "global":
                                typeBlague = "tout public";
                                break;
                            case "dev":
                                typeBlague = "de développeur";
                                break;
                            case "dark":
                                typeBlague = "humour noir";
                                break;
                            case "limit":
                                typeBlague = "limite limite";
                                break;
                            case "beauf":
                                typeBlague = "de beauf";
                                break;
                            case "blondes":
                                typeBlague = "sur les blondes";
                                break;
                        }
                        const embed = new Discord.MessageEmbed()
                            .setTitle(jokeBody.joke)
                            .setColor(0x00bfff)
                            .setDescription("||" + jokeBody.answer + "||")
                            .setFooter('Blague ' + typeBlague, message.guild.iconURL())
                            .setTimestamp();
                        message.channel.send(embed);
                    }
                });

    }
};