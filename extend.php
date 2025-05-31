<?php

use Flarum\Extend;
use s9e\TextFormatter\Configurator;

return [
    (new Extend\Formatter())
        ->configure(function (Configurator $config) {
            // 添加Scratch BBCode
            $config->BBCodes->addCustom(
                '[scratch]{URL}[/scratch]',
                '<div class="scratch-embed-container"><iframe src="https://run.scdev.top/?url={URL}" frameborder="0" allowfullscreen></iframe></div>'
            );
            
            // 添加CSS样式
            $config->CSS->add('.scratch-embed-container { position: relative; overflow: hidden; padding-top: 56.25%; }');
            $config->CSS->add('.scratch-embed-container iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }');
        })
];    