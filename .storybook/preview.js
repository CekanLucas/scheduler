export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  backgrounds: {
    default: 'dark',
    values: [
      { name: 'dark', value: '#222f3e' },
      { name: 'white', value: '#fff' },
    ],
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
