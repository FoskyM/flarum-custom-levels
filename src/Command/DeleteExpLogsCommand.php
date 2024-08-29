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

class DeleteExpLogsCommand extends Command
{
    protected $signature = 'foskym:custom-levels:delete-exp-logs';
    protected $description = 'Delete all exp logs.';

    protected $settings;
    protected $events;

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
        $progress = $this->output->createProgressBar(User::query()->count());

        User::query()->chunk(100, function (Collection $users) use ($progress) {
            foreach ($users as $user) {
                $exp_logs = ExpLog::where('user_id', $user->id)->get();
                foreach ($exp_logs as $exp_log) {
                    $exp_log->delete();
                }
                $progress->advance();
            }
        });

        $this->line('Done.');
    }
}