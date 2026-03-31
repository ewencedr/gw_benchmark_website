const config = {
  '*.{ts,tsx}': ['prettier --write', 'eslint --fix'],
  '*.{json,css,md}': ['prettier --write'],
};

export default config;
