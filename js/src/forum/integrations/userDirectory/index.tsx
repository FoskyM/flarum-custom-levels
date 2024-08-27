import { extend, override } from 'flarum/common/extend';
import ForumApplication from 'flarum/forum/ForumApplication';
import extractText from 'flarum/common/utils/extractText';

export default function userDirectry(app: ForumApplication) {
  const UserDirectoryState = flarum.extensions['fof-user-directory']?.UserDirectoryState as any;
  override(UserDirectoryState.prototype, 'sortMap', function (original) {
    const map = original();
    map['most_exp'] = '-exp';
    map['least_exp'] = 'exp';
    return map;
  });
}