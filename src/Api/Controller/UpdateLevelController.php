<?php

namespace FoskyM\CustomLevels\Api\Controller;

use Flarum\Api\Controller\AbstractShowController;
use Flarum\Http\RequestUtil;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use FoskyM\CustomLevels\Model\Level;
use FoskyM\CustomLevels\Api\Serializer\LevelSerializer;

class UpdateLevelController extends AbstractShowController
{
    public $serializer = LevelSerializer::class;
    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertAdmin();

        $id = Arr::get($request->getQueryParams(), 'id');
        $level = Level::find($id);

        $attributes = Arr::get($request->getParsedBody(), 'data.attributes', []);

        collect(['name', 'min_exp_required'])
            ->each(function (string $attribute) use ($level, $attributes) {
                if (($val = Arr::get($attributes, $attribute)) !== null) {
                    $level->$attribute = $val;
                }
            });

        $level->save();

        return $level;
    }
}
