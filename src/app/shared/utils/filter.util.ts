import { flatten } from 'q-flat';

export function filter(obj: any, prefix?: string) {
    console.log(flatten(obj));
    let result = "";
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            for (const subKey in obj[key]) {
                if (obj[key].hasOwnProperty(subKey)) {
                    result = result.concat(key + "[" + subKey + "]=" + obj[key][subKey] + "&");
                }
            }
        }
    }
    return result;
}
