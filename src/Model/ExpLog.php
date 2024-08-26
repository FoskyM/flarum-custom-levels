<?php

/*
 * This file is part of foskym/flarum-custom-levels.
 *
 * Copyright (c) 2024 FoskyM.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */
namespace FoskyM\CustomLevels\Model;

use Flarum\Database\AbstractModel;

class ExpLog extends AbstractModel
{
    protected $table = 'fcl_exp_logs';
    protected $guarded = [];
    protected $casts = [
        'relationship' => 'array',
    ];
    protected $dates = [
        'created_at',
    ];

    public function user()
    {
        return $this->belongsTo('Flarum\User\User');
    }
}
