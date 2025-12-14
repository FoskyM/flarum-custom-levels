<?php

/*
 * This file is part of foskym/flarum-custom-levels.
 *
 * Copyright (c) 2024 FoskyM.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */
namespace FoskyM\CustomLevels\Integration\ForumQuests\Listeners;

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
use Xypp\ForumQuests\Event\QuestDone;
use Xypp\ForumQuests\QuestInfo;
use Carbon\Carbon;

class QuestDoneListener
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

    public function __invoke(QuestDone $event): void
    {
        $user = $event->user;
        $quest = $event->quest;

        $rewards = $quest->parsed_rewards;

        foreach ($rewards as $reward) {
            if ($reward->name === 'exp') {
                $relationship = [
                    'quest_id' => $quest->id,
                    'quest_name' => $quest->name,
                ];
// 核心修复：将字符串类型的 $reward->value 强制转为整数（int）
                $expValue = (int)$reward->value;
                $this->events->dispatch(new ExpUpdated($user, $expValue, 'forum_quests', $relationship));
            }
        }
    }
}
