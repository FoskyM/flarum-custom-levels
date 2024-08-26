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
        if ($schema->hasTable('fcl_levels')) {
            return;
        }
        $schema->create('fcl_levels', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->integer('min_exp_required');
            
        });
    },
    'down' => function (Builder $schema) {
        $schema->dropIfExists('fcl_levels');
    },
];