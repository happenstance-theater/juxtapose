// Start Impress
var prez = impress();
prez.init();



// First Page Play button
// $('button#button-play').on('click', function(){
//     windowVideos.ssm.play();
//     prez.next();
//     return false;
// });




function CastRoom(name, matrix) {
    this.name = name;
    this.matrix = matrix;

    this.setup = function() {
        var self = this;

        // Render Video HTML
        this.videos = $('script#videos-html-' + this.name).html();
        $('#videos-render-' + this.name).html(this.videos);

        // Build Video Interaction
        _.each(self.matrix, function(value, key){
            // Instantiate Player
            var video = videojs(value);

            // Button Listener
            $('button.' + value).on('click', function(){
                video.play();
                $(this).hide();
            });

            // Dispose when done
            video.on('ended', function() {
                this.dispose();
            });
        });
    };
}


var av = new CastRoom('av', {
    portrait: 'av-portrait',
    scissors: 'av-scissors',
    coaster: 'av-coaster',
    marblesWall: 'av-marbles-wall',
    marblesJar: 'av-marbles-jar',
    map: 'av-map',
    wood: 'av-wood'
});
// av.setup();


var ssm = new CastRoom('ssm', {
    globe: 'ssm-globe',
    books: 'ssm-books',
    gramaphone: 'ssm-gramaphone',
    box: 'ssm-box',
    cup: 'ssm-cup',
    mannequin: 'ssm-mannequin'
});
// ssm.setup();


var gg = new CastRoom('gg', {
    dowel: 'gg-dowel',
    bowl: 'gg-bowl',
    goblet: 'gg-goblet',
    sand: 'gg-sand',
    constellationLow: 'gg-constellation-low',
    symbol: 'gg-symbol',
    moon: 'gg-moon',
    constellationHigh: 'gg-constellation-high',
    marble: 'gg-marble'
});
// gg.setup();


var sot = new CastRoom('sot', {
    footlight: 'sot-footlight',
    lobster: 'sot-lobster',
    cherub: 'sot-cherub',
    bottle: 'sot-bottle',
    ballerina: 'sot-ballerina',
    fish: 'sot-fish',
    rose: 'sot-rose'
});
// sot.setup();


var mlj = new CastRoom('mlj', {
    turtle: 'mlj-turtle',
    feather: 'mlj-feather',
    skull: 'mlj-skull',
    binoculars: 'mlj-binoculars',
    egg: 'mlj-egg',
    shell: 'mlj-shell'
});
// mlj.setup();



















// Tenement Windows

// var windowVideos = {
//     ssm: videojs('windows-ssm'),
//     mlj: videojs('windows-mlj'),
//     sot: videojs('windows-sot'),
//     av: videojs('windows-av'),
//     gg: videojs('windows-gg'),
//     cv: videojs('windows-chari-vari')
// };

// windowVideos.ssm.on('ended', function() {
//     this.dispose();
//     windowVideos.mlj.play();
// });
// windowVideos.mlj.on('ended', function() {
//     this.dispose();
//     windowVideos.sot.play();
// });
// windowVideos.sot.on('ended', function() {
//     this.dispose();
//     windowVideos.av.play();
// });
// windowVideos.av.on('ended', function() {
//     this.dispose();
//     windowVideos.gg.play();
// });
// windowVideos.gg.on('ended', function() {
//     this.dispose();
//     windowVideos.cv.play();
// });
// windowVideos.cv.on('ended', function() {
//     this.dispose();
//     conciergeVideos.ssm.play();
//     prez.next();
// });







// Concierge Room

// var conciergeVideos = {
//     phone: videojs('concierge-phone'),
//     av: videojs('concierge-av'),
//     gg: videojs('concierge-gg'),
//     mlj: videojs('concierge-mlj'),
//     sot: videojs('concierge-sot'),
//     ssm: videojs('concierge-ssm')
// };

// var conciergeVideoCount = 0;

// function trackConcierge() {
//     if (conciergeVideoCount < 4) return;
//
//     $('button.crg-package').on('click', function(){
//         conciergeVideos.mlj.play();
//         $(this).hide();
//
//         setTimeout(function(){
//             $('#concierge-bg-img').attr('src', 'img/concierge-no-package.jpg');
//         }, 3000)
//     });
//
//     $('button.crg-package').show();
// }
//
// $('button.crg-clock').on('click', function(){
//     conciergeVideos.gg.play();
//     $(this).hide();
// });
// $('button.crg-umbrella').on('click', function(){
//     conciergeVideos.av.play();
//     $(this).hide();
// });
// $('button.crg-bell').on('click', function(){
//     conciergeVideos.sot.play();
//     $(this).hide();
// });
// $('button.crg-phone').on('click', function(){
//     conciergeVideos.phone.play();
//     $(this).hide();
// });
//
// conciergeVideos.ssm.on('ended', function() {
//     this.dispose();
// });
//
// conciergeVideos.gg.on('ended', function() {
//     this.dispose();
//     conciergeVideoCount++;
//     trackConcierge();
// });
// conciergeVideos.av.on('ended', function() {
//     this.dispose();
//     conciergeVideoCount++;
//     trackConcierge();
// });
// conciergeVideos.phone.on('ended', function() {
//     this.dispose();
//     conciergeVideoCount++;
//     trackConcierge();
// });
// conciergeVideos.sot.on('ended', function() {
//     this.dispose();
//     conciergeVideoCount++;
//     trackConcierge();
// });
//
// conciergeVideos.mlj.on('ended', function() {
//     this.dispose();
//
//     $('button.key-ssm').on('click', function(){
//         prez.next();
//         return false;
//     });
//
//     $('button.key-ssm').show();
// });
