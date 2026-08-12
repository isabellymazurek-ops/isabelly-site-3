/* ============================================================
   IMPORTAÇÕES THREE.JS
============================================================ */

import * as THREE from "three";

import {
    OrbitControls
} from "three/addons/controls/OrbitControls.js";


/* ============================================================
   TEMA ESCURO / CLARO
============================================================ */

const themeButton =
    document.getElementById("themeButton");

const savedTheme =
    localStorage.getItem("spaceTheme");

if (savedTheme === "light") {

    document.body.classList.add("light");

    themeButton.textContent = "☀️";
}

themeButton.addEventListener("click", () => {

    document.body.classList.toggle("light");

    const isLight =
        document.body.classList.contains("light");

    themeButton.textContent =
        isLight ? "☀️" : "🌙";

    localStorage.setItem(
        "spaceTheme",
        isLight ? "light" : "dark"
    );

});


/* ============================================================
   MENU MOBILE
============================================================ */

const menuButton =
    document.getElementById("menuButton");

const navigation =
    document.getElementById("navigation");

menuButton.addEventListener("click", () => {

    navigation.classList.toggle("active");

});

document.querySelectorAll("#navigation a")
    .forEach(link => {

        link.addEventListener("click", () => {

            navigation.classList.remove("active");

        });

    });


/* ============================================================
   ANIMAÇÕES AO ROLAR
============================================================ */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                }

            });

        },
        {
            threshold: 0.12
        }
    );

revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* ============================================================
   DADOS DOS PLANETAS
============================================================ */

const planetData = {

    Mercúrio: {

        icon: "☿",

        description:
            "Mercúrio é o menor planeta do Sistema Solar e o mais próximo do Sol. Por estar tão perto da nossa estrela, possui grandes variações de temperatura entre o dia e a noite.",

        type: "Rochoso",

        diameter: "4.879 km",

        moons: "0"

    },

    Vênus: {

        icon: "♀",

        description:
            "Vênus possui uma atmosfera extremamente densa e é conhecido por apresentar temperaturas superficiais muito elevadas. Seu tamanho é parecido com o da Terra.",

        type: "Rochoso",

        diameter: "12.104 km",

        moons: "0"

    },

    Terra: {

        icon: "🌍",

        description:
            "A Terra é o terceiro planeta a partir do Sol e o único mundo conhecido que possui vida. Sua superfície apresenta grandes quantidades de água líquida.",

        type: "Rochoso",

        diameter: "12.742 km",

        moons: "1"

    },

    Marte: {

        icon: "♂",

        description:
            "Marte é conhecido como planeta vermelho devido à presença de minerais ricos em ferro em sua superfície. O planeta é um dos principais alvos da exploração espacial.",

        type: "Rochoso",

        diameter: "6.779 km",

        moons: "2"

    },

    Júpiter: {

        icon: "♃",

        description:
            "Júpiter é o maior planeta do Sistema Solar. Ele é um gigante gasoso e apresenta uma atmosfera marcada por enormes tempestades.",

        type: "Gigante gasoso",

        diameter: "139.820 km",

        moons: "Muitas"

    },

    Saturno: {

        icon: "♄",

        description:
            "Saturno é um gigante gasoso famoso por seus impressionantes anéis. O sistema de anéis é formado por partículas de diferentes tamanhos.",

        type: "Gigante gasoso",

        diameter: "116.460 km",

        moons: "Muitas"

    },

    Urano: {

        icon: "♅",

        description:
            "Urano é um gigante de gelo e possui uma rotação muito inclinada. Sua atmosfera apresenta uma coloração azul-esverdeada.",

        type: "Gigante de gelo",

        diameter: "50.724 km",

        moons: "Muitas"

    },

    Netuno: {

        icon: "♆",

        description:
            "Netuno é o planeta mais distante do Sol entre os oito planetas. É um gigante de gelo com ventos extremamente rápidos.",

        type: "Gigante de gelo",

        diameter: "49.244 km",

        moons: "Muitas"

    }

};


/* ============================================================
   MODAL DOS PLANETAS
============================================================ */

const planetModal =
    document.getElementById("planetModal");

const closeModal =
    document.getElementById("closeModal");

const modalPlanetIcon =
    document.getElementById("modalPlanetIcon");

const modalPlanetName =
    document.getElementById("modalPlanetName");

