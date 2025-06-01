import { Component } from 'flarum/common/Component';
import { Setting } from 'flarum/admin/components';
import Button from 'flarum/common/components/Button';
import LoadingButton from 'flarum/common/components/LoadingButton';

export default class ScratchIframeSettings extends Component {
    init() {
        super.init();
        this.baseUrl = m.stream(app.settings.get('scratch-iframe.base_url', 'https://run.scdev.top/?url='));
        this.loading = false;
    }

    saveSettings() {
        this.loading = true;
        this.redraw();

        app.settings.set('scratch-iframe.base_url', this.baseUrl());
        app.settings.save().then(() => {
            this.loading = false;
            this.redraw();
        });
    }

    view() {
        return m('.ScratchIframeSettings', [
            m('h2', 'Scratch 运行链接设置'),
            m('.Form-group', [
                Setting.Label('基础URL地址'),
                m('input', {
                    type: 'url',
                    className: 'FormControl',
                    value: this.baseUrl(),
                    oninput: m.withAttr('value', this.baseUrl),
                    placeholder: 'https://run.scdev.top/?url='
                }),
                m('p', '.Text-muted', '用于生成IFrame的基础URL，最终链接格式为：[基础URL]+[用户输入链接]')
            ]),
            m('.Form-group', [
                LoadingButton.component({
                    type: 'button',
                    className: 'Button Button--primary',
                    loading: this.loading,
                    onclick: () => this.saveSettings()
                }, '保存设置')
            ])
        ]);
    }
}
