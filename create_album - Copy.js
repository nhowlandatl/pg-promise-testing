// Need to modify to have two prompts, chain off each other?

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

prompt('Album name? ')
    .then(function album_name(val) {
        res.push(val);
        console.log(res);
        return prompt('Album year? ')
    })
    .then(function album_year(val) {
        res.push(val)
        console.log(res);
        return prompt('Artist ID?')
    })
    .then(function artist_id(val) {
        res.push(val)
        console.log(res);
        return db.one('INSERT INTO albums(album_name, album_year, artist_id) VALUES($1, $2, $3) RETURNING album_name, album_id', (res))
    })
    .then(data => {
        console.log(data.album_name + ' added at album ID ' + data.album_id) // print new album id; 
        pgp.end();
        prompt.end();
    })
    .catch(error => {
        console.log('ERROR:', error); // print error;
});
// prompt('Track name? ')
//     .then(function artist_name(val) {
//         res2.push(val);
//         console.log(res2);
//         return prompt('album id? ')
//     })
//     .then(function album_id(val) {
//         res2.push(val)
//         console.log(res2); // print new album id;
//         pgp.end();
//         prompt.end();
//     })
//     .catch(error => {
//         console.log('ERROR:', error); // print error;
// });

// prompt('Album name? ')
//     .then(function album_name(val) {
//         res.push(val);
//         return prompt('album year? ');
//     })
//     .then(function album_year(val) {
//         res.push(val);
//         console.log(res);
//         return prompt('artist ID? ');
//     })
//     .then(function artist_id(val) {
//         res.push(val);
//         console.log(res);
//         prompt.done();
//     })

// db.one('INSERT INTO artist(artist_name) VALUES($1) RETURNING artist_name', ('The Monsters'))
//     .then(data => {
//         console.log(data.artist_name); // print new album id;
//     })
//     .catch(error => {
//         console.log('ERROR:', error); // print error;
// });

// db.query('SELECT * FROM albums')
//     .then((results) => {
//         results.forEach((row) => {
//             console.log(row);
//         })
//     })
//     .catch((e) => {
//         console.error(e);
//     });
