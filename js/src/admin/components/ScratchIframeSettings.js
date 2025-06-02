import Component from 'flarum/common/Component';
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
    app.settings.set('scratch-iframe.base_url', this.baseUrl());
    app.settings.save().then(() => {
      this.loading = false;
      this.redraw();
    });
  }

  view() {
    return m('.ScratchIframeSettings', [
      // 确保这个根元素存在
      m('h2', app.translator.trans('scratch-iframe.admin.settings.title')),
      m('.Form-group', [
        // 检查所有类名是否与模板匹配（如 .FormControl）
        m('input', {
          type: 'url',
          className: 'FormControl', // 必须与 Flarum 的 CSS 类名一致
          value: this.baseUrl(),
          oninput: m.withAttr('value', this.baseUrl),
          placeholder: 'https://run.scdev.top/?url=',
        }),
        m('p', '.Text-muted', app.translator.trans('scratch-iframe.admin.settings.base_url_help')),
      ]),
      m('.Form-group', [
        LoadingButton.component({
          type: 'button',
          className: 'Button Button--primary',
          loading: this.loading,
          onclick: () => this.saveSettings(),
          children: app.translator.trans('scratch-iframe.admin.settings.save_button'),
        }),
      ]),
    ]);
  }
}
