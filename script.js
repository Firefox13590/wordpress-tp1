
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
function fermerMenu(){
    const cc = document.getElementById('cc-menu-burger');
    console.log(cc);
    cc.checked =  false;
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

