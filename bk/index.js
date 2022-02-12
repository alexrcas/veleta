const arrow = document.querySelector('#arrow');
let rotateAngle = 0;
let originalPosition = rotateAngle;
const oscilation = 4;
let direction = 1;

const angle = parseInt(arrow.dataset.angle);
rotateAngle = angle;
originalPosition = rotateAngle;

setInterval(() => {
    if (rotateAngle < originalPosition - oscilation) {
        direction = 1;
    }
    if (rotateAngle > originalPosition + oscilation) {
        direction = -1;
    }
    rotateAngle += 0.15 * direction;
    arrow.style.transform = `rotate(${rotateAngle}deg)`
}, 35)