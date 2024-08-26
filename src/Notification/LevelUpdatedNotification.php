<?php

/*
 * This file is part of foskym/flarum-custom-levels.
 *
 * Copyright (c) 2024 FoskyM.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */
namespace FoskyM\CustomLevels\Notification;

use Flarum\Notification\Blueprint\BlueprintInterface;
use Flarum\User\User;
use FoskyM\CustomLevels\Model\Level;
use FoskyM\CustomLevels\Model\ExpLog;

class LevelUpdatedNotification implements BlueprintInterface
{
    public $user;
    public $level;

    public function __construct(User $actor, Level $level)
    {
        $this->user = $actor;
        $this->level = $level;
    }

    public function getSubject()
    {
        return $this->level;
    }

    public function getFromUser()
    {
        return $this->user;
    }

    public function getData()
    {
        return [
            'level' => $this->level->name,
        ];
    }

    public static function getType()
    {
        return 'levelUpdated';
    }

    public static function getSubjectModel()
    {
        return Level::class;
    }
}