const modalPlanetDescription =
    document.getElementById("modalPlanetDescription");

const modalType =
    document.getElementById("modalType");

const modalDiameter =
    document.getElementById("modalDiameter");

const modalMoons =
    document.getElementById("modalMoons");


function openPlanetModal(name) {

    const planet =
        planetData[name];

    if (!planet) return;

    modalPlanetIcon.textContent =
        planet.icon;

    modalPlanetName.textContent =
        name;

    modalPlanetDescription.textContent =
        planet.description;

    modalType.textContent =
        planet.type;

    modalDiameter.textContent =
        planet.diameter;

    modalMoons.textContent =
        planet.moons;

    planetModal.classList.add("active");

}


document.querySelectorAll(".planet-card")
    .forEach(card => {

        const button =
            card.querySelector(".planet-button");

        button.addEventListener("click", () => {

            openPlanetModal(
                card.dataset.planet
            );

        });

    });


closeModal.addEventListener("click", () => {

    planetModal.classList.remove("active");

});


planetModal.addEventListener("click", event => {

    if (event.target === planetModal) {

        planetModal.classList.remove("active");

    }

});


/* ============================================================
   THREE.JS - SISTEMA SOLAR
============================================================ */

const solarContainer =
    document.getElementById("solarSystem");

let scene;
let camera;
let renderer;
let controls;

const planets3D = [];

function createSolarSystem() {

    const width =
        solarContainer.clientWidth;

    const height =
        solarContainer.clientHeight;


    /* CENA */

    scene =
        new THREE.Scene();


    /* CÂMERA */

    camera =
        new THREE.PerspectiveCamera(
            60,
            width / height,
            0.1,
            2000
        );

    camera.position.set(
        0,
        100,
        230
    );


    /* RENDERIZADOR */

    renderer =
        new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });

    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, 2)
    );

    renderer.setSize(
        width,
        height
    );

    renderer.outputColorSpace =
        THREE.SRGBColorSpace;

    solarContainer.appendChild(
        renderer.domElement
    );


    /* CONTROLES */

    controls =
        new OrbitControls(
            camera,
            renderer.domElement
        );

    controls.enableDamping = true;

    controls.dampingFactor = 0.04;

    controls.minDistance = 80;

    controls.maxDistance = 500;


    /* LUZ DO SOL */

    const sunLight =
        new THREE.PointLight(
            0xffffff,
            5,
            1000
        );

    scene.add(sunLight);


    const ambientLight =
        new THREE.AmbientLight(
            0x334466,
            0.7
        );

    scene.add(ambientLight);


    /* SOL */

    const sunGeometry =
        new THREE.SphereGeometry(
            16,
            48,
            48
        );

    const sunMaterial =
        new THREE.MeshBasicMaterial({
            color: 0xffcc33
        });

    const sun =
        new THREE.Mesh(
            sunGeometry,
            sunMaterial
        );

    scene.add(sun);


    /* BRILHO DO SOL */

    const sunGlowGeometry =
        new THREE.SphereGeometry(
            21,
            32,
            32
        );

    const sunGlowMaterial =
        new THREE.MeshBasicMaterial({
            color: 0xffaa00,
            transparent: true,
            opacity: 0.12
        });

    const sunGlow =
        new THREE.Mesh(
            sunGlowGeometry,
            sunGlowMaterial
        );

    scene.add(sunGlow);


    /* PLANETAS */

    const planetSettings = [

        {
            name: "Mercúrio",
            distance: 30,
            size: 2.2,
            color: 0x8a8a8a,
            speed: 0.02
        },

        {
            name: "Vênus",
            distance: 45,
            size: 3.4,
            color: 0xd6a65d,
            speed: 0.015
        },

        {
            name: "Terra",
            distance: 62,
            size: 3.8,
            color: 0x2674d9,
            speed: 0.012
        },

        {
            name: "Marte",
            distance: 80,
            size: 3,
            color: 0xb9472d,
            speed: 0.01
        },

        {
            name: "Júpiter",
            distance: 108,
            size: 8,
            color: 0xc9976b,
            speed: 0.006
        },

        {
            name: "Saturno",
            distance: 140,
            size: 7,
            color: 0xd6bd82,
            speed: 0.004
        },

        {
            name: "Urano",
            distance: 170,
            size: 5,
            color: 0x6fd6e8,
            speed: 0.003
        },

        {
            name: "Netuno",
            distance: 200,
            size: 4.8,
            color: 0x315bd9,
            speed: 0.002
        }

    ];


    planetSettings.forEach(data => {

        /* ÓRBITA */

        const orbitGeometry =
            new THREE.RingGeometry(
                data.distance - 0.1,
                data.distance + 0.1,
                128
            );

        const orbitMaterial =
            new THREE.MeshBasicMaterial({
                color: 0x6688aa,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.18
            });

        const orbit =
            new THREE.Mesh(
                orbitGeometry,
                orbitMaterial
            );

        orbit.rotation.x =
            Math.PI / 2;

        scene.add(orbit);


        /* PLANETA */

        const geometry =
            new THREE.SphereGeometry(
                data.size,
                32,
                32
            );

        const material =
            new THREE.MeshStandardMaterial({
                color: data.color,
                roughness: 0.8,
                metalness: 0.05
            });

        const planet =
            new THREE.Mesh(
                geometry,
                material
            );

        planet.position.x =
            data.distance;

        planet.userData =
            data;

        scene.add(planet);

        planets3D.push({

            mesh: planet,

            distance: data.distance,

            speed: data.speed,

            angle:
                Math.random() * Math.PI * 2,

            name: data.name

        });


        /* ANÉIS DE SATURNO */

        if (data.name === "Saturno") {

            const ringGeometry =
                new THREE.RingGeometry(
                    data.size + 2,
                    data.size + 5,
                    64
                );

            const ringMaterial =
                new THREE.MeshBasicMaterial({
                    color: 0xd8c59a,
                    side: THREE.DoubleSide,
                    transparent: true,
                    opacity: 0.7
                });

            const ring =
                new THREE.Mesh(
                    ringGeometry,
                    ringMaterial
                );

            ring.rotation.x =
                Math.PI / 2.4;

            planet.add(ring);

        }

    });


    /* ESTRELAS */

    const starGeometry =
        new THREE.BufferGeometry();

    const starPositions = [];

    for (
        let i = 0;
        i < 3000;
        i++
    ) {

        starPositions.push(
            (Math.random() - 0.5) * 1500
        );

        starPositions.push(
            (Math.random() - 0.5) * 1500
        );

        starPositions.push(
            (Math.random() - 0.5) * 1500
        );

    }

    starGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(
            starPositions,
            3
        )
    );

    const starMaterial =
        new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.7
        });

    const stars =
        new THREE.Points(
            starGeometry,
            starMaterial
        );

    scene.add(stars);


    /* RESIZE */

    window.addEventListener(
        "resize",
        resizeSolarSystem
    );


    animateSolarSystem();

}


