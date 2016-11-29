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

  var heightExceeded = (newHeight - oldHeight) > 0;
  var widthExceeded = (newWidth- oldWidth) > 0;

  console.log(e.style.fontSize, heightExceeded, widthExceeded);

  if (heightExceeded || widthExceeded) {
    return shrink(e)
  } else {
    console.log('growing')
    return grow(e)
  }
}

function shrink(e) {
  var oldSize = (e.style.fontSize !== "") ? parseInt(e.style.fontSize.replace('px', '')) : 34;
  var oldWidth = e.scrollWidth;
  var oldHeight = e.scrollHeight;

  e.style.fontSize = (oldSize - 1) + "px";
  var newSize = oldSize - 1;
  var newWidth = e.scrollWidth;
  var newHeight = e.scrollHeight;

  var heightExceeded = (newHeight - oldHeight) === 0;
  var widthExceeded = (newWidth- oldWidth) === 0;

  console.log('shrinking', heightExceeded, widthExceeded);

  if (!heightExceeded || !widthExceeded) {
    return shrink(e)
  }
}

function growCodeBlock() {
  var section = document.querySelector('section.present');
  if (section.querySelector('section.present')) section = section.querySelector('section.present');
  var scaler = section.querySelector('pre');
  var code = section.querySelector('code');

  if (!scaler || !code) return;

  scaler.style.width = '100%';
  code.style.minHeight = '100vh';
  code.style.overflow = 'visible';

  grow(code);

  code.style.minHeight = '100%';
  code.style.maxHeight = '90vh';
  code.style.lineHeight = '1em';
  code.style.overflow = 'hidden';
}

Reveal.initialize({
  center: true,
  controls: false,
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
      growCodeBlock()
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

Reveal.addEventListener('slidechanged', growCodeBlock);
