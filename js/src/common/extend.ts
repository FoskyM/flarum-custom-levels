import Extend from 'flarum/common/extenders';
import User from 'flarum/common/models/User';
import Levels from './models/Levels';

export default [
  new Extend.Model(User)
    .attribute<string>('expLevel')
    .attribute<number>('expPercent')
    .attribute<number>('expTotal')
    .attribute<string>('expNext')
    .attribute<number>('expNextNeed'),
  new Extend.Store()
    .add('levels', Levels)
];