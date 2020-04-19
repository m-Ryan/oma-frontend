import qs from 'qs';
import { BASE_NAME } from '@/constants';
import dayjs from 'dayjs';

export function getLocationParamValue(key: string): string | undefined {
  return qs.parse(window.location.search.replace('?', ''))[key];
}

export function getPublishPath() {
  return window.location.origin + '/' + BASE_NAME;
}

export function getCookie(key: string) {
  let value = '';
  document.cookie.split(';').forEach(item => {
    const name = item.split('=')[0];
    if (name.trim() === key) {
      value = item.replace(`${name}=`, '');
    }
  });
  return value;
}


export function getFormatDate(timeStamp: number, format: string = 'YYYY-MM-DD') {
  return dayjs(timeStamp * 1000).format(format);
}