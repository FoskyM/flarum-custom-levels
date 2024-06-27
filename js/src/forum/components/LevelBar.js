import app from 'flarum/forum/app';
import Component from 'flarum/common/Component';
import Tooltip from 'flarum/common/components/Tooltip';

export default class LevelBar extends Component {
  oninit(vnode) {
    super.oninit(vnode);
  }

  view() {
    const user = this.attrs.user;
    let levelText = app.forum.attribute('foskym-custom-levels.levelText') || app.translator.trans('foskym-custom-levels.lib.defaults.level')[0];
    let expText = app.forum.attribute('foskym-custom-levels.expText') || app.translator.trans('foskym-custom-levels.lib.defaults.exp')[0];
    let expFormula = app.forum.attribute('foskym-custom-levels.expFormula') || app.translator.trans('foskym-custom-levels.lib.defaults.expFormula')[0];
    let levelFormula = app.forum.attribute('foskym-custom-levels.levelFormula') || app.translator.trans('foskym-custom-levels.lib.defaults.levelFormula')[0];

    expFormula = expFormula
        .replace('[commentCount]', user.commentCount())
        .replace('[discussionCount]', user.discussionCount());
    if ('antoinefr-money' in flarum.extensions)
      expFormula = expFormula.replace('[money]', user.attribute('money') || 0);
    if ('clarkwinkelmann-likes-received' in flarum.extensions)
      expFormula = expFormula.replace('[likesReceived]', user.attribute('likesReceived') || 0);
    if ('fof-best-answer' in flarum.extensions)
      expFormula = expFormula.replace('[bestAnswerCount]', user.attribute('bestAnswerCount') || 0);

    let expTotal = Math.floor(eval(expFormula));
    let expLevel = 0;
    let expPercent = 0;

    levelFormula = levelFormula
        .replace('[expTotal]', expTotal);

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

    return (
      <Tooltip text={expText}>
        <div class="CustomLevel-level">
          <span class="CustomLevel-text">
            {levelText}
          </span>
          <div class="CustomLevel-bar">
            <div class="CustomLevel-bar-value" style={'width: ' + expPercent + '%;'}></div>
          </div>
        </div>
      </Tooltip>
    );
  }
}
