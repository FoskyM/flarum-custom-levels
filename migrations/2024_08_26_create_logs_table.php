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
        if ($schema->hasTable('fcl_exp_logs')) {
            return;
        }
        $schema->create('fcl_exp_logs', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id');
            $table->integer('exp');
            $table->integer('old_exp');
            $table->integer('new_exp');
            $table->string('type');
            $table->string('relationship');
            $table->timestamp('created_at')->nullable();
        });
    },
    'down' => function (Builder $schema) {
        $schema->dropIfExists('fcl_exp_logs');
    },
];