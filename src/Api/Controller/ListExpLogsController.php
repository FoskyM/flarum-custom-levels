<?php

namespace FoskyM\CustomLevels\Api\Controller;

use Flarum\Api\Controller\AbstractListController;
use Flarum\Http\RequestUtil;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use FoskyM\CustomLevels\Model\ExpLog;
use FoskyM\CustomLevels\Api\Serializer\ExpLogSerializer;

class ListExpLogsController extends AbstractListController
{
    public $serializer = ExpLogSerializer::class;
    protected function data(ServerRequestInterface $request, Document $document)
    {
        $page = Arr::get($request->getQueryParams(), 'page', 0);

		$actor = RequestUtil::getActor($request);
		$actor->assertRegistered();

		$pageSize = 10;
		$skip = $page * $pageSize;
		$records = ExpLog::where('user_id', $actor->id)
			->orderBy('id', 'desc')
			->skip($skip)
			->take($pageSize)
			->get();

		return $records;
    }
}
