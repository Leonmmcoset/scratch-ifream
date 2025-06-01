import { extend } from 'flarum/common/extend';
import AdminNav from 'flarum/admin/components/AdminNav';
import AdminLinkButton from 'flarum/admin/components/AdminLinkButton';
import ScratchIframeSettings from './components/ScratchIframeSettings';  // 确保路径正确

export default function() {
    app.initializers.add('scratch-iframe-admin', (app) => {
        // 注册后台设置页面（显示在后台菜单）
        app.extensionData
            .for('scratch-iframe')  // 与composer.json的"name"字段一致
            .registerPage(ScratchIframeSettings);  // 注册的是类本身，而非实例

        // 可选：添加左侧导航按钮
        extend(AdminNav.prototype, 'items', (items) => {
            items.add('scratch-iframe', AdminLinkButton.component({
                href: app.route('scratch-iframe.settings'),
                icon: 'fas fa-link',  // 使用Font Awesome图标
                label: 'Scratch 链接设置'
            }));
        });
    });
}