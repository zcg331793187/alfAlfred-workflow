import {CnpmApi} from './cnpmApi';
import {RunoobApi} from './runoobApi';
import {NpmApi} from './npmApi';

const _apis = [CnpmApi, RunoobApi, NpmApi];
export const apis = _apis.reduce((hash: any, item: any) => {
    hash[item.name] = item;
    return hash;
}, {});
