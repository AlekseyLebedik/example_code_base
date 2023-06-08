/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
// eslint-disable-next-line no-var
var HEADERS_TO_STRIP_LOWERCASE = ['content-security-policy', 'x-frame-options'];

// eslint-disable-next-line no-undef
chrome.webRequest.onHeadersReceived.addListener(
  function (details) {
    return {
      responseHeaders: details.responseHeaders.filter(function (header) {
        return (
          HEADERS_TO_STRIP_LOWERCASE.indexOf(header.name.toLowerCase()) < 0
        );
      }),
    };
  },
  {
    urls: ['<all_urls>'],
  },
  ['blocking', 'responseHeaders']
);
