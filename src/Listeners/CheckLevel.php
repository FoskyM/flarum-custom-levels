<?php

/*
 * This file is part of foskym/flarum-custom-levels.
 *
 * Copyright (c) 2024 FoskyM.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */
namespace FoskyM\CustomLevels\Listeners;

use Illuminate\Support\Arr;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Events\Dispatcher;
use Flarum\User\User;
use FoskyM\CustomLevels\Event\LevelUpdated;
use FoskyM\CustomLevels\Event\ExpUpdated;
use FoskyM\CustomLevels\AutoRemoveEnum;
use FoskyM\CustomLevels\Model\Level;

class CheckLevel
{
    protected SettingsRepositoryInterface $settings;
    protected Dispatcher $events;

    public function __construct(SettingsRepositoryInterface $settings, Dispatcher $events)
    {
        $this->settings = $settings;
        $this->events = $events;
    }

    public function __invoke(ExpUpdated $event): void
    {
        $user = $event->user;
        $exp = $event->exp;

        $current_exp = $user->exp;
        $recent_exp = $current_exp - $exp;

        $recent_level = Level::where('min_exp_required', '<=', $recent_exp)->orderBy('min_exp_required', 'desc')->first();
        $current_level = Level::where('min_exp_required', '<=', $current_exp)->orderBy('min_exp_required', 'desc')->first();
        if ($recent_level->id != $current_level->id) {
            $this->events->dispatch(new LevelUpdated($user, $recent_level, $current_level));
        }
    }
}