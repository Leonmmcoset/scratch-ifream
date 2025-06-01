import app from 'flarum/admin/app';

export { default as extend } from './extend';

app.initializers.add('leonmmcoset-scratch-ifream', () => {
  app.extensionData
    .for('leonmmcoset-scratch-ifream')
    .registerSetting({
      setting: 'leonmmcoset-scratch-ifream.run_url',
      label: app.translator.trans('leonmmcoset-scratch-ifream.admin.run_url_label'),
      type: 'text',
      default: 'https://run.scdev.top/?url='
    });
});
