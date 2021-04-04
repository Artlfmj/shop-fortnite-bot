//here the event starts
const Discord = require('discord.js')

module.exports = async (client, member) => {
    //logs when a member joins, make sure to have GuildMemberIntents active in discord.com/developers
    console.log(member + "joined in: " + member.guild.name)
    if(member.guild.id === "822747635517227009"){
        //const embed1 = new Discord.MessageEmbed()
        //.setTitle(`Bienvenue à ${member.username}`)
        //.setImage(member.displayAvatarURL({
        //    dynamic: true,
        //    size: 512,
        //    format: "png",
        //}))
        //.setDescription(`Bienvenue ${member} dans TECHNCODE. Tu peux consulter les regles dans <#822747635965755433>. Accepte bien le reglement afin de profiter de tous nos services`)
        //message.guild.channels.cache.get('828297901956399134').send(embed1)
    }
};

