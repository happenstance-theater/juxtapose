const routes = [
  {
    path: '/',
    props: {
      image: 'https://happenstance-demo.s3.amazonaws.com/images/root_menu.jpg',
      hotspots: [
        { x: 35, y: 5, w: 10, h: 38, label: 'SSM', to: '/ssm' },
        { x: 61, y: 5, w: 10, h: 38, label: 'MLJ', to: '/mlj' },
      ]
    }
  },
  {
    path: '/ssm',
    props: {
      image: 'https://happenstance-demo.s3.amazonaws.com/images/ssm_menu.jpg',
      hotspots: [
        { x: 5, y: 80, w: 15, h: 10, label: 'home', to: '/' },
        { x: 65, y: 40, w: 12, h: 25, label: 'umbrella', to: '/ssm/umbrella' },
        { x: 40, y: 55, w: 18, h: 20, label: 'tea', to: '/ssm/tea' },
      ]
    }
  },
  {
    path: '/ssm/umbrella',
    props: {
      image: 'https://happenstance-demo.s3.amazonaws.com/images/ssm_menu.jpg',
      video: 'https://happenstance-demo.s3.amazonaws.com/ssm_umbrella/playlist.m3u8',
      afterPlaybackTo: '/ssm',
      hotspots: [
        { x: 5, y: 80, w: 15, h: 10, label: 'menu', to: '/ssm' },
      ]
    }
  },
  {
    path: '/ssm/tea',
    props: {
      image: 'https://happenstance-demo.s3.amazonaws.com/images/ssm_menu.jpg',
      video: 'https://happenstance-demo.s3.amazonaws.com/ssm_tea/playlist.m3u8',
      afterPlaybackTo: '/ssm',
      hotspots: [
        { x: 5, y: 80, w: 15, h: 10, label: 'menu', to: '/ssm' },
      ]
    }
  },
  {
    path: '/mlj',
    props: {
      image: 'https://happenstance-demo.s3.amazonaws.com/images/mlj_menu.jpg',
      hotspots: [
        { x: 5, y: 80, w: 15, h: 10, label: 'home', to: '/' },
        { x: 67, y: 47, w: 10, h: 18, label: 'egg', to: '/mlj/egg' },
        { x: 45, y: 80, w: 10, h: 18, label: 'skull', to: '/mlj/skull' },
      ]
    }
  },
  {
    path: '/mlj/egg',
    props: {
      image: 'https://happenstance-demo.s3.amazonaws.com/images/mlj_menu.jpg',
      video: 'https://happenstance-demo.s3.amazonaws.com/mlj_egg/playlist.m3u8',
      afterPlaybackTo: '/mlj',
      hotspots: [
        { x: 5, y: 80, w: 15, h: 10, label: 'menu', to: '/mlj' },
      ]
    }
  },
  {
    path: '/mlj/skull',
    props: {
      image: 'https://happenstance-demo.s3.amazonaws.com/images/mlj_menu.jpg',
      video: 'https://happenstance-demo.s3.amazonaws.com/mlj_skull/playlist.m3u8',
      afterPlaybackTo: '/mlj',
      hotspots: [
        { x: 5, y: 80, w: 15, h: 10, label: 'menu', to: '/mlj' },
      ]
    }
  },
];
