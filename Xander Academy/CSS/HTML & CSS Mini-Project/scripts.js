let hamburger = document.getElementById('hamburger');
let side_panel = document.getElementById('side_panel');

hamburger.addEventListener('click', function() {
    side_panel.classList.toggle('open');
})