<?php

namespace FoskyM\CustomLevels\Api\Controller;

use Flarum\Api\Controller\AbstractListController;
use Flarum\Http\RequestUtil;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use FoskyM\CustomLevels\Model\Level;
use FoskyM\CustomLevels\Api\Serializer\LevelSerializer;

class ListLevelsController extends AbstractListController
{
    public $serializer = LevelSerializer::class;
    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertAdmin();

        return Level::all();
    }
}
