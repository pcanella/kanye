'use strict';


var ScrapeModel = require('../../models/scrape');


module.exports = function(router) {
    router.get('/', function(req, res) {

        var model = new ScrapeModel();
        var needle = require('needle');
        var cheerio = require('cheerio');
        var fs = require('fs');
        var $;
        var kanyeToThe = [];
        var yeezyTaughtMe = {};
        var firstOne = false;

        needleLoop(needleCall);

        function needleCall(t) {
            var storeFn = (t === 10) ? storeAndWrite : storeSongs;
            needle.get('http://www.allmusic.com/artist/kanye-west-mn0000361014/songs/all/' + t, storeFn);
        }

        function needleLoop() {
            for (var i = 1; i <= 10; i++) {
                needleCall(i);
            }
        }

        function pushTo() {
            kanyeToThe.push({
                name: $(this).find('a').first().text().replace(/([()[{*+.$^\\|?])/g, '\\$1'),
                featured: $(this).find('.featured-artists').text().replace(/(\r\n|\n|\r|feat.)/gm, '').trim()
            });
        }

        function storeAndWrite(err, response) {
            storeSongs(err, response);
            writeToSomething();
        }

        function storeSongs(err, response) {
            console.log(err, response);
            $ = cheerio.load(response.body);
            $('.title').each(pushTo);
        }

        function writeToSomething() {
            yeezyTaughtMe.songs = kanyeToThe;
            var writeOrAppend = (firstOne === false) ? 'appendFile' : 'writeFile';

            fs[writeOrAppend]('songs.js', 'module.exports=' + JSON.stringify(yeezyTaughtMe), function(err) {
                console.log(err);
            });
        }



        res.format({
            json: function() {
                res.json(model);
            },
            html: function() {
                res.render('scrape/index', model);
            }
        });
    });

};
