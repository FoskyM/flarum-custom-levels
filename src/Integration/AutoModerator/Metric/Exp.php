<?php

/*
 * This file is part of foskym/flarum-custom-levels.
 *
 * Copyright (c) 2024 FoskyM.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */
namespace FoskyM\CustomLevels\Integration\AutoModerator\Metric;

use Askvortsov\AutoModerator\Metric\MetricDriverInterface;
use FoskyM\CustomLevels\Event\ExpUpdated;
use Flarum\User\User;

class Exp implements MetricDriverInterface
{
    public function translationKey(): string
    {
        return 'foskym-custom-levels.lib.integrations.automoderator.metric_name';
    }

    public function extensionDependencies(): array
    {
        return ['foskym-custom-levels'];
    }

    public function eventTriggers(): array
    {
        return [
            ExpUpdated::class => function (ExpUpdated $event) {
                return $event->user;
            },
        ];
    }

    public function getValue(User $user): int
    {
        return floor($user->exp);
    }
}
