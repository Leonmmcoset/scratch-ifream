import app from 'flarum/admin/app';
import { Permission } from 'flarum/common/models';

export { default as extend } from './extend';

app.initializers.add('leonmmcoset-scratch-ifream', () => {
  app.extensionData.for('leonmmcoset-scratch-ifream').registerSetting({
    setting: 'leonmmcoset-scratch-ifream.run_url',
    label: app.translator.trans('leonmmcoset-scratch-ifream.admin.run_url_label'),
    type: 'text',
    default: 'https://run.scdev.top/?url=',
  });

  // 新增：注册权限配置
  app.extensionData.for('leonmmcoset-scratch-ifream').registerPermission(
    {
      icon: 'fas fa-code',
      label: app.translator.trans('leonmmcoset-scratch-ifream.admin.permission_label'),
      permission: 'leonmmcoset.scratch-ifream.use', // 权限标识，需与前端校验一致
    },
    'start'
  ); // 放在"发起主题"权限组下
});
