<?php

namespace FoskyM\CustomLevels\Integration\ForumQuests\Rewards;

use FoskyM\CustomLevels\Event\ExpUpdated;
use Xypp\ForumQuests\RewardDefinition;
use Illuminate\Events\Dispatcher;
use Flarum\User\User;

class ExpReward extends RewardDefinition
{
    private Dispatcher $dispatcher;
    public function __construct(Dispatcher $dispatcher)
    {
        parent::__construct('exp', null, 'foskym-custom-levels.lib.integrations.forum-quests.reward_name');
        $this->dispatcher = $dispatcher;
    }
    public function perform(User $user, $value): bool
    {
        $user->lockForUpdate()->find($user->id)->increment('exp', $value);
        // $this->dispatcher->dispatch(new ExpUpdated($user, $value, 'forum_quests'));
        return true;
    }
}