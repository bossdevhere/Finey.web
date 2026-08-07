/* ==========================================================================
   MAIN JS ENTRY POINT
   ========================================================================== */

import { initTheme } from './theme.js';
import { initCopyUrl } from './copy-url.js';

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initCopyUrl();
});
