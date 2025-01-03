const billInputEL = document.querySelector('.bill').lastElementChild;
const btnInputEL = document.querySelector('.btn-input');
const peopleInputEL = document.querySelector('.people').lastElementChild;
const buttonsEL = document.querySelector('.buttons');
const btnELS = document.querySelectorAll('.btn');
const tipAmntEL = document.querySelector('.tip-amnt').lastElementChild;
const totalAmntEL = document.querySelector('.total-amnt').lastElementChild;
const resetBtnEL = document.querySelector('.total-amnt').nextElementSibling;

let selectedTipPer = 0, bill = 0, people = 0;

const getTip = (text) => {
    return text.substring(0, text.length - 1);
};

const removeActiveClass = () => {
    btnELS.forEach(btnEL => {
        btnEL.classList.remove('active');
    });
};

buttonsEL.addEventListener('click', (e) => {
    if(e.target.className === "btn"){
        removeActiveClass();

        e.target.classList.add("active");
        selectedTipPer = Number(getTip(e.target.innerText));
    }
    if(e.target.className === "btn-input"){
        selectedTipPer = Number(e.target.value);
    }
});

const getTipPerPerson  = (bill, people) => {
    return (bill * selectedTipPer / 100) / people;
};

function handleChange(e) {
    const {name, value} = e.target;
    if(name === "bill"){
        bill = Number(value);
    }else if(name === "btn-input"){
        selectedTipPer = Number(value);
    }else{
        people = Number(value);
    }

    if(bill > 0 && people > 0){
        const tipPerPerson = getTipPerPerson(bill, people);
        tipAmntEL.innerText = `$${tipPerPerson.toFixed(2)}`;

        totalAmntEL.innerText = `$${(bill / people).toFixed(2)}`

        resetBtnEL.classList.add("active")
    }
};

resetBtnEL.addEventListener("click", function(){
    billInputEL.value = "";
    peopleInputEL.value = "";
    btnInputEL.value = "";
    removeActiveClass();
    selectedTipPer = 0;
    tipAmntEL.innerText = "$0.00";
    totalAmntEL.innerText = "$0.00";
    resetBtnEL.classList.remove("active");
});