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
    const settings = this.attrs.settings || {};
    let levelText, expText, expFormula, levelFormula;

    levelText =
      settings.levelText ??
      (app.forum.attribute('foskym-custom-levels.levelText') || extractText(app.translator.trans('foskym-custom-levels.lib.defaults.level')));
    expText =
      settings.expText ??
      (app.forum.attribute('foskym-custom-levels.expText') || extractText(app.translator.trans('foskym-custom-levels.lib.defaults.exp')));
    expFormula =
      settings.expFormula ??
      (app.forum.attribute('foskym-custom-levels.expFormula') || extractText(app.translator.trans('foskym-custom-levels.lib.defaults.expFormula')));
    levelFormula =
      settings.levelFormula ??
      (app.forum.attribute('foskym-custom-levels.levelFormula') ||
        extractText(app.translator.trans('foskym-custom-levels.lib.defaults.levelFormula')));

    expFormula = expFormula
      .replace('[commentCount]', user.commentCount())
      .replace('[discussionCount]', user.discussionCount())
      .replace('[money]', 'antoinefr-money' in flarum.extensions ? user.attribute('money') || 0 : 0)
      .replace('[likesReceived]', 'clarkwinkelmann-likes-received' in flarum.extensions ? user.attribute('likesReceived') || 0 : 0)
      .replace('[bestAnswerCount]', 'fof-best-answer' in flarum.extensions ? user.attribute('bestAnswerCount') || 0 : 0);

    let expLevel = 0;
    let expPercent = 0;

    let error = false;

    try {
      let expTotal = Math.floor(eval(expFormula));

      levelFormula = levelFormula.replace('[expTotal]', expTotal);
      if (levelFormula.indexOf('[level]') > -1) {
        let n = 1;
        while (n < eval(levelFormula.replace('[level]', n))) {
          n++;
        }
        expLevel = Math.floor(n - 1);
        expPercent = (eval(levelFormula.replace('[level]', expLevel)) - expLevel) * 100;
        if (expPercent > 100) expPercent = (eval(levelFormula.replace('[level]', expLevel)) - expLevel - 1) * 100;
      } else {
        expLevel = Math.floor(eval(levelFormula));
        expPercent = (eval(levelFormula) - expLevel) * 100;
      }

      expText = expText.replace('[expTotal]', expTotal);
      if (levelText.indexOf('[level]') > -1) levelText = levelText.replace('[level]', expLevel);
      else levelText = levelText + ' ' + expLevel;
    } catch (e) {
      // console.error(e);
      console.log(e);
      error = true;
      expText = extractText(app.translator.trans('foskym-custom-levels.lib.error.calculation'));
    }

    return error ? (
      <div class="CustomLevel-level">{expText}</div>
    ) : (
      <Tooltip text={expText}>
        <div class="CustomLevel-level">
          <span class="CustomLevel-text">{levelText}</span>
          <div class="CustomLevel-bar">
            <div class="CustomLevel-bar-value" style={'width: ' + expPercent + '%;'}></div>
          </div>
        </div>
      </Tooltip>
    );
  }
}
