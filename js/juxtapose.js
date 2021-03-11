// Impress
var prez = impress();





// Window Rooom
function WindowRoom() {
    this.videos = $('script#videos-html-windows').html();

    this.setup = function() {
        var self = this;

        // Template HTML
        $('#videos-render-windows').html(self.videos);

        // Build Videos (in reverse order)
        self.vids = {
            ssm: videojs('windows-ssm'),
            mlj: videojs('windows-mlj'),
            sot: videojs('windows-sot'),
            av: videojs('windows-av'),
            gg: videojs('windows-gg'),
            cv: videojs('windows-chari-vari')
        };

        self.vids.ssm.on('ended', function() {
            this.dispose();
            self.vids.mlj.play();
        });
        self.vids.mlj.on('ended', function() {
            this.dispose();
            self.vids.sot.play();
        });
        self.vids.sot.on('ended', function() {
            this.dispose();
            self.vids.av.play();
        });
        self.vids.av.on('ended', function() {
            this.dispose();
            self.vids.gg.play();
        });
        self.vids.gg.on('ended', function() {
            this.dispose();
            self.vids.cv.play();
        });
        self.vids.cv.on('ended', function() {
            this.dispose();
            conciergeRoom.setup();
            prez.next();
        });

        // Play the first to start
        self.vids.ssm.play();
    };
}





// Concierge Rooom
function ConciergeRoom() {
    this.conciergeVideoCount = 0;
    this.videos = $('script#videos-html-concierge').html();

    this.trackConcierge = function() {
        var self = this;
        if (this.conciergeVideoCount < 4) return;

        $('button.crg-package').on('click', function(){
            self.vids.mlj.play();
            $(this).hide();

            setTimeout(function(){
                $('#concierge-bg-img').attr('src', 'img/concierge-no-package.jpg');
            }, 3000)
        });

        $('button.crg-package').show();
    }

    this.setup = function() {
        var self = this;

        // Template HTML
        $('#videos-render-concierge').html(self.videos);

        // Build Videos (in reverse order)
        self.vids = {
            phone: videojs('concierge-phone'),
            av: videojs('concierge-av'),
            gg: videojs('concierge-gg'),
            mlj: videojs('concierge-mlj'),
            sot: videojs('concierge-sot'),
            ssm: videojs('concierge-ssm')
        };

        $('button.crg-clock').on('click', function(){
            self.vids.gg.play();
            $(this).hide();
        });
        $('button.crg-umbrella').on('click', function(){
            self.vids.av.play();
            $(this).hide();
        });
        $('button.crg-bell').on('click', function(){
            self.vids.sot.play();
            $(this).hide();
        });
        $('button.crg-phone').on('click', function(){
            self.vids.phone.play();
            $(this).hide();
        });

        self.vids.ssm.on('ended', function() {
            this.dispose();
        });

        self.vids.gg.on('ended', function() {
            this.dispose();
            self.conciergeVideoCount++;
            self.trackConcierge();
        });
        self.vids.av.on('ended', function() {
            this.dispose();
            self.conciergeVideoCount++;
            self.trackConcierge();
        });
        self.vids.phone.on('ended', function() {
            this.dispose();
            self.conciergeVideoCount++;
            self.trackConcierge();
        });
        self.vids.sot.on('ended', function() {
            this.dispose();
            self.conciergeVideoCount++;
            self.trackConcierge();
        });

        self.vids.mlj.on('ended', function() {
            this.dispose();
            keyRoom.setup();
            prez.next();
        });

        // Play the first to start
        self.vids.ssm.play();
    };
}





// Cast Room
function CastRoom(name, slugs) {
    this.name = name;
    this.slugs = slugs;
    this.playedVideoCount = 0;
    this.totalVideoCount = this.slugs.length;
    this.videos = $('script#videos-html-' + this.name).html();
    this.buttons = $('script#buttons-html-' + this.name).html();

    this.setup = function() {
        var self = this;

        // Template HTML
        $('#videos-render-' + this.name).html(this.videos);
        $('.' + this.name + '-background').append(this.buttons);

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
        this.playedVideoCount = 0;
    };
}





// Key Room
function KeyRoom() {
    this.buttons = $('script#buttons-html-keys').html();

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

        $('#keys-page').append(this.buttons);
        $('#key-bg').fadeIn();

        _.each(self.slugs, function(slug){

            // Listen for click
            $('button.' + slug).on('click', function(){
                var room = $(this).attr('data-room');

                // Setup room
                self[room].setup();

                // Go to room
                prez.goto(room + '-page');

                // Remove Button
                $(this).remove();
            });
        });
    };
}





// Start the Presentation
prez.init();

// Instantiate (preserve order)
var keyRoom = new KeyRoom();
var conciergeRoom = new ConciergeRoom();
var windowRoom = new WindowRoom();

// Play button listener
$('#button-play').on('click', function(){
    windowRoom.setup(); // loads window videos
    prez.goto('intro', 5000); // moves to window page
    _.delay(function(){
        prez.goto('windows-page', 20000);
    }, 10000);
    return false;
});
