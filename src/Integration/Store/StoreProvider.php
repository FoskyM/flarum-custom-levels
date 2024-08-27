<?php

/*
 * This file is part of foskym/flarum-custom-levels.
 *
 * Copyright (c) 2024 FoskyM.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace FoskyM\CustomLevels\Integration\Store;

use Flarum\Discussion\Discussion;
use Flarum\User\User;
use Illuminate\Events\Dispatcher;
use Xypp\Store\AbstractStoreProvider;
use Xypp\Store\Context\PurchaseContext;
use Xypp\Store\Context\UseContext;
use Xypp\Store\PurchaseHistory;
use Xypp\Store\StoreItem;
use Carbon\Carbon;
use Xypp\Store\Context\ExpireContext;
use FoskyM\CustomLevels\Event\ExpUpdated;

class StoreProvider extends AbstractStoreProvider
{
    public $name = 'exp';
    private Dispatcher $dispatcher;
    public function __construct(Dispatcher $dispatcher)
    {
        $this->dispatcher = $dispatcher;
    }

    public function expire(PurchaseHistory $item, ExpireContext $context): bool
    {
        return true;
    }
    public function purchase(StoreItem $item, User $user, PurchaseHistory|null $old = null, PurchaseContext $context): array|bool|string
    {
        $exp = $item->use_cnt;
        $user->lockForUpdate()->find($user->id)->increment('exp', $exp);
        $this->dispatcher->dispatch(new ExpUpdated($user, $exp, 'store_purchase'));
        
        return 'same_as_use_cnt';
    }
}