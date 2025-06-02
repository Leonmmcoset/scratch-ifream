<?php

/*
 * This file is part of leonmmcoset/scratch-ifream.
 *
 * Copyright (c) 2025 LeonMMcoset.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Leonmmcoset\ScratchIfream;

use Flarum\Extend;

return [
    // 论坛前端资源：指向项目根目录下的 /js/dist/forum.js 和 /less/forum.less
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')  // 等价于 项目根目录/js/dist/forum.js
        ->css(__DIR__.'/less/forum.less'), // 等价于 项目根目录/less/forum.less

    // 后台资源：指向项目根目录下的 /js/dist/admin.js 和 /less/admin.less
    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')  // 等价于 项目根目录/js/dist/admin.js
        ->css(__DIR__.'/less/admin.less'), // 等价于 项目根目录/less/admin.less

    // 多语言文件：指向项目根目录下的 /locale 目录
    new Extend\Locales(__DIR__.'/locale'),  // 等价于 项目根目录/locale/
];
