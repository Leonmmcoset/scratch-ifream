import { extend } from 'flarum/common/extend';
import Composer from 'flarum/forum/components/Composer';
import Button from 'flarum/common/components/Button';
// 新增：将导入语句移到文件顶部（正确位置）
import InsertIframeModal from './components/InsertIframeModal';

export default function() {
    app.initializers.add('scratch-iframe-forum', (app) => {
        extend(Composer.prototype, 'view', function(view) {
            const controlsIndex = view.children.findIndex(child => 
                child.tag === '.Composer-controls'
            );

            if (controlsIndex > -1) {
                // 此处直接使用已导入的InsertIframeModal
                view.children[controlsIndex].children.push(
                    Button.component({
                        className: 'Button Button--icon',
                        onclick: () => app.modal.show(InsertIframeModal),  // 直接引用组件
                    }, [
                        m('svg', {class: 'Icon Icon--link'}, m('use', {href: '#link'})),
                        ' 插入运行链接'
                    ])
                );
            }
        });
    });
}