import { request } from './axios.config';
import { getCookie } from '../utils/utils';
const QI_NIUI_KEY = 'qiniuConfig';

type QiniuConfig = { origin: string; token: string; };

export const common = {
  async uploadByQiniu(file: File | Blob): Promise<string> {
    const qiniuCookie = getCookie(QI_NIUI_KEY); // 有cookie先拿cookie
    let qiniuConfig: QiniuConfig;
    if (qiniuCookie) {
      qiniuConfig = JSON.parse(qiniuCookie);
    } else {
      qiniuConfig = await request.get<QiniuConfig>(
        '/api/upload/visitor/qiniu-token'
      );
      document.cookie = `${QI_NIUI_KEY}=${JSON.stringify(
        qiniuConfig
      )}; max-age=540;`; // 设置十分钟有效期
    }
    const { token, origin } = qiniuConfig;
    const data = new FormData();
    data.append('file', file);
    data.append('token', token);
    const res = await request.post<{ key: string; }>(
      'http://upload.qiniu.com',
      data
    );
    return origin + '/' + res.key;
  },
  getMenu(): Promise<IAppMenuItem[]> {
    return Promise.resolve([
      {
        name: '项目管理',
        icon: 'bar-chart',
        isOpen: true,
        children: [
          {
            name: '项目列表',
            url: '/'
          },
          {
            name: '构建列表',
            url: '/project/build'
          },
          {
            name: 'ssh配置',
            url: '/project/ssh'
          }

        ]
      }
    ]);
  }
};

export interface IAppMenuItem {
  name: string;
  url?: string;
  icon: string;
  isOpen?: boolean;
  children: IAppSubMenuItem[];
}

export interface IAppSubMenuItem {
  name: string;
  url: string;
  isOpen?: boolean;
}
