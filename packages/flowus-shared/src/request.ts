import { HttpClientResponse, request as req, RequestOptions } from 'urllib'

/**
 * 网络请求封装
 * @param url
 * @param reqOpts
 */
export const request = async <T>(
  url: string,
  reqOpts?: RequestOptions,
): Promise<HttpClientResponse<{ code: number; data: T }>> => {
  const opts: RequestOptions = {
    contentType: 'json',
    dataType: 'json',
    headers: {
      'User-Agent': '@flowusx/flowus-client',
      authority: 'flowus.cn',
      app_version_name: '1.51.0',
      ...reqOpts?.headers,
    },
    compressed: true,
    // 超时时间 60s
    timeout: 60000,
    ...reqOpts,
  }
  return req(url, opts)
}