function resizeSolarSystem() {

    if (!renderer) return;

    const width =
        solarContainer.clientWidth;

    const height =
        solarContainer.clientHeight;

    camera.aspect =
        width / height;

    camera.updateProjectionMatrix();

    renderer.setSize(
        width,
        height
    );

}


function animateSolarSystem() {

    requestAnimationFrame(
        animateSolarSystem
    );


    planets3D.forEach(planet => {

        planet.angle +=
            planet.speed;

        planet.mesh.position.x =
            Math.cos(planet.angle)
            * planet.distance;

        planet.mesh.position.z =
            Math.sin(planet.angle)
            * planet.distance;

        planet.mesh.rotation.y +=
            0.01;

    });


    controls.update();

    renderer.render(
        scene,
        camera
    );

}


/* Iniciar somente quando existir */

if (solarContainer) {

    createSolarSystem();

}


/* ============================================================
   CLIQUE NOS PLANETAS 3D
============================================================ */

const raycaster =
    new THREE.Raycaster();

const mouse =
    new THREE.Vector2();

solarContainer.addEventListener(
    "click",
    event => {

        const rect =
            solarContainer.getBoundingClientRect();

        mouse.x =
            ((event.clientX - rect.left)
            / rect.width) * 2 - 1;

        mouse.y =
            -((event.clientY - rect.top)
            / rect.height) * 2 + 1;

        raycaster.setFromCamera(
            mouse,
            camera
        );

        const objects =
            planets3D.map(
                planet => planet.mesh
            );

        const intersections =
            raycaster.intersectObjects(
                objects
            );

        if (
            intersections.length > 0
        ) {

            const selected =
                intersections[0].object;

            const name =
                selected.userData.name;

            document.getElementById(
                "selectedPlanet"
            ).textContent = name;

            document.getElementById(
                "planetDescription"
            ).textContent =
                planetData[name].description;

        }

    }
);


