const form = document.querySelector('form');
const input = document.querySelector('input');
const p1 = document.querySelector('#p1');
const p2 = document.querySelector('#p2'); 

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let search = input.value;
    p1.textContent = 'Loading...';
    p2.textContent = '';

    fetch('http://localhost:3000/weather?address='+search).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            return p1.textContent = data.error;
        }
        p1.textContent = data.location;
        p2.textContent = data.forecast;
    })
 })

})