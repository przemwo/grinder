import morph from 'morphdom';

const defaultEvents = [
  'onclick',
  'ondblclick',
  'onmousedown',
  'onmouseup',
  'onmouseover',
  'onmousemove',
  'onmouseout',
  'ondragstart',
  'ondrag',
  'ondragenter',
  'ondragleave',
  'ondragover',
  'ondrop',
  'ondragend',
  'onkeydown',
  'onkeypress',
  'onkeyup',
  'onunload',
  'onabort',
  'onerror',
  'onresize',
  'onscroll',
  'onselect',
  'onchange',
  'onsubmit',
  'onreset',
  'onfocus',
  'onblur',
  'oncontextmenu',
  'onfocusin',
  'onfocusout'
];

export default function (fromNode, toNode, opts = {}) {
  if (!opts.onBeforeMorphEl) {
    opts.onBeforeMorphEl = copyEvents;
  }

  morph(fromNode, toNode, opts);

  function copyEvents (f, t) {
    const events = opts.events || defaultEvents;

    let i = -1;
    const n = events.length;

    while (++i < n) {
      const ev = events[i];

      if (t[ev]) {
        f[ev] = t[ev];
      } else if (f[ev]) {
        f[ev] = undefined;
      }
    }
  }
}
