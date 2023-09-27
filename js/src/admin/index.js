import app from 'flarum/admin/app';
import {extend, override} from 'flarum/extend';

app.initializers.add('foskym/flarum-custom-levels', () => {
  app.extensionData.for('foskym-custom-levels')
    .registerSetting({
      label: app.translator.trans('foskym-custom-levels.admin.settings.levelText'),
      setting: 'foskym-custom-levels.pointsText',
      placeholder: app.translator.trans('foskym-custom-levels.lib.defaults.level'),
      type: 'text',
    })
    .registerSetting(function () {
      return (
        <div className="Form-group">
          <label>{app.translator.trans('foskym-custom-levels.admin.settings.expFormula')}</label>
          <div class="helpText">{app.translator.trans('foskym-custom-levels.admin.settings.expFormulaDesc1')}</div>
          <div class="helpText">{app.translator.trans('foskym-custom-levels.admin.settings.expFormulaDesc2')}</div>
          <div class="helpText">{app.translator.trans('foskym-custom-levels.admin.settings.expFormulaDesc3')}</div>
          <input type="text" className="FormControl" bidi={this.setting('foskym-custom-levels.expFormula')}/>
        </div>
      );
    })
    .registerSetting(function () {
      return (
        <div className="Form-group">
          <label>{app.translator.trans('foskym-custom-levels.admin.settings.levelFormula')}</label>
          <div class="helpText">{app.translator.trans('foskym-custom-levels.admin.settings.levelFormulaDesc')}</div>
          <input type="text" className="FormControl" bidi={this.setting('foskym-custom-levels.levelFormula')}/>
        </div>
      );
    });
});
