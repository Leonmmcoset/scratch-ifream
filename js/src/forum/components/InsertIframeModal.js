import { Modal } from 'flarum/common/components';
import Button from 'flarum/common/components/Button';

export default class InsertIframeModal extends Modal {
    init() {
        super.init();
        // 使用m.stream管理输入框状态
        this.url = m.stream('');
    }

    view() {
        return super.view([
            // 模态框头部
            m('.Modal-header', m('h3', '插入运行链接')),
            // 模态框主体（输入框）
            m('.Modal-body', [
                m('p', '请输入需要嵌入的链接地址：'),
                m('input', {
                    type: 'url',          // 启用URL格式验证
                    className: 'FormControl',
                    value: this.url(),
                    oninput: m.withAttr('value', this.url)  // 实时更新输入值
                })
            ]),
            // 模态框底部按钮
            m('.Modal-footer', [
                Button.component({onclick: () => this.hide()}, '取消'),
                Button.component({
                    type: 'button',
                    className: 'Button--primary',
                    onclick: () => {
                        if (this.url()) {
                            // 生成IFrame代码并插入编辑器（需根据实际编辑器调整）
                            const iframe = `<iframe src="https://run.scdev.top/?url=${encodeURIComponent(this.url())}" style="width:100%;height:400px;"></iframe>`;
                            app.composer.getContent().append(iframe);  // 示例插入方法
                            this.hide();  // 关闭模态框
                        }
                    }
                }, '插入')
            ])
        ]);
    }
}
