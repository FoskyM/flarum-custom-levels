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
    let levelText, expText, expTooltip;

    levelText = app.forum.attribute('foskym-custom-levels.levelText') || extractText(app.translator.trans('foskym-custom-levels.lib.defaults.level'));
    expText = app.forum.attribute('foskym-custom-levels.expText') || extractText(app.translator.trans('foskym-custom-levels.lib.defaults.exp'));
    expTooltip = app.forum.attribute('foskym-custom-levels.expTooltip') || extractText(app.translator.trans('foskym-custom-levels.lib.defaults.tooltip'));

    if (
      user.expTotal() < 0 ||
      user.expPercent() < 0 ||
      user.expLevel() < 0
    ) {
      error = true;
      expText = extractText(app.translator.trans('foskym-custom-levels.lib.error.calculation'));
    } else {
      expTooltip = expTooltip.replace('[expTotal]', user.expTotal());
      expTooltip = expTooltip.replace('[expPercent]', user.expPercent());
      expTooltip = expTooltip.replace('[nextLevel]', user.expNext());
      expTooltip = expTooltip.replace('[expToNextLevel]', user.expNextNeed());

      if (expText.indexOf('[expTotal]') > -1) expText = expText.replace('[expTotal]', user.expTotal());
      else expText = user.expTotal() + ' ' + expText;
      
      if (levelText.indexOf('[level]') > -1) levelText = levelText.replace('[level]', user.expLevel());
      else levelText = levelText + ' ' + user.expLevel();
    }

    return error ? (
      <div class="CustomLevel-level">{expText}</div>
    ) : (
      <Tooltip text={expTooltip}>
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
