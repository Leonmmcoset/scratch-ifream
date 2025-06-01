<?php

namespace Leonmmcoset\ScratchIframe\Listener;

use Flarum\Event\ConfigureClientView;
use Flarum\Event\ConfigureTextFormatter;
use Illuminate\Contracts\Events\Dispatcher;

class AddClientAssets
{
    public function subscribe(Dispatcher $events)
    {
        $events->listen(ConfigureClientView::class, [$this, 'addAssets']);
        $events->listen(ConfigureTextFormatter::class, [$this, 'configureTextFormatter']);
    }

    public function addAssets(ConfigureClientView $event)
    {
        if ($event->isForum()) {
            $event->addAssets([
                __DIR__.'/../../js/forum/dist/extension.js',
                __DIR__.'/../../less/forum.less'
            ]);
            $event->addBootstrapper('leonmmcoset/scratch-iframe/main');
        }
    }

    public function configureTextFormatter(ConfigureTextFormatter $event)
    {
        $event->configurator->BBCodes->addCustom(
            '[scratch]{URL}[/scratch]',
            '<div class="scratch-iframe-embed"><div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item" src="https://run.scdev.top/?url={URL}" allowfullscreen></iframe></div></div>'
        );
    }
}    