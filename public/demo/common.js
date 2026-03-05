/**
 * COMMON.JS — Shared Template Configurator Logic
 * Universal theme switcher, template router, and i18n manager for all demo templates
 */

window.App = {
  /**
   * Template Mapping
   * Maps template codes to their HTML files
   */
  templateMap: {
    // Contractor templates
    swiss: 'swiss.html',
    standard: 'standard.html',
    technical: 'technical.html',

    // Service templates
    terminal: 'terminal.html',
    blueprint: 'blueprint.html',
    pulse: 'pulse.html',

    // Finishing templates
    gallery: 'gallery.html',
    studio: 'studio.html',
    canvas: 'canvas.html',
  },

  /**
   * Demo Type Mapping
   * Maps business types to default templates
   */
  demoDefaults: {
    demo1: 'swiss',      // Total Contractor → Swiss Art House
    demo2: 'terminal',   // Service Specialist → Cyber Terminal
    demo3: 'gallery',    // Finishing Expert → Gallery Museum
  },

  /**
   * Theme Presets
   * CSS variable configurations for each visual style
   */
  themes: {
    // Nordic Professional (Blue)
    nordic: {
      '--color-dark': '#0F172A',
      '--color-light': '#F8FAFC',
      '--color-accent': '#38BDF8',
    },
    // Safe Orange
    default: {
      '--color-dark': '#1A1412',
      '--color-light': '#FAF9F7',
      '--color-accent': '#EA580C',
    },
    // Forest Copper
    nature: {
      '--color-dark': '#0A0A08',
      '--color-light': '#F5F5F0',
      '--color-accent': '#B45309',
    },
    // Steel Mono
    steel: {
      '--color-dark': '#0A0A0A',
      '--color-light': '#FAFAFA',
      '--color-accent': '#525252',
    },
    // Gallery Light (for finishing)
    gallery: {
      '--bg': '#FCFCFC',
      '--text': '#1A1A1B',
      '--accent': '#C19A6B',
      '--secondary': '#F0E9E0',
    },
    // Studio Blue (for finishing)
    studio: {
      '--bg': '#002B49',
      '--text': '#F0F4F8',
      '--accent': '#0057FF',
      '--secondary': '#003D5C',
    },
    // Canvas Dark (for finishing)
    canvas: {
      '--bg': '#050505',
      '--text': '#E5E5E5',
      '--accent': '#D4AF37',
      '--secondary': '#1A1A1A',
    },
  },

  /**
   * Toggle Theme Configuration Panel
   */
  toggleThemePanel() {
    const panel = document.getElementById('theme-panel');
    const trigger = document.getElementById('config-trigger');

    if (panel) {
      const isOpen = !panel.classList.contains('translate-x-full');
      panel.classList.toggle('translate-x-full');

      // Optional: fade out trigger when panel is open
      if (trigger) {
        trigger.style.opacity = isOpen ? '1' : '0.7';
      }
    }
  },

  /**
   * Navigate to Different Template
   * @param {string} template - Template code (e.g., 'swiss', 'pulse', 'gallery')
   */
  setTemplate(template) {
    const targetFile = this.templateMap[template];

    if (!targetFile) {
      console.warn(`Template "${template}" not found`);
      return;
    }

    // Preserve language preference
    const currentLang = localStorage.getItem('demo_lang') || 'no';

    // Navigate to new template
    window.location.href = `${targetFile}?lang=${currentLang}`;
  },

  /**
   * Navigate to Demo Type (Business Category)
   * @param {string} demo - Demo code (demo1, demo2, demo3)
   */
  setDemo(demo) {
    const defaultTemplate = this.demoDefaults[demo];

    if (!defaultTemplate) {
      console.warn(`Demo "${demo}" not found`);
      return;
    }

    // Navigate to default template for this business type
    this.setTemplate(defaultTemplate);
  },

  /**
   * Change Visual Theme (Colors)
   * @param {string} themeName - Theme preset name
   */
  setTheme(themeName) {
    const theme = this.themes[themeName];

    if (!theme) {
      console.warn(`Theme "${themeName}" not found`);
      return;
    }

    // Apply CSS variables
    const root = document.documentElement;
    Object.entries(theme).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });

    // Save preference
    localStorage.setItem('demo_theme', themeName);

    // Update active state on theme buttons
    this.updateThemeButtons(themeName);
  },

  /**
   * Update Active State on Theme Buttons
   * @param {string} activeTheme - Currently active theme
   */
  updateThemeButtons(activeTheme) {
    const buttons = document.querySelectorAll('[id^="btn-theme-"]');
    buttons.forEach(btn => {
      const themeName = btn.id.replace('btn-theme-', '');
      if (themeName === activeTheme) {
        btn.classList.add('config-active');
      } else {
        btn.classList.remove('config-active');
      }
    });
  },

  /**
   * Change Language
   * @param {string} lang - Language code ('no' or 'en')
   */
  setLanguage(lang) {
    // Save preference
    localStorage.setItem('demo_lang', lang);

    // Reload page with new language
    const url = new URL(window.location.href);
    url.searchParams.set('lang', lang);
    window.location.href = url.toString();
  },

  /**
   * Update text content based on current language
   * Reads from window.showcaseConfig if available
   */
  updateText(lang) {
    if (!window.showcaseConfig) return;

    // Find which demo config to use
    let demoConfig = null;
    for (const demo in window.showcaseConfig) {
      if (window.showcaseConfig[demo].i18n && window.showcaseConfig[demo].i18n[lang]) {
        demoConfig = window.showcaseConfig[demo];
        break;
      }
    }

    if (!demoConfig) return;

    const i18n = demoConfig.i18n[lang];
    if (!i18n) return;

    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (i18n[key]) {
        el.innerHTML = i18n[key];
      }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (i18n[key]) {
        el.placeholder = i18n[key];
      }
    });

    // Update language buttons visual state
    document.querySelectorAll('[id^="lang-"]').forEach(btn => {
      const btnLang = btn.id.replace('lang-', '');
      if (btnLang === lang) {
        btn.classList.add('font-bold', 'underline');
        btn.classList.remove('opacity-50');
      } else {
        btn.classList.remove('font-bold', 'underline');
        btn.classList.add('opacity-50');
      }
    });
  },

  /**
   * Initialize on Page Load
   * Restore saved preferences
   */
  init() {
    // Restore saved theme
    const savedTheme = localStorage.getItem('demo_theme');
    if (savedTheme && this.themes[savedTheme]) {
      this.setTheme(savedTheme);
    }

    // Restore language from URL or localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    const savedLang = localStorage.getItem('demo_lang') || 'no';
    const currentLang = urlLang || savedLang;

    if (currentLang !== savedLang) {
      localStorage.setItem('demo_lang', currentLang);
    }

    // Update text content with selected language
    this.updateText(currentLang);

    console.log('✓ App initialized | Theme:', savedTheme || 'default', '| Lang:', currentLang);
  }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => App.init());
} else {
  App.init();
}
