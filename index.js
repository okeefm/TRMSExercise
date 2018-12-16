let express = require('express');
const app = express();
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000;

let options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm', 'html'],
    index: false,
    maxAge: '1d',
    redirect: false,
    setHeaders: function (res, path, stat) {
        res.set('x-timestamp', Date.now())
    }
};

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static('static', options)); // for serving static files

// Players stored as an array of objects by video source
// ex: let players = {'video.mp4': [
//     {
//         'id': '12345',
//         'ip': '1.1.1.1'
//     }
// ],
// 'video2.mp4': [
//     {
//         id: '23456',
//         ip: '2.2.2.2'
//     }
// ]
// };

let players = {
    'http://reflect-tightytv-vod.cablecast.tv/vod/2-TRMS-Medium-v1.mp4': {},
    'http://reflect-tightytv-vod.cablecast.tv/vod/52-CTV-Needs-Interns-Promo-High-v1.mp4': {},
    'http://reflect-tightytv-vod.cablecast.tv/vod/3-NAB-2014-Artbeats-30min-High-v4.mp4': {}
};

app.set('trust proxy', true)

// endpoint for player to hit
app.post('/api/player', (req, res) => {
    players[req.body.video][req.body.id] = {
        id: req.body.id,
        ip: req.ip,
        lastSeen: new Date().getTime(),
        currentTime: req.body.currentTime
    };
    console.log(req.body);
    res.send('foo');
});

// Endpoint for dashboard to hit
app.get('/api/dashboard', (req, res) => {
    res.send(players);
});

app.listen(port, () => console.log(`TRMS app listening on port ${port}!`))
