const r = require("readline-sync");
const chalk = require("chalk");
const Discord = require("discord.js");
const client = new Discord.Client();

let token = r.question(chalk.redBright("[>] ") + chalk.whiteBright("Token: "))

client.login(token).catch(err => {
    console.clear();
    console.log(chalk.redBright("[") + chalk.whiteBright(err) + chalk.redBright("]"))
}) 

client.on("ready", () => {
    console.clear();
    console.log(chalk.redBright("[") + chalk.whiteBright(`Logged into ${client.user.tag}`) + chalk.redBright("]"))
    let confirmation = r.question(chalk.redBright("[>] ") + chalk.whiteBright("Are you sure you want to do this: y/n "))
    if(confirmation == "y"){
        console.clear();
        console.log(chalk.redBright("[") + chalk.whiteBright("Click enter to send nothing to anyone") + chalk.redBright("]"))
        let message = r.question(chalk.redBright("[>] ") + chalk.whiteBright("Message to send to all friends: "))
        console.clear();
        destroyAccount(message);
    }else if(confirmation == "n"){
        console.log(chalk.redBright("[") + chalk.whiteBright(`I won't destroy the account`) + chalk.redBright("]"));
        r.question()
    }else{
        console.log(chalk.redBright("[") + chalk.whiteBright(`Invalid input`) + chalk.redBright("]"))
    }

    async function destroyAccount(message){
        await client.guilds.forEach(g => {
            if(g.owner.user.id == client.user.id){
                g.delete().then(() => {
                    console.log(chalk.redBright("[") + chalk.whiteBright(`Deleted ${g.name}`) + chalk.redBright("]"))
                })
            }else{
                g.leave().then(() => {
                    console.log(chalk.redBright("[") + chalk.whiteBright(`Left ${g.name}`) + chalk.redBright("]"))
                })
            }
        })

        if(message != ""){
            await client.user.friends.forEach(f => {
                f.send(message).then(() => {
                    console.log(chalk.redBright("[") + chalk.whiteBright(`Sent a message to ${f.tag}`) + chalk.redBright("]"))
                })
            })
        }
        
        await client.user.friends.forEach(f => {
            f.removeFriend().then(() => {
                console.log(chalk.redBright("[") + chalk.whiteBright(`Removed ${f.tag} as a friend`) + chalk.redBright("]"))
            })
        })
    }
})