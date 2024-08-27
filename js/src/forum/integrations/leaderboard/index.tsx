import { extend, override } from 'flarum/common/extend';
import ForumApplication from 'flarum/forum/ForumApplication';
import extractText from 'flarum/common/utils/extractText';

export default function leaderboard(app: ForumApplication) {
  const LeaderBoardState = flarum.extensions['nodeloc-leaderboard']?.LeaderBoardState as any;
  override(LeaderBoardState.prototype, 'sortMap', function (original) {
    const map = original();
    map['exp'] = '-exp';
    return map;
  });
}