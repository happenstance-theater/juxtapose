// Start Impress
var prez = impress();
prez.init();



// First Page Play button
// $('button#button-play').on('click', function(){
//     windowVideos.ssm.play();
//     prez.next();
//     return false;
// });





// function User(name) {
//     this.name = name;
// }
// User.prototype.print = function(){
//     console.log(this.name);
// }
// var user = new User('Kunal');
// console.log(user);




function Room(name, matrix) {
    this.name = name;
    this.matrix = matrix;
    this.template = '';

    this.setup = function() {
        var self = this;

        // Render Template

        // Build Videos
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



var av = new Room('av', {
    portrait: 'av-portrait',
    scissors: 'av-scissors',
    coaster: 'av-coaster',
    marblesWall: 'av-marbles-wall',
    marblesJar: 'av-marbles-jar',
    map: 'av-map',
    wood: 'av-wood'
});
av.setup();




// AV
// var avVideos = {
//     portrait: videojs('av-portrait'),
//     scissors: videojs('av-scissors'),
//     coaster: videojs('av-coaster'),
//     marblesWall: videojs('av-marbles-wall'),
//     marblesJar: videojs('av-marbles-jar'),
//     map: videojs('av-map'),
//     wood: videojs('av-wood')
// };

// $('button.av-portrait').on('click', function(){
//     avVideos.portrait.play();
//     $(this).hide();
// });
// $('button.av-scissors').on('click', function(){
//     avVideos.scissors.play();
//     $(this).hide();
// });
// $('button.av-coaster').on('click', function(){
//     avVideos.coaster.play();
//     $(this).hide();
// });
// $('button.av-marbles-wall').on('click', function(){
//     avVideos.marblesWall.play();
//     $(this).hide();
// });
// $('button.av-marbles-jar').on('click', function(){
//     avVideos.marblesJar.play();
//     $(this).hide();
// });
// $('button.av-map').on('click', function(){
//     avVideos.map.play();
//     $(this).hide();
// });
// $('button.av-wood').on('click', function(){
//     avVideos.wood.play();
//     $(this).hide();
// });
//
// avVideos.portrait.on('ended', function() {
//     this.dispose();
// });
// avVideos.scissors.on('ended', function() {
//     this.dispose();
// });
// avVideos.coaster.on('ended', function() {
//     this.dispose();
// });
// avVideos.marblesWall.on('ended', function() {
//     this.dispose();
// });
// avVideos.marblesJar.on('ended', function() {
//     this.dispose();
// });
// avVideos.map.on('ended', function() {
//     this.dispose();
// });
// avVideos.wood.on('ended', function() {
//     this.dispose();
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








// SSM
// var ssmVideos = {
//     globe: videojs('ssm-globe'),
//     books: videojs('ssm-books'),
//     gramaphone: videojs('ssm-gramaphone'),
//     box: videojs('ssm-box'),
//     cup: videojs('ssm-cup'),
//     mannequin: videojs('ssm-mannequin')
// };
// $('button.ssm-globe').on('click', function(){
//     ssmVideos.globe.play();
//     $(this).hide();
// });
// $('button.ssm-books').on('click', function(){
//     ssmVideos.books.play();
//     $(this).hide();
// });
// $('button.ssm-gramaphone').on('click', function(){
//     ssmVideos.gramaphone.play();
//     $(this).hide();
// });
// $('button.ssm-box').on('click', function(){
//     ssmVideos.box.play();
//     $(this).hide();
// });
// $('button.ssm-cup').on('click', function(){
//     ssmVideos.cup.play();
//     $(this).hide();
// });
// $('button.ssm-mannequin').on('click', function(){
//     ssmVideos.mannequin.play();
//     $(this).hide();
// });
//
//
// ssmVideos.globe.on('ended', function() {
//     this.dispose();
// });
// ssmVideos.books.on('ended', function() {
//     this.dispose();
// });
// ssmVideos.gramaphone.on('ended', function() {
//     this.dispose();
// });
// ssmVideos.box.on('ended', function() {
//     this.dispose();
// });
// ssmVideos.cup.on('ended', function() {
//     this.dispose();
// });
// ssmVideos.mannequin.on('ended', function() {
//     this.dispose();
// });



// GG
// var ggVideos = {
//     dowel: videojs('gg-dowel'),
//     bowl: videojs('gg-bowl'),
//     goblet: videojs('gg-goblet'),
//     sand: videojs('gg-sand'),
//     constellationLow: videojs('gg-constellation-low'),
//     symbol: videojs('gg-symbol'),
//     moon: videojs('gg-moon'),
//     constellationHigh: videojs('gg-constellation-high'),
//     marble: videojs('gg-marble')
// };
// $('button.gg-dowel').on('click', function(){
//     ggVideos.dowel.play();
//     $(this).hide();
// });
// $('button.gg-bowl').on('click', function(){
//     ggVideos.bowl.play();
//     $(this).hide();
// });
// $('button.gg-goblet').on('click', function(){
//     ggVideos.goblet.play();
//     $(this).hide();
// });
// $('button.gg-sand').on('click', function(){
//     ggVideos.sand.play();
//     $(this).hide();
// });
// $('button.gg-moon').on('click', function(){
//     ggVideos.moon.play();
//     $(this).hide();
// });
// $('button.gg-symbol').on('click', function(){
//     ggVideos.symbol.play();
//     $(this).hide();
// });
// $('button.gg-marble').on('click', function(){
//     ggVideos.marble.play();
//     $(this).hide();
// });
// $('button.gg-constellation-high').on('click', function(){
//     ggVideos.constellationHigh.play();
//     $(this).hide();
// });
// $('button.gg-constellation-low').on('click', function(){
//     ggVideos.constellationLow.play();
//     $(this).hide();
// });
//
// ggVideos.dowel.on('ended', function() {
//     this.dispose();
// });
// ggVideos.bowl.on('ended', function() {
//     this.dispose();
// });
// ggVideos.goblet.on('ended', function() {
//     this.dispose();
// });
// ggVideos.dowel.on('ended', function() {
//     this.dispose();
// });
// ggVideos.moon.on('ended', function() {
//     this.dispose();
// });
// ggVideos.symbol.on('ended', function() {
//     this.dispose();
// });
// ggVideos.marble.on('ended', function() {
//     this.dispose();
// });
// ggVideos.constellationHigh.on('ended', function() {
//     this.dispose();
// });
// ggVideos.constellationLow.on('ended', function() {
//     this.dispose();
// });




// SOT
// var sotVideos = {
//     footlight: videojs('sot-footlight'),
//     lobster: videojs('sot-lobster'),
//     cherub: videojs('sot-cherub'),
//     bottle: videojs('sot-bottle'),
//     ballerina: videojs('sot-ballerina'),
//     fish: videojs('sot-fish'),
//     rose: videojs('sot-rose')
// };
// $('button.sot-footlight').on('click', function(){
//     sotVideos.footlight.play();
//     $(this).hide();
// });
// $('button.sot-lobster').on('click', function(){
//     sotVideos.lobster.play();
//     $(this).hide();
// });
// $('button.sot-cherub').on('click', function(){
//     sotVideos.cherub.play();
//     $(this).hide();
// });
// $('button.sot-bottle').on('click', function(){
//     sotVideos.bottle.play();
//     $(this).hide();
// });
// $('button.sot-ballerina').on('click', function(){
//     sotVideos.ballerina.play();
//     $(this).hide();
// });
// $('button.sot-fish').on('click', function(){
//     sotVideos.fish.play();
//     $(this).hide();
// });
// $('button.sot-rose').on('click', function(){
//     sotVideos.rose.play();
//     $(this).hide();
// });
//
// sotVideos.footlight.on('ended', function() {
//     this.dispose();
// });
// sotVideos.lobster.on('ended', function() {
//     this.dispose();
// });
// sotVideos.cherub.on('ended', function() {
//     this.dispose();
// });
// sotVideos.bottle.on('ended', function() {
//     this.dispose();
// });
// sotVideos.ballerina.on('ended', function() {
//     this.dispose();
// });
// sotVideos.fish.on('ended', function() {
//     this.dispose();
// });
// sotVideos.rose.on('ended', function() {
//     this.dispose();
// });




// MLJ
// var mljVideos = {
//     turtle: videojs('mlj-turtle'),
//     feather: videojs('mlj-feather'),
//     skull: videojs('mlj-skull'),
//     binoculars: videojs('mlj-binoculars'),
//     egg: videojs('mlj-egg'),
//     shell: videojs('mlj-shell')
// };
// $('button.mlj-turtle').on('click', function(){
//     mljVideos.turtle.play();
//     $(this).hide();
// });
// $('button.mlj-shell').on('click', function(){
//     mljVideos.shell.play();
//     $(this).hide();
// });
// $('button.mlj-skull').on('click', function(){
//     mljVideos.skull.play();
//     $(this).hide();
// });
// $('button.mlj-binoculars').on('click', function(){
//     mljVideos.binoculars.play();
//     $(this).hide();
// });
// $('button.mlj-feather').on('click', function(){
//     mljVideos.feather.play();
//     $(this).hide();
// });
// $('button.mlj-egg').on('click', function(){
//     mljVideos.egg.play();
//     $(this).hide();
// });
//
// mljVideos.turtle.on('ended', function() {
//     this.dispose();
// });
// mljVideos.shell.on('ended', function() {
//     this.dispose();
// });
// mljVideos.skull.on('ended', function() {
//     this.dispose();
// });
// mljVideos.binoculars.on('ended', function() {
//     this.dispose();
// });
// mljVideos.feather.on('ended', function() {
//     this.dispose();
// });
// mljVideos.egg.on('ended', function() {
//     this.dispose();
// });
