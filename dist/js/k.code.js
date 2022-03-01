const keySequence = [];
let konamiString = '';
const konamiCode = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a'
];

document.addEventListener('keydown', function(e) {
  // To make sure it freezes the scroll when
  // the first two keypresses are "ArrowUp"
  if (keySequence[0] === 'ArrowUp' && keySequence[1] === 'ArrowUp' && e.key === 'ArrowDown') {
    e.preventDefault();
  }
});

document.addEventListener('keyup', function(e) {
  const doc = document.documentElement;
  const top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);

  // This make sure it only work
  // when the window `scrollTop` is 0.
  if (top === 0) {
    keySequence.push(e.key);
    keySequence.splice(-konamiCode.length - 1, keySequence.length - konamiCode.length);
    konamiString = konamiCode.join('');


        if (keySequence.join('').includes(konamiString)) {
      alert("cheats activated");

new ModalVideo('.js-modal-video');


//end
    }
  }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJrLmNvZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qga2V5U2VxdWVuY2UgPSBbXTtcbmxldCBrb25hbWlTdHJpbmcgPSAnJztcbmNvbnN0IGtvbmFtaUNvZGUgPSBbXG4gICdBcnJvd1VwJyxcbiAgJ0Fycm93VXAnLFxuICAnQXJyb3dEb3duJyxcbiAgJ0Fycm93RG93bicsXG4gICdBcnJvd0xlZnQnLFxuICAnQXJyb3dSaWdodCcsXG4gICdBcnJvd0xlZnQnLFxuICAnQXJyb3dSaWdodCcsXG4gICdiJyxcbiAgJ2EnXG5dO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZnVuY3Rpb24oZSkge1xuICAvLyBUbyBtYWtlIHN1cmUgaXQgZnJlZXplcyB0aGUgc2Nyb2xsIHdoZW5cbiAgLy8gdGhlIGZpcnN0IHR3byBrZXlwcmVzc2VzIGFyZSBcIkFycm93VXBcIlxuICBpZiAoa2V5U2VxdWVuY2VbMF0gPT09ICdBcnJvd1VwJyAmJiBrZXlTZXF1ZW5jZVsxXSA9PT0gJ0Fycm93VXAnICYmIGUua2V5ID09PSAnQXJyb3dEb3duJykge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgfVxufSk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZnVuY3Rpb24oZSkge1xuICBjb25zdCBkb2MgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gIGNvbnN0IHRvcCA9ICh3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jLnNjcm9sbFRvcCkgIC0gKGRvYy5jbGllbnRUb3AgfHwgMCk7XG5cbiAgLy8gVGhpcyBtYWtlIHN1cmUgaXQgb25seSB3b3JrXG4gIC8vIHdoZW4gdGhlIHdpbmRvdyBgc2Nyb2xsVG9wYCBpcyAwLlxuICBpZiAodG9wID09PSAwKSB7XG4gICAga2V5U2VxdWVuY2UucHVzaChlLmtleSk7XG4gICAga2V5U2VxdWVuY2Uuc3BsaWNlKC1rb25hbWlDb2RlLmxlbmd0aCAtIDEsIGtleVNlcXVlbmNlLmxlbmd0aCAtIGtvbmFtaUNvZGUubGVuZ3RoKTtcbiAgICBrb25hbWlTdHJpbmcgPSBrb25hbWlDb2RlLmpvaW4oJycpO1xuXG5cbiAgICAgICAgaWYgKGtleVNlcXVlbmNlLmpvaW4oJycpLmluY2x1ZGVzKGtvbmFtaVN0cmluZykpIHtcbiAgICAgIGFsZXJ0KFwiY2hlYXRzIGFjdGl2YXRlZFwiKTtcblxubmV3IE1vZGFsVmlkZW8oJy5qcy1tb2RhbC12aWRlbycpO1xuXG5cbi8vZW5kXG4gICAgfVxuICB9XG59KTtcbiJdLCJmaWxlIjoiay5jb2RlLmpzIn0=
