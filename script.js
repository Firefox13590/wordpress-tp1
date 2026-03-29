
/* 
        VARIABLES
*/
const domaine = window.location;
const tousLesLiens = Array.from(document.querySelectorAll('a'));
const liensWikipedia = tousLesLiens.filter(lien => {
    // console.log(lien.href);
    // console.log(lien.href.split('/')[3]);
    // console.log(lien.href.startsWith(domaine.origin + '/wiki'));
    return lien.href.startsWith(domaine.origin + '/wiki');
});
const liensNavigation = tousLesLiens.filter(lien => lien.href.startsWith(domaine.origin + domaine.pathname + '#'));
const tousLesParagraphes = document.querySelectorAll('p');
console.log(domaine);
console.log(tousLesLiens, liensWikipedia, liensNavigation);
console.log(tousLesParagraphes);



/* 
        FONCTIONS
*/
/**
 * Ferme automatiquement le menu burger quand un lien est cliqué (pour les petits écrans)
 */
function fermerMenu(){
    const cc = document.getElementById('cc-menu-burger');
    console.log(cc);
    cc.checked =  false;
}

/**
 * Change l'image de background de la galerie en fonction du mouvement (mvt) et de l'index de l'image courante (indexCourant).
 * 
 * S'asure de garder le nouvel index dans les limites de la liste d'images et met à jour le dataset de la galerie pour le prochain mouvement.
 * 
 * @param {Number} mvt La valeur du mouvement (+1 pour la flèche droite, -1 pour la flèche gauche)
 * @param {Number} indexCourant L'index de l'image courante dans la galerie
 */
function gererGalerie(mvt = 0, indexCourant){
    // console.log(mvt, indexCourant);
    const galerie = document.querySelector('main section#ici .galerie');
    // console.log(galerie);
    const racineImagesGalerie = 'images/espace_pour_la_vie/';
    const listeImagesGalerie = [
        'camponotus-23942.jpg',
        'fourmi_coupeuse_de_feuille_atta_ins0069863_alexandre_robertson_dufour_620x415.jpg',
        'p_pharaonis.jpg'
    ];
    const listeDescriptions = [
        'Fourmi charpentière',
        'Fourmi coupeuse de feuille',
        'Fourmi pharaon'
    ];

    let nouvelIndex = Number(indexCourant) + mvt;
    if(nouvelIndex < 0){
        nouvelIndex = listeImagesGalerie.length - 1;
    }else if(nouvelIndex > listeImagesGalerie.length - 1){
        nouvelIndex = 0;
    }
    // console.log(nouvelIndex);

    galerie.style.backgroundImage = `url('${racineImagesGalerie + listeImagesGalerie[nouvelIndex]}')`;
    galerie.dataset.galerieIndex = nouvelIndex;
    galerie.title = listeDescriptions[nouvelIndex];
}

/**
 * Récupère la valeur de mouvement (+/-1) et l'index de l'image de la galerie pour faire le changement d'image
 * @param {HTMLElement} el L'élément cliqué (flèche de la galerie)
 * @param {Number} mvt La valeur du mouvement (+1 pour la flèche droite, -1 pour la flèche gauche)
 */
function bougerGalerie(el, mvt){
    // console.log(el, mvt);
    gererGalerie(mvt, el.parentElement.dataset.galerieIndex);
}



/* 
        EXECUTION
*/
// changer le comportement des liens
tousLesLiens.forEach(lien => {
    if(!(lien.classList.contains('titre1') || lien.classList.contains('titre2'))){
        lien.target = '_blank';
        lien.rel = 'noopener';    
    }
});
// fix les liens wikipedia
liensWikipedia.forEach(lien => lien.href = 'https://fr.wikipedia.org' + lien.href.slice(domaine.origin.length));
// fermer automatiquement la navigation apres avoir cliqué sur un lien de navigation
liensNavigation.forEach(lien => lien.addEventListener('click', fermerMenu));
// ajout d'un <br> apres chaque paragraphe
tousLesParagraphes.forEach(p => {
    if(p !== p.parentElement.lastElementChild) {p.after(document.createElement('br'));}
});
// mettre une couleur de bg a chaque section
document.querySelectorAll('main section').forEach(
    (el, i) => {
        // console.log(el);
        el.style.backgroundColor = getComputedStyle(document.querySelector(':root')).getPropertyValue(`--couleur${i + 1}`);
        el.style.color = [0, 2].includes(i) ? 'white' : 'black';
    }
);

