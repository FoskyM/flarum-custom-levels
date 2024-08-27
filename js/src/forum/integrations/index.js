import app from 'flarum/common/app';
import { extend } from 'flarum/common/extend';
import store from './store';
import userDirectry from './userDirectory';
import leaderboard from './leaderboard';

export default function () {
  if ('xypp-store' in flarum.extensions) {
    store(app);
  }
  if ('fof-user-directory' in flarum.extensions) {
    userDirectry(app);
  }
  if ('nodeloc-leaderboard' in flarum.extensions) {
    leaderboard(app);
  }
}
