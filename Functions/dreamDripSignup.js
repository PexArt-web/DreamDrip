const emailAndpasswordWrapper = document.querySelector('.emailAndPasswordWrap')

emailAndpasswordWrapper.style.display = 'none'

const emailBtn = document.querySelector('.emailBtn')

emailBtn.addEventListener('click',(e)=>{
e.preventDefault()
emailBtn.style.display = 'none'
emailAndpasswordWrapper.style.display = 'block'
})