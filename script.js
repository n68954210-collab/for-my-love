const opening = document.getElementById("opening");
const countdownBtn = document.getElementById("countdown-btn");
const countdownPage = document.getElementById("countdown-page");
const backBtn = document.getElementById("back-btn");
const musicBtn = document.getElementById("music-btn");
const musicPage = document.getElementById("music-page");
const musicBack = document.getElementById("music-back");
const menu = document.getElementById("menu");

opening.addEventListener("click", () => {

    opening.style.display = "none";

    menu.style.display = "block";

});
// ======================
// COUNTDOWN
// ======================

const todayInput = document.getElementById("today-date");
const targetInput = document.getElementById("target-date");
const daysText = document.getElementById("days");

// Sayfayı aç
countdownBtn.onclick = () => {

    menu.style.display = "none";
    countdownPage.style.display = "block";

};

// Menüye dön
backBtn.onclick = () => {

    countdownPage.style.display = "none";
    menu.style.display = "block";

};

// Bugünün tarihini otomatik yaz
const today = new Date();

const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, "0");
const dd = String(today.getDate()).padStart(2, "0");

todayInput.value = `${yyyy}-${mm}-${dd}`;

// Hedef tarih değiştirildiğinde sayacı güncelle
targetInput.addEventListener("change", updateCountdown);
// İstersen bunu kendi tarihin yap


// Gün hesabı
function updateCountdown(){

    if(targetInput.value === "") return;

    const todayDate = new Date(todayInput.value);
    const targetDate = new Date(targetInput.value);

    const diff = targetDate - todayDate;

    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    if(days < 0){

        daysText.innerHTML = "0 Gün";

    }else{

        daysText.innerHTML = days + " Gün";

    }

}

// Tarih değişince tekrar hesapla
todayInput.addEventListener("change", updateCountdown);
targetInput.addEventListener("change", updateCountdown);

// İlk açılışta hesapla
updateCountdown();
musicBtn.onclick = () => {

    menu.style.display = "none";

    musicPage.style.display = "block";

}

musicBack.onclick = () => {

    musicPage.style.display = "none";

    menu.style.display = "block";

}
// ======================
// TO-DO LIST
// ======================

const todoBtn = document.getElementById("todo-btn");
const todoPage = document.getElementById("todo-page");
const todoBack = document.getElementById("todo-back");
const todoList = document.getElementById("todo-list");
const addTaskBtn = document.getElementById("add-task");
const newTaskInput = document.getElementById("new-task");

const defaultTodos = [
    { text: "Birlikte kahve içmek", completed: false },
    { text: "Gün batımı izlemek", completed: false },
    { text: "Polaroid fotoğraf çekmek", completed: false },
    { text: "Piknik yapmak", completed: false }
];

let todos = JSON.parse(localStorage.getItem("todos"));

if (!todos) {
    todos = defaultTodos;
    saveTodos();
}

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {

    todoList.innerHTML = "";

    todos.forEach((todo, index) => {

        const li = document.createElement("li");

        li.innerHTML = `
            <div class="left">
                <span class="heart">${todo.completed ? "💙" : "🤍"}</span>
                <span class="text">${todo.text}</span>
            </div>

            <button class="delete">🗑️</button>
        `;

        if (todo.completed) {
            li.classList.add("completed");
        }

        const left = li.querySelector(".left");
        const del = li.querySelector(".delete");

        left.onclick = () => {

            todos[index].completed = !todos[index].completed;

            saveTodos();

            renderTodos();

        };

        del.onclick = () => {

            todos.splice(index,1);

            saveTodos();

            renderTodos();

        };

        todoList.appendChild(li);

    });

}

renderTodos();

todoBtn.onclick = () => {

    menu.style.display = "none";
    todoPage.style.display = "block";

};

todoBack.onclick = () => {

    todoPage.style.display = "none";
    menu.style.display = "block";

};

function addTodo(){

    const value = newTaskInput.value.trim();

    if(value === "") return;

    todos.push({

        text:value,

        completed:false

    });

    saveTodos();

    renderTodos();

    newTaskInput.value="";

}

addTaskBtn.onclick = addTodo;

newTaskInput.addEventListener("keydown",(e)=>{

    if(e.key==="Enter"){

        addTodo();

    }

});
// ======================
// QUIZ
// ======================

const quizBtn = document.getElementById("quiz-btn");
const quizPage = document.getElementById("quiz-page");
const quizBack = document.getElementById("quiz-back");

const questionNumber = document.getElementById("question-number");
const question = document.getElementById("question");
const optionButtons = document.querySelectorAll(".option");

const prevBtn = document.getElementById("prev-question");
const nextBtn = document.getElementById("next-question");

const resultPage = document.getElementById("result-page");
const resultBack = document.getElementById("result-back");

const heartScore = document.getElementById("heart-score");
const scoreText = document.getElementById("score-text");
const resultMessage = document.getElementById("result-message");

