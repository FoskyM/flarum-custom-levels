<?php

namespace FoskyM\CustomLevels\Api\Controller;

use Flarum\Api\Controller\AbstractDeleteController;
use Flarum\Http\RequestUtil;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use FoskyM\CustomLevels\Model\Level;
use FoskyM\CustomLevels\Api\Serializer\LevelSerializer;

class DeleteLevelController extends AbstractDeleteController
{
    public $serializer = LevelSerializer::class;
    protected function delete(ServerRequestInterface $request)
    {
        $id = Arr::get($request->getQueryParams(), 'id');
        RequestUtil::getActor($request)
            ->assertAdmin();

        $level = Level::find($id);

        $level->delete();
    }
}
