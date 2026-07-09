// Present so PostCSS config discovery stops here instead of walking up and
// loading the parent site's Tailwind config (and its plugin copies).
// The Studio ships its own styling; no extra PostCSS plugins are needed.
module.exports = { plugins: {} };
