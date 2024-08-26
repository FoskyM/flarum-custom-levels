import app from 'flarum/admin/app';
import Page from 'flarum/common/components/Page';
import AdminPage from 'flarum/admin/components/AdminPage';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import Alert from 'flarum/common/components/Alert';
import Button from 'flarum/common/components/Button';
import Switch from 'flarum/common/components/Switch';
import FieldSet from 'flarum/common/components/FieldSet';
import type { SaveSubmitEvent } from 'flarum/admin/components/AdminPage';
import type { AlertIdentifier } from 'flarum/common/states/AlertManagerState';
import type Mithril from 'mithril';
import icon from 'flarum/common/helpers/icon';
import extractText from 'flarum/common/utils/extractText';
import LevelBar from '../../common/components/LevelBar';
import avatar from 'flarum/common/helpers/avatar';

export default class IndexPage extends AdminPage {
  user = app.session.user;
  oninit(vnode: Mithril.Vnode) {
    super.oninit(vnode);
  }

  refresh() {
    app.store.find('users', app.session.user.id()).then((user) => {
      this.user = user;
      m.redraw();
    });
  }

  header(vnode: Mithril.Vnode) {
    return <></>;
  }

  content() {
    const settings = app.extensionData.getSettings('foskym-custom-levels');

    return (
      <div className="ExtensionPage-settings">
        <div className="">
          <div className="Form">
            {settings!!.map(this.buildSettingComponent.bind(this))}
            <div className="Form-group">
              <label>{app.translator.trans('foskym-custom-levels.admin.preview')}</label>
              <div style="margin-left: 6px">{avatar(this.user)}</div>
              {LevelBar.component({ user: this.user })}
            </div>

            {this.submitButton()}
          </div>
        </div>
      </div>
    );
  }

  saveSettings(e: SaveSubmitEvent) {
    return super.saveSettings(e).then(() => this.refresh());
  }
}
