import app from 'flarum/admin/app';
import ExtensionPage from 'flarum/admin/components/ExtensionPage';
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

export default class SettingsPage extends ExtensionPage {
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

  content() {
    return (
      <div className="ExtensionPage-settings">
        <div className="container">
          <div className="Form">
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

            <div className="Form-group">
              <label>{app.translator.trans('foskym-custom-levels.admin.settings.expFormula')}</label>
              <div class="helpText">{app.translator.trans('foskym-custom-levels.admin.settings.expFormulaDesc1')}</div>
              <div class="helpText">{app.translator.trans('foskym-custom-levels.admin.settings.expFormulaDesc2')}</div>
              <div class="helpText">{app.translator.trans('foskym-custom-levels.admin.settings.expFormulaDesc3')}</div>
              <textarea
                rows={3}
                style="max-width: 400px;"
                className="FormControl"
                bidi={this.setting('foskym-custom-levels.expFormula')}
                placeholder={app.translator.trans('foskym-custom-levels.lib.defaults.expFormula')}
              />
            </div>

            <div className="Form-group">
              <label>{app.translator.trans('foskym-custom-levels.admin.settings.levelFormula')}</label>
              <div class="helpText">{app.translator.trans('foskym-custom-levels.admin.settings.levelFormulaDesc')}</div>
              <input
                type="text"
                className="FormControl"
                bidi={this.setting('foskym-custom-levels.levelFormula')}
                placeholder={app.translator.trans('foskym-custom-levels.lib.defaults.levelFormula')}
              />
            </div>

            <div className="Form-group">
              <div class="helpText">{app.translator.trans('foskym-custom-levels.admin.settings.roundDesc')}</div>
              <Switch
                state={!!this.setting('foskym-custom-levels.round')() && this.setting('foskym-custom-levels.round')() !== '0'}
                onchange={this.setting('foskym-custom-levels.round')}
              >
                {app.translator.trans('foskym-custom-levels.admin.settings.round')}
              </Switch>
            </div>

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
