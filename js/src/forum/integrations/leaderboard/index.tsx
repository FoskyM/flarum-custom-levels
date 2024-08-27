import { extend, override } from 'flarum/common/extend';
import ForumApplication from 'flarum/forum/ForumApplication';
import extractText from 'flarum/common/utils/extractText';

export default function leaderboard(app: ForumApplication) {
  const LeaderBoardState = flarum.extensions['nodeloc-leaderboard']?.LeaderBoardState as any;
  override(LeaderBoardState.prototype, 'sortMap', function (original) {
    const map = original();
    map['most_exp'] = '-exp';
    map['least_exp'] = 'exp';
    return map;
  });

  const components = flarum.extensions['nodeloc-leaderboard']?.components as any;

  if (!components) return;

  const LeaderBoardUserCard = components?.LeaderBoardUserCard as any;
  override(LeaderBoardUserCard.prototype, 'view', function (original) {
    const user = this.attrs.user;
    const sort = this.attrs.params.sort;
    if (sort === 'most_exp' || sort === 'least_exp') {
      this.attrs.params.sort = 'exp';
    }
    return original();
  });

  const SmallUserCard = components?.SmallUserCard as any;
  override(SmallUserCard.prototype, 'view', function (original) {
    const user = this.attrs.user;
    const sort = this.attrs.params.sort;
    if (sort === 'most_exp' || sort === 'least_exp') {
      this.attrs.params.sort = 'exp';
    }
    return original();
  });
}