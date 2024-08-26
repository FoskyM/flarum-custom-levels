<?php

/*
 * This file is part of foskym/flarum-custom-levels.
 *
 * Copyright (c) 2024 FoskyM.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */
namespace FoskyM\CustomLevels;

abstract class AutoRemoveEnum
{
    public const NEVER = 0;
    public const HIDDEN = 1;
    public const DELETED = 2;
}