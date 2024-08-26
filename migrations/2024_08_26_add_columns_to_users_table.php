<?php

/*
 * This file is part of foskym/flarum-custom-levels.
 *
 * Copyright (c) 2024 FoskyM.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

use Flarum\Database\Migration;

return Migration::addColumns('users', [
    'exp' => ['integer', 'default' => 0],
]);