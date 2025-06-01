<?php

namespace Leonmmcoset\ScratchIframe;

use Flarum\Extend;
use Leonmmcoset\ScratchIframe\Listener\AddClientAssets;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/../js/forum/dist/extension.js')
        ->css(__DIR__.'/../less/forum.less'),
        
    (new Extend\Formatter)
        ->configure(function ($config) {
            $config->BBCodes->addCustom(
                '[scratch]{URL}[/scratch]',
                '<div class="scratch-iframe-embed"><div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item" src="https://run.scdev.top/?url={URL}" allowfullscreen></iframe></div></div>'
            );
        }),

    (new Extend\Event)
        ->listen(AddClientAssets::class),
];    