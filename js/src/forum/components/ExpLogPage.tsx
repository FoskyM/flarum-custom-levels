import app from 'flarum/forum/app';
import UserPage from 'flarum/forum/components/UserPage';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import Placeholder from 'flarum/common/components/Placeholder';
import Button from 'flarum/common/components/Button';
import extractText from 'flarum/common/utils/extractText';
import humanTime from 'flarum/common/utils/humanTime';
import type Mithril from 'mithril';

export default class ExpLogPage extends UserPage {
  records = [];
  loading: boolean = true;
  nomore: boolean = false;
  page: number = 0;

  oninit(vnode: Mithril.Vnode) {
    super.oninit(vnode);
    this.loadUser(m.route.param('username'));
    this.loadRecords();
  }

  loadRecords() {
    app.store.find('exp-logs', { page: this.page }).then((records) => {
      this.records = this.records.concat(records);
      console.log(this.records);
      this.loading = false;
      if (records.length < 10) {
        this.nomore = true;
      }
      m.redraw();
    });
  }

  loadMore() {
    this.page += 1;
    this.loadRecords();
  }

  content() {
    if (this.records.length === 0) {
      return <Placeholder text={app.translator.trans('foskym-custom-levels.forum.log.no_records')} />;
    }

    let levelText: string = '',
      expText: string = '',
      expTooltip: string = '';

    levelText = app.forum.attribute('foskym-custom-levels.levelText') || extractText(app.translator.trans('foskym-custom-levels.lib.defaults.level'));
    expText = app.forum.attribute('foskym-custom-levels.expText') || extractText(app.translator.trans('foskym-custom-levels.lib.defaults.exp'));
    expTooltip =
      app.forum.attribute('foskym-custom-levels.expTooltip') || extractText(app.translator.trans('foskym-custom-levels.lib.defaults.tooltip'));

    return (
      <div className="ExpLogPage">
        <ul className="ExpLogRecords">
          {this.records.map((record) => (
            <li className="ExpLogRecord">
              <h5>
                <span>
                  {(record.exp() > 0 ? '+' : '') +
                    (expText.indexOf('[expTotal]') > -1 ? expText.replace('[expTotal]', record.exp()) : record.exp() + ' ' + expText)}
                </span>

                <span>{humanTime(record.created_at())}</span>
              </h5>
              <p>
                {app.translator.trans('foskym-custom-levels.forum.log.type.' + record.type())}
                <span>
                  {record.relationship().post_id ? (
                    <a href={'/d/' + record.relationship().discussion_id + '/' + record.relationship().post_number} target="_blank">
                      {app.translator.trans('foskym-custom-levels.forum.log.view')}
                    </a>
                  ) : (record.relationship().discussion_id ? (
                    <a href={'/d/' + record.relationship().discussion_id} target="_blank">
                      {app.translator.trans('foskym-custom-levels.forum.log.view')}
                    </a>
                  ) : (record.type() === 'forum_quests' ? (
                    <a href={'/quest_page'} target="_blank">
                      {app.translator.trans('foskym-custom-levels.forum.log.view')}
                    </a>
                  ) : ''))}
                </span>
              </p>
              <hr />
            </li>
          ))}
        </ul>

        {this.loading && <LoadingIndicator display="block" />}

        {!this.loading && !this.nomore && (
          <div style="text-align:center;padding:20px">
            <Button className={'Button Button--primary'} disabled={this.loading} loading={this.loading} onclick={() => this.loadMore()}>
              {app.translator.trans('foskym-custom-levels.forum.log.load_more')}
            </Button>
          </div>
        )}

        {this.nomore && <Placeholder text={app.translator.trans('foskym-custom-levels.forum.log.no_more')} />}
      </div>
    );
  }
}
