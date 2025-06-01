import 'flarum/core/extend';
import app from 'flarum/app';

import IframeModal from './src/forum/components/IframeModal';

app.initializers.add('leonmmcoset-iframe', () => {
  // 注册iframe模态框
  app.modalComponents.IframeModal = IframeModal;
  
  // 扩展编辑器，添加按钮
  extend(ComposerBody.prototype, 'toolbarItems', function(items) {
    console.log("IframeModal ready.")
    items.add('iframe', <Button 
      icon="fas fa-external-link-alt" 
      onclick={() => app.modal.show(new IframeModal())}
    >
      {app.translator.trans('flarum-iframe.forum.composer.embed_iframe_button')}
    </Button>);
    console.log("IframeModal load done.")
  });
});  