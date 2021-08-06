module.exports = {
    name: "ping",
    category: "Utility",
    aliase: ["ms"],
    cooldown: 10,
    usage: "ping",
    description: "Latência da API do BOT",

    run: async (client, message, args, text, prefix) => {
        message.reply('Calculing ping...').then(resultMessage => {
            const ping = resultMessage.createdTimestamp - message.createdTimestamp

            resultMessage.edit(`Bot latency: ${ping}, API Latency: ${client.ws.ping}`)
        })
    }
}