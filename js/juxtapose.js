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
    globe: videojs('ssm-globe')
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
var ssmVideoCount = 0;

function trackSSM() {
    if (ssmVideoCount < 4) return;
    // Do something?
}

$('button.ssm-globe').on('click', function(){
    ssmVideos.globe.play();
    $(this).hide();
});

conciergeVideos.gg.on('ended', function() {
    this.dispose();
    ssmVideoCount++;
    trackSSM();
});
