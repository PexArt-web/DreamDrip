const mediaQuery  = window.matchMedia('(min-width:320px)')

function handleMediaChange(mediaQuery){
 if (mediaQuery.matches) {
alert('matched')
 }
}