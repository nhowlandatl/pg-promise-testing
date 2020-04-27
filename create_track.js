require('dotenv').config()

const config = {
    host: 'localhost',
    port: 5432,
    database: 'music_db3',
    user: 'postgres',
    password: process.env.PG_PASSWORD
}

const pgp = require('pg-promise')();
const db = pgp(config); 
const prompt = require('prompt-promise');
var res = [];

prompt('Song name? ')
    .then(function track_name(val) {
        res.push(val);
        console.log(res);
        return prompt('Album ID? ')
    })
    .then(function album_id(val) {
        res.push(val)
        console.log(res);
        return db.one('INSERT INTO tracks(song, album_id) VALUES($1, $2) RETURNING song, album_id', (res))
    })
    .then(data => {
        console.log(data.song + ' added at album ID ' + data.album_id) // print new album id; 
        pgp.end();
        prompt.end();
    })
    .catch(error => {
        console.log('ERROR:', error); // print error;
});