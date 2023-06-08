import { DEFAULT_TIMEOUT } from './constants';

export default class IframeHandler {
  constructor({ url, callback, timeout, timeoutCallback, eventValidator }) {
    this.url = url;
    this.callback = callback;
    this.timeout = timeout || DEFAULT_TIMEOUT;
    this.timeoutCallback = timeoutCallback || null;
    this.eventListenerType = 'load';

    // If no event identifier specified, set default
    this.eventValidator = eventValidator || {
      isValid: () => true,
    };

    if (typeof this.callback !== 'function') {
      throw new Error('options.callback must be a function');
    }
  }

  init = () => {
    this.iframe = document.createElement('iframe');
    this.iframe.style.display = 'none';
    this.iframe.addEventListener(
      this.eventListenerType,
      this.eventListener,
      false
    );

    document.body.appendChild(this.iframe);
    this.iframe.src = this.url;
    this.timeoutHandle = setTimeout(this.timeoutHandler, this.timeout);
  };

  eventListener = event => {
    const eventData = { event, sourceObject: this.iframe };
    if (!this.eventValidator.isValid(eventData)) {
      return;
    }

    this.destroy();
    this.callback(eventData);
  };

  timeoutHandler = () => {
    this.destroy();
    if (this.timeoutCallback) {
      this.timeoutCallback();
    }
  };

  destroy = () => {
    clearTimeout(this.timeoutHandle);

    // Schedule it so it runs after the callback
    setTimeout(() => {
      this.iframe.removeEventListener(
        this.eventListenerType,
        this.proxyEventListener,
        false
      );
      document.body.removeChild(this.iframe);
    }, 0);
  };
}
