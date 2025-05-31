<?php

use Flarum\Extend;
use Flarum\Frontend\Document;
use s9e\TextFormatter\Configurator;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/less/forum.less'),

    (new Extend\Formatter)
        ->configure(function (Configurator $config) {
            $config->BBCodes->addCustom(
                '[IFRAME url={URL}]{TEXT}[/IFRAME]',
                '<div class="iframe-container"><iframe src="https://run.scdev.top/?url={@url}" frameborder="0" allowfullscreen></iframe></div>'
            );
        }),

    (new Extend\Frontend('forum'))
        ->content(function (Document $document) {
            $document->head[] = '<style>.iframe-container { position: relative; overflow: hidden; padding-top: 56.25%; } .iframe-container iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style>';
        }),

    new Extend\Locales(__DIR__.'/locale'),
];    