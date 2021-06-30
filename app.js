var question = [
    {ques: 'How can you make a numbered list?',
        answers: {
            an1: "ul",
            an2: "dl",
            an3: "ol",
            an4: "list",
    },
    right: "3",
    status: false
    
},

    {ques: 'Which HTML attribute specifies an alternate text for an image?',
    answers: {
        an1: "src",
        an2: "longdesc",
        an3: "alt",
        an4: "title",
    },
    right: "4",
    status: false
},

    {ques: 'Which input type defines a slider control?',
    answers: {
        an1: "search",
        an2: "range",
        an3: "slider",
        an4: "controls",
    },
    right: "2",
    status: false
},

    {ques: 'Which HTML element is used to specify a header for a document or section?',
    answers: {
        an1: "head",
        an2: "top",
        an3: "header",
        an4: "section",
    },
    right: "3",
    status: false
},
    {ques: 'Which HTML attribute is used to define inline styles?',
    answers: {
        an1: "styles",
        an2: "class",
        an3: "font",
        an4: "style",
    },
    right: "4",
    status: false
},
    {ques: "How do you select elements with class name 'test'?",
    answers: {
        an1: "*test",
        an2: "test",
        an3: ".test",
        an4: "#test",
    },
    right: "3",
    status: false
},
    {ques: 'Which character is used to indicate an end tag?',
    answers: {
        an1: "<",
        an2: "^",
        an3: "/",
        an4: "*",
    },
    right: "3",
    status: false
},
    {ques: 'What does HTML stand for?',
    answers: {
        an1: "Hyper Trainer Marking Language",
        an2: "Hyper Text Marketing Language",
        an3: "Hyper Text Markup Language",
        an4: "Hyper Text Markup Leveler",
    },
    right: "3",
    status: false
},
    {ques: '<h1>Text</h1> is the correct way of making a header in HTML.',
    answers: {
        an1: "True",
        an2: "False",
        an3: "yes",
        an4: "no",
    },
    right: "1",
    status: false
},
    {ques: 'Choose the correct HTML element to define important text',
    answers: {
        an1: "b",
        an2: "strong",
        an3: "important",
        an4: "i",
    },
    right: "2",
    status: false
},
]

var topUser = [
    {name: "mostafa mnoon", points: 3},
    {name: "ahmed qadura",points: 2},
    {name: "narman khateb", points: 5},
    {name: "baraa shaaban", points: 6},
    {name: "mones eid", points: 8},
    {name: "seham jomaa", points: 9},
    {name: "luffy dragon", points: 4},

]

var start_quiz = document.querySelector('.start_quiz')
var agree_about = document.querySelector('.agree_about')
var send_name = document.querySelector('.send_name')
var qustion_and_options = document.querySelector('.qustion_and_options')
var btn_next = document.querySelector('.btn_next')
var time_up = document.querySelector('.time_up')
var my_quiz_mark = document.querySelector('.my_quiz_mark')
var question_and_options = document.querySelector('.question_and_options')
var count_numer_question = document.querySelector('.count_numer_question')
var pop_start_quiz = document.querySelector('.pop_start_quiz')
var layout = document.querySelector('.layout')
var all_user_top = document.querySelector('.all_user_top')
var pop_about_quiz = document.querySelector('.pop_about_quiz')
var pop_name_user = document.querySelector('.pop_name_user')
var btn_agree = document.querySelector('.btn_agree button')
var input_get_name = document.querySelector('.input_get_name')
var get_user_new = document.querySelector('.get_user_new')
var timeStart = 600
var nameValue = ''


// first pop for about quiz
window.onload = ()=>{

    if(localStorage.getItem('username')){
        console.log('yes here');
        get_user_new.innerHTML = localStorage.getItem('username')
        nameValue = localStorage.getItem('username')
    }
    else{
        pop_about_quiz.classList.add('active')
        layout.classList.add('active')
    }
}

btn_agree.addEventListener('click', ()=>{
    pop_about_quiz.classList.remove('active')
    pop_name_user.classList.add('active')
})

// get name user
send_name.addEventListener('click',()=>{
   nameValue = input_get_name.value
    pop_name_user.classList.remove('active')
    layout.classList.remove('active')
    console.log(nameValue);
    get_user_new.innerHTML = nameValue
    localStorage.setItem('username', nameValue)
})


// start quiz and call timer
start_quiz.addEventListener('click',()=>{
    pop_start_quiz.classList.add('active')
    layout.classList.add('active')

    var timer =  setInterval(()=>{
        if( timeStart < 1  ){
            clearInterval(timer)
            eventsFinish()
        }

        totalTime(--timeStart)
           
    },1000)

})

var nums = 0
var counts = 1
var myTotalPoints = 0
var statusChecked = false
callQustion(nums)
checked(nums)

var question_now = document.querySelector('.question_now')

//events next qustion
btn_next.addEventListener('click',()=>{

    if(statusChecked == false){
    }else{
        myTotalPoints++
        statusChecked = false
        question[nums].status = true
    }

   btn_next.classList.remove('active')
   nums++
   count_numer_question.innerHTML = ++counts

   if(counts > 10){
    eventsFinish()
    }else{
        callQustion(nums)
        checked(nums)
    }
})


if(localStorage.getItem('savetotalpoint')){
    console.log(localStorage.getItem('savetotalpoint'));
    printData()
    start_quiz.style.pointerEvents = 'none'

}


// update time
function printData(){

    let gettotalpoint  = JSON.parse(localStorage.getItem('savetotalpoint'))
    let getstatus  = JSON.parse(localStorage.getItem('savestatus'))
    
    if(localStorage.getItem('savetotalpoint')){
        myTotalPoints = gettotalpoint
    }
    
    my_quiz_mark.innerHTML = `
    <div class="my_mark">
        <span> your mark is ${myTotalPoints} from 10</span>
    </div>
    <div class="status_question_answer">
    </div>
`
if(localStorage.getItem('savestatus')){
    question = getstatus
}
var status_question_answer = document.querySelector('.status_question_answer')

    for (let i = 0; i < question.length; i++) {
       if(question[i].status == true){
            status_question_answer.innerHTML+= `<span class="good_answer">qustion ${i+1} good</span>`
        }else{
            status_question_answer.innerHTML+= `<span class="bad_answer">qustion ${i+1} bad</span>`
        }

    }
}

// send questions
function callQustion(nums){

    question_and_options.innerHTML = `
<div class="question_now">
    <span>${question[nums].ques}</span>
    </div>

    <div class="container_answers">
    <div class="answer_one" data-selectIs='1'>
        <input type="radio" name="answer_select" id="answer_select1">
        <label for="answer_select1">${question[nums].answers.an1}</label>
    </div>

    <div class="answer_one" data-selectIs='2'>
        <input type="radio" name="answer_select" id="answer_select2">
        <label for="answer_select2">${question[nums].answers.an2}</label>
    </div>

    <div class="answer_one" data-selectIs='3'>
        <input type="radio" name="answer_select" id="answer_select3">
        <label for="answer_select3">${question[nums].answers.an3}</label>
    </div>

    <div class="answer_one" data-selectIs='4'>
        <input type="radio" name="answer_select" id="answer_select4">
        <label for="answer_select4">${question[nums].answers.an4}</label>
    </div>
</div>

`
}

// for active btn next and get value checked
function checked(nums){

var answer_one = document.querySelectorAll('.answer_one')

answer_one.forEach(select=>{
    select.addEventListener('click',()=>{
    btn_next.classList.add('active')
     var selected =  select.getAttribute('data-selectIs')
     if(selected == question[nums].right){
        statusChecked = true
    }

})})
}

//  timer end quiz
function totalTime(timeStart){
    var min = Math.floor(timeStart / 60);
    var sec = timeStart % 60;
    min = (min < 10) ? "0" + min : min;
    sec = (sec < 10) ? "0" + sec : sec;
    time_up.textContent = + min + ":" + sec;
}

// when user finish or times up
function eventsFinish(){
    pop_start_quiz.classList.remove('active')
    layout.classList.remove('active')
    printData()
    start_quiz.style.pointerEvents = 'none'
    topUser.push({name: nameValue, points:myTotalPoints})
    all_user_top.innerHTML = ''
    topUserTest()


    // save total points
    
    let saveTotalPoints = JSON.stringify(myTotalPoints)
    localStorage.setItem('savetotalpoint', saveTotalPoints)


    // save data status question
    let newArrayStatus = []
    for (let q = 0; q < question.length; q++) {
        newArrayStatus.push({status: question[q].status})
    }
    console.log(newArrayStatus);
    let saveStatusQues = JSON.stringify(newArrayStatus)
    localStorage.setItem('savestatus', saveStatusQues)


    // dave data top points
    let saveTop = JSON.stringify(topUser)
    localStorage.setItem('savetop', saveTop)

}



// for resend tops user

topUserTest()

function topUserTest(){
    
    if(localStorage.getItem('savetop')){
        topUser = JSON.parse(localStorage.getItem('savetop'))

    }

topUser.sort((a, b) => (b.points > a.points) ? 1 : -1)

for (let c = 0; c < topUser.length; c++) {

    all_user_top.innerHTML += `
    <div class="card_user_info">
        <div class="_in_side_content">
            <div class="img_top_user">
                <img src="./src/025948.png" alt="">
            </div>
            <div class="name_user_top">
                <span>${topUser[c].name}</span>
            </div>
        </div>
        <div class="points_user_top">
            <span class="span1">${topUser[c].points}</span>
            <span class="span2">points</span>
        </div>
    </div>
    `
    
}



}


