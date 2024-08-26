import app from 'flarum/admin/app';
import Modal from 'flarum/common/components/Modal';
import Button from 'flarum/common/components/Button';
import Stream from 'flarum/common/utils/Stream';
import type Mithril from 'mithril';

export default class EditLevelModal extends Modal {
  level: any;
  fields: any[] = [];
  values: any;
  loading: boolean = false;
  oninit(vnode: Mithril.Vnode) {
    super.oninit(vnode);

    this.level = this.attrs.level;
    this.fields = [
      'name',

      'min_exp_required',
    ];

    this.values = this.fields.reduce((values, key) => {
      values[key] = Stream(this.level[key]() || '');
      return values;
    }, {});
  }

  className() {
    return 'EditLevelModal Modal--large';
  }

  title() {
    return app.translator.trans('foskym-custom-levels.admin.levels.edit_level');
  }

  content() {
    return (
      <div className="Modal-body">
        <form onsubmit={this.onsubmit.bind(this)}>
          <div className="CustomLevels-Columns">
            <div className="CustomLevels-Column">
              {this.fields.slice(0, parseInt((this.fields.length / 2).toFixed(0))).map(key =>
                <div className="Form-group">
                  <label>{app.translator.trans('foskym-custom-levels.admin.levels.' + key)}</label>
                  <input className="FormControl" bidi={this.values[key]} />
                </div>
              )}
            </div>
            <div className="CustomLevels-Column">
              {this.fields.slice(parseInt((this.fields.length / 2).toFixed(0)), this.fields.length).map(key =>
                <div className="Form-group">
                  <label>{app.translator.trans('foskym-custom-levels.admin.levels.' + key)}</label>
                  <input className="FormControl" bidi={this.values[key]} />
                </div>
              )}
            </div>
          </div>

          <div className="Form-group">
            {Button.component({
              type: 'submit',
              className: 'Button Button--primary Button--block EditLevelModal-save',
              loading: this.loading,
            }, app.translator.trans('core.admin.settings.submit_button'))}
          </div>
        </form>
      </div>
    );
  }

  onsubmit(e: SubmitEvent) {
    e.preventDefault();

    this.loading = true;

    const levelData = this.fields.reduce((data, key) => {
      data[key] = this.values[key]();
      return data;
    }, {});

    this.level.save(levelData).then(() => {
      this.loading = false;
      m.redraw();
      this.hide();
    });
  }
}
