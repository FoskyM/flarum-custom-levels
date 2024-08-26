<?php

namespace FoskyM\CustomLevels\Command;

use Flarum\User\User;
use Illuminate\Console\Command;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Arr;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Events\Dispatcher;
use Flarum\Post\Event\Posted;
use Flarum\Post\Event\Restored as PostRestored;
use Flarum\Post\Event\Hidden as PostHidden;
use Flarum\Post\Event\Deleted as PostDeleted;
use Flarum\Discussion\Discussion;
use Flarum\Discussion\Event\Started;
use Flarum\Discussion\Event\Restored as DiscussionRestored;
use Flarum\Discussion\Event\Hidden as DiscussionHidden;
use Flarum\Discussion\Event\Deleted as DiscussionDeleted;
use Flarum\User\Event\Saving;
use Flarum\Likes\Event\PostWasLiked;
use Flarum\Likes\Event\PostWasUnliked;
use FoskyM\CustomLevels\Event\LevelUpdated;
use FoskyM\CustomLevels\Event\ExpUpdated;
use FoskyM\CustomLevels\AutoRemoveEnum;
use FoskyM\CustomLevels\Model\Level;

class RefreshExpCommand extends Command
{
    protected $signature = 'foskym:custom-levels:refresh';
    protected $description = 'Re-computes the exp for each user';

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

        $this->exp_for_post = $this->settings->get('foskym-custom-levels.expForPost', 0);
        $this->post_min_length = (int) $this->settings->get('foskym-custom-levels.postMinLength', 0);
        $this->exp_for_discussion = $this->settings->get('foskym-custom-levels.expForDiscussion', 0);
        $this->exp_for_like = $this->settings->get('foskym-custom-levels.expForLike', 0);

        
        parent::__construct();
    }

    private function parseValue($value)
    {
        if (strpos($value, ',') > -1) {
            $value = str_replace(' ', '', $value);
            $value = str_replace('[', '', $value);
            $value = str_replace(']', '', $value);
            $value = explode(',', $value);
            $value = random_int($value[0], $value[1]);
        } else {
            $value = $value < 0 ? 0 : floor($value);
        }

        return $value;
    }

    public function handle()
    {
        $progress = $this->output->createProgressBar(User::query()->count());

        User::query()->chunk(100, function (Collection $users) use ($progress) {
            $users->load(['posts' => function (HasMany $relationship) {
                $relationship->where('type', 'comment')
                    ->where('is_private', false);
            }]);

            foreach ($users as $user) {
                $user->exp = 0;
                foreach ($user->posts as $post) {
                    if ($post->number == 1) {
                        $user->exp += $this->parseValue($this->exp_for_discussion);
                    }
                    if (strlen($post->content) >= $this->post_min_length) {
                        $user->exp += $this->parseValue($this->exp_for_post);
                    }
                }

                $user->posts->loadCount('likes');

                $user->exp += $user->posts->sum('likes_count') * $this->parseValue($this->exp_for_like);
                $user->save();

                $progress->advance();
            }
        });

        $this->line('Done.');
    }
}