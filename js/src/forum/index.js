import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import UserPage from 'flarum/forum/components/UserPage';
import PostUser from 'flarum/forum/components/PostUser';
import UserCard from 'flarum/forum/components/UserCard';
import CommentPost from 'flarum/forum/components/CommentPost';
import Post from 'flarum/common/models/Post';
import LinkButton from 'flarum/common/components/LinkButton';
import NotificationGrid from 'flarum/forum/components/NotificationGrid';
import LevelBar from '../common/components/LevelBar';
import ExpLogPage from './components/ExpLogPage';
import LevelUpdatedNotification from './components/LevelUpdatedNotification';

import integrations from './integrations';

app.initializers.add('foskym/flarum-custom-levels', () => {
  integrations();
  app.notificationComponents.levelUpdated = LevelUpdatedNotification;

  extend(NotificationGrid.prototype, 'notificationTypes', function (items) {
    items.add('levelUpdated', {
      name: 'levelUpdated',
      icon: 'fas fa-level-up-alt',
      label: app.translator.trans('foskym-custom-levels.forum.settings.notify_level_updated'),
    });
  });

  app.routes['user.expLogs'] = {
    path: '/u/:username/expLogs',
    component: ExpLogPage,
  };

  extend(UserPage.prototype, 'navItems', function (items) {
    if (app.session.user && app.session.user.id() === this.user.id()) {
      items.add(
        'expLogs',
        LinkButton.component(
          {
            href: app.route('user.expLogs', { username: this.user.username() }),
            icon: 'fas fa-level-up-alt',
          },
          [app.translator.trans('foskym-custom-levels.forum.label.exp_logs')]
        )
      );
    }
  });

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
