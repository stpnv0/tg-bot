const TelegramApi = require('node-telegram-bot-api')
const {gameOption, againOption} = require('./options')

const token = '6258056589:AAGyJ7E1cZlMpLVimiZMEVxBIzTtaeWog-c'

const bot = new TelegramApi(token, {polling: true})

bot.setMyCommands( [
    {command: '/start',description: 'Начальное приветствие'},
    {command: '/info',description: 'Информация о пользователе'},
    {command: '/game',description: 'Игра "цифры"'},
])

const chats = {}

startGame = async (chatId) => {
    await bot.sendMessage(chatId, 'я придумаю число от 0 до 9, а ты сиди думай че я загадал');
    const randomNumber = Math.floor(Math.random() * 10);
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, 'Погнали жи ес!', gameOption);
}

const start = () => {
    bot.on('message', async (msg) => {
        const text = msg.text;
        const chatId = msg.chat.id
        // bot.sendMessage(chatId,` зачем ты написал '${text}', клоун?`)
        
        if (text === '/start') {
            await bot.sendMessage(chatId, 'Здарова заебал')
            return bot.sendSticker(chatId, 'https://chpic.su/_data/stickers/h/HAHAHueta/HAHAHueta_001.webp' )
        }
        if ( text === '/info') {
            return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}, я тебя найду!! Беги из города!`)
        } 
        if( text === '/game') {
            return startGame(chatId)
        }
        return bot.sendMessage(chatId, 'Я не разбираю че ты пишешь, сын стиралки')
    })

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg. message.chat.id;
        if ( data === '/again') {
            return startGame(chatId)
        }
        if ( data === chats[chatId]) {
            return await bot.sendMessage(chatId,'На этот раз повезло, живи', againOption )
        } else {
            return await bot.sendMessage(chatId,`Ну всё, мать проиграл. Ответ был:${chats[chatId]}`, againOption  )
        }
    })
}

start()