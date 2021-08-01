document.addEventListener('readystatechange', function (event) {
    switch (this.readyState) {
        case 'loading':
            
            break;
            
        case 'complete':
            var toastObject = new bootstrap.Toast(document.getElementById('resultToast'));

            window.dispatchEvent(new Event('hashchange'));

            document.body.querySelectorAll('img').forEach(function (img) {
                if (img === document.getElementById('imageModalImg')) {
                    return;
                }

                img.setAttribute('data-bs-toggle', 'modal');
                img.setAttribute('data-bs-target', '#imageModal');
                img.classList.add('pointer-cursor');
            });

            document.getElementById('contactForm').onsubmit = function (event) {
                event.preventDefault();
                toastObject._element.classList.add('bg-danger', 'text-white');
                toastObject.show();

                var formData = new FormData(this);

                var request = new XMLHttpRequest();

                document.getElementById('contactForm').querySelectorAll('input,button', function(element) {
                    element.disabled = true;
                })

                request.onreadystatechange = function() {
                    document.getElementById('contactForm').querySelectorAll('input,button', function(element) {
                        element.disabled = false;
                    })                            

                    if (request.readyState === request.DONE) {
                        switch (request.status) {
                            case 200:
                                document.getElementById('contactForm').reset();

                                toastObject._element.classList.add('bg-primary', 'text-white');

                                toastObject._element.
                                    querySelector('[name="toast-title"]').innerText = '¡Correo enviado exitosamente!';
                                
                                toastObject._element.
                                    querySelector('.toast-body').innerText = 'Agradecemos sus comentarios';
                                break;
                                
                            default:
                             
                                toastObject._element.classList.add('bg-danger', 'text-white');
                                
                                toastObject._element.
                                    querySelector('[name="toast-title"]').innerText = 'No se pudo enviar el correo'
                                
                                toastObject._element.
                                    querySelector('.toast-body').innerText = 'Por favor, inténtelo más tarde';
                                break;
                        }
                                
                        toastObject.show();
                    }
                }

                request.open('POST', 'php/', true);

                request.send(formData);
            }

            break;
        default:
            break;
    }
});

document.getElementById('toastResult').addEventListener('hide.bs.toast', function (event) {
    this.classList.remove('bg-danger', 'bg-primary');
});

document.getElementById('imageModal').addEventListener('show.bs.modal', function (event) {
    var imgElement = event.relatedTarget;

    
    this.querySelector('.modal-content').style.width = imgElement.width + 'px';
    this.querySelector('.modal-content').style.height = imgElement.height + 'px';

    
    var modalImage = this.querySelector('img');

    
    modalImage.src = imgElement.src;    
})

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

            return  rect.top >= 0 -errorY &&
                rect.left >= 0 - errorX &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + errorY &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth) + errorX;
        }
    }
}