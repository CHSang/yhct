import { BROWSER } from "../share/EnumType";

export const isPlatformSupported = () : boolean => {
  return !(isMacintosh() || isWindows());
}

export const isIOSVersion = () => {
  return [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ].includes(navigator.platform)
  || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}

export const getBrowser = () => {
  const ua = navigator.userAgent;

  let browser: BROWSER;
  if (ua.indexOf("Firefox") > -1) {
    browser = BROWSER.FIREFOX;
  } else if (ua.indexOf("SamsungBrowser") > -1) {
    browser = BROWSER.SAMSUNG_INTERNET;
  } else if (ua.indexOf("Opera") > -1 || ua.indexOf("OPR") > -1) {
    browser = BROWSER.OPERA;
  } else if (ua.indexOf("Trident") > -1) {
    browser = BROWSER.EXPLORER;
  } else if (ua.indexOf("Edge") > -1) {
    browser = BROWSER.EDGE;
  } else if (ua.indexOf("Chrome") > -1) {
    browser = BROWSER.CHROME;
  } else if (ua.indexOf("Safari") > -1) {
    browser = BROWSER.SAFARI;
  } else {
    browser = BROWSER.UNKNOWN;
  }
  return browser;
};

const isMacintosh = () => {
  return navigator.platform.toUpperCase().indexOf('MAC')>=0;
};

const  isWindows = () => {
  return navigator.platform.indexOf("Win") > -1;
}
