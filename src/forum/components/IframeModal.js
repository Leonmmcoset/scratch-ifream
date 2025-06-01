import { Modal } from 'flarum/common/components';
import { TextField } from 'flarum/common/components';

export default class IframeModal extends Modal {
  oninit(vnode) {
    super.oninit(vnode);
    this.url = m.prop('');
  }

  className() {
    return 'Modal--small IframeModal';
  }

  title() {
    return app.translator.trans('flarum-iframe.forum.modal.title');
  }

  content() {
    return (
      <div className="Modal-body">
        <p>{app.translator.trans('flarum-iframe.forum.modal.instructions')}</p>
        <TextField
          className="FormControl"
          bidi={this.url}
          placeholder={app.translator.trans('flarum-iframe.forum.modal.placeholder')}
        />
        <div className="Form-actions">
          <button
            type="button"
            className="Button Button--primary"
            onclick={this.embedIframe.bind(this)}
          >
            {app.translator.trans('flarum-iframe.forum.modal.submit_button')}
          </button>
        </div>
      </div>
    );
  }

  embedIframe() {
    const url = this.url();
    if (!url) return;

    const composer = app.composer;
    const body = composer.body();
    const iframeUrl = `https://run.scdev.top/?url=${encodeURIComponent(url)}`;
    const iframeCode = `[iframe]${iframeUrl}[/iframe]`;
    
    composer.body(body + '\n\n' + iframeCode);
    app.modal.close();
  }
}  