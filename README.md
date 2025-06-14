# story-app-frontend

An application for reading and writing stories. And, I hope, it will be useful to the FSD community.

#### Interesting things in the project: clear and obvious client-flow from the moment of initialization with self-made routing and authorization protections, JWT authorization with refresh-logic in dev and prod mode, configured nginx, auto-generation of api documentation, linters and a release bot, simple Makefile scripts for all work with the Docker image and container and integration with the Backend.
#### And a clear demonstration of some of the limitations of the Effector ecosystem at the moment, for example, the inability to use chainRoute to protect routing in my case (due to the logic of checkAccessTokenFx and the need for sequential execution of some steps during initialization of the frontend application).

Main Stack: TS, React, Effector, Atomic Router, Mantine UI, FSD, Vite

### Changes in my interpretation of FSD:

1. The logic moves from the pages layer to the entity/feature/widgets layers when it ceases to be unique for only one page.
2. The "Layouts" layer is designed for page layouts, the wrapping layer (semantically it doesn't fit the widget)
3. The "shared/router" segment is designed to provide the minimum necessary information on all layers above (for example, a redirect at the end of a process). Therefore, we have only information about the path and the instance there.

   \*Binding to the view is done in the app/router!

### About ENV:

Not yet

## [From Vite README] React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
