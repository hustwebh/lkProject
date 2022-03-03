const CookieUtil = {
  get: (name) => {
    let cookieName = encodeURIComponent(name) + '=',
      cookieStart = document.cookie.indexOf(cookieName),
      cookieValue = null;

    if (cookieStart > -1) {
      let cookieEnd = document.cookie.indexOf(';', cookieStart);

      if (cookieEnd === -1) {
        cookieEnd = document.cookie.length;
      }
      cookieValue = decodeURIComponent(
        document.cookie.substring(cookieStart + cookieName.length, cookieEnd),
      );
    }

    return cookieValue;
  },
  set: (
    name,
    value,
    expires,
    path = '/',
    domain = window.location.hostname,
    secure = false,
  ) => {
    let cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value);

    if (expires instanceof Date) {
      cookieText += '; expires=' + expires.toUTCString();
    }
    if (path) cookieText += '; path=' + path;
    if (domain) cookieText += '; domain=' + domain;
    if (secure) cookieText += '; secure';
    document.cookie = cookieText;
  },
  unset: function (name, path, domain, secure) {
    this.set(name, '', new Date(0), path, domain, secure);
  },
  unsetAll: function () {
    let keys = document.cookie.match(/[^ =;]+(?==)/g);
    keys.forEach((key) => {
      if (/token_?\d*/.test(key)) {
        //匹配token
        this.unset(key);
      } else if (/user_signature/.test(key)) {
        //匹配user_signature
        this.unset(key);
      } else if (/userInfo/.test(key)) {
        //匹配userInfo
        this.unset(key);
      }
    });
  },
};

export default CookieUtil;