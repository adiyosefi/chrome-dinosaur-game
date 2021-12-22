import {incrementCustomProperty, getCustomProperty, setCustomProperty} from "./updateCustomProperty.js";

const worldElem = document.querySelector('[data-world]') // add cactus to screen
const SPEED = 0.05; // same as speed of ground
const CACTUS_INTERVAL_MIN = 500;
const CACTUS_INTERVAL_MAX = 2000;


let nextCactusTime
export function setupCactus() {
    nextCactusTime = CACTUS_INTERVAL_MAX
    // remove all old cactus on restart
    document.querySelectorAll('[data-cactus]').forEach(cactus => {
        cactus.remove()
    })
}

export function updateCactus(delta, speedScale) {
    document.querySelectorAll('[data-cactus]').forEach(cactus => {
        incrementCustomProperty(cactus, '--left', delta * speedScale * SPEED * -1)
        // if our cactus is way of the edge of the screen
        if (getCustomProperty(cactus, '--left') <= -100) {
            cactus.remove()
        }
    })

    if (nextCactusTime <= 0) {
        createCactus()
        nextCactusTime = randomNumberBetween(CACTUS_INTERVAL_MAX, CACTUS_INTERVAL_MAX) / speedScale
    }
    nextCactusTime -= delta
}

export function getCactusRects() {
    return [...document.querySelectorAll('[data-cactus]')].map(cactus => {
        return cactus.getBoundingClientRect()
    })
}

function createCactus() {
    const cactus = document.createElement('img')
    cactus.dataset.cactus = true
    cactus.src = `imgs/cactus.png`
    cactus.classList.add('cactus')
    setCustomProperty(cactus, '--left', 100)
    worldElem.append(cactus)
}

function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
