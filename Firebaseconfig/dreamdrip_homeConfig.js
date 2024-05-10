const clip = document.querySelector('.bi-paperclip')
const fileTrig = document.querySelector('.files')

clip.addEventListener('click',()=>{
    fileTrig.click()
})

const fileValue = document.querySelector('.fileValue')

fileTrig.addEventListener('change',(input)=>{
    const [file] = fileTrig.files
    if (file) {
        fileValue.src = URL.createObjectURL(file)
    }
})