class I18n {
  constructor() {
    const savedLang = localStorage.getItem('language');
    this.translations = {};
    this.baseTranslations = {};
    this.supportedLanguages = [
      { code: 'en', name: 'English' },
      { code: 'hi', name: 'Hindi' }
    ];
    this.currentLang = this.supportedLanguages.some((lang) => lang.code === savedLang) ? savedLang : 'en';
    this.localeMap = {
      en: 'en-IN',
      hi: 'hi-IN'
    };
  }

  async init() {
    await this.loadTranslations(this.currentLang);
    this.applyTranslations();
    this.updateHTMLLang();
  }

  async fetchJson(lang) {
    const response = await fetch(`/locales/${lang}.json`);
    if (!response.ok) {
      throw new Error(`Failed to load ${lang}.json`);
    }
    return response.json();
  }

  deepMerge(base, extra) {
    const output = Array.isArray(base) ? [...base] : { ...base };
    Object.keys(extra || {}).forEach((key) => {
      const baseValue = output[key];
      const extraValue = extra[key];
      if (
        baseValue &&
        extraValue &&
        typeof baseValue === 'object' &&
        typeof extraValue === 'object' &&
        !Array.isArray(baseValue) &&
        !Array.isArray(extraValue)
      ) {
        output[key] = this.deepMerge(baseValue, extraValue);
      } else {
        output[key] = extraValue;
      }
    });
    return output;
  }

  async loadTranslations(lang) {
    try {
      if (!Object.keys(this.baseTranslations).length) {
        this.baseTranslations = await this.fetchJson('en');
      }

      const langTranslations = lang === 'en' ? this.baseTranslations : await this.fetchJson(lang);
      this.translations = this.deepMerge(this.baseTranslations, langTranslations);
      this.currentLang = lang;
      localStorage.setItem('language', lang);
      return true;
    } catch (error) {
      console.error('Error loading translations:', error);
      if (lang !== 'en') {
        return this.loadTranslations('en');
      }
      return false;
    }
  }

  getValue(source, key) {
    return key.split('.').reduce((acc, part) => {
      if (acc && typeof acc === 'object' && part in acc) {
        return acc[part];
      }
      return undefined;
    }, source);
  }

  t(key) {
    const value = this.getValue(this.translations, key);
    if (value !== undefined && value !== null && value !== '') {
      return value;
    }

    const fallback = this.getValue(this.baseTranslations, key);
    if (fallback !== undefined && fallback !== null && fallback !== '') {
      return fallback;
    }

    return '';
  }

  async changeLanguage(lang) {
    const success = await this.loadTranslations(lang);
    if (success) {
      this.applyTranslations();
      this.updateHTMLLang();
      window.dispatchEvent(new CustomEvent('languageChanged', {
        detail: { language: lang }
      }));
    }
  }

  applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach((element) => {
      const translation = this.t(element.getAttribute('data-i18n'));
      if (!translation) return;
      element.textContent = translation;
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
      const translation = this.t(element.getAttribute('data-i18n-placeholder'));
      if (!translation) return;
      element.placeholder = translation;
    });

    document.querySelectorAll('[data-i18n-title]').forEach((element) => {
      const translation = this.t(element.getAttribute('data-i18n-title'));
      if (!translation) return;
      element.title = translation;
    });
  }

  updateHTMLLang() {
    document.documentElement.lang = this.currentLang;
    document.documentElement.dir = 'ltr';
  }

  formatNumber(number) {
    return new Intl.NumberFormat(this.localeMap[this.currentLang] || 'en-IN').format(number);
  }

  formatDate(date, options = {}) {
    return new Intl.DateTimeFormat(
      this.localeMap[this.currentLang] || 'en-IN',
      { year: 'numeric', month: 'long', day: 'numeric', ...options }
    ).format(new Date(date));
  }
}

window.i18n = new I18n();

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => window.i18n.init());
} else {
  window.i18n.init();
}
