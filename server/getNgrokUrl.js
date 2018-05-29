/**
 * Small script that gets the ngrok URL automatically and autopopulates it in client code.
 * Only for development.
 * 
 * urls[0] contains http url.
 * urls[1] contains https url.
 */

const fs = require('fs')
const fetch = require('node-fetch')

fetch('http://localhost:4040/api/tunnels')
.then((res) => res.json())
.then((json) => json.tunnels.map(tunnel => tunnel.public_url))
.then((publicUrls) => {
    fs.writeFile('../client/constants/ngrokUrls.js', `export default ['${publicUrls[0]}','${publicUrls[1]}']`,
    () => {
        console.log('ngrok tunnel urls are:', publicUrls)
    })
})
// .then(publicUrls => publicUrls.forEach(url => {
//     console.log(publicUrls)
//     console.log(url);
// }))
.catch((err) => {
    if (err.code === 'ECONNREFUSED') {
        return console.error(
            "Looks like you're not running ngrok."
        )
    }
    console.error(err)
})
