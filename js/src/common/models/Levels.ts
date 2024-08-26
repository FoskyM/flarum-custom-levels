import Model from 'flarum/common/Model';

export default class Levels extends Model {
  name = Model.attribute<string>('name');
  min_exp_required = Model.attribute<number>('min_exp_required');
}