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

use Flarum\Extend;
use Flarum\User\User;
use Flarum\Api\Controller\ListUsersController;
use Flarum\Api\Serializer\UserSerializer;
use FoskyM\CustomLevels\UserAttributes;

use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\Extension\ExtensionManager;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->css(__DIR__ . '/less/forum.less'),
    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js')
        ->css(__DIR__ . '/less/admin.less'),
    new Extend\Locales(__DIR__ . '/locale'),

    (new Extend\Settings())
        ->serializeToForum('foskym-custom-levels.levelText', 'foskym-custom-levels.levelText')
        ->serializeToForum('foskym-custom-levels.expText', 'foskym-custom-levels.expText')
        ->serializeToForum('foskym-custom-levels.expFormula', 'foskym-custom-levels.expFormula')
        ->serializeToForum('foskym-custom-levels.levelFormula', 'foskym-custom-levels.levelFormula'),

    (new Extend\Console())
        ->command(Command\RefreshExpCommand::class)
        ->command(Command\RefreshQuestExpCommand::class)
        ->command(Command\DeleteExpLogsCommand::class),

    (new Extend\Model(User::class))
        ->cast('exp', 'int'),

    (new Extend\ApiSerializer(UserSerializer::class))
        ->attributes(UserAttributes::class)
        ->attribute('exp', function (UserSerializer $serializer, User $user) {
            return (int) $user->exp;
        })
        ->attribute('canEditExp', function (UserSerializer $serializer, User $user) {
            return $serializer->getActor()->can('edit_exp', $user);
        }),
    
    (new Extend\ApiController(ListUsersController::class))
        ->addSortField('exp'),

    (new Extend\Routes('api'))
        ->get('/exp/refresh', 'custom-levels.exp.refresh', Api\Controller\RefreshExpController::class)

        ->get('/exp-logs', 'custom-levels.exp-logs.list', Api\Controller\ListExpLogsController::class)

        ->get('/levels', 'custom-levels.levels.list', Api\Controller\ListLevelsController::class)
        ->post('/levels', 'custom-levels.levels.create', Api\Controller\CreateLevelController::class)
        ->patch('/levels/{id}', 'custom-levels.levels.update', Api\Controller\UpdateLevelController::class)
        ->delete('/levels/{id}', 'custom-levels.levels.delete', Api\Controller\DeleteLevelController::class),

    (new Extend\Event())
        ->listen(Event\ExpUpdated::class, Listeners\ExpUpdatedListener::class),

    (new Extend\Notification())
        ->type(Notification\LevelUpdatedNotification::class, Api\Serializer\LevelSerializer::class, ['alert']),

    require(__DIR__ . '/src/Integration/Integrations.php')
];