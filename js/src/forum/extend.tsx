import app from 'flarum/forum/app';
import Button from 'flarum/common/components/Button';
import Modal from 'flarum/common/components/Modal';
import TextField from 'flarum/common/components/TextField';
import TextEditor from 'flarum/common/components/TextEditor';
import { extend } from 'flarum/common/extend';

class ScratchIframeModal extends Modal {
  url: string = '';

  className() {
    return 'ScratchIframeModal Modal--small';
  }

  title() {
    return '添加Scratch项目链接';
  }

  content() {
    return m('div', { className: 'Modal-body' }, [
      m('div', { className: 'Form-group' }, [
        m(TextField, {
          label: 'Scratch项目链接',
          placeholder: '输入Scratch项目链接',
          value: this.url,
          oninput: (value: string) => {
            this.url = value;
          }
        })
      ]),
      m('div', { className: 'Form-group' }, [
        m(Button, {
          className: 'Button Button--primary',
          onclick: this.onSubmit.bind(this)
        }, '添加')
      ])
    ]);
  }

  onSubmit() {
    if (!this.url) return;

    const editor = this.attrs.editor;
    const iframeUrl = app.forum.attribute('leonmmcoset-scratch-ifream.run_url') + encodeURIComponent(this.url);
    const iframeHtml = `<iframe src="${iframeUrl}" width="100%" height="600" frameborder="0" allowfullscreen></iframe>`;
    
    editor.insertAtCursor(iframeHtml);
    this.hide();
  }
}

export default function () {
  extend(TextEditor.prototype, 'toolbarItems', function(items) {
    items.add('scratch-iframe', 
      m(Button, {
        icon: 'fas fa-code',
        onclick: () => {
          app.modal.show(ScratchIframeModal, {
            editor: this
          });
        }
      }, app.translator.trans('leonmmcoset-scratch-ifream.forum.add_scratch_button'))
    );
  });
}
