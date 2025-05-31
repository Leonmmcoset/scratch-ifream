import { extend } from 'flarum/extend';
import app from 'flarum/app';
import Button from 'flarum/components/Button';
import ModalManager from 'flarum/components/ModalManager';
import Modal from 'flarum/components/Modal';

// 模态框组件
class ScratchEmbedModal extends Modal {
    init() {
        super.init();
        this.url = m.prop('');
    }

    className() {
        return 'Modal--small';
    }

    title() {
        return app.translator.trans('leonmmcoset-scratch-ifream.forum.modal.title');
    }

    content() {
        return m(
            'div',
            { className: 'Modal-body' },
            m('div', { className: 'Form-group' }, [
                m('label', app.translator.trans('leonmmcoset-scratch-ifream.forum.modal.url_label')),
                m('input', {
                    className: 'FormControl',
                    placeholder: app.translator.trans('leonmmcoset-scratch-ifream.forum.modal.url_placeholder'),
                    value: this.url(),
                    oninput: m.withAttr('value', this.url)
                })
            ]),
            m('div', { className: 'Form-group' }, [
                Button.component(
                    {
                        type: 'submit',
                        className: 'Button Button--primary',
                        loading: this.loading
                    },
                    app.translator.trans('leonmmcoset-scratch-ifream.forum.modal.submit_button')
                )
            ])
        );
    }

    onsubmit(e) {
        e.preventDefault();

        this.loading = true;

        const editor = app.composer.editor;
        const url = this.url();

        if (url) {
            // 添加前缀处理
            let processedUrl = url;
            if (!processedUrl.startsWith('http')) {
                processedUrl = 'https://' + processedUrl;
            }
            
            editor.insertAtCursor(`[scratch]${processedUrl}[/scratch]`);
            this.hide();
        }

        this.loading = false;
    }
}

// 扩展初始化
app.initializers.add('leonmmcoset-scratch-ifream', () => {
    // 注册翻译
    app.translator.addTranslations('en', {
        'leonmmcoset-scratch-ifream.forum.buttons.insert_scratch': 'Embed Scratch',
        'leonmmcoset-scratch-ifream.forum.modal.title': 'Embed Scratch Project',
        'leonmmcoset-scratch-ifream.forum.modal.url_label': 'Project URL',
        'leonmmcoset-scratch-ifream.forum.modal.url_placeholder': 'Enter Scratch project URL',
        'leonmmcoset-scratch-ifream.forum.modal.submit_button': 'Embed'
    });

    // 添加按钮到编辑器
    extend('flarum.editor.components.ComposerToolbar', 'buttonGroups', function (items) {
        items.add('scratch-embed', [
            Button.component(
                {
                    icon: 'fas fa-code',
                    onclick: () => app.modal.show(new ScratchEmbedModal())
                },
                app.translator.trans('leonmmcoset-scratch-ifream.forum.buttons.insert_scratch')
            )
        ]);
    });
});    