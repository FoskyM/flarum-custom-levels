import app from 'flarum/admin/app';
import {extend, override} from 'flarum/extend';
import SettingsPage from './components/SettingsPage';

app.initializers.add('foskym/flarum-custom-levels', () => {
  app.extensionData.for('foskym-custom-levels')
    .registerPage(SettingsPage);
});
