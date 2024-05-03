const welcomeDream = document.querySelector('.welcomeDream')
setTimeout(()=>{
    welcomeDream.classList.add('text-flicker-in-glow')
},4700)

const getStartedBtn = document.querySelector('.getStarted')
getStartedBtn.addEventListener('click',()=>{
    alert(`What's up`)
})
const signIn = document.querySelector('.signIn')
signIn.addEventListener('click',()=>{
    alert('working perfect')
})
const getStartedBtn2 = document.querySelector('.getStartedBelow')

getStartedBtn2.addEventListener('click',()=>{
 alert('perfect')
})
