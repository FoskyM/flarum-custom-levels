import Model from 'flarum/common/Model';

export default class ExpLogs extends Model {
  user_id = Model.attribute<number>('user_id');
  exp = Model.attribute<number>('exp');
  type = Model.attribute<string>('type');
  relationship = Model.attribute<object>('relationship');
  created_at = Model.attribute<string>('created_at');
}