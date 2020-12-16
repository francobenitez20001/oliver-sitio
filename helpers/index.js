import slugify from 'slugify';

function slug(name) {
    return slugify(name,{lower:true}).replace(/[^\w\-]+/g, '');
}

function isMobile() {
    if(typeof window !== "undefined"){
        if(window.innerWidth>860) return false;
        return (
            (navigator.userAgent.match(/Android/i)) ||
            (navigator.userAgent.match(/webOS/i)) ||
            (navigator.userAgent.match(/iPhone/i)) ||
            (navigator.userAgent.match(/iPod/i)) ||
            (navigator.userAgent.match(/iPad/i)) ||
            (navigator.userAgent.match(/BlackBerry/i))||
            window.innerWidth<=860
        );
    }
}

function ObtenerDia(numberDay) {
    switch (numberDay) {
        case 1:
            return 'Lunes';
        case 2:
            return 'Martes';
        case 3:
            return 'Miercoles';
        case 4:
            return 'Jueves';
        case 5:
            return 'Viernes';
        case 6:
            return 'Sabado';
        case 7:
            return 'Domingo';
        default:
            break;
    }
}


export {slug,isMobile,ObtenerDia}