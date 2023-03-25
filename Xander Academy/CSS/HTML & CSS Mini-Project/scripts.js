document.addEventListener('DOMContentLoaded', function(event) {

    const hamburger = document.getElementById('hamburger');
    const side_panel = document.getElementById('side_panel');

    hamburger.addEventListener('click', function() {
        side_panel.classList.toggle('open');
        console.log("i swear if this prints");
    })
});