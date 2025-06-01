import { extend } from 'flarum/core/extend';
import app from 'flarum/app';
import IframeModal from './src/forum/components/IframeModal';
import ComposerBody from 'flarum/forum/components/ComposerBody';
import Button from 'flarum/common/components/Button';

app.initializers.add('leonmmcoset-iframe', () => {
  console.log('[Iframe扩展] 初始化开始');

  extend(ComposerBody.prototype, 'toolbarItems', function(items) {
    console.log('[Iframe扩展] 用户登录状态:', app.user ? '已登录' : '未登录');
    
    if (app.user) {
      console.log('[Iframe扩展] 用户权限列表:', app.user.permissions());
      console.log('[Iframe扩展] 检查权限: forum.iframe.embed', app.user.hasPermission('forum.iframe.embed'));
    }

    if (app.user && app.user.hasPermission('forum.iframe.embed')) {
      console.log('[Iframe扩展] 添加嵌入按钮');
      items.add('iframe', Button.component({
        icon: 'fas fa-external-link-alt',
        onclick: () => {
          console.log('[Iframe扩展] 按钮点击，打开模态框');
          app.modal.show(new IframeModal());
        },
        children: app.translator.trans('flarum-iframe.forum.composer.embed_iframe_button')
      }));
    } else {
      console.log('[Iframe扩展] 用户无权限，不显示按钮');
    }
  });

  console.log('[Iframe扩展] 初始化完成');
});  