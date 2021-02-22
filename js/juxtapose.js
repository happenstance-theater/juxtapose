// Start Impress
var prez = impress();
prez.init();



// Tenement Windows
var windowVideos = {
    ssm: videojs('windows-ssm'),
    mlj: videojs('windows-mlj'),
    sot: videojs('windows-sot'),
    av: videojs('windows-av'),
    gg: videojs('windows-gg'),
    cv: videojs('windows-chari-vari')
};


// First Page Play button
$('button#button-play').on('click', function(){
    windowVideos.ssm.play();
    prez.next();
    return false;
});

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
    conciergeVideos.ssmVideo.play();
    prez.next();
});








// Concierge Room
var conciergeVideos = {
    phone: videojs('concierge-phone'),
    av: videojs('concierge-av'),
    gg: videojs('concierge-gg'),
    mlj: videojs('concierge-mlj'),
    sot: videojs('concierge-sot'),
    ssm: videojs('concierge-ssm')
};


var conciergeVideoCount = 0;

function countVideos() {
    if (conciergeVideoCount < 4) return;

    $('button.package').on('click', function(){
        conciergeVideos.mlj.play();
        $(this).hide();

        setTimeout(function(){
            $('#concierge-bg-img').attr('src', 'img/concierge-no-package.jpg');
        }, 3000)
    });

    $('button.package').show();
}

$('button.clock').on('click', function(){
    conciergeVideos.gg.play();
    $(this).hide();
});
$('button.umbrella').on('click', function(){
    conciergeVideos.av.play();
    $(this).hide();
});
$('button.bell').on('click', function(){
    conciergeVideos.sot.play();
    $(this).hide();
});
$('button.phone').on('click', function(){
    conciergeVideos.phone.play();
    $(this).hide();
});

conciergeVideos.ssm.on('ended', function() {
    this.dispose();
    countVideos();
});
conciergeVideos.gg.on('ended', function() {
    this.dispose();
    conciergeVideoCount++;
    countVideos();
});
conciergeVideos.av.on('ended', function() {
    this.dispose();
    conciergeVideoCount++;
    countVideos();
});
conciergeVideos.phone.on('ended', function() {
    this.dispose();
    conciergeVideoCount++;
    countVideos();
});
conciergeVideos.sot.on('ended', function() {
    this.dispose();
    conciergeVideoCount++;
    countVideos();
});
conciergeVideos.mlj.on('ended', function() {
    this.dispose();

    $('button.key-ssm').on('click', function(){
        prez.next();
        return false;
    });

    $('button.key-ssm').show();
});
