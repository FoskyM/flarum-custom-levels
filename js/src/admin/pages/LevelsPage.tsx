import app from 'flarum/admin/app';
import Page from 'flarum/common/components/Page';
import Button from 'flarum/common/components/Button';
import EditLevelModal from '../components/EditLevelModal';
import type Mithril from 'mithril';
import extractText from 'flarum/common/utils/extractText';

export default class LevelsPage extends Page {
  translationPrefix = 'foskym-custom-levels.admin.levels.';
  levels: any = [];

  oninit(vnode: Mithril.Vnode) {
    super.oninit(vnode);

    app.store.find('levels').then(r => {
      this.levels = r;
      m.redraw();
    });
  }

  view() {
    return (
      <div class={"CustomLevels-levelsPage"}>
        {
          m('.Form-group', [
            m('table', [
              m('thead', m('tr', [
                ['name', 'min_exp_required'].map(key => m('th', app.translator.trans(this.translationPrefix + key))),
                m('th'),
              ])),
              m('tbody', [
                this.levels.map((level: any, index: number) => m('tr', [
                  ['name', 'min_exp_required'].map(key =>
                    m('td', level[key]())
                  ),
                  m('td', [
                    Button.component({
                      className: 'Button Button--icon',
                      icon: 'fas fa-edit',
                      onclick: () => this.showEditModal(level),
                    }),
                    Button.component({
                      className: 'Button Button--icon',
                      icon: 'fas fa-times',
                      onclick: () => {
                        if (confirm(extractText(app.translator.trans(this.translationPrefix + 'delete_confirmation')))) {
                          level.delete();
                          this.levels.splice(index, 1);
                        }
                      },
                    }),
                  ]),
                ])),
                m('tr', m('td', {
                  colspan: 2,
                }, Button.component({
                  className: 'Button Button--block',
                  onclick: () => {
                    app.store.createRecord('levels').save({
                      name: this.levels.length,
                      min_exp_required: 0
                    }).then(level => {
                      this.levels.push(level);
                      this.showEditModal(level);
                    });
                  },
                }, app.translator.trans(this.translationPrefix + 'add_button')))),
              ]),
            ]),
          ])
        }
      </div>
    );
  }

  showEditModal(level: any) {
    app.modal.show(EditLevelModal, { level: level });
  }
}
