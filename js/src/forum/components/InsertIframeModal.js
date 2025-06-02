// 新增：从Flarum核心导入Modal组件
import { Modal } from 'flarum/common/components';
import { Button } from 'flarum/common/components';

// 确保类继承自导入的Modal
export default class InsertIframeModal extends Modal {
    init() {
        super.init();  // 调用父类构造函数（必须）
        this.url = m.stream('');  // 管理输入框状态
    }

    view() {
        return super.view([
            // 使用父类的view结构
            m('.Modal-header', m('h3', '插入运行链接')),
            m('.Modal-body', [
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
                            // 调用插入逻辑（兼容富文本编辑器）
                            this.insertIframe(this.url());
                            this.hide();
                        }
                    },
                    '插入'
                ),
            ]),
        ]);
    }

    // 新增：兼容富文本编辑器的插入方法
    insertIframe(url) {
        const iframe = `<iframe src="https://run.scdev.top/?url=${encodeURIComponent(
            url
        )}" style="width:100%;height:400px;" class="scratch-iframe"></iframe>`;

        // 兼容Rich Text编辑器（使用编辑器API插入）
        if (app.composer && app.composer.editor) {
            app.composer.editor.insertHtml(iframe); // 富文本专用插入方法
        } else {
            // 兼容普通文本编辑器（直接追加）
            app.composer.getContent().append(iframe);
        }
    }
}
