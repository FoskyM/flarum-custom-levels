import app from 'flarum/admin/app';
import { extend, override } from 'flarum/extend';
import SettingsPage from './components/SettingsPage';

app.initializers.add('foskym/flarum-custom-levels', () => {
  app.extensionData
    .for('foskym-custom-levels')
    .registerPage(SettingsPage)
    .registerSetting(function () {
      return (
        <div className="Form-group">
          <label>{app.translator.trans('foskym-custom-levels.admin.settings.levelText')}</label>
          <div class="helpText">{app.translator.trans('foskym-custom-levels.admin.settings.levelDesc')}</div>
          <input
            type="text"
            className="FormControl"
            bidi={this.setting('foskym-custom-levels.levelText')}
            placeholder={app.translator.trans('foskym-custom-levels.lib.defaults.level')}
          />
        </div>
      );
    })
    .registerSetting(function () {
      return (
        <div className="Form-group">
          <label>{app.translator.trans('foskym-custom-levels.admin.settings.expText')}</label>
          <div class="helpText">{app.translator.trans('foskym-custom-levels.admin.settings.expDesc')}</div>
          <input
            type="text"
            className="FormControl"
            bidi={this.setting('foskym-custom-levels.expText')}
            placeholder={app.translator.trans('foskym-custom-levels.lib.defaults.exp')}
          />
        </div>
      );
    })
    .registerSetting(function () {
      return (
        <div className="Form-group">
          <label>{app.translator.trans('foskym-custom-levels.admin.settings.expForPost')}</label>
          <div class="helpText">{app.translator.trans('foskym-custom-levels.admin.settings.expForPostDesc')}</div>
          <input type="text" className="FormControl" bidi={this.setting('foskym-custom-levels.expForPost')} />
        </div>
      );
    })
    .registerSetting(function () {
      return (
        <div className="Form-group">
          <label>{app.translator.trans('foskym-custom-levels.admin.settings.postMinLength')}</label>
          <input type="number" className="FormControl" bidi={this.setting('foskym-custom-levels.postMinLength')} />
        </div>
      );
    })
    .registerSetting(function () {
      return (
        <div className="Form-group">
          <label>{app.translator.trans('foskym-custom-levels.admin.settings.postMaxTimes')}</label>
          <input type="number" className="FormControl" bidi={this.setting('foskym-custom-levels.postMaxTimes')} />
        </div>
      );
    })
    .registerSetting(function () {
      return (
        <div className="Form-group">
          <label>{app.translator.trans('foskym-custom-levels.admin.settings.expForDiscussion')}</label>
          <div class="helpText">{app.translator.trans('foskym-custom-levels.admin.settings.expForDiscussionDesc')}</div>
          <input type="text" className="FormControl" bidi={this.setting('foskym-custom-levels.expForDiscussion')} />
        </div>
      );
    })
    .registerSetting(function () {
      return (
        <div className="Form-group">
          <label>{app.translator.trans('foskym-custom-levels.admin.settings.discussionMaxTimes')}</label>
          <input type="number" className="FormControl" bidi={this.setting('foskym-custom-levels.discussionMaxTimes')} />
        </div>
      );
    })
    .registerSetting(function () {
      return (
        <div className="Form-group">
          <label>{app.translator.trans('foskym-custom-levels.admin.settings.expForLike')}</label>
          <div class="helpText">{app.translator.trans('foskym-custom-levels.admin.settings.expForLikeDesc')}</div>
          <input type="text" className="FormControl" bidi={this.setting('foskym-custom-levels.expForLike')} />
        </div>
      );
    })
    .registerSetting({
      setting: 'foskym-custom-levels.autoRemove',
      label: app.translator.trans('foskym-custom-levels.admin.settings.autoRemove'),
      type: 'select',
      options: {
        '0': app.translator.trans('foskym-custom-levels.admin.auto_remove.0'),
        '1': app.translator.trans('foskym-custom-levels.admin.auto_remove.1'),
        '2': app.translator.trans('foskym-custom-levels.admin.auto_remove.2'),
      },
      default: '1',
    })
    .registerSetting({
      setting: 'foskym-custom-levels.cascadeRemove',
      label: app.translator.trans('foskym-custom-levels.admin.settings.cascadeRemove'),
      type: 'checkbox',
    });
});
