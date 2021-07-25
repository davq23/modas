document.addEventListener('readystatechange', function (event) {
    switch (this.readyState) {
        case 'loading':
            break;
    
        default:
            break;
    }
});

window.onscroll = function (event) {
    var sections = document.querySelectorAll('section');

    sections.forEach(function (section) {
        if (Modas80.Utils.inView(section)) {
            section.classList.add('in-view');
        } else {
            section.classList.remove('in-view');
        }    
    })
}


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