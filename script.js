
const domaine = window.location;
const tousLesLiens = Array.from(document.querySelectorAll('a'));
const liensWikipedia = tousLesLiens.filter(l => {
    // console.log(l.href);
    // console.log(l.href.split('/')[3]);
    // console.log(l.href.startsWith(domaine.origin + '/wiki'));
    return l.href.startsWith(domaine.origin + '/wiki');
});
// console.log(domaine, tousLesLiens, liensWikipedia);



tousLesLiens.forEach(lien => {
    if(!(lien.classList.contains('titre1') || lien.classList.contains('titre2'))){
        lien.target = '_blank';
        lien.rel = 'noopener';    
    }
});
liensWikipedia.forEach(lien => lien.href = 'https://fr.wikipedia.org' + lien.href.slice(domaine.origin.length));


