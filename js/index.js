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
});

Reveal.addEventListener('ready', function (event) {
  showMonoFooter(event);
});
