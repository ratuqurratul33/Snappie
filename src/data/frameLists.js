export const FRAME_THUMBNAILS = [
  {
    id: "cute1",
    thumb: "/frames/free1.png",
    isFree: true,

    // Frame berbeda sesuai jumlah strip
    frameByStrip: {
      1: "/frames/frame1/frameFree1.png",
      3: "/frames/frame3/frameFree1.png",
      4: "/frames/frame4/frameFree1.png",
    },
  },

  {
    id: "cute2",
    thumb: "/frames/free2.png",
    isFree: true,

    // Frame berbeda sesuai jumlah strip
    frameByStrip: {
      1: "/frames/frame1/frameFree2.png",
      3: "/frames/frame3/frameFree2.png",
      4: "/frames/frame4/frameFree2.png",
    },
  },

  {
    id: "cute3",
    thumb: "/frames/free3.png",
    isFree: true,

    // Frame berbeda sesuai jumlah strip
    frameByStrip: {
      1: "/frames/frame1/frameFree3.png",
      3: "/frames/frame3/frameFree3.png",
      4: "/frames/frame4/frameFree3.png",
    },
  },

  {
    id: "cute4",
    thumb: "/frames/free4.png",
    isFree: true,

    // Frame berbeda sesuai jumlah strip
    frameByStrip: {
      1: "/frames/frame1/frameFree4.png",
      3: "/frames/frame3/frameFree4.png",
      4: "/frames/frame4/frameFree4.png",
    },
  },

  {
    id: "cute5",
    thumb: "/frames/free5.png",
    isFree: true,

    // Frame berbeda sesuai jumlah strip
    frameByStrip: {
      1: "/frames/frame1/frameFree5.png",
      3: "/frames/frame3/frameFree5.png",
      4: "/frames/frame4/frameFree5.png",
    },
  },

  {
    id: "cute6",
    thumb: "/frames/free6.png",
    isFree: true,

    // Frame berbeda sesuai jumlah strip
    frameByStrip: {
      1: "/frames/frame1/frameFree6.png",
      3: "/frames/frame3/frameFree6.png",
      4: "/frames/frame4/frameFree6.png",
    },
  },

  {
    id: "cute7",
    thumb: "/frames/paid1.png",
    isFree: false,

    // Frame berbeda sesuai jumlah strip
    frameByStrip: {
      1: "/frames/frame1/framePaid1.png",
      3: "/frames/frame3/framePaid1.png",
      4: "/frames/frame4/framePaid1.png",
    },
  },

  {
    id: "cute8",
    thumb: "/frames/paid2.png",
    isFree: false,

    // Frame berbeda sesuai jumlah strip
    frameByStrip: {
      1: "/frames/frame1/framePaid2.png",
      3: "/frames/frame3/framePaid2.png",
      4: "/frames/frame4/framePaid2.png",
    },
  },

  {
    id: "cute9",
    thumb: "/frames/paid3.png",
    isFree: false,

    // Frame berbeda sesuai jumlah strip
    frameByStrip: {
      1: "/frames/frame/frameFree1.png",
      3: "/frames/frame3/framePaid3.png",
      4: "/frames/frame4/framePaid3.png",
    },
  },

  {
    id: "cute1",
    thumb: "/frames/paid4.png",

    // Frame berbeda sesuai jumlah strip
    frameByStrip: {
      1: "/frames/frame/frameFree1.png",
      3: "/frames/frame3/framePaid4.png",
      4: "/frames/frame4/framePaid4.png",
    },
  },

  {
    id: "cute1",
    thumb: "/frames/paid5.png",

    // Frame berbeda sesuai jumlah strip
    frameByStrip: {
      1: "/frames/frame/frameFree1.png",
      3: "/frames/frame3/framePaid5.png",
      4: "/frames/frame4/framePaid6.png",
    },
  },

  {
    id: "cute1",
    thumb: "/frames/paid6.png",

    // Frame berbeda sesuai jumlah strip
    frameByStrip: {
      1: "/frames/frame/frameFree1.png",
      3: "/frames/frame3/framePaid6.png",
      4: "/frames/frame4/framePaid7.png",
    },
  },

  {
    id: "cute1",
    thumb: "/frames/paid7.png",

    // Frame berbeda sesuai jumlah strip
    frameByStrip: {
      1: "/frames/frame/frameFree1.png",
      3: "/frames/frame3/framePaid7.png",
      4: "/frames/frame4/framePaid8.png",
    },
  },

  {
    id: "cute1",
    thumb: "/frames/paid8.png",

    // Frame berbeda sesuai jumlah strip
    frameByStrip: {
      1: "/frames/frame/frameFree1.png",
      3: "/frames/frame3/framePaid8.png",
      4: "/frames/frame4/framePaid9.png",
    },
  },

  {
    id: "cute1",
    thumb: "/frames/paid9.png",

    // Frame berbeda sesuai jumlah strip
    frameByStrip: {
      1: "/frames/frame/frameFree1.png",
      3: "/frames/frame3/framePaid9.png",
      4: "/frames/frame4/framePaid10.png",
    },
  },

  {
    id: "cute1",
    thumb: "/frames/paid10.png",

    // Frame berbeda sesuai jumlah strip
    frameByStrip: {
      1: "/frames/frame/frameFree1.png",
      3: "/frames/frame3/framePaid10.png",
      4: "/frames/frame4/framePaid10.png",
    },
  },

  {
    id: "cute1",
    thumb: "/frames/paid11.png",

    // Frame berbeda sesuai jumlah strip
    frameByStrip: {
      1: "/frames/frame/frameFree1.png",
      3: "/frames/frame3/framePaid11.png",
      4: "/frames/frame4/framePaid11.png",
    },
  },

  {
    id: "cute1",
    thumb: "/frames/paid12.png",

    // Frame berbeda sesuai jumlah strip
    frameByStrip: {
      1: "/frames/frame/frameFree1.png",
      3: "/frames/frame3/framePaid12.png",
      4: "/frames/frame4/framePaid12.png",
    },
  },

  
  // Tambah frame lain dengan format yang sama
];

export const FRAME_COLORS = [
  "#FFB6C1",
  "#FFD700",
  "#B0E0E6",
  "#98FB98",
  "#8B0000",
  "#DDA0DD",
];

export const FRAME_COLOR_FRAMES = FRAME_COLORS.map((color, index) => ({
  id: `color-${index + 1}`,
  type: "color",
  color,
  isFree: true,
}));
