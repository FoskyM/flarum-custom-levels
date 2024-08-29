<?php

/*
 * This file is part of foskym/flarum-custom-levels.
 *
 * Copyright (c) 2024 FoskyM.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */
namespace FoskyM\CustomLevels\Listeners;

use Illuminate\Support\Arr;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Events\Dispatcher;
use Flarum\User\User;
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

class GiveExp
{
    protected SettingsRepositoryInterface $settings;
    protected Dispatcher $events;
    protected $exp_for_post;
    protected int $post_min_length;
    protected int $post_max_times;
    protected $exp_for_discussion;
    protected int $discussion_max_times;
    protected $exp_for_like;
    protected int $auto_remove;
    protected bool $cascade_remove;

    public function __construct(SettingsRepositoryInterface $settings, Dispatcher $events)
    {
        $this->settings = $settings;
        $this->events = $events;

        $this->exp_for_post = $this->settings->get('foskym-custom-levels.expForPost', 0);
        $this->post_min_length = (int) $this->settings->get('foskym-custom-levels.postMinLength', 0);
        $this->post_max_times = (int) $this->settings->get('foskym-custom-levels.postMaxTimes', 0);
        $this->exp_for_discussion = $this->settings->get('foskym-custom-levels.expForDiscussion', 0);
        $this->discussion_max_times = (int) $this->settings->get('foskym-custom-levels.discussionMaxTimes', 0);
        $this->exp_for_like = $this->settings->get('foskym-custom-levels.expForLike', 0);
        $this->auto_remove = (int) $this->settings->get('foskym-custom-levels.autoRemove', 1);
        $this->cascade_remove = (bool) $this->settings->get('foskym-custom-levels.cascadeRemove', false);

        $this->exp_for_post = $this->parseValue($this->exp_for_post);
        $this->exp_for_discussion = $this->parseValue($this->exp_for_discussion);
        $this->exp_for_like = $this->parseValue($this->exp_for_like);
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

    public function giveExp(?User $user, int $exp, string $type = '', array $relationship = []): bool
    {
        if ($exp == 0) {
            return false;
        }
        if (!is_null($user)) {
            $user->exp += $exp;
            $user->save();

            $this->events->dispatch(new ExpUpdated($user, $exp, $type, $relationship));
            return true;
        }

        return false;
    }

    public function postWasPosted(Posted $event): void
    {
        if (
            $event->post->number > 1
            && strlen($event->post->content) >= $this->post_min_length
        ) {
            $type = 'post_posted';
            $relationship = ['discussion_id' => $event->post->discussion_id, 'post_number' => $event->post->number, 'post_id' => $event->post->id];
            $this->giveExp($event->actor, $this->exp_for_post, $type, $relationship);
        }
    }

    public function postWasRestored(PostRestored $event): void
    {
        if (
            $this->auto_remove == AutoRemoveEnum::HIDDEN
            && $event->post->type == 'comment'
            && strlen($event->post->content) >= $this->post_min_length
        ) {
            $type = 'post_restored';
            $relationship = ['discussion_id' => $event->post->discussion_id, 'post_number' => $event->post->number, 'post_id' => $event->post->id];
            $this->giveExp($event->post->user, $this->exp_for_post, $type, $relationship);
        }
    }

    public function postWasHidden(PostHidden $event): void
    {
        if (
            $this->auto_remove == AutoRemoveEnum::HIDDEN
            && $event->post->type == 'comment'
            && strlen($event->post->content) >= $this->post_min_length
        ) {
            $type = 'post_hidden';
            $relationship = ['discussion_id' => $event->post->discussion_id, 'post_number' => $event->post->number, 'post_id' => $event->post->id];
            $this->giveExp($event->post->user, -1 * $this->exp_for_post, $type, $relationship);
        }
    }

    public function postWasDeleted(PostDeleted $event): void
    {
        if (
            $this->auto_remove == AutoRemoveEnum::DELETED
            && $event->post->type == 'comment'
            && strlen($event->post->content) >= $this->post_min_length
        ) {
            $type = 'post_deleted';
            $relationship = ['discussion_id' => $event->post->discussion_id, 'post_number' => $event->post->number, 'post_id' => $event->post->id];
            $this->giveExp($event->post->user, -1 * $this->exp_for_post, $type, $relationship);
        }
    }

    public function discussionWasStarted(Started $event): void
    {
        $type = 'discussion_started';
        $relationship = ['discussion_id' => $event->discussion->id];
        $this->giveExp($event->actor, $this->exp_for_discussion, $type, $relationship);
    }

    public function discussionWasRestored(DiscussionRestored $event): void
    {
        if ($this->auto_remove == AutoRemoveEnum::HIDDEN) {
            $type = 'discussion_restored';
            $relationship = ['discussion_id' => $event->discussion->id];
            $this->giveExp($event->discussion->user, $this->exp_for_discussion, $type, $relationship);

            $this->discussionCascadePosts($event->discussion, 1);
        }
    }

    public function discussionWasHidden(DiscussionHidden $event): void
    {
        if ($this->auto_remove == AutoRemoveEnum::HIDDEN) {
            $type = 'discussion_hidden';
            $relationship = ['discussion_id' => $event->discussion->id];
            $this->giveExp($event->discussion->user, -$this->exp_for_discussion, $type, $relationship);

            $this->discussionCascadePosts($event->discussion, -1);
        }
    }

    public function discussionWasDeleted(DiscussionDeleted $event): void
    {
        if ($this->auto_remove == AutoRemoveEnum::DELETED) {
            $type = 'discussion_deleted';
            $relationship = ['discussion_id' => $event->discussion->id];
            $this->giveExp($event->discussion->user, -$this->exp_for_discussion, $type, $relationship);

            $this->discussionCascadePosts($event->discussion, -1);
        }
    }

    protected function discussionCascadePosts(Discussion $discussion, int $multiply): void
    {
        if ($this->cascade_remove) {
            foreach ($discussion->posts as $post) {
                if (
                    $post->type == 'comment'
                    && strlen($post->content) >= $this->post_min_length
                    && $post->number > 1
                    && is_null($post->hidden_at)
                ) {
                    $type = 'comment_deleted_in_deleted_discussion';
                    $relationship = ['post_id' => $post->id, 'discussion_id' => $discussion->id];
                    $this->giveExp($post->user, $multiply * $this->exp_for_post, $type, $relationship);
                }
            }
        }
    }

    public function userWillBeSaved(Saving $event): void
    {
        $attributes = Arr::get($event->data, 'attributes', []);

        if (array_key_exists('exp', $attributes)) {
            $user = $event->user;
            $actor = $event->actor;
            $actor->assertCan('edit_exp', $user);
            $exp = (int) $attributes['exp'] - $user->exp;
            $user->exp = (int) $attributes['exp'];
            $type = 'admin_edit';
            $relationship = ['actor_id' => $actor->id];
            $this->events->dispatch(new ExpUpdated($user, $exp, $type, $relationship));
        }
    }

    public function postWasLiked(PostWasLiked $event): void
    {
        $type = 'post_liked';
        $relationship = ['discussion_id' => $event->post->discussion_id, 'post_number' => $event->post->number, 'post_id' => $event->post->id, 'user_id' => $event->user->id];
        $this->giveExp($event->post->user, $this->exp_for_like, $type, $relationship);
    }

    public function postWasUnliked(PostWasUnliked $event): void
    {
        $type = 'post_unliked';
        $relationship = ['discussion_id' => $event->post->discussion_id, 'post_number' => $event->post->number, 'post_id' => $event->post->id, 'user_id' => $event->user->id];
        $this->giveExp($event->post->user, -1 * $this->exp_for_like, $type, $relationship);
    }
}