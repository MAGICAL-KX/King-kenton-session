
const express = require("express");
const app = express();





const pino = require("pino");
let { toBuffer } = require("qrcode");
const path = require('path');
const fs = require("fs-extra");
const { Boom } = require("@hapi/boom");
const PORT = process.env.PORT ||  5000
const MESSAGE = process.env.MESSAGE ||  `
┏━━⟪⟪ 𝕭𝖀𝕲 ⟫━⦿
┃✗『 •ᴀᴍᴀᴢɪɴɢ ʏᴏᴜ ᴄʜᴏᴏsᴇ• 』
┃✗              •𝐇𝐈𝐑𝐎 ᴹᴰ•
┃✗ •ʏᴏᴜ sᴜᴄᴄᴇssғᴜʟʟʏ ᴜsᴇᴅ•
┃✗ •ᴘᴀɪʀ ᴄᴏᴅᴇ ғᴏʀ sᴇssɪᴏɴ•
┃✗ •ᴏᴡɴᴇʀ• 𝕸𝕬𝕲𝕴𝕮𝕬𝕷 𝕶𝖃
┃✗ •ɴᴏᴛᴇ• ᴅᴏɴ'ᴛ ᴘʀᴏᴠɪᴅᴇ ʏᴏᴜʀ
┃✗ sᴇssɪᴏɴ ɪᴅ ᴛᴏ ᴀɴʏ-ᴏɴᴇ 
┃✗ 
┃✗ 
┃✗ PLEASE DON'T FORGET
┃✗ TO STAR MY REPO
┃✗ FOLLOW MY CHANNELS
┃✗ CHAT FOR CHAT
┃✗ JOIN MY GROUP
┃✗ AND SUBSCRIBE YT
┗━━━━━━━━━━⦿

•sᴜᴘᴘᴏʀᴛ ᴍᴇ ᴏɴ ʏᴏᴜ-ᴛᴜʙᴇ•
https://www.youtube.com/KentonX-tec
•sᴜᴘᴘᴏʀᴛ ɢʀᴏᴜᴘ•
https://chat.whatsapp.com/BSFZGh0YT3K9NHDt4UJmZy
•ᴄʜᴇᴄᴋ ᴍʏ ᴡᴇʙ ꜰᴏʀ ᴍᴏʀᴇ• (REPO)
https://github.com/MAGICAL-KX
`











if (fs.existsSync('./auth_info_baileys')) {
    fs.emptyDirSync(__dirname + '/auth_info_baileys');
  };
  
  app.use("/", async(req, res) => {

  const { default: SuhailWASocket, useMultiFileAuthState, Browsers, delay,DisconnectReason, makeInMemoryStore, } = require("@whiskeysockets/baileys");
  const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })
  async function SUHAIL() {
    const { state, saveCreds } = await useMultiFileAuthState(__dirname + '/auth_info_baileys')
    try {
      let Smd =SuhailWASocket({ 
        printQRInTerminal: false,
        logger: pino({ level: "silent" }), 
        browser: Browsers.baileys("Desktop"),
        auth: state 
        });


      Smd.ev.on("connection.update", async (s) => {
        const { connection, lastDisconnect, qr } = s;
        if (qr) { res.end(await toBuffer(qr)); }


        if (connection == "open"){
          await delay(3000);
          let user = Smd.user.id;


//===========================================================================================
//===============================  SESSION ID    ===========================================
//===========================================================================================

          let CREDS = fs.readFileSync(__dirname + '/auth_info_baileys/creds.json')
          var Scan_Id = Buffer.from(CREDS).toString('base64')
         // res.json({status:true,Scan_Id })
          console.log(`
====================  SESSION ID  ==========================                   
SESSION-ID ==> ${Scan_Id}
-------------------   SESSION CLOSED   -----------------------
`)


          let msgsss = await Smd.sendMessage(user, { text:  Scan_Id });
          await Smd.sendMessage(user, { text: MESSAGE } , { quoted : msgsss });
          await delay(1000);
          try{ await fs.emptyDirSync(__dirname+'/auth_info_baileys'); }catch(e){}


        }

        Smd.ev.on('creds.update', saveCreds)

        if (connection === "close") {            
            let reason = new Boom(lastDisconnect?.error)?.output.statusCode
            // console.log("Reason : ",DisconnectReason[reason])
            if (reason === DisconnectReason.connectionClosed) {
              console.log("Connection closed!")
             // SUHAIL().catch(err => console.log(err));
            } else if (reason === DisconnectReason.connectionLost) {
                console.log("Connection Lost from Server!")
            //  SUHAIL().catch(err => console.log(err));
            } else if (reason === DisconnectReason.restartRequired) {
                console.log("Restart Required, Restarting...")
              SUHAIL().catch(err => console.log(err));
            } else if (reason === DisconnectReason.timedOut) {
                console.log("Connection TimedOut!")
             // SUHAIL().catch(err => console.log(err));
            }  else {
                console.log('Connection closed with bot. Please run again.');
                console.log(reason)
              //process.exit(0)
            }
          }



      });
    } catch (err) {
        console.log(err);
       await fs.emptyDirSync(__dirname+'/auth_info_baileys'); 
    }
  }








  SUHAIL().catch(async(err) => {
    console.log(err)
    await fs.emptyDirSync(__dirname+'/auth_info_baileys'); 


    //// MADE WITH 

});


  })


app.listen(PORT, () => console.log(`App listened on port http://localhost:${PORT}`));
