function grow(e) {
  var oldSize = 34;

  if (e.style.fontSize !== "") {
    oldSize = parseInt(e.style.fontSize.replace('px', ''));
  }

  e.style.fontSize = oldSize + "px";
  var oldWidth = e.scrollWidth;
  var oldHeight = e.scrollHeight;

  e.style.fontSize = (oldSize + 1) + "px";
  var newSize = oldSize + 1;
  var newWidth = e.scrollWidth;
  var newHeight = e.scrollHeight;

  if ((e.scrollHeight - oldHeight) > 0 || (e.scrollWidth - oldWidth) > 0) {
    return shrink(e)
  } else {
    return grow(e)
  }
}

function shrink(e) {
  var oldSize = 34;
  var oldWidth = e.scrollWidth;
  var oldHeight = e.scrollHeight;

  if (e.style.fontSize !== "") {
    oldSize = parseInt(e.style.fontSize.replace('px', ''));
  }

  e.style.fontSize = (oldSize - 1) + "px";
  var newSize = oldSize - 1;
  var newWidth = e.scrollWidth;
  var newHeight = e.scrollHeight;

  if (!((e.scrollHeight - oldHeight) === 0 && (e.scrollWidth - oldWidth) === 0)) {
    return shrink(e)
  }
}

function growCodeBlock() {
  var scaler = document.querySelector('section.present pre');
  var code = document.querySelector('section.present code');

  if (!scaler || !code) return;

  scaler.style.width = '100%';
  code.style.minHeight = '100vh';
  scaler.style.overflow = 'visible';
  grow(code);
  code.style.minHeight = '100%';
  code.style.maxHeight = '80vh';
  code.style.lineHeight = '1em';
}

Reveal.initialize({
  center: true,
  controls: true,
  fragments: true,
  history: true,
  margin: 0,
  progress: false,
  slideNumber: 'c/t',
  touch: true,
  transition: 'fade',
  width: "100%",
  height: "100%",


  transition: 'slide',

  dependencies: [{
    src: 'reveal/plugin/markdown/marked.js',
    condition: function() {
      return !!document.querySelector('[data-markdown]');
    }
  }, {
    src: 'reveal/plugin/markdown/markdown.js',
    condition: function() {
      return !!document.querySelector('[data-markdown]');
    }
  }, {
    src: 'reveal/plugin/highlight/highlight.js',
    async: true,
    condition: function() {
      return !!document.querySelector('pre code');
    },
    callback: function() {
      // growCodeBlock();
      hljs.initHighlightingOnLoad();
    }
  }, {
    src: 'reveal/plugin/zoom-js/zoom.js',
    async: true
  }, {
    src: 'reveal/plugin/notes/notes.js',
    async: true
  }]
});

// Reveal.addEventListener('ready', growCodeBlock);
// Reveal.addEventListener('slidechanged', growCodeBlock);
