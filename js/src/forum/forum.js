import { extend } from 'flarum/common/extend';
import Composer from 'flarum/forum/components/Composer';
import Button from 'flarum/common/components/Button';
import InsertIframeModal from './components/InsertIframeModal';

export default function() {
    app.initializers.add('scratch-iframe', (app) => {
        // 扩展Composer组件的视图，添加插入按钮
        extend(Composer.prototype, 'view', function(view) {
            // 定位到工具栏容器（假设结构：.Composer > [内容区, 工具栏]）
            const controlsIndex = view.children.findIndex(child => 
                child.tag === '.Composer-controls'
            );

            if (controlsIndex > -1) {
                // 向工具栏追加新按钮
                view.children[controlsIndex].children.push(
                    Button.component({
                        className: 'Button Button--icon',
                        onclick: () => app.modal.show(InsertIframeModal),
                    }, [
                        // 使用Flarum内置图标（#link是Flarum图标集中的链接图标）
                        m('svg', {class: 'Icon Icon--link'}, m('use', {href: '#link'})),
                        ' 插入运行链接'
                    ])
                );
            }
        });
    });
}
