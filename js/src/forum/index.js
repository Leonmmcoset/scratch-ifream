import { extend } from 'flarum/common/extend';
import Composer from 'flarum/forum/components/Composer';
import Button from 'flarum/common/components/Button';
import InsertIframeModal from './components/InsertIframeModal';

export default function() {
    app.initializers.add('scratch-iframe-forum', (app) => {
        // 扩展发帖框（Composer）的工具栏
        extend(Composer.prototype, 'view', function(view) {
            // 定位到工具栏容器（根据实际DOM结构调整）
            const controlsIndex = view.children.findIndex(child => 
                child.tag === '.Composer-controls'
            );

            if (controlsIndex > -1) {
                // 向工具栏添加"插入运行链接"按钮
                view.children[controlsIndex].children.push(
                    Button.component({
                        className: 'Button Button--icon',
                        onclick: () => app.modal.show(InsertIframeModal),
                    }, [
                        m('svg', {class: 'Icon Icon--link'}, m('use', {href: '#link'})),
                        ' 插入运行链接'
                    ])
                );
            }
        });
    });
}