// Impress
var prez = impress();
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


function mobileAndTabletCheck() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};


 if (window.innerWidth < 800 || window.innerHeight < 600 || mobileAndTabletCheck()) {
     $('#impress').hide();
     $('.lds-ring').fadeOut();
     $('.mobile-warning').fadeIn();
 } else {

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
