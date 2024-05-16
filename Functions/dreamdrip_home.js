const clip = document.querySelector('.clipBtn')
const fileTrig = document.querySelector('.files')

clip.addEventListener('click',()=>{
    fileTrig.click()
})

const fileValueWrap = document.querySelector('.fileValueWrap')
fileTrig.addEventListener('change',(input)=>{
    const [file] = fileTrig.files
    if (file && file.type.startsWith('image')) {

        fileValueWrap.innerHTML = `<img class="fileValue img-fluid" src="${URL.createObjectURL(file)}" alt="">`
        console.log(file.type, 'typeshit');

    }else if(file && file.type.startsWith('video')){
        fileValueWrap.innerHTML = `<video src="${URL.createObjectURL(file)}"></video>`
    }
})

const back =  document.querySelector('.back')
back.onclick = () =>{
 
    window.location.href = './dreamdripHome.html'
}