const quiz = [

    {
        question:"Sevgili olduğumuz tarih hangisi?",
        options:["25/09","25/10","10/10","09/06"],
        answer:1
    },

    {
        question:"En sevdiğim renk hangisi?",
        options:["Mor","Pembe","Mavi","Yeşil"],
        answer:0
    },

    {
        question:"Seninle en çok yapmak istediğim aktivite hangisi?",
        options:["Yemek yapmak","Alışverişe çıkmak","Uyumak","Yüzmek"],
        answer:2
    },

    {
        question:"Erkek olsam olmak istediğim meslek?",
        options:["Tırcı","Bahçıvan","Sanayide herhangi bi usta ","Telefon tamircisi"],
        answer:0
    },

    {
        question:"Seni hangi kediye benzetiyorum?",
        options:["Beyaz kedi","Sarı kedi","Tekir","Siyah kedi"],
        answer:3
    }

];

let currentQuestion = 0;

let answers = new Array(quiz.length).fill(-1);

quizBtn.onclick = ()=>{
    console.log("Quiz butonuna basıldı");

    menu.style.display="none";
    quizPage.style.display="block";
    console.log("loadQuestion çağrılıyor");
    loadQuestion();

}

quizBack.onclick=()=>{

    quizPage.style.display="none";
    menu.style.display="block";

}
function loadQuestion(){
        console.log("loadQuestion çalıştı");

    questionNumber.innerHTML =
        "Soru " + (currentQuestion + 1) + " / " + quiz.length;

    question.innerHTML =
        quiz[currentQuestion].question;

    optionButtons.forEach((btn,index)=>{

        btn.innerHTML = quiz[currentQuestion].options[index];

        btn.classList.remove("selected");

        if(answers[currentQuestion]===index){

            btn.classList.add("selected");

        }

    });

    prevBtn.style.visibility =
        currentQuestion===0 ? "hidden" : "visible";

    if(currentQuestion===quiz.length-1){

        nextBtn.innerHTML="🎉 Sonucu Gör";

    }else{

        nextBtn.innerHTML="Sonraki →";

    }

}

optionButtons.forEach((button,index)=>{

    button.onclick=()=>{

        answers[currentQuestion]=index;

        optionButtons.forEach(btn=>{

            btn.classList.remove("selected");

        });

        button.classList.add("selected");

    }

});

prevBtn.onclick=()=>{

    if(currentQuestion>0){

        currentQuestion--;

        loadQuestion();

    }

};

nextBtn.onclick=()=>{

    if(answers[currentQuestion]===-1){

        alert("Bir şık seçmelisin ❤️");

        return;

    }

    if(currentQuestion<quiz.length-1){

        currentQuestion++;

        loadQuestion();

    }else{

        showResult();

    }

};
function showResult(){

    let score = 0;

    quiz.forEach((q,index)=>{

        if(answers[index]===q.answer){

            score++;

        }

    });

    quizPage.style.display="none";

    resultPage.style.display="block";

    scoreText.innerHTML = score + " / " + quiz.length;

    let hearts = "";

    for(let i=0;i<score;i++){

        hearts += "❤️ ";

    }

    for(let i=score;i<quiz.length;i++){

        hearts += "🤍 ";

    }

    heartScore.innerHTML = hearts;

    if(score===5){

        resultMessage.innerHTML =
        "hehehehheheheh beni iyi tanıyorsun aferim ödülünü isteyebilirsin";

    }else if(score===4){

        resultMessage.innerHTML =
        "herkes hata yapar ama sen herkes değilsin nasıl yaptın ya baya belliydi cevap";

    }else if(score===3){

        resultMessage.innerHTML =
        "kötü değil ama tripliksin";

    }else{

        resultMessage.innerHTML =
        "bu kadar tanımıyo olamazsın";

    }

}

resultBack.onclick=()=>{

    resultPage.style.display="none";

    menu.style.display="block";

    currentQuestion=0;

    answers.fill(-1);

    loadQuestion();

};
// ======================
// WHY
// ======================

const whyBtn = document.getElementById("why-btn");
const whyPage = document.getElementById("why-page");
const whyBack = document.getElementById("why-back");

const envelopes = document.querySelectorAll(".envelope");

// Menüden Why sayfasını aç
whyBtn.onclick = () => {

    menu.style.display = "none";
    whyPage.style.display = "block";

    // Açık zarf kalmasın
    envelopes.forEach(env => {
        env.classList.remove("open");
    });

};

// Menüye dön
whyBack.onclick = () => {

    whyPage.style.display = "none";
    menu.style.display = "block";

    envelopes.forEach(env => {
        env.classList.remove("open");
    });

};

// Zarfa tıklayınca
envelopes.forEach(envelope => {

    envelope.addEventListener("click", (e) => {

        e.stopPropagation();

        // Önce hepsini kapat
        envelopes.forEach(env => {

            if(env !== envelope){

                env.classList.remove("open");

            }

        });

        // Sonra tıklananı aç/kapat
        envelope.classList.toggle("open");

    });

});

// Boş yere tıklayınca kapanır
document.addEventListener("click", () => {

    envelopes.forEach(env => {

        env.classList.remove("open");

    });

});
