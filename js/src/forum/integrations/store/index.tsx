import { extend, override } from 'flarum/common/extend';
import ForumApplication from 'flarum/forum/ForumApplication';
import Store from './StoreHelper';
import extractText from 'flarum/common/utils/extractText';
export default function store(app: ForumApplication) {
  Store.addFrontendProviders(
    'exp',
    app.translator.trans('foskym-custom-levels.lib.integrations.store.item_name') as string,
    async function getProviderData(providerDatas, special) {
      providerDatas['same_as_use_cnt'] = extractText(
        app.translator.trans('foskym-custom-levels.lib.integrations.store.provider_data.same_as_use_cnt')
      );
    },
    function createItemShowCase(item, purchase_history) {
      let expText: string =
        app.forum.attribute('foskym-custom-levels.expText') || extractText(app.translator.trans('foskym-custom-levels.lib.defaults.exp'));
      if (expText.indexOf('[expTotal]') > -1) expText = expText.replace('[expTotal]', item?.use_cnt());
      else expText = item?.use_cnt() + ' ' + expText;
      return (
        <div style="text-align:center;">
          <br></br>
          <p>
            <i class="fas fa-level-up-alt"></i>
          </p>
          <p>{expText}</p>
        </div>
      );
    },
    async function (str): Promise<string> {
      return '';
    }
  );
}
