function debounce(fn, delay=0, options={}) {
  let timer;
  return function() {
    const callTarget = options.context || this;
    const callArgs = arguments;
    clearTimeout(timer);
    if (options.immediate && !timer) fn.apply(callTarget, callArgs);
    timer = setTimeout(function() {
      fn.apply(callTarget, callArgs);
      timer = null;
    }, delay);
  };
}

const Slide = {
  props: {
    image: { type: String },
    video: { type: String },
    afterPlaybackTo: { type: String },
    hotspots: { type: Array, default: [] },
  },
  template: `
    <div id="slide">
      <video class="video-js" ref="video"></video>
      <button v-for="bttn in hotspots"
        v-show="!clickToPlay"
        class="slide-button"
        :style="buttonStyle(bttn)"
        @click="buttonClick(bttn)">
        {{ bttn.label }}
      </button>
      <button class="slide-button slide-button-start" v-if="clickToPlay" @click="startClick()">
        Click to Play
      </button>
    </div>
  `,
  data() {
    return {
      player: null,
      clickToPlay: false,
    };
  },
  watch: {
    image() {
      this.updatePlayer();
    },
    video() {
      this.updatePlayer();
    }
  },
  methods: {
    updatePlayer: debounce(function() {
      if (!this.player) return;
      this.player.poster(this.image);

      if (this.video) {
        this.player.src([{ src: this.video }]);
        this.player.play().catch(err => {
          this.clickToPlay = true;
        });
      } else {
        this.player.pause();
        this.player.reset();
        this.player.poster(this.image);
      }
    }, 10),
    afterPlayback() {
      if (this.afterPlaybackTo) {
        this.$router.push(this.afterPlaybackTo);
      }
    },
    buttonStyle(bttn) {
      return {
        left: bttn.x + '%',
        top: bttn.y + '%',
        width: bttn.w + '%',
        height: bttn.h + '%',
      };
    },
    buttonClick(bttn) {
      if (bttn.to) {
        this.$router.push(bttn.to);
      }
    },
    startClick() {
      if (this.player) {
        this.clickToPlay = false;
        this.player.play();
      }
    }
  },
  mounted() {
    this.player = videojs(this.$refs.video, {
      aspectRatio: '16:9',
      preload: 'none',
      poster: this.image,
      sources: undefined,
      controls: false,
      bigPlayButton: false,
      muted: false,
      fluid: true,
      loop: false,
      width: '100%'
    });

    this.player.one('ready', () => this.updatePlayer());
    this.player.on('ended', () => this.afterPlayback());
  },
  beforeUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }
};

const app = Vue.createApp({});
routes.forEach(route => { route.component = Slide; });
app.use(VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes: routes
}));
app.mount('#app');
