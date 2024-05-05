module.exports = (ctx) => {
  if (ctx.env === 'production') {
    return {
      map: true,
      plugins: {
        'postcss-sort-media-queries': {
          sort: 'desktop-first',
        },
        'postcss-preset-env': {
          autoprefixer: {
            grid: true,
          },
        },
      },
    };
  }

  return {
    map: true,
  };
};
