const { configure, presets } = require('eslint-kit');

module.exports = configure({
  allowDebug: process.env.NODE_ENV !== 'production',
  presets: [
    presets.imports({
      sort: {
        newline: true,
        groups: [
          ['^@?\\w'],
          ['^@/app', '^@/pages', '^@/widgets', '^@/features', '^@/entities', '^@/shared'],
          ['^\\.'],
          ['normalize.css', '.module.scss'],
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
