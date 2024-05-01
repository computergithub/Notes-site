const addBtn = document.getElementById('add')
const notes = JSON.parse(localStorage.getItem("notes"))
console.log(notes)
if (notes) {
    notes.forEach(note => addNewNote(note))
}
addBtn.addEventListener('click', () => addNewNote())

function addNewNote(text = '') {
    const note = document.createElement('div')
    note.classList.add('note')
    note.innerHTML = ` 
    <div class="tools">
        <button class="edit"><img src="./image/wired-outline-245-edit-document.gif" alt=""></button>
        <button class="delete"><img src="./image/system-regular-39-trash.gif" alt=""></button>
        <button class="boldText">B</button>
        <button class="iText">i</button>
    </div>

    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="main ${text ? "hidden" : ""}"></textarea>
`

    const editBtn = note.querySelector('.edit')
    const boldText = note.querySelector('.boldText')
    const iText = note.querySelector('.iText')
    const deleteBtn = note.querySelector('.delete')
    const main = note.querySelector('.main')
    const textArea = note.querySelector('textarea')


    textArea.value = text
    main.innerHTML = marked(text)
    boldText.addEventListener('click', () => {
        textArea.classList.toggle('boldText')

    })

    iText.addEventListener('click', () => {
        textArea.classList.toggle('iText')

    })
    
    deleteBtn.addEventListener('click', () => {
        note.remove()
        updateLs()
    })
    
    editBtn.addEventListener('click', () => {
        main.classList.toggle('hidden')
        textArea.classList.toggle('hidden')
    })
    
    document.body.appendChild(note)
    textArea.addEventListener('input', (e) => {
        const { value } = e.target
        main.innerHTML = marked(value)
        updateLs()
    })
}

function updateLs() {
    const noteText = document.querySelectorAll('textarea')
    const notes = []
    noteText.forEach(note => notes.push(note.value));
    localStorage.setItem("notes", JSON.stringify(notes))
}
