<?php

namespace FoskyM\CustomLevels\Api\Serializer;

use Flarum\Api\Serializer\AbstractSerializer;
use FoskyM\CustomLevels\Model\ExpLog;
use InvalidArgumentException;

class ExpLogSerializer extends AbstractSerializer
{
    protected $type = 'exp-logs';

    protected function getDefaultAttributes($model)
    {
        if (!($model instanceof ExpLog)) {
            throw new InvalidArgumentException(
                get_class($this) . ' can only serialize instances of ' . ExpLog::class
            );
        }

        // See https://docs.flarum.org/extend/api.html#serializers for more information.

        return [
            "id" => $model->id,
            "user_id" => $model->user_id,
            "exp" => $model->exp,
            "old_exp" => $model->old_exp,
            "new_exp" => $model->new_exp,
            "relationship" => $model->relationship,
            "created_at" => $this->formatDate($model->created_at),
        ];
    }
}
