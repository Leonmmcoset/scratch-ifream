import app from 'flarum/admin/app';
import { Permission } from 'flarum/common/models';

export { default as extend } from './extend';

app.initializers.add('leonmmcoset-scratch-ifream', () => {
  // 添加后台初始化调试
  console.log('[Admin] 扩展初始化开始');
  console.log('[Admin] app 对象:', app);
  console.log('[Admin] app.extensionData 对象:', app.extensionData);

  // 原有设置项注册
  app.extensionData.for('leonmmcoset-scratch-ifream').registerSetting({
    setting: 'leonmmcoset-scratch-ifream.run_url',
    label: app.translator.trans('leonmmcoset-scratch-ifream.admin.run_url_label'),
    type: 'text',
    default: 'https://run.scdev.top/?url=',
  });

  // 原有权限注册
  app.extensionData.for('leonmmcoset-scratch-ifream').registerPermission(
    {
      icon: 'fas fa-code',
      label: app.translator.trans('leonmmcoset-scratch-ifream.admin.permission_label'),
      permission: 'leonmmcoset.scratch-ifream.use',
    },
    'start'
  );

  // 添加初始化完成调试
  console.log('[Admin] 扩展初始化完成');
});
