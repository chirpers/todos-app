import queryString from 'query-string';
import { omitBy, startsWith, isUndefined } from 'lodash';

import config from '../config';

export default async function handledFetch(path, options) {
  const res = await fetch(path, options);
  const contentType = res.headers.get('content-type');
  let content;
  if (startsWith(contentType, 'application/json')) {
    content = await res.json();
  } else {
    content = res.text();
  }

  if(res.status >= 400) {
    const err = new Error('Bad response from server');
    err.status = res.status;
    err.content = content;
    throw err;
  }
  return content;
}

export function apiFetch(path, options = {}) {
  let qs = '';
  const isFormData = options.body instanceof FormData;
  if (typeof options.body === 'object' && !isFormData) {
    options.body = JSON.stringify(options.body);
  }

  if (options.query) {
    const query = omitBy(options.query, isUndefined);
    qs = `?${queryString.stringify(query)}`;
  }
  Object.assign(options, { credentials: 'include' });
  if(!isFormData) {
    options.headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    }
  }
  return handledFetch(`${options.api_url || config.API_URL}${path}${qs}`, options);
}

