<?php

namespace FoskyM\CustomLevels\Api\Serializer;

use Flarum\Api\Serializer\AbstractSerializer;
use FoskyM\CustomLevels\Model\Level;
use InvalidArgumentException;

class LevelSerializer extends AbstractSerializer
{
    protected $type = 'levels';

    protected function getDefaultAttributes($model)
    {
        if (!($model instanceof Level)) {
            throw new InvalidArgumentException(
                get_class($this) . ' can only serialize instances of ' . Level::class
            );
        }

        // See https://docs.flarum.org/extend/api.html#serializers for more information.

        return [
            "id" => $model->id,
            "name" => $model->name,
            "min_exp_required" => $model->min_exp_required,
        ];
    }
}
