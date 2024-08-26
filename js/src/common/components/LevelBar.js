import app from 'flarum/common/app';
import Component from 'flarum/common/Component';
import Tooltip from 'flarum/common/components/Tooltip';
import extractText from 'flarum/common/utils/extractText';

export default class LevelBar extends Component {
  oninit(vnode) {
    super.oninit(vnode);
  }

  view() {
    const user = this.attrs.user;

    let error = false;
    let levelText, expText;

    levelText = app.forum.attribute('foskym-custom-levels.levelText') || extractText(app.translator.trans('foskym-custom-levels.lib.defaults.level'));
    expText = app.forum.attribute('foskym-custom-levels.expText') || extractText(app.translator.trans('foskym-custom-levels.lib.defaults.exp'));

    if (
      user.expTotal() < 0 ||
      user.expPercent() < 0 ||
      user.expLevel() < 0
    ) {
      error = true;
      expText = extractText(app.translator.trans('foskym-custom-levels.lib.error.calculation'));
    } else {
      expText = expText.replace('[expTotal]', user.expTotal());
      expText = expText.replace('[expPercent]', user.expPercent());
      expText = expText.replace('[nextLevel]', user.expNext());
      expText = expText.replace('[expToNextLevel]', user.expNextNeed());
      
      if (levelText.indexOf('[level]') > -1) levelText = levelText.replace('[level]', user.expLevel());
      else levelText = levelText + ' ' + user.expLevel();
    }

    return error ? (
      <div class="CustomLevel-level">{expText}</div>
    ) : (
      <Tooltip text={expText}>
        <div class="CustomLevel-level">
          <span class="CustomLevel-text">{levelText}</span>
          <div class="CustomLevel-bar">
            <div class="CustomLevel-bar-value" style={'width: ' + user.expPercent() + '%;'}></div>
          </div>
        </div>
      </Tooltip>
    );
  }
}
