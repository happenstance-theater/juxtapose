// Impress
var prez;
var castRoomCounter = 0;




// Window Rooom
function WindowRoom() {
    this.videos = $('script#videos-html-windows').html();

    this.loadAudio = function(cb) {
        this.soundtrack = new Audio('audio/windows.mp3');
        this.soundtrack.volume = 0.2;
        this.soundtrack.addEventListener("canplaythrough", cb);
    };

    this.fadeAudio = function(level, duration) {
        $(this.soundtrack).animate({volume: level}, duration);
    };

    this.setup = function() {
        var self = this;

        // Start Playing the background audio
        self.soundtrack.play();

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
            self.fadeAudio(0, 4000);
            _.delay(function() {
                self.soundtrack.pause();
            }, 4000);
        });
        self.vids.cv.on('ended', function() {
            this.dispose();

            conciergeRoom.setup();
            $('body').removeClass('sky');
            $('#box-background').remove();

            prez.goto('concierge-door', 2000);
            _.delay(function(){
                prez.goto('concierge-page', 4000);
            }, 2500);
        });

        // Play the first to start
        self.vids.ssm.play();
    };

    this.chari = function() {
        var self = this;

        // Start Playing the background audio
        self.soundtrack.play();

        // Template HTML
        $('#videos-render-windows').html(self.videos);

        // Build Videos (in reverse order)
        self.vids = {
            cv: videojs('windows-chari-vari')
        };

        self.vids.cv.on('ended', function() {
            this.dispose();

            conciergeRoom.setup();
            $('body').removeClass('sky');
            $('#box-background').remove();

            prez.goto('concierge-door', 2000);
            _.delay(function(){
                prez.goto('concierge-page', 4000);
            }, 2500);
        });

        // Play the first to start
        self.vids.cv.play();
    };
}





// Concierge Rooom
function ConciergeRoom() {
    this.conciergeVideoCount = 0;
    this.videos = $('script#videos-html-concierge').html();
    this.buttons = $('script#buttons-html-concierge').html();

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
        $('.concierge-background').append(self.buttons);

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
        // Only proceed if last video
        if (this.playedVideoCount < this.totalVideoCount) return;

        // Count Cast Room played
        castRoomCounter++;

        if (castRoomCounter < 5) {
            prez.goto('keys-page', 3000);
        } else {
            this.endPlay();
        }

        this.playedVideoCount = 0;
    };


    this.endPlay = function() {
        prez.goto('concierge-page', 2000);

        _.delay(function(){
            prez.goto('concierge-door', 2000);
            _.delay(function(){
                $('body').addClass('sky');
                prez.goto('landing-page', 3000);

                _.delay(function(){
                    $('.landing-credits').fadeIn();
                }, 7000);
            }, 2000);
        }, 3000);
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
                prez.goto(room + '-page', 3000);

                // Remove Button
                $(this).remove();
            });
        });
    };
}



if (window.innerWidth < 800 || window.innerHeight < 600) {
    $('#impress').hide();
    $('.lds-ring').fadeOut();
    $('.mobile-warning').fadeIn();
} else {
    prez = impress();

    // Instantiate (preserve order)
    var keyRoom = new KeyRoom();
    var conciergeRoom = new ConciergeRoom();
    var windowRoom = new WindowRoom();
    windowRoom.loadAudio(function(){
        prez.init();
        prez.goto('landing-page', 1); // in case they arrive somewhere else
        _.delay(function(){
            $('#loading').fadeOut();
        }, 2000);
    });


    var housekeepingTrack = new Audio('audio/housekeeping.mp3');
    housekeepingTrack.volume = 0;



    $('#button-play').on('click', function(){
        $(this).fadeOut();
        $('.landing-paper').fadeOut();
        housekeepingTrack.play();
        $(housekeepingTrack).animate({volume: 1}, 5000);
        _.delay(function(){
            $('#housekeeping-play').addClass('shake-top');
            $('#housekeeping-donate').addClass('heartbeat');
        }, 20000);
    });

    $('#housekeeping-play').on('click', function(){
        $(this).fadeOut();
        $('#housekeeping-donate').fadeOut();
        $('.landing-housekeeping').fadeOut();
        _.delay(function(){
            $('#poem-keys').addClass('shake-top');
        }, 20000);
    });

    $('#poem-keys').on('click', function(){
        $(this).fadeOut();
        $('.landing-poem').fadeOut();
        $(housekeepingTrack).animate({volume: 0}, 5000);
        _.delay(function() {
            housekeepingTrack.pause();
        }, 5000);
    });


    $('#here-play').on('click', function(){
        windowRoom.setup();
        $(this).fadeOut();
        _.delay(function(){
            $('.landing-here').fadeOut(function(){
                _.delay(function(){
                    prez.goto('windows-page', 30000); // 30sec
                    windowRoom.fadeAudio(1, 30000);
                }, 5000); // 5sec
            });
        }, 2000);
    });



    window.addEventListener("keydown", function (event) {
      if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
      }

      switch (event.key) {
        case "s":
          $('#shortcuts').toggle();
          break;
        default:
          return; // Quit when this doesn't handle the key event.
      }

      // Cancel the default action to avoid it being handled twice
      event.preventDefault();
    }, true);



    $('.shortcut-keys').on('click', function() {
        $('body').removeClass('sky');
        keyRoom.setup();
        $('.landing-intro').hide();

        prez.goto('keys-page', 1000);
        $('#shortcuts').hide();
    });

    $('.shortcut-end').on('click', function() {
        $('body').removeClass('sky');
        keyRoom.setup();
        $('.landing-intro').hide();

        prez.goto('ssm-page', 1000);
        $('#shortcuts').hide();

        _.delay(function() {
            keyRoom.ssm.endPlay();
        }, 5000);
    });

    $('.shortcut-chari').on('click', function() {
        $('.landing-intro').hide();
        windowRoom.chari();
        prez.next();
        $('#shortcuts').hide();
    });
}
