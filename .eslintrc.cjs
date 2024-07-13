const { configure, presets } = require('eslint-kit');

module.exports = configure({
  allowDebug: process.env.NODE_ENV !== 'production',
  presets: [
    presets.imports({
      sort: {
        newline: true,
        groups: [
          ['react'],
          ['react-hook-form', '@hookform'],
          ['mantine', 'tabler'],
          ['effector', 'atomic'],
          ['^@?\\w'],
          ['^@/infrastructure', '^@/entities', '^@/features', '^@/widgets', '^@/layouts', '^@/pages', '^@/app'],
          ['^\\.'],
          ['.css']
        ],
      },
    }),
    presets.node(),
    presets.prettier(),
    presets.typescript(),
    presets.react({ version: '18.0' }),
    presets.effector(),
  ],
});
