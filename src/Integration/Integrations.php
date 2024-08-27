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

use Flarum\Post\Event\Posted;
use Flarum\Post\Event\Restored as PostRestored;
use Flarum\Post\Event\Hidden as PostHidden;
use Flarum\Post\Event\Deleted as PostDeleted;
use Flarum\Discussion\Event\Started;
use Flarum\Discussion\Event\Restored as DiscussionRestored;
use Flarum\Discussion\Event\Hidden as DiscussionHidden;
use Flarum\Discussion\Event\Deleted as DiscussionDeleted;
use Flarum\User\Event\Saving;
use Flarum\Likes\Event\PostWasLiked;
use Flarum\Likes\Event\PostWasUnliked;

$extend = [
    (new Extend\Event())
        ->listen(Posted::class, [Listeners\GiveExp::class, 'postWasPosted'])
        ->listen(PostRestored::class, [Listeners\GiveExp::class, 'postWasRestored'])
        ->listen(PostHidden::class, [Listeners\GiveExp::class, 'postWasHidden'])
        ->listen(PostDeleted::class, [Listeners\GiveExp::class, 'postWasDeleted'])
        ->listen(Started::class, [Listeners\GiveExp::class, 'discussionWasStarted'])
        ->listen(DiscussionRestored::class, [Listeners\GiveExp::class, 'discussionWasRestored'])
        ->listen(DiscussionHidden::class, [Listeners\GiveExp::class, 'discussionWasHidden'])
        ->listen(DiscussionDeleted::class, [Listeners\GiveExp::class, 'discussionWasDeleted'])
        ->listen(Saving::class, [Listeners\GiveExp::class, 'userWillBeSaved']),
];

if (class_exists('Flarum\Likes\Event\PostWasLiked')) {
    $extend[] =
        (new Extend\Event())
            ->listen(PostWasLiked::class, [Listeners\GiveExp::class, 'postWasLiked'])
            ->listen(PostWasUnliked::class, [Listeners\GiveExp::class, 'postWasUnliked'])
    ;
}

if (class_exists('Askvortsov\AutoModerator\Extend\AutoModerator')) {
    $extend[] =
        (new \Askvortsov\AutoModerator\Extend\AutoModerator())
            ->metricDriver('exp', Integration\AutoModerator\Metric\Exp::class)
            ->actionDriver('exp', Integration\AutoModerator\Action\Exp::class)
    ;
}

if (class_exists('Xypp\ForumQuests\Extend\RewardProvider')) {
    $extend[] =
        (new \Xypp\ForumQuests\Extend\RewardProvider())
            ->provide(Integration\ForumQuests\Rewards\ExpReward::class)
    ;
}

return $extend;