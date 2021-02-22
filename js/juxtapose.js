// Start Impress
var prez = impress();
prez.init();



// Tenement Windows
var ssm = videojs('windows-ssm');
var mlj = videojs('windows-mlj');
var sot = videojs('windows-sot');
var av = videojs('windows-av');
var gg = videojs('windows-gg');
var cv = videojs('windows-chari-vari');

$('button#button-play').on('click', function(){
    ssm.play();
    prez.next();
    return false;
});
ssm.on('ended', function() {
    this.dispose();
    mlj.play();
});
mlj.on('ended', function() {
    this.dispose();
    sot.play();
});
sot.on('ended', function() {
    this.dispose();
    av.play();
});
av.on('ended', function() {
    this.dispose();
    gg.play();
});
gg.on('ended', function() {
    this.dispose();
    cv.play();
});
cv.on('ended', function() {
    this.dispose();
    ssmVideo.play();
    prez.next();
});








// Concierge Room
var phoneVideo = videojs('concierge-phone');
var avVideo = videojs('concierge-av');
var ggVideo = videojs('concierge-gg');
var mljVideo = videojs('concierge-mlj');
var sotVideo = videojs('concierge-sot');
var ssmVideo = videojs('concierge-ssm');
var conciergeVideoCount = 0;

function countVideos() {
    if (conciergeVideoCount < 5) return;

    $('button.package').on('click', function(){
        mljVideo.play();
        $(this).hide();

        setTimeout(function(){
            $('#concierge-bg-img').attr('src', 'img/concierge-no-package.jpg');
        }, 3000)
    });

    $('button.package').show();
}

$('button.clock').on('click', function(){
    ggVideo.play();
    $(this).hide();
});
$('button.umbrella').on('click', function(){
    avVideo.play();
    $(this).hide();
});
$('button.bell').on('click', function(){
    sotVideo.play();
    $(this).hide();
});
$('button.phone').on('click', function(){
    phoneVideo.play();
    $(this).hide();
});

ssmVideo.on('ended', function() {
    this.dispose();
    conciergeVideoCount++;
    countVideos();
});
ggVideo.on('ended', function() {
    this.dispose();
    conciergeVideoCount++;
    countVideos();
});
avVideo.on('ended', function() {
    this.dispose();
    conciergeVideoCount++;
    countVideos();
});
phoneVideo.on('ended', function() {
    this.dispose();
    conciergeVideoCount++;
    countVideos();
});
sotVideo.on('ended', function() {
    this.dispose();
    conciergeVideoCount++;
    countVideos();
});
mljVideo.on('ended', function() {
    this.dispose();

    $('button.key-ssm').on('click', function(){
        prez.next();
        return false;
    });

    $('button.key-ssm').show();

});
