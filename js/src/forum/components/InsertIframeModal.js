// 新增：从Flarum核心导入Modal组件
import Modal from 'flarum/components/Modal'; // 旧版导入方式
import { Button } from 'flarum/common/components';

export default class InsertIframeModal extends Modal {
  init() {
    super.init();
    this.url = m.stream('');
  }

  view() {
    // 从前端 payload 获取插件元数据
    const { title, description, iconColor } = app.payload.scratchIframe || {};

    return super.view([
      m('.Modal-header', [
        // 使用插件标题作为模态框标题
        m('h3', { style: `color: ${iconColor};` }, title), // 标题颜色与插件图标一致
      ]),
      m('.Modal-body', [
        // 显示插件描述
        m('p', '.Text-muted', description),
        m('p', '请输入链接地址：'),
        m('input', {
          type: 'url',
          className: 'FormControl',
          value: this.url(),
          oninput: m.withAttr('value', this.url),
        }),
      ]),
      m('.Modal-footer', [
        Button.component({ onclick: () => this.hide() }, '取消'),
        Button.component(
          {
            type: 'button',
            className: 'Button--primary',
            onclick: () => {
              if (this.url()) {
                this.insertIframe(this.url());
                this.hide();
              }
            },
          },
          '插入'
        ),
      ]),
    ]);
  }

  insertIframe(url) {
    const iframe = `<iframe src="https://run.scdev.top/?url=${encodeURIComponent(
      url
    )}" style="width:100%;height:400px;" class="scratch-iframe"></iframe>`;

    if (app.composer?.editor) {
      app.composer.editor.insertHtml(iframe);
    } else {
      app.composer?.getContent()?.append(iframe);
    }
  }
}