/* ============================================================
   SIMULADOR DE FOGUETE
============================================================ */

const launchButton =
    document.getElementById(
        "launchButton"
    );

const rocket =
    document.getElementById(
        "rocket"
    );

const rocketFire =
    document.getElementById(
        "rocketFire"
    );

const rocketSpace =
    document.querySelector(
        ".rocket-space"
    );

const countdown =
    document.getElementById(
        "countdown"
    );

const altitude =
    document.getElementById(
        "altitude"
    );

const speed =
    document.getElementById(
        "speed"
    );

const fuel =
    document.getElementById(
        "fuel"
    );

const launchStatus =
    document.getElementById(
        "launchStatus"
    );


let launching =
    false;


launchButton.addEventListener(
    "click",
    () => {

        if (launching) return;

        launching = true;

        launchButton.disabled =
            true;

        launchButton.textContent =
            "🚀 LANÇAMENTO EM ANDAMENTO";

        let counter = 10;

        countdown.textContent =
            counter;

        launchStatus.textContent =
            "Preparando motores...";


        const countdownInterval =
            setInterval(() => {

                counter--;

                countdown.textContent =
                    counter;

                if (counter === 5) {

                    launchStatus.textContent =
                        "Motores iniciados!";

                }

                if (counter <= 0) {

                    clearInterval(
                        countdownInterval
                    );

                    startRocketLaunch();

                }

            }, 800);

    }
);


function startRocketLaunch() {

    launchStatus.textContent =
        "LANÇAMENTO! 🚀";

    rocketSpace.classList.add(
        "launching"
    );

    let currentAltitude = 0;

    let currentSpeed = 0;

    let currentFuel = 100;


    const telemetry =
        setInterval(() => {

            currentAltitude +=
                Math.random() * 30 + 10;

            currentSpeed +=
                Math.random() * 0.5 + 0.1;

            currentFuel -=
                Math.random() * 2 + 1;

            if (currentFuel < 0) {

                currentFuel = 0;

            }

            altitude.textContent =
                currentAltitude.toFixed(0)
                + " km";

            speed.textContent =
                currentSpeed.toFixed(2)
                + " km/s";

            fuel.textContent =
                currentFuel.toFixed(0)
                + "%";


        }, 400);


    setTimeout(() => {

        clearInterval(telemetry);

        launchStatus.textContent =
            "🎉 MISSÃO CONCLUÍDA! O foguete entrou em órbita.";

        countdown.textContent =
            "✓";

        launchButton.textContent =
            "🔄 NOVA MISSÃO";

        launchButton.disabled =
            false;

        launchButton.onclick =
            resetRocket;

    }, 8000);

}


function resetRocket() {

    rocketSpace.classList.remove(
        "launching"
    );

    countdown.textContent =
        "10";

    altitude.textContent =
        "0 km";

    speed.textContent =
        "0 km/s";

    fuel.textContent =
        "100%";

    launchStatus.textContent =
        "Sistema pronto para lançamento.";

    launchButton.textContent =
        "🚀 INICIAR LANÇAMENTO";

    launchButton.disabled =
        false;

    launching = false;

    launchButton.onclick = null;

    launchButton.addEventListener(
        "click",
        launchAgainHandler,
        {
            once: true
        }
    );

}


/* ============================================================
   QUIZ
============================================================ */

