// make code cleaner + see if i can rewrite the fetch
const ballSet = document.getElementById('ballSet');
// rewrite pseudo into here
// try to make the code cleaner
// find a way for the users to know they can use arrow keys to use the prev/next btn


const updateCard = (pokeball) => {
    const cardContainer = document.querySelector('.cardContainer')
    const displayCard = `<div class="cardInfo">
    <h2 class="cardTitle">${pokeball.id}.${pokeball.name}</h2>
    <img class="cardImg" src="${pokeball.image}"/>
    
    <p class="cardEffect">${pokeball.effect}</p>
    <p class="cardCost">hover over me</p>
    </div>
    `
    cardContainer.innerHTML = displayCard
const cardCost = document.querySelector('.cardCost')
cardContainer.addEventListener("mouseover", () => {
    cardCost.innerHTML = pokeball.cost
})
cardContainer.addEventListener("mouseout", () => {
    cardCost.innerHTML = "hover over me"
})
}


const getPokeballs = () => {
    const listArr = [];
    for ( let i = 1; i <= 16; i++) {
        const url = `https://pokeapi.co/api/v2/item/${i}`;
        listArr.push(fetch(url)
        .then((response) => response.json()));
    }
    Promise.all(listArr).then((results) => {
        let i = 0;
        const info = results.map((data) => ({
            name: data.name,
            id: data.id,
            image: data.sprites['default'],
            effect: data.effect_entries[0].short_effect,
            cost: data.cost
        }));
        console.log(info);
        updateCard(info[i]);
        const nextbtn = document.getElementById('next')
        const prevbtn = document.getElementById('prev')
// add next eventlistener
        nextbtn.addEventListener('click', () => {
            if (i === info.length - 1) {
                i = 0
            } else {
                i++
            }
        updateCard(info[i])
        })
        
// add prev eventlistener
        prevbtn.addEventListener('click', () => {
            if (i === 0) {
                i = info.length - 1
            } else {
                i--
            }
            updateCard(info[i])
        })
        document.addEventListener('keydown', (event) => {
            if (event.key === "ArrowRight") {
                if (i === info.length - 1) {
                    i = 0
                } else {
                    i++
                }
            
            } else if (event.key === "ArrowLeft") {
                if (i === 0) {
                    i = info.length - 1
                } else {
                    i--
                }
            }
        updateCard(info[i])
        })
        
    })
}
getPokeballs();





