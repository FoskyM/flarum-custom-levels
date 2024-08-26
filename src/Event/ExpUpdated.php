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

class ExpUpdated
{
    public $user;

    public function __construct(User $user = null)
    {
        $this->user = $user;
    }
}