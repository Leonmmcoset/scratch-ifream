import { extend } from 'flarum/core/extend';
import app from 'flarum/app';
import IframeModal from './components/IframeModal';
import ComposerBody from 'flarum/forum/components/ComposerBody';
import Button from 'flarum/common/components/Button';

app.initializers.add('leonmmcoset-iframe', () => {
  // 扩展编辑器按钮，添加权限校验
  extend(ComposerBody.prototype, 'toolbarItems', function(items) {
    // 检查用户权限
    if (app.user && app.user.hasPermission('forum.iframe.embed')) {
      items.add('iframe-embed', <Button
        icon="fas fa-external-link-alt"
        onclick={() => app.modal.show(new IframeModal())}
      >
        {app.translator.trans('flarum-iframe.forum.composer.embed_iframe_button')}
      </Button>);
    }
  });
});  