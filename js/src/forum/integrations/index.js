import app from 'flarum/common/app';
import { extend } from 'flarum/common/extend';
import store from './store';

export default function () {
  if ('xypp-store' in flarum.extensions) {
    store(app);
  }
}
