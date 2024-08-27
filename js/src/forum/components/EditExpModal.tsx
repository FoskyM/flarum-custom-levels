import app from 'flarum/forum/app';
import Modal from 'flarum/common/components/Modal';
import Button from 'flarum/common/components/Button';
import Stream from 'flarum/common/utils/Stream';
import extractText from 'flarum/common/utils/extractText';
import type Mithril from 'mithril';

export default class EditExpModal extends Modal {
  oninit(vnode: Mithril.Vnode) {
    super.oninit(vnode);

    this.exp = Stream(this.attrs.user.data.attributes['exp'] || 0);
  }

  className() {
    return 'EditExpModal Modal--small';
  }

  title() {
    return app.translator.trans('foskym-custom-levels.forum.modal.title', { user: this.attrs.user });
  }

  content() {
    let expText: string =
      app.forum.attribute('foskym-custom-levels.expText') || extractText(app.translator.trans('foskym-custom-levels.lib.defaults.exp'));
    if (expText.indexOf('[expTotal]') > -1) expText = expText.replace('[expTotal]', this.attrs.user.data.attributes['exp']);
    else expText = this.attrs.user.data.attributes['exp'] + ' ' + expText;

    return (
      <div className="Modal-body">
        <div className="Form">
          <div className="Form-group">
            <label>
              {app.translator.trans('foskym-custom-levels.forum.modal.current')} {expText}
            </label>
            <input required className="FormControl" type="number" step="1" bidi={this.exp} />
          </div>
          <div className="Form-group">
            {Button.component(
              {
                className: 'Button Button--primary',
                type: 'submit',
                loading: this.loading,
              },
              app.translator.trans('foskym-custom-levels.forum.modal.submit_button')
            )}
          </div>
        </div>
      </div>
    );
  }

  onsubmit(e: SubmitEvent) {
    e.preventDefault();

    this.loading = true;

    this.attrs.user
      .save({ exp: this.exp() }, { errorHandler: this.onerror.bind(this) })
      .then(this.hide.bind(this))
      .catch(() => {
        this.loading = false;
        m.redraw();
      });
  }
}
