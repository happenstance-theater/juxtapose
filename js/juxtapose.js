// Start Impress
var prez = impress();
prez.init();



// Get videos
var windowVideos = {
    ssm: videojs('windows-ssm'),
    mlj: videojs('windows-mlj'),
    sot: videojs('windows-sot'),
    av: videojs('windows-av'),
    gg: videojs('windows-gg'),
    cv: videojs('windows-chari-vari')
};
var conciergeVideos = {
    phone: videojs('concierge-phone'),
    av: videojs('concierge-av'),
    gg: videojs('concierge-gg'),
    mlj: videojs('concierge-mlj'),
    sot: videojs('concierge-sot'),
    ssm: videojs('concierge-ssm')
};
var ssmVideos = {
    globe: videojs('ssm-globe'),
    books: videojs('ssm-books'),
    gramaphone: videojs('ssm-gramaphone'),
    box: videojs('ssm-box'),
    cup: videojs('ssm-cup'),
    mannequin: videojs('ssm-mannequin')
};
var ggVideos = {
    // dowel: videojs('gg-dowel'),
    // bowl: videojs('gg-bowl'),
    // goblet: videojs('gg-goblet'),
    // sand: videojs('gg-sand'),
    // constellationLow: videojs('gg-constellation-low'),
    // symbol: videojs('gg-symbol'),
    // moon: videojs('gg-moon'),
    // constellationHigh: videojs('gg-constellation-high'),
    // marble: videojs('gg-marble')
};

var sotVideos = {
    footlight: videojs('sot-footlight'),
    lobster: videojs('sot-lobster'),
    cherub: videojs('sot-cherub'),
    bottle: videojs('sot-bottle'),
    ballerina: videojs('sot-ballerina'),
    fish: videojs('sot-fish'),
    rose: videojs('sot-rose')
};



// First Page Play button
$('button#button-play').on('click', function(){
    windowVideos.ssm.play();
    prez.next();
    return false;
});



// Tenement Windows
windowVideos.ssm.on('ended', function() {
    this.dispose();
    windowVideos.mlj.play();
});
windowVideos.mlj.on('ended', function() {
    this.dispose();
    windowVideos.sot.play();
});
windowVideos.sot.on('ended', function() {
    this.dispose();
    windowVideos.av.play();
});
windowVideos.av.on('ended', function() {
    this.dispose();
    windowVideos.gg.play();
});
windowVideos.gg.on('ended', function() {
    this.dispose();
    windowVideos.cv.play();
});
windowVideos.cv.on('ended', function() {
    this.dispose();
    conciergeVideos.ssm.play();
    prez.next();
});



// Concierge Room
var conciergeVideoCount = 0;

function trackConcierge() {
    if (conciergeVideoCount < 4) return;

    $('button.crg-package').on('click', function(){
        conciergeVideos.mlj.play();
        $(this).hide();

        setTimeout(function(){
            $('#concierge-bg-img').attr('src', 'img/concierge-no-package.jpg');
        }, 3000)
    });

    $('button.crg-package').show();
}

$('button.crg-clock').on('click', function(){
    conciergeVideos.gg.play();
    $(this).hide();
});
$('button.crg-umbrella').on('click', function(){
    conciergeVideos.av.play();
    $(this).hide();
});
$('button.crg-bell').on('click', function(){
    conciergeVideos.sot.play();
    $(this).hide();
});
$('button.crg-phone').on('click', function(){
    conciergeVideos.phone.play();
    $(this).hide();
});

conciergeVideos.ssm.on('ended', function() {
    this.dispose();
});

conciergeVideos.gg.on('ended', function() {
    this.dispose();
    conciergeVideoCount++;
    trackConcierge();
});
conciergeVideos.av.on('ended', function() {
    this.dispose();
    conciergeVideoCount++;
    trackConcierge();
});
conciergeVideos.phone.on('ended', function() {
    this.dispose();
    conciergeVideoCount++;
    trackConcierge();
});
conciergeVideos.sot.on('ended', function() {
    this.dispose();
    conciergeVideoCount++;
    trackConcierge();
});

conciergeVideos.mlj.on('ended', function() {
    this.dispose();

    $('button.key-ssm').on('click', function(){
        prez.next();
        return false;
    });

    $('button.key-ssm').show();
});






// SSM

$('button.ssm-globe').on('click', function(){
    ssmVideos.globe.play();
    $(this).hide();
});
$('button.ssm-books').on('click', function(){
    ssmVideos.books.play();
    $(this).hide();
});
$('button.ssm-gramaphone').on('click', function(){
    ssmVideos.gramaphone.play();
    $(this).hide();
});
$('button.ssm-box').on('click', function(){
    ssmVideos.box.play();
    $(this).hide();
});
$('button.ssm-cup').on('click', function(){
    ssmVideos.cup.play();
    $(this).hide();
});
$('button.ssm-mannequin').on('click', function(){
    ssmVideos.mannequin.play();
    $(this).hide();
});


ssmVideos.globe.on('ended', function() {
    this.dispose();
});
ssmVideos.books.on('ended', function() {
    this.dispose();
});
ssmVideos.gramaphone.on('ended', function() {
    this.dispose();
});
ssmVideos.box.on('ended', function() {
    this.dispose();
});
ssmVideos.cup.on('ended', function() {
    this.dispose();
});
ssmVideos.mannequin.on('ended', function() {
    this.dispose();
});



// GG
// $('button.gg-dowel').on('click', function(){
//     ggVideos.dowel.play();
//     $(this).hide();
// });
// ggVideos.dowel.on('ended', function() {
//     this.dispose();
// });


// SOT
$('button.sot-footlight').on('click', function(){
    sotVideos.footlight.play();
    $(this).hide();
});
$('button.sot-lobster').on('click', function(){
    sotVideos.lobster.play();
    $(this).hide();
});
$('button.sot-cherub').on('click', function(){
    sotVideos.cherub.play();
    $(this).hide();
});
$('button.sot-bottle').on('click', function(){
    sotVideos.bottle.play();
    $(this).hide();
});
$('button.sot-ballerina').on('click', function(){
    sotVideos.ballerina.play();
    $(this).hide();
});
$('button.sot-fish').on('click', function(){
    sotVideos.fish.play();
    $(this).hide();
});
$('button.sot-rose').on('click', function(){
    sotVideos.rose.play();
    $(this).hide();
});


sotVideos.footlight.on('ended', function() {
    this.dispose();
});
sotVideos.lobster.on('ended', function() {
    this.dispose();
});
sotVideos.cherub.on('ended', function() {
    this.dispose();
});
sotVideos.bottle.on('ended', function() {
    this.dispose();
});
sotVideos.ballerina.on('ended', function() {
    this.dispose();
});
sotVideos.fish.on('ended', function() {
    this.dispose();
});
sotVideos.rose.on('ended', function() {
    this.dispose();
});
