import app from 'flarum/forum/app';
import UserPage from 'flarum/forum/components/UserPage';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import Placeholder from 'flarum/common/components/Placeholder';
import Button from 'flarum/common/components/Button';
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

    return (
      <div className="ExpLogPage">
        <ul className="ExpLogRecords">
          {this.records.map((record) => (
            <li className="ExpLogRecord">
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
