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

use FoskyM\CustomLevels\Notification\LevelUpdatedNotification;
use Illuminate\Support\Arr;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\Notification\NotificationSyncer;
use Illuminate\Contracts\Events\Dispatcher;
use Flarum\User\User;
use FoskyM\CustomLevels\Event\LevelUpdated;
use FoskyM\CustomLevels\Event\ExpUpdated;
use FoskyM\CustomLevels\AutoRemoveEnum;
use FoskyM\CustomLevels\Model\Level;
use FoskyM\CustomLevels\Model\ExpLog;
use Carbon\Carbon;

class ExpUpdatedListener
{
    protected SettingsRepositoryInterface $settings;
    protected Dispatcher $events;
    protected NotificationSyncer $notifications;

    public function __construct(SettingsRepositoryInterface $settings, Dispatcher $events, NotificationSyncer $notifications)
    {
        $this->settings = $settings;
        $this->events = $events;
        $this->notifications = $notifications;
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
            $this->notifications->sync(
                new LevelUpdatedNotification($user, $current_level),
                [$user]
            );
            $this->events->dispatch(new LevelUpdated($user, $recent_level, $current_level));
        }

        $exp_log = new ExpLog();
        $exp_log->user_id = $user->id;
        $exp_log->exp = $exp;
        $exp_log->old_exp = $recent_exp;
        $exp_log->new_exp = $current_exp;
        $exp_log->type = $event->type;
        $exp_log->relationship = $event->relationship;
        $exp_log->created_at = Carbon::now();
        $exp_log->save();
    }
}