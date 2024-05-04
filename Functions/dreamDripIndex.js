const welcomeDream = document.querySelector('.welcomeDream')
welcomeDream.style.display = 'none'
setTimeout(()=>{
    welcomeDream.style.display = 'block'
    welcomeDream.classList.add('tracking-in-expand')
},1100)
setTimeout(()=>{
    welcomeDream.classList.add('text-flicker-in-glow')
},5800)

const getStartedBtn = document.querySelector('.getStarted')
getStartedBtn.addEventListener('click',(e)=>{
    e.preventDefault()
  window.location.href = './Html/dreamDrip_Signup.html'
})
const signIn = document.querySelector('.signIn')
signIn.addEventListener('click',()=>{
    alert('working perfect')
})
const getStartedBtn2 = document.querySelector('.getStartedBelow')

getStartedBtn2.addEventListener('click',(e)=>{
    e.preventDefault()
    window.location.href = './Html/dreamDrip_Signup.html'
})
