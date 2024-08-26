<?php

/*
 * This file is part of foskym/flarum-custom-levels.
 *
 * Copyright (c) 2024 FoskyM.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        if (!$schema->hasTable('fcl_levels')) {
            return;
        }
        if ($schema->getConnection()->table('fcl_levels')->count() > 0) {
            return;
        }
        $schema->getConnection()->table('fcl_levels')->insert([
            'name' => '0',
            'min_exp_required' => 0,
        ]);
    },
    'down' => function (Builder $schema) {

    },
];