import { extend } from 'flarum/common/extend';
import Composer from 'flarum/forum/components/Composer';
import Button from 'flarum/common/components/Button';
import InsertIframeModal from './components/InsertIframeModal';

export default function() {
    app.initializers.add('scratch-iframe-forum', (app) => {
        extend(Composer.prototype, 'view', function(view) {
            const controlsIndex = view.children.findIndex(child => 
                child.tag === '.Composer-controls'
            );

            if (controlsIndex > -1) {
                // 新增：校验用户是否有插入权限（无权限则不显示按钮）
                if (app.session.user && app.session.user.hasPermission('scratch-iframe.insert')) {
                    view.children[controlsIndex].children.push(
                        Button.component({
                            className: 'Button Button--icon',
                            onclick: () => app.modal.show(InsertIframeModal),
                        }, [
                            m('svg', {class: 'Icon Icon--link'}, m('use', {href: '#link'})),
                            app.translator.trans('scratch-iframe.buttons.insert') // 使用翻译
                        ])
                    );
                }
            }
        });
    });
}
