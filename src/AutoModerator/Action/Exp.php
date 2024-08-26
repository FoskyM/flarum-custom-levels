<?php

/*
 * This file is part of foskym/flarum-custom-levels.
 *
 * Copyright (c) 2024 FoskyM.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */
namespace FoskyM\CustomLevels\AutoModerator\Action;

use Askvortsov\AutoModerator\Action\ActionDriverInterface;
use FoskyM\CustomLevels\Event\ExpUpdated;
use Illuminate\Contracts\Validation\Factory;
use Illuminate\Contracts\Support\MessageBag;
use Flarum\User\User;

class Exp implements ActionDriverInterface
{
    public function translationKey(): string
    {
        return 'foskym-custom-levels.admin.automoderator.action_name';
    }

    public function availableSettings(): array
    {
        return [
            'exp' => 'foskym-custom-levels.admin.automoderator.metric_name',
        ];
    }

    public function validateSettings(array $settings, Factory $validator): MessageBag
    {
        return $validator->make($settings, [
            'exp' => 'required|numeric',
        ])->errors();
    }

    public function extensionDependencies(): array
    {
        return ['foskym-custom-levels'];
    }

    public function execute(User $user, array $settings = [], User $lastEditedBy = null)
    {
        $exp = $settings['exp'] ?? 0;
        $exp = (int)$exp;

        $user->exp += $exp;
        $user->save();

        resolve('events')->dispatch(new ExpUpdated($user, $exp, 'automoderator'));
    }
}
