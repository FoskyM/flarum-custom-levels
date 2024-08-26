<?php

namespace FoskyM\CustomLevels;

use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\Extension\ExtensionManager;
use Flarum\User\User;
use Flarum\Api\Serializer\UserSerializer;
use FoskyM\CustomLevels\Model\Level;

class UserAttributes
{
    protected $settings;
    protected $extensionManager;

    public function __construct(
        SettingsRepositoryInterface $settings,
        ExtensionManager $extensionManager
    ) {
        $this->settings = $settings;
        $this->extensionManager = $extensionManager;
    }

    public function __invoke(UserSerializer $serializer, User $user, array $attributes): array
    {
        $expLevel = 0;
        $expTotal = 0;
        $expPercent = 0;
        $expNext = '';
        $expNextNeed = 0;

        try {
            $expTotal = $user->exp;
            $levels = Level::orderBy('min_exp_required', 'desc')->get();
            $level = $levels->where('min_exp_required', '<=', $expTotal)->sortByDesc('min_exp_required')->first();

            if ($level) {
                $expLevel = $level->name;
            }

            $levelNext = $levels->where('min_exp_required', '>', $expTotal)->sortBy('min_exp_required')->first();

            if ($levelNext) {
                $expPercent = $level->min_exp_required ? round(($expTotal - $level->min_exp_required) / ($levelNext->min_exp_required - $level->min_exp_required) * 100) : 0;
                $expNext = $levelNext->name;
                $expNextNeed = $levelNext->min_exp_required - $expTotal;
            } else {
                $expNext = $levels->first()->name;
                $expNextNeed = $levels->first()->min_exp_required - $expTotal;
                if ($expNextNeed < 0) {
                    $expNextNeed = 0;
                    $expNext = '-';
                    $expPercent = 100;
                }
            }

        } catch (\Exception $e) {
            $expLevel = -1;
            $expTotal = -1;
            $expPercent = -1;
            $expNext = '';
            $expNextNeed = -1;
        }

        $attributes += [
            'expLevel' => $expLevel,
            'expTotal' => $expTotal,
            'expPercent' => $expPercent,
            'expNext' => $expNext,
            'expNextNeed' => $expNextNeed
        ];

        return $attributes;
    }
}