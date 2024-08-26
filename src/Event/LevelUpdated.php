<?php

/*
 * This file is part of foskym/flarum-custom-levels.
 *
 * Copyright (c) 2024 FoskyM.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */
namespace FoskyM\CustomLevels\Event;

use Flarum\User\User;
use FoskyM\CustomLevels\Model\Level;

class LevelUpdated
{
    public $user;
    public $recent_level;
    public $current_level;
    public function __construct(User $user = null, Level $recent_level = null, Level $current_level = null)
    {
        $this->user = $user;
        $this->recent_level = $recent_level;
        $this->current_level = $current_level;
    }
}