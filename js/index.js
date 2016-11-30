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

  if (heightExceeded || widthExceeded) {
    return shrink(e)
  } else {
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

  var heightExceeded = (newHeight - oldHeight) < 0;
  var widthExceeded = (newWidth- oldWidth) < 0;

  console.log(heightExceeded, widthExceeded)

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
  center: false,
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

function showMonoFooter (event) {
  const curr = event.currentSlide;
  const monoFooter = document.querySelector('footer.mono-footer');

  if (curr.dataset.showMonoFooter || curr.parentNode.dataset.showMonoFooter) {
    monoFooter.style.opacity = 1;
    const toDim = curr.dataset.dimMonoEls || "";
    const parsedToDim = toDim.split(',').map(e => parseInt(e));

    monoFooter.querySelectorAll('div.footer-item').forEach((e, i) => {
      if (parsedToDim.includes(i)) e.style.opacity = 0.1;
      else e.style.opacity = 1;
    });
  } else {
    document.querySelector('footer').style.opacity = 0;
  }
}

Reveal.addEventListener('slidechanged', function (event) {
  showMonoFooter(event);
  //growCodeBlock();
});

Reveal.addEventListener('ready', function (event) {
  showMonoFooter(event);
});
