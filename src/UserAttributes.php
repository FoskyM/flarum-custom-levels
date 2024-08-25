<?php

namespace FoskyM\CustomLevels;

use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\Extension\ExtensionManager;
use Flarum\User\User;
use Flarum\Api\Serializer\UserSerializer;
use NXP\MathExecutor;

class UserAttributes
{
    protected $settings;
    protected $extensionManager;
    protected $executor;

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

        $executor = new MathExecutor();

        try {
            $expFormula = $this->settings->get('foskym-custom-levels.expFormula');
            $levelFormula = $this->settings->get('foskym-custom-levels.levelFormula');

            if (!$expFormula || !$levelFormula) {
                throw new \Exception('Formula settings are missing.');
            }

            $discussionCount = $user->discussion_count ?? 0;
            $commentCount = $user->comment_count ?? 0;
            $money = $this->extensionManager->isEnabled('antoinefr-money') ? ($user->money ?? 0) : 0;
            $likesReceived = $this->extensionManager->isEnabled('clarkwinkelmann-likes-received') ? ($user->clarkwinkelmann_likes_received_count ?? 0) : 0;
            $bestAnswerCount = $this->extensionManager->isEnabled('fof-best-answer') ? ($user->best_answer_count ?? 0) : 0;

            $expFormula = str_replace('[discussionCount]', $discussionCount, $expFormula);
            $expFormula = str_replace('[commentCount]', $commentCount, $expFormula);
            $expFormula = str_replace('[money]', $money, $expFormula);
            $expFormula = str_replace('[likesReceived]', $likesReceived, $expFormula);
            $expFormula = str_replace('[bestAnswerCount]', $bestAnswerCount, $expFormula);

            $expTotal = $executor->execute($expFormula);

            $levelFormula = str_replace('[expTotal]', $expTotal, $levelFormula);

            $expLevel = $executor->execute($levelFormula);

            $expPercent = ($expLevel - floor($expLevel)) * 100;
            $expLevel = floor($expLevel);

        } catch (\Exception $e) {
            $expLevel = -1;
            $expTotal = -1;
            $expPercent = -1;
        }

        $attributes += [
            'expLevel' => $expLevel,
            'expTotal' => $expTotal,
            'expPercent' => $expPercent,
        ];

        return $attributes;
    }
}