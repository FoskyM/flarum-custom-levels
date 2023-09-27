<?php

/*
 * This file is part of foskym/flarum-custom-levels.
 *
 * Copyright (c) 2023 FoskyM.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace FoskyM\CustomLevels;

use Flarum\Extend;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/less/forum.less'),
    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__.'/less/admin.less'),
    new Extend\Locales(__DIR__.'/locale'),

    (new Extend\Settings())
        ->serializeToForum('foskym-custom-levels.pointsText', 'foskym-custom-levels.pointsText')
        ->serializeToForum('foskym-custom-levels.expFormula', 'foskym-custom-levels.expFormula')
        ->serializeToForum('foskym-custom-levels.levelFormula', 'foskym-custom-levels.levelFormula'),
];
