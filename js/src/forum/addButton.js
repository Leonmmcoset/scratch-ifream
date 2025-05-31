import { extend } from 'flarum/extend';
import Button from 'flarum/components/Button';
import TextEditor from 'flarum/components/TextEditor';
import ModalManager from 'flarum/utils/ModalManager';
import IframeModal from './IframeModal';

export default function() {
    extend(TextEditor.prototype, 'controlItems', function(items) {
        items.add('iframe',
            Button.component({
                icon: 'video-camera',
                className: 'Button Button--icon',
                title: app.translator.trans('flarum-iframe-embed.forum.buttons.insert_iframe'),
                onclick: () => {
                    app.modal.show(new IframeModal());
                }
            })
        );
    });
}    