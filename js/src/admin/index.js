import app from 'flarum/admin/app';
import {extend, override} from 'flarum/extend';

app.initializers.add('foskym/flarum-custom-levels', () => {
  app.extensionData.for('foskym-custom-levels')
    .registerSetting(function () {
        return (
            <div className="Form-group">
                <label>{app.translator.trans('foskym-custom-levels.admin.settings.levelText')}</label>
                <div class="helpText">{app.translator.trans('foskym-custom-levels.admin.settings.levelDesc')}</div>
                <input type="text" className="FormControl" bidi={this.setting('foskym-custom-levels.levelText')}
                       placeholder={app.translator.trans('foskym-custom-levels.lib.defaults.level')}/>
            </div>
        );
    })
    .registerSetting(function () {
        return (
            <div className="Form-group">
                <label>{app.translator.trans('foskym-custom-levels.admin.settings.expText')}</label>
                <div class="helpText">{app.translator.trans('foskym-custom-levels.admin.settings.expDesc')}</div>
                <input type="text" className="FormControl" bidi={this.setting('foskym-custom-levels.expText')}
                       placeholder={app.translator.trans('foskym-custom-levels.lib.defaults.exp')}/>
            </div>
        );
    })
    .registerSetting(function () {
      return (
        <div className="Form-group">
          <label>{app.translator.trans('foskym-custom-levels.admin.settings.expFormula')}</label>
          <div class="helpText">{app.translator.trans('foskym-custom-levels.admin.settings.expFormulaDesc1')}</div>
          <div class="helpText">{app.translator.trans('foskym-custom-levels.admin.settings.expFormulaDesc2')}</div>
          <div class="helpText">{app.translator.trans('foskym-custom-levels.admin.settings.expFormulaDesc3')}</div>
          <textarea rows={3} style="max-width: 400px;" className="FormControl" bidi={this.setting('foskym-custom-levels.expFormula')}
                 placeholder={app.translator.trans('foskym-custom-levels.lib.defaults.expFormula')}/>
        </div>
      );
    })
    .registerSetting(function () {
      return (
        <div className="Form-group">
          <label>{app.translator.trans('foskym-custom-levels.admin.settings.levelFormula')}</label>
          <div class="helpText">{app.translator.trans('foskym-custom-levels.admin.settings.levelFormulaDesc')}</div>
          <input type="text" className="FormControl" bidi={this.setting('foskym-custom-levels.levelFormula')}
                 placeholder={app.translator.trans('foskym-custom-levels.lib.defaults.levelFormula')}/>
        </div>
      );
    });
});
