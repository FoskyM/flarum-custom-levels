<?php

namespace FoskyM\CustomLevels\Api\Controller;

use Flarum\Api\Controller\AbstractCreateController;
use Flarum\Http\RequestUtil;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use FoskyM\CustomLevels\Model\Level;
use FoskyM\CustomLevels\Api\Serializer\LevelSerializer;

class CreateLevelController extends AbstractCreateController
{
    public $serializer = LevelSerializer::class;
    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertAdmin();

        $attributes = Arr::get($request->getParsedBody(), 'data.attributes');

        if ($level = Level::where('name', Arr::get($attributes, 'name'))->first()) {
            return $level;
        }

        return Level::create([
            'name' => Arr::get($attributes, 'name')
        ]);
    }
}
