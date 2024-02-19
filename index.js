const posts = document.querySelector('#postContainer')
const createPostBtn = document.querySelector('#createPostBtn')

fetch('https://jsonplaceholder.typicode.com/posts/')
    .then(response => {
        return response.json()
    })
    .then(json => {
        let createPost = document.createElement('div')
        createPost.classList.add('postContainer')
        posts.append(createPost)
        for (let i = 0; i < 5; i++) {

            let createHeading = document.createElement('h3')
            createHeading.classList.add('title')
            createHeading.textContent = json[i].title
            createPost.append(createHeading)

            let createCloseBtn = document.createElement('button')
            createCloseBtn.classList.add('closeBtn')
            createCloseBtn.textContent = 'x'
            createHeading.append(createCloseBtn)

            createCloseBtn.addEventListener('click', function(event){
                event.stopPropagation()
                createHeading.remove()
            })  

            let EditPostBtn = document.createElement('button')
            EditPostBtn.classList.add('editBtn')
            EditPostBtn.textContent = 'edit'
            createHeading.append(EditPostBtn)

            let createBody = document.createElement('p')
            createBody.classList.add('body')
            createBody.textContent = json[i].body
            createHeading.append(createBody)

            EditPostBtn.addEventListener("click", function(event){
                fetch('https://jsonplaceholder.typicode.com/posts' ,{
                    method: "PUT",
                    body: JSON.stringify({
                        // title: prompt('edited head'), 
                        // body: prompt('edited body')
                    })
                }).then(response =>{
                        event.stopPropagation()
                        createHeading.textContent = prompt('edited head')
                        createHeading.append(createCloseBtn)
                        createBody.textContent = prompt('edited body')
                        createHeading.append(createBody)
                        createHeading.append(EditPostBtn)
                })
            })
        }
    })



createPostBtn.addEventListener("click", () =>{
    let heading = prompt('your heading', '')
    let post = prompt('your post', '')

    fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
        title: heading,
        body: post,
    })
    }).then(response => {
        return response.json()
    }).then(json => {

        let createHeading = document.createElement('h3')
            createHeading.classList.add('title')
            createHeading.textContent = heading
            posts.append(createHeading)

            let createCloseBtn = document.createElement('button')
            createCloseBtn.classList.add('closeBtn')
            createCloseBtn.textContent = 'x'
            createHeading.append(createCloseBtn)

            createCloseBtn.addEventListener('click', function(event){
                event.stopPropagation()
                createHeading.remove()
            })

            let EditPostBtn = document.createElement('button')
            EditPostBtn.classList.add('editBtn')
            EditPostBtn.textContent = 'edit'
            createHeading.append(EditPostBtn)

            EditPostBtn.addEventListener("click", () =>{
                createHeading.textContent = prompt('edited head: ')
                posts.append(createHeading)
                createBody.textContent = prompt('edited body: ')
                createHeading.append(createBody)
                createHeading.append(EditPostBtn)
                createHeading.append(createCloseBtn)
            })

            let createBody = document.createElement('p')
            createBody.classList.add('body')
            createBody.textContent = post
            createHeading.append(createBody)
    })
})