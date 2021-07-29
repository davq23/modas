document.addEventListener('readystatechange', function (event) {
    switch (this.readyState) {
        case 'loading':
            break;
            
        case 'complete':
            window.dispatchEvent(new Event('hashchange'));
            break;
        default:
            break;
    }
});

window.onscroll = function (event) {
    
}

window.addEventListener('hashchange', function (event) {
    var hash = window.location.hash;

    var aHref = document.getElementById('navbar').querySelector('a[href="'+hash+'"]');
    var aActive = document.getElementById('navbar').querySelector('a.active');

    if (!aActive) return;
    if (!aHref) return;

    aActive.classList.remove('active');
    aHref.classList.add('active');
});

document.getElementById("offcanvasMenu").addEventListener('hidden.bs.offcanvas', function (event) {
    event.preventDefault();
});

var Modas80 = {
    Utils: {
        inView: function(element, errorY, errorX) {
            var rect = element.getBoundingClientRect();

            if (!errorY) errorY = 0;
            if (!errorX) errorX = 0;

            return  rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + errorY &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth) + errorX;
        }
    }
}