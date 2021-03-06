// Start Impress
var prez = impress();
prez.init();



// First Page Play button
// $('button#button-play').on('click', function(){
//     windowVideos.ssm.play();
//     prez.next();
//     return false;
// });


























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


//
// var conciergeVideos = {
//     phone: videojs('concierge-phone'),
//     av: videojs('concierge-av'),
//     gg: videojs('concierge-gg'),
//     mlj: videojs('concierge-mlj'),
//     sot: videojs('concierge-sot'),
//     ssm: videojs('concierge-ssm')
// };
//
// var conciergeVideoCount = 0;
//
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





// Cast Room
function CastRoom(name, slugs) {
    this.name = name;
    this.slugs = slugs;
    this.totalVideoCount = this.slugs.length;
    this.playedVideoCount = 0;

    this.setup = function() {
        var self = this;

        // Render Video HTML
        this.videos = $('script#videos-html-' + this.name).html();
        $('#videos-render-' + this.name).html(this.videos);

        // Build Video Interaction
        _.each(self.slugs, function(slug){
            // Instantiate Player
            var video = videojs(slug);

            // Button Listener
            $('button.' + slug).on('click', function(){
                video.play();
                $(this).hide();
            });

            // Dispose when done
            video.on('ended', function() {
                this.dispose();
                self.playedVideoCount++;
                self.returnToKeyRoom();
            });
        });
    };

    this.returnToKeyRoom = function() {
        if (this.playedVideoCount < this.totalVideoCount) return;
        prez.goto('keys-page');
    };
}




// Key Room
function KeyRoom() {
    this.slugs = [
        'keys-ssm',
        'keys-gg',
        'keys-sot',
        'keys-mlj',
        'keys-av'
    ];

    this.ssm = new CastRoom('ssm', [
        'ssm-globe',
        'ssm-books',
        'ssm-gramaphone',
        'ssm-box',
        'ssm-cup',
        'ssm-mannequin'
    ]);

    this.gg = new CastRoom('gg', [
        'gg-dowel',
        'gg-bowl',
        'gg-goblet',
        'gg-sand',
        'gg-constellation-low',
        'gg-symbol',
        'gg-moon',
        'gg-constellation-high',
        'gg-marble'
    ]);

    this.sot = new CastRoom('sot', [
        'sot-footlight',
        'sot-lobster',
        'sot-cherub',
        'sot-bottle',
        'sot-ballerina',
        'sot-fish',
        'sot-rose'
    ]);

    this.mlj = new CastRoom('mlj', [
        'mlj-turtle',
        'mlj-feather',
        'mlj-skull',
        'mlj-binoculars',
        'mlj-egg',
        'mlj-shell'
    ]);

    this.av = new CastRoom('av', [
        'av-portrait',
        'av-scissors',
        'av-coaster',
        'av-marbles-wall',
        'av-marbles-jar',
        'av-map',
        'av-wood'
    ]);

    this.setup = function() {
        var self = this;
        _.each(self.slugs, function(slug){

            // Listen for click
            $('button.' + slug).on('click', function(){
                var room = $(this).attr('data-room');

                // Setup room
                self[room].setup();

                // Go to room
                prez.goto(room + '-page');
            });
        });
    };
}



// Build Key Room
var keyRoom = new KeyRoom();
keyRoom.setup();
