import { extend } from 'flarum/extend';
import Button from 'flarum/components/Button';
import TextEditor from 'flarum/components/TextEditor';
import ModalManager from 'flarum/components/ModalManager';
import Modal from 'flarum/components/Modal';

// 嵌入链接模态框
class EmbedLinkModal extends Modal {
  className() {
    return 'EmbedLinkModal Modal--small';
  }

  title() {
    return app.translator.trans('leonmmcoset-scratch-iframe.forum.modal.title');
  }

  content() {
    return (
      <div className="Modal-body">
        <p>{app.translator.trans('leonmmcoset-scratch-iframe.forum.modal.description')}</p>
        <div className="Form-group">
          <input
            className="FormControl"
            placeholder={app.translator.trans('leonmmcoset-scratch-iframe.forum.modal.placeholder')}
            bidi={this.link}
          />
        </div>
        <div className="Form-group">
          <Button
            type="submit"
            className="Button Button--primary"
            loading={this.loading}
            onclick={this.embed.bind(this)}
          >
            {app.translator.trans('leonmmcoset-scratch-iframe.forum.modal.submit')}
          </Button>
        </div>
      </div>
    );
  }

  init() {
    super.init();
    this.link = m.prop('');
  }

  embed() {
    this.loading = true;
    
    if (this.link()) {
      this.hide();
      this.attrs.onEmbed(this.link());
    } else {
      alert(app.translator.trans('leonmmcoset-scratch-iframe.forum.modal.error'));
      this.loading = false;
    }
  }
}

// 扩展文本编辑器
extend(TextEditor.prototype, 'controlItems', function(items) {
  items.add('embed-scratch',
    Button.component({
      icon: 'fas fa-code',
      onclick: this.openEmbedModal.bind(this),
      className: 'Button Button--icon',
      title: app.translator.trans('leonmmcoset-scratch-iframe.forum.buttons.insert')
    })
  );
});

// 打开模态框方法
TextEditor.prototype.openEmbedModal = function() {
  app.modal.show(new EmbedLinkModal({
    onEmbed: this.insertEmbed.bind(this)
  }));
};

// 插入iframe标签方法
TextEditor.prototype.insertEmbed = function(link) {
  this.insertAtCursor(`[scratch]${link}[/scratch]`);
};

// 初始化扩展
app.initializers.add('leonmmcoset/scratch-iframe', function() {
  // 注册翻译
  app.translator.addTranslations('zh-Hans', {
    'leonmmcoset-scratch-iframe': {
      'forum': {
        'buttons': {
          'insert': '插入Scratch项目'
        },
        'modal': {
          'title': '嵌入Scratch项目',
          'description': '请输入要嵌入的项目链接:',
          'placeholder': 'https://scratch.mit.edu/projects/12345678',
          'submit': '嵌入',
          'error': '请输入有效的链接'
        }
      }
    }
  });
});    