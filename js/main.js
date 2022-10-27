const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];

//variabili di cui ho bisogno
const postList = document.querySelector('.posts-list');
const likeButton = document.getElementsByClassName('js-like-button');
const liked = [];

//modificare data in formato europeo
convertDate();

//check se immagine profilo presente
checkProfilePic();

//creare posts in pagina
postCreation();

//like post
const likeCounters = document.getElementsByClassName('js-likes-counter');
const likeButtons=document.getElementsByClassName('js-like-button');
let likedPosts = [];

//like/unlike post
for(let i=0; i<likeButtons.length; i++){
    likeButtons[i].addEventListener('click', function(){

        if(!(likedPosts.includes(posts[i].id)))
        {
            likeButtons[i].classList.add('like-button--liked');
            likedPosts.push(posts[i].id);
            posts[i].likes +=1;
            likeCounters[i].innerHTML=posts[i].likes;
        }else
        {
            likeButtons[i].classList.remove('like-button--liked');
            posts[i].likes -=1;
            likeCounters[i].innerHTML=posts[i].likes;
            let postIndexInLikedArr = likedPosts.indexOf((posts[i].id));
            likedPosts.splice(postIndexInLikedArr,1);
        }
        
    })
}

//genero template html per ogni post
function postCreation(){
    let content = '';
    posts.forEach(post =>{
        content +=`
        <div class="post">
            <div class="post__header">
                <div class="post-meta">                    
                    <div class="post-meta__icon">
                        <img class="profile-pic" src="${post.author.image}" alt="${post.author}">                    
                    </div>
                    <div class="post-meta__data">
                        <div class="post-meta__author">${post.author.name}</div>
                        <div class="post-meta__time">${post.created}</div>
                    </div>                    
                </div>
            </div>
            <div class="post__text">${post.content}</div>
            <div class="post__image">
                <img src="${post.media}" alt="${post.media}">
            </div>
            <div class="post__footer">
                <div class="likes js-likes">
                    <div class="likes__cta">
                        <a class="like-button  js-like-button" href="#" data-postid="${post.id}">
                            <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                            <span class="like-button__label">Mi Piace</span>
                        </a>
                    </div>
                    <div class="likes__counter">
                        Piace a <b id="like-counter-1" class="js-likes-counter">${post.likes}</b> persone
                    </div>
                </div> 
            </div>            
         </div>
    `;
    })
    postList.innerHTML = content;

};

//convert data European format
function convertDate(){
    posts.forEach(post => {
        //transform string to date
        date = new Date(post.created);
        //convert date format
        post.created = Intl.DateTimeFormat("it-IT").format(date);
    })
}

function checkProfilePic(){
    posts.forEach(pic => {
        if(pic.author.image === null){
            pic.author.image = pic.author.name.replace(/[a-z]/g, '');
            console.log(pic.author.image);
        }
    })
}