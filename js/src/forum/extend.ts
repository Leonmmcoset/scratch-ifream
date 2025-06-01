// Hello world!
import Extend from 'flarum/common/extenders';
import commonExtend from '../common/extend';
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
          },
        }),
      ]),
      m('div', { className: 'Form-group' }, [
        m(
          Button,
          {
            className: 'Button Button--primary',
            onclick: this.onSubmit.bind(this),
          },
          '添加'
        ),
      ]),
    ]);
  }

  // 新增：添加onSubmit方法
  onSubmit() {
    // 添加调试日志
    console.log('[ScratchIframeModal] 开始提交');
    console.log('[ScratchIframeModal] app 对象:', app);
    console.log('[ScratchIframeModal] app.forum 对象:', app.forum);
    console.log('[ScratchIframeModal] app.forum.attribute 类型:', typeof app.forum?.attribute);

    if (!this.url) {
      console.log('[ScratchIframeModal] URL 为空，取消提交');
      return;
    }

    const editor = this.attrs.editor;
    // 添加 URL 构造调试
    const baseUrl = app.forum?.attribute('leonmmcoset-scratch-ifream.run_url');
    console.log('[ScratchIframeModal] 配置的基础 URL:', baseUrl);

    const iframeUrl = baseUrl ? baseUrl + encodeURIComponent(this.url) : '';
    if (!iframeUrl) {
      console.error('[ScratchIframeModal] 基础 URL 未配置，无法生成 iframe 地址');
      return;
    }

    const iframeHtml = `<iframe src="${iframeUrl}" width="100%" height="600" frameborder="0" allowfullscreen></iframe>`;
    
    console.log('[ScratchIframeModal] 生成的 iframe HTML:', iframeHtml);
    editor.insertAtCursor(iframeHtml);
    this.hide();
  }
}

// 仅保留一个默认导出（函数形式）
export default function initialize() {
  app.initializers.add('leonmmcoset-scratch-ifream', () => {
    extend(TextEditor.prototype, 'toolbarItems', function (items) {
      // 关键修改：校验用户权限
      const user = app.session.user;
      if (!user || !user.hasPermission('leonmmcoset.scratch-ifream.use')) {
        return; // 无权限则不添加按钮
      }

      items.add(
        'scratch-iframe',
        m(
          Button,
          {
            icon: 'fas fa-code',
            onclick: () => {
              // 添加模态框显示前的调试
              console.log('[ScratchIframeModal] 准备显示模态框');
              console.log('[ScratchIframeModal] app.modal 对象:', app.modal);
              console.log('[ScratchIframeModal] 当前编辑器实例:', this);

              app.modal.show(ScratchIframeModal, {
                editor: this,
              });
            },
          },
          app.translator.trans('leonmmcoset-scratch-ifream.forum.add_scratch_button')
        )
      );
    });
  });
}