const questions = [

    {
        question:
            "Qual é o planeta mais próximo do Sol?",

        answers: [
            "Terra",
            "Mercúrio",
            "Marte",
            "Vênus"
        ],

        correct: 1
    },

    {
        question:
            "Qual é o maior planeta do Sistema Solar?",

        answers: [
            "Saturno",
            "Netuno",
            "Júpiter",
            "Urano"
        ],

        correct: 2
    },

    {
        question:
            "Qual planeta é conhecido como planeta vermelho?",

        answers: [
            "Marte",
            "Vênus",
            "Mercúrio",
            "Terra"
        ],

        correct: 0
    },

    {
        question:
            "Qual planeta é famoso por seus anéis?",

        answers: [
            "Júpiter",
            "Saturno",
            "Netuno",
            "Marte"
        ],

        correct: 1
    },

    {
        question:
            "Qual é a estrela localizada no centro do Sistema Solar?",

        answers: [
            "Sirius",
            "Polaris",
            "Sol",
            "Betelgeuse"
        ],

        correct: 2
    },

    {
        question:
            "Qual foi a missão que levou os primeiros humanos à Lua?",

        answers: [
            "Apollo 11",
            "Voyager 1",
            "Hubble",
            "Gemini 4"
        ],

        correct: 0
    },

    {
        question:
            "Qual planeta possui uma rotação extremamente inclinada?",

        answers: [
            "Terra",
            "Urano",
            "Marte",
            "Mercúrio"
        ],

        correct: 1
    },

    {
        question:
            "Qual é o planeta mais distante do Sol entre os oito planetas?",

        answers: [
            "Saturno",
            "Urano",
            "Netuno",
            "Júpiter"
        ],

        correct: 2
    },

    {
        question:
            "Qual telescópio espacial revolucionou as observações astronômicas desde 1990?",

        answers: [
            "Hubble",
            "Kepler",
            "Spitzer",
            "Chandra"
        ],

        correct: 0
    },

    {
        question:
            "Como é chamado o conjunto de planetas, asteroides e outros objetos que orbitam o Sol?",

        answers: [
            "Via Láctea",
            "Sistema Solar",
            "Galáxia Solar",
            "Cinturão Solar"
        ],

        correct: 1
    }

];


let currentQuestion = 0;

let score = 0;

let xp = 0;

let answered = false;


const questionElement =
    document.getElementById(
        "question"
    );

const answersElement =
    document.getElementById(
        "answers"
    );

const questionNumber =
    document.getElementById(
        "questionNumber"
    );

const xpElement =
    document.getElementById(
        "xp"
    );

const quizProgress =
    document.getElementById(
        "quizProgress"
    );

const quizResult =
    document.getElementById(
        "quizResult"
    );

const nextQuestion =
    document.getElementById(
        "nextQuestion"
    );


function loadQuestion() {

    answered = false;

    const question =
        questions[currentQuestion];

    questionElement.textContent =
        question.question;

    questionNumber.textContent =
        currentQuestion + 1;

    quizProgress.style.width =
        ((currentQuestion + 1)
        / questions.length * 100)
        + "%";

    answersElement.innerHTML = "";

    quizResult.textContent = "";

    nextQuestion.style.display =
        "none";


    question.answers.forEach(
        (answer, index) => {

            const button =
                document.createElement(
                    "button"
                );

            button.className =
                "answer";

            button.textContent =
                answer;

            button.addEventListener(
                "click",
                () => selectAnswer(
                    index,
                    button
                )
            );

            answersElement.appendChild(
                button
            );

        }
    );

}


function selectAnswer(
    selectedIndex,
    selectedButton
) {

    if (answered) return;

    answered = true;

    const question =
        questions[currentQuestion];

    const buttons =
        document.querySelectorAll(
            ".answer"
        );


    buttons.forEach(
        (button, index) => {

            button.disabled =
                true;

            if (
                index ===
                question.correct
            ) {

                button.classList.add(
                    "correct"
                );

            }

        }
    );


    if (
        selectedIndex ===
        question.correct
    ) {

        score++;

        xp += 100;

        xpElement.textContent =
            xp;

        selectedButton.classList.add(
            "correct"
        );

        quizResult.textContent =
            "🎉 Resposta correta! +100 XP";

        quizResult.style.color =
            "#4ade80";

    } else {

        selectedButton.classList.add(
            "wrong"
        );

        quizResult.textContent =
            "❌ Resposta incorreta.";

        quizResult.style.color =
            "#f87171";

    }


    nextQuestion.style.display =
        "block";

}


nextQuestion.addEventListener(
    "click",
    () => {

        currentQuestion++;

        if (
            currentQuestion >=
            questions.length
        ) {

            finishQuiz();

            return;

        }

        loadQuestion();

    }
);


function finishQuiz() {

    questionElement.textContent =
        "🚀 MISSÃO CONCLUÍDA!";

    answersElement.innerHTML = "";

    quizResult.innerHTML =
        `
        Você acertou <strong>
        ${score}
        </strong> de
        <strong>
        ${questions.length}
        </strong>
        perguntas.
        <br><br>
        ⭐ Você conquistou
        <strong>${xp} XP</strong>!
        `;

    quizResult.style.color =
        "#38bdf8";

    nextQuestion.textContent =
        "🔄 JOGAR NOVAMENTE";

    nextQuestion.style.display =
        "block";

    nextQuestion.onclick =
        restartQuiz;

}


