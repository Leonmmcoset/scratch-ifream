import Modal from 'flarum/components/Modal';
import { submitButton } from 'flarum/helpers';

export default class IframeModal extends Modal {
    init() {
        super.init();
        
        this.url = m.prop('');
        this.loading = m.prop(false);
    }

    className() {
        return 'Modal--small';
    }

    title() {
        return app.translator.trans('flarum-iframe-embed.forum.modal.title');
    }

    content() {
        return m('div', {className: 'Modal-body'}, [
            m('div', {className: 'Form-group'}, [
                m('label', {}, app.translator.trans('flarum-iframe-embed.forum.modal.url_label')),
                m('input', {
                    className: 'FormControl',
                    placeholder: app.translator.trans('flarum-iframe-embed.forum.modal.url_placeholder'),
                    value: this.url(),
                    oninput: m.withAttr('value', this.url)
                })
            ]),
            m('div', {className: 'Form-group'}, [
                submitButton({
                    loading: this.loading(),
                    children: app.translator.trans('flarum-iframe-embed.forum.modal.submit_button')
                }),
                m('button', {
                    type: 'button',
                    className: 'Button',
                    onclick: this.hide.bind(this)
                }, app.translator.trans('core.forum.modal.cancel'))
            ])
        ]);
    }

    onsubmit(e) {
        e.preventDefault();
        
        this.loading(true);
        
        const url = this.url();
        
        if (!url) return;
        
        const text = `[IFRAME url=${url}]嵌入内容[/IFRAME]`;
        
        app.composer.editor.insertAtCursor(text);
        
        this.hide();
        this.loading(false);
    }
}    