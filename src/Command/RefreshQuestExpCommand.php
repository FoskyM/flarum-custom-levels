<?php

/*
 * This file is part of foskym/flarum-custom-levels.
 *
 * Copyright (c) 2024 FoskyM.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */
namespace FoskyM\CustomLevels\Command;

use Flarum\User\User;
use Illuminate\Console\Command;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Arr;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Events\Dispatcher;
use FoskyM\CustomLevels\Event\LevelUpdated;
use FoskyM\CustomLevels\Event\ExpUpdated;
use FoskyM\CustomLevels\AutoRemoveEnum;
use FoskyM\CustomLevels\Model\Level;
use FoskyM\CustomLevels\Model\ExpLog;
use Xypp\ForumQuests\QuestInfo;
use Carbon\Carbon;

class RefreshQuestExpCommand extends Command
{
    protected $signature = 'foskym:custom-levels:refresh-quest';
    protected $description = 'Re-computes the exp for each user based on quests';

    protected $settings;
    protected $events;
    protected $exp_for_post;
    protected $post_min_length;
    protected $exp_for_discussion;
    protected $exp_for_like;

    public function __construct(SettingsRepositoryInterface $settings, Dispatcher $events)
    {
        $this->settings = $settings;
        $this->events = $events;

        
        parent::__construct();
    }

    private function expLog($user, $exp, $recent_exp, $current_exp, $type)
    {
        $exp_log = new ExpLog();
        $exp_log->user_id = $user->id;
        $exp_log->exp = $exp;
        $exp_log->old_exp = $recent_exp;
        $exp_log->new_exp = $current_exp;
        $exp_log->type = $type;
        $exp_log->relationship = [];
        $exp_log->created_at = Carbon::now();
        $exp_log->save();
    }
    public function handle()
    {
        if (!class_exists('Xypp\ForumQuests\QuestInfo')) {
            $this->error('Forum Quests extension is not installed.');
            return;
        }
        $progress = $this->output->createProgressBar(User::query()->count());

        User::query()->chunk(100, function (Collection $users) use ($progress) {
            $users->load(['notifications' => function (HasMany $relationship) {
                $relationship->where('type', 'quest_done');
            }]);

            foreach ($users as $user) {
                $this->expLog($user, - $user->exp, $user->exp, 0, 'system_clear');
                $user->exp = 0;

                foreach ($user->notifications as $notification) {
                    $quest_id = $notification->subject_id;
                    $quest = QuestInfo::find($quest_id);
                    if ($quest) {
                        $rewards = json_decode($quest->rewards);;
                        foreach ($rewards as $reward) {
                            if ($reward->name === 'exp') {
                                $exp = $reward->value;
                                $user->exp += $exp;
                            }
                        }
                    }
                }
                
                $user->save();

                $this->expLog($user, $user->exp, 0, $user->exp, 'system_refresh');

                $progress->advance();
            }
        });

        $this->line('Done.');
    }
}