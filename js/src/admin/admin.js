import { extend } from 'flarum/common/extend';
import AdminNav from 'flarum/admin/components/AdminNav';
import AdminLinkButton from 'flarum/admin/components/AdminLinkButton';
import ScratchIframeSettings from './components/ScratchIframeSettings';

app.initializers.add('scratch-iframe-admin', (app) => {
  console.log('[ScratchIframe] 后台初始化开始');

  // 修复组件注册方式
  // 当前代码（直接传递类引用）
  app.extensionData.for('scratch-iframe').registerPage(ScratchIframeSettings);

  extend(AdminNav.prototype, 'items', (items) => {
    items.add(
      'scratch-iframe',
      AdminLinkButton.component({
        href: app.route('scratch-iframe.settings'),
        icon: 'fas fa-code',
        children: 'Scratch 运行链接设置',
      })
    );
  });
});
