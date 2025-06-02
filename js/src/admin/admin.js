import { extend } from 'flarum/common/extend';
import AdminNav from 'flarum/admin/components/AdminNav';
import AdminLinkButton from 'flarum/admin/components/AdminLinkButton';
import ScratchIframeSettings from './components/ScratchIframeSettings';

export default function () {
  app.initializers.add('scratch-iframe-admin', (app) => {
    // 新增调试日志
    console.log('[ScratchIframe] 后台初始化开始 - hello, admin!');

    app.extensionData
      .for('scratch-iframe')
      .registerPage(ScratchIframeSettings);

    extend(AdminNav.prototype, 'items', (items) => {
      // 新增导航项添加日志
      console.log('[ScratchIframe] 添加后台导航按钮');
      
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
}