function restartQuiz() {

    currentQuestion = 0;

    score = 0;

    xp = 0;

    xpElement.textContent =
        "0";

    nextQuestion.textContent =
        "PRÓXIMA PERGUNTA →";

    nextQuestion.onclick = null;

    nextQuestion.addEventListener(
        "click",
        () => {

            currentQuestion++;

            loadQuestion();

        },
        {
            once: true
        }
    );

    loadQuestion();

}


loadQuestion();


/* ============================================================
   COMENTÁRIOS
============================================================ */

const commentForm =
    document.getElementById(
        "commentForm"
    );

const commentsList =
    document.getElementById(
        "commentsList"
    );


let comments =
    JSON.parse(
        localStorage.getItem(
            "spaceComments"
        )
    ) || [];


function saveComments() {

    localStorage.setItem(
        "spaceComments",
        JSON.stringify(comments)
    );

}


function renderComments() {

    commentsList.innerHTML = "";


    if (comments.length === 0) {

        commentsList.innerHTML = `
            <div class="comment">
                <p>
                    Ainda não existem comentários.
                    Seja o primeiro a compartilhar sua opinião! 🚀
                </p>
            </div>
        `;

        return;

    }


    comments
        .slice()
        .reverse()
        .forEach(comment => {

            const element =
                document.createElement(
                    "article"
                );

            element.className =
                "comment";

            element.innerHTML =
                `
                <div class="comment-header">

                    <div>

                        <div class="comment-name">
                            ${escapeHTML(comment.name)}
                        </div>

                        <div>
                            ${"⭐".repeat(comment.rating)}
                        </div>

                    </div>

                    <div class="comment-date">
                        ${comment.date}
                    </div>

                </div>

                <p>
                    ${escapeHTML(comment.text)}
                </p>
                `;

            commentsList.appendChild(
                element
            );

        });

}


function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


commentForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const name =
            document.getElementById(
                "commentName"
            ).value.trim();

        const rating =
            Number(
                document.getElementById(
                    "commentRating"
                ).value
            );

        const text =
            document.getElementById(
                "commentText"
            ).value.trim();


        if (
            !name ||
            !text
        ) {

            return;

        }


        comments.push({

            name,

            rating,

            text,

            date:
                new Date()
                    .toLocaleDateString(
                        "pt-BR"
                    )

        });


        saveComments();

        renderComments();

        commentForm.reset();

    }
);


renderComments();


/* ============================================================
   NOTIFICAÇÕES DAS NOTÍCIAS
============================================================ */

document
    .querySelectorAll(".read-button")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                alert(
                    "Esta seção pode ser conectada futuramente a uma API de notícias espaciais."
                );

            }
        );

    });


/* ============================================================
   VÍDEOS
============================================================ */

document
    .querySelectorAll(".video-placeholder")
    .forEach(video => {

        video.style.cursor =
            "pointer";

        video.addEventListener(
            "click",
            () => {

                alert(
                    "Área preparada para adicionar vídeos de exploração espacial."
                );

            }
        );

    });


/* ============================================================
   FUNÇÃO DO LANÇAMENTO
============================================================ */

function launchAgainHandler() {

    resetRocket();

    launchButton.removeEventListener(
        "click",
        launchAgainHandler
    );

    launchButton.addEventListener(
        "click",
        () => {

            if (launching) return;

            launching = true;

            launchButton.disabled = true;

            launchButton.textContent =
                "🚀 LANÇAMENTO EM ANDAMENTO";

            let counter = 10;

            countdown.textContent =
                counter;

            launchStatus.textContent =
                "Preparando motores...";

            const interval =
                setInterval(() => {

                    counter--;

                    countdown.textContent =
                        counter;

                    if (counter <= 0) {

                        clearInterval(interval);

                        startRocketLaunch();

                    }

                }, 800);

        }
    );

}


/* ============================================================
   FIM
============================================================ */

console.log(
    "%c🚀 EXPLORAÇÃO ESPACIAL",
    "color:#38bdf8;font-size:20px;font-weight:bold;"
);

console.log(
    "Sistema carregado com sucesso."
);
