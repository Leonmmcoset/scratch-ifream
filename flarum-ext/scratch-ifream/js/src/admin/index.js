import { extend } from 'flarum/common/extend';
import AdminNav from 'flarum/admin/components/AdminNav';
import AdminLinkButton from 'flarum/admin/components/AdminLinkButton';
import ScratchIframeSettings from './components/ScratchIframeSettings';

export default function() {
    app.initializers.add('scratch-iframe-admin', (app) => {
        // 注册后台设置页面
        app.extensionData
            .for('scratch-iframe')
            .registerPage(ScratchIframeSettings)
            // 新增：注册权限项（允许指定用户组）
            .registerPermission({
                icon: 'fas fa-link',
                label: app.translator.trans('scratch-iframe.permissions.insert'), // 使用翻译
                permission: 'scratch-iframe.insert' // 权限标识
            }, 'start'); // 分类到"发帖"权限组
    });
}
