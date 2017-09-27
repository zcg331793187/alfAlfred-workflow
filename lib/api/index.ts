import {CnpmApi} from './cnpmApi';
import {RunoobApi} from './runoobApi';
import {NpmApi} from './npmApi';
import {BilibiliApi} from './bilibiliApi';
import {AcfunApi} from './acfunApi';



const _apis = [CnpmApi, RunoobApi, NpmApi,BilibiliApi,AcfunApi];
export const apis = _apis.reduce((hash: any, item: any) => {
    hash[item.name] = item;
    return hash;
}, {});
