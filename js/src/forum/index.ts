import app from 'flarum/forum/app';

export { default as extend } from './extend';

app.initializers.add('leonmmcoset-scratch-ifream', () => {
  console.log('[leonmmcoset/scratch-ifream] Hello, forum!');
});
