import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import PostUser from 'flarum/forum/components/PostUser';
import UserCard from 'flarum/forum/components/UserCard';
import CommentPost from 'flarum/forum/components/CommentPost';
import Post from 'flarum/common/models/Post';
import LevelBar from '../common/components/LevelBar';

app.initializers.add('foskym/flarum-custom-levels', () => {
  extend(PostUser.prototype, 'view', function (view) {
    const user = this.attrs.post.user();
    if (!user) return;
    view.children.push(LevelBar.component({ user }));
  });

  extend(CommentPost.prototype, 'headerItems', function (items) {
    const user = this.attrs.post.user();
    if (!user) return;
    items.add('custom-levels', LevelBar.component({ user: user }), 10);
  });

  extend(UserCard.prototype, 'infoItems', function (items) {
    const user = this.attrs.user;
    if (!user) return;
    items.add('custom-levels', LevelBar.component({ user: user }), 50);
  });
});
