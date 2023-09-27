import app from 'flarum/forum/app';
import Component from 'flarum/common/Component';
import Tooltip from 'flarum/common/components/Tooltip';

export default class LevelBar extends Component {
  oninit(vnode) {
    super.oninit(vnode);
  }

  view() {
    const user = this.attrs.user;
    const pointsText = app.forum.attribute('foskym-custom-levels.pointsText') || app.translator.trans('foskym-custom-levels.lib.defaults.level');
    let expFormula = app.forum.attribute('foskym-custom-levels.expFormula') || app.translator.trans('foskym-custom-levels.lib.defaults.expFormula');
    let levelFormula = app.forum.attribute('foskym-custom-levels.levelFormula') || app.translator.trans('foskym-custom-levels.lib.defaults.levelFormula');

    expFormula = expFormula
        .replace('[commentCount]', user.commentCount())
        .replace('[discussionCount]', user.discussionCount());
    if (user.money) expFormula = expFormula.replace('[money]', user.money());
    if (user.likesReceived) expFormula = expFormula.replace('[likesReceived]', user.likesReceived());

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
    } else {
        expLevel = Math.floor(eval(levelFormula));
        expPercent = (eval(levelFormula) - expLevel) * 100;
    }


    return (
      <Tooltip text={app.translator.trans('foskym-custom-levels.forum.desc.expText', { expTotal })}>
        <div class="CustomLevel-level">
          <span class="CustomLevel-text">
            <span class="CustomLevel-levelText">{pointsText}</span>
            &nbsp;
            <span class="CustomLevel-levelPoints">{expLevel}</span>
          </span>
          <div class="CustomLevel-bar CustomLevel-bar--empty"></div>
          <div class="CustomLevel-bar" style={'width: ' + expPercent + '%;'}></div>
        </div>
      </Tooltip>
    );
  }
}
