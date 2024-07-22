    const { Client, Collection, Events, GatewayIntentBits, EmbedBuilder, setPresence, Embed } = require('discord.js');
    const { token, prefix } = require('./config.json');

    const client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent
        ]
    });

    client.once(Events.ClientReady, readyClient => {
        console.log(`Ready! Logged in as ${readyClient.user.tag}`);
        // client.user.setPresence({
        //     activities: [{ name: ' with your mother', type: 'PLAYING' }],
        //     status: 'dnd'
        // });
    });

    commandPrefix = prefix; 
    const commands = {
        ping: (message) => ping(message),
        randomnumber: (message) => randomNumber(message),
        dice: (message) => rollDice(message),
        coinflip: (message) => coinFlip(message),
        help: (message) => help(message),
        resetbot: (message) => resetBot(message),
    };
      
    client.on("messageCreate", (message) => {
        if (message.author === client.user) return;
            const userMessage = message.content.toLowerCase();
        
        if (userMessage.startsWith(prefix.toLowerCase())) {
            const command = userMessage.slice(prefix.length).trim();
            commands[command] && commands[command](message);
        }
    });



    function dnd(message) {
        message.channel.send("do not disturb me")
    }
    function ping(message) {
        try {
            const randomNumber = new EmbedBuilder()
                .setColor("#db9fd5")
                .setTitle(`Ping`)
                .setDescription(`Bot latency: ${Date.now() - message.createdTimestamp} ms`)
            message.channel.send({ embeds: [randomNumber] });
        } catch (error) {
            console.error("Error in ping function:", error);
        }
    }


    function randomNumber(message) {
        try {
            const randomNumber = new EmbedBuilder()
                .setColor("#db9fd5")
                .setTitle(`Your random number is...`)
                .setDescription(`${Math.floor(Math.random() * 500)}`)
            message.channel.send({ embeds: [randomNumber] });
        } catch (error) {
            console.error("Error in randomNumber function:", error);
        }
    }

    function rollDice(message) {
        try {
            const dice = new EmbedBuilder()
                .setColor("#db9fd5")
                .setTitle(`Your number is: `)
                .setDescription(`${Math.floor(Math.random() * 6)}`)
            message.channel.send({ embeds: [dice] });
        } catch (error) {
            console.error("Error in dice function:", error);
        }
    }

    function coinFlip(message) {
        try {
            const newNumber = Math.floor(Math.random() * 2);
            var outcome;

            if(newNumber == 1) 
            {outcome = "Tails";} 
            else 
            {outcome = "Heads";}

            const coinFlip = new EmbedBuilder()
                .setColor("#db9fd5")
                .setTitle(`Coin flip`)
                .setDescription(`${outcome}`)
            message.channel.send({ embeds: [coinFlip] });
        } catch (error) {
            console.error("Error in NAME function: ", error)
        }
    }

    function help(message) {
        try {
            const help = new EmbedBuilder()
                .setColor("#db9fd5")
                .setTitle("Nepolyie's list of commands")
                .setDescription(`Bot prefix: " ${prefix} "`)
                .addFields({ name: "ping", value: "Shows you the latency of the bot", inline: true})
                .addFields({ name: "randomnumber", value: "Gives you a random number!", inline: true})
                .addFields({ name: "rolldice", value: "Rolls a dice *shrugs*", inline: true})
                .addFields({ name: "coinflip", value: "Flips a coin (virtually of course)", inline: true})

            message.channel.send({ embeds: [help] });
            const help2 = new EmbedBuilder()
                .setColor("#db9fd5")
                .setTitle("Nepolyie AI ✨ Commands")
                .setDescription(`If your server supports Nepolyie AI then you can use the following commands to show more information about it.`)
                .addFields({ name: "!reset", value: "Resets messages. Start from scratch", inline: true})
                .addFields({ name: "!ping", value: "Bot latency", inline: true})
                .addFields({ name: "!model", value: "Shows the currently used model", inline: true})
                .addFields({ name: "!system", value: "Shows the current instructions", inline: true})
            message.channel.send({ embeds: [help2] })
        } catch (error) {
            message.channel.send(`good luck man ${error}`);
            console.error("Error in help function: ", error)
        }
    }

    async function resetBot(message) {
        try {
            const resetBot = new EmbedBuilder()
                .setColor("#db9fd5")
                .setTitle(`I uhh.. Disabled this command because you are all so predictable`)
                .setDescription("Fuck you from the heart!")
                // client.destroy()
            message.channel.send({ embeds: [resetBot] });
            // client.destroy()
            // .then(() => {
            //     console.log("Client DESTROYED");
            // })
            // .catch((error) => {
            //     console.log("Error in resetBot function |1|: ", error)
            // })
            // await client.login(token);
            // const resetSuccessful = new EmbedBuilder()
            //     .setColor("#db9fd5")
            //     .setTitle(`Bot status`)
            //     .setDescription(`Bot has been reset`)
            // message.channel.send({ embeds: [resetSuccessful] })
        } catch (error) {
            console.error("Error in resetBot function: ", error)
        }
      }




      function define(message) {
        try {
            const NAME = new EmbedBuilder()
                .setColor("#db9fd5")
                .setTitle(`idiot (/'ɪdɪət/)`)
                .setDescription(`You right now thinking I got a define command lmao`)
            message.channel.send({ embeds: [NAME] });
        } catch (error) {
            console.error("Error in NAME function: ", error)
        }
    }
    


    function COMMANDTEMPLATE(message) {
        try {
            const NAME = new EmbedBuilder()
                .setColor("#db9fd5")
                .setTitle(``)
                .setDescription(``)
            message.channel.send({ embeds: [NAME] });
        } catch (error) {
            console.error("Error in NAME function: ", error)
        }
    }
    

    client.login(token);
