import IframeHandler from './iframe-handler';
import { DEFAULT_TIMEOUT } from './constants';

export default class SilentAuthenticationHandler {
  constructor({ authenticationUrl, timeout }) {
    this.authenticationUrl = authenticationUrl;
    this.timeout = timeout || DEFAULT_TIMEOUT;
  }

  login = callback => {
    this.handler = new IframeHandler({
      url: this.authenticationUrl,
      callback: this.getCallbackHandler(callback),
      timeout: this.timeout,
      eventValidator: this.getEventValidator(),
      timeoutCallback: () => {
        callback(
          null,
          '#error=timeout&error_description=Timeout+during+authentication+renew.'
        );
      },
    });

    this.handler.init();
  };

  getEventValidator = () => ({
    isValid: eventData => {
      switch (eventData.event.type) {
        case 'load':
          if (
            eventData.sourceObject.contentWindow.location.protocol === 'about:'
          ) {
            // Chrome is automatically loading the about:blank page, we ignore this.
            return false;
          }
        // Fall through to default
        default:
          return true;
      }
    },
  });

  getCallbackHandler = callback => eventData => {
    const callbackValue = eventData.sourceObject.contentWindow.location.hash;
    callback(null, callbackValue);
  };
}
