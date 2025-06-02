import { extend } from 'flarum/common/extend';
import AdminNav from 'flarum/admin/components/AdminNav';
import AdminLinkButton from 'flarum/admin/components/AdminLinkButton';
import ScratchIframeSettings from './components/ScratchIframeSettings';

export default function () {
  app.initializers.add('scratch-iframe-admin', (app) => {
    // 注册后台导航按钮（显示在左侧菜单）
    app.extensionData
      .for('scratch-iframe') // 替换为你的插件ID（需与composer.json一致）
      .registerPage(ScratchIframeSettings);

    // 可选：添加快捷导航按钮（非必须）
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
}
