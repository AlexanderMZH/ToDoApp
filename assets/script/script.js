const input = document.querySelector(".container .input-container input")
const addButton = document.querySelector(".container .input-container button")
const container = document.querySelector(".container")
const loader = document.querySelector(".loader-container")
addButton.addEventListener("click", () => {render_todo()})

let isTrue = Boolean
let dataArray = []
let data_id = -1

function render_todo(){
    // console.log(todo.value)
    if(todo.value === "" || !todo.value){
        return
    }
    isTrue = true
    fetchData() 
    data_id = data_id + 1;

    const output = document.createElement("div")
    output.classList.add("output")
    // output.setAttribute("id", data_id)
    
    const output_span = document.createElement('span')
    output_span.classList.add("output-span")
    const output_span_value = document.createTextNode(todo.value)
    
    const deleteImg = document.createElement("img")
    deleteImg.setAttribute("src", "./assets/images/delete.png")
    deleteImg.classList.add("output-img")
    
    output_span.appendChild(output_span_value)
    output.appendChild(output_span)
    output.appendChild(deleteImg)
    container.appendChild(output)
    deleteImg.setAttribute("id", data_id)

    deleteImg.addEventListener("click", (e) => {
        let obj_id = +(e.target.id)
        deleteFetchData(obj_id, output)
    })
    input.value = ""
}

const fetchData = () =>{
    loader.classList.add('active')
    fetch('https://dummyjson.com/todos/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
    todo: input.value,
    completed: isTrue,
    userId: 5,
  })
})
.then((data) => {return data.json()})
.then((data) => {
    loader.classList.remove('active')
    const {todo, id,completed} = data
    data.id = data_id
    dataArray.push(data)
    console.log(dataArray)
})
.catch((error) => {
    console.log(error)
    loader.classList.remove('active')
    window.alert("Something went wrong!")
    const output = document.querySelector(".output")
    output.remove()
});
}

const deleteFetchData = (obj_id, output) => {
    loader.classList.add('active')
    fetch('https://dummyjson.com/todos/1', {
    method: 'DELETE',
    })
    .then((results) => {return results.json()})
    .then((results) => {
        console.log(results)
        const newArray = dataArray.filter((item) => {
            return item.id !== obj_id
        })
        dataArray = newArray
        output.remove()
        loader.classList.remove('active')
        console.log(dataArray)
    })
    .catch((error) => {
        console.log(error)
        window.alert("Something went wrong!")
        loader.classList.remove('active')
    });
    
}
