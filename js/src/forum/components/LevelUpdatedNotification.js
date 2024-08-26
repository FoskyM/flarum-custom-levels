import app from 'flarum/forum/app';
import Notification from 'flarum/forum/components/Notification';
import username from 'flarum/common/helpers/username';
import extractText from 'flarum/common/utils/extractText';

export default class LevelUpdatedNotification extends Notification {
  icon() {
    return 'fas fa-level-up-alt';
  }

  href() {
    const notification = this.attrs.notification;
    const user = notification.fromUser();
    return app.route('user.expLogs', { username: user.username() });
  }

  content() {
    const notification = this.attrs.notification;
    const content = notification.content() || {};

    let levelText;

    levelText = app.forum.attribute('foskym-custom-levels.levelText') || extractText(app.translator.trans('foskym-custom-levels.lib.defaults.level'));

    if (levelText.indexOf('[level]') > -1) levelText = levelText.replace('[level]', content.level);
    else levelText = levelText + ' ' + content.level;

    return app.translator.trans('foskym-custom-levels.forum.notifications.level_updated', {
      level: levelText,
    });
  }
}
