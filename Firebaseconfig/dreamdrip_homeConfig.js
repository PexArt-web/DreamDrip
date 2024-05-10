const clip = document.querySelector('.bi-paperclip')
const fileTrig = document.querySelector('.files')

clip.addEventListener('click',()=>{
    fileTrig.click()
})

const fileValue = document.querySelector('.fileValue')

fileTrig.addEventListener('change',(input)=>{
    console.log(fileTrig.value);
    if (input.files && input.files[0]) {
        const fileReader = new FileReader()

        fileReader.onload=(e)=>{
            `<img src = ${e.target.result}>`

            fileReader.readAsDataURL(input.files[0])
        }
    }
})