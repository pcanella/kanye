'use strict';


module.exports = function(router) {


    router.get('/', function(req, res) {

        // var need = require('needle');
        // whatever();
        // // need.get('http://www.allmusic.com/artist/kanye-west-mn0000361014/songs/all/9', function(err, response) {



        // // });

        // function whatever() {
        //     var songs = require('../../songs');
        //     for (var i = 0; i < songs.length; i++) {
        //         //console.log(getMatches('', response.body));
        //         console.log(songs[i].name);
        //     }
        // }


        // function getMatches(needle, haystack) {
        //     var myRe = new RegExp("\\b" + needle + "\\b((?!\\W(?=\\w))|(?=\\s))", "gi"),
        //         myArray, myResult = [];
        //     while ((myArray = myRe.exec(haystack)) !== null) {
        //         myResult.push(myArray.index);
        //     }
        //     return myResult;
        // }
        var songs = require('../../songs');

        res.format({
            json: function() {
                res.json(songs);
            },
            html: function() {
                res.render('findKanye/index', songs);
            }
        });
    });

};
