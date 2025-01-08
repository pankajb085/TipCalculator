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

const handleClick = (e) => {
    removeActiveClass();

    e.target.classList.add("active");
    if(btnInputEL.value){
        btnInputEL.value = "";
    }
    selectedTipPer = Number(getTip(e.target.innerText));
};

btnELS.forEach(btnEL => {
    btnEL.addEventListener('keydown', (e) => {
        if(e.key === "Enter"){
            handleClick(e);
        }
    });
});

buttonsEL.addEventListener('click', (e) => {
    if(e.target.className === "btn"){
        handleClick(e);
    }
});

const getTipPerPerson  = (bill, people) => {
    return (bill * selectedTipPer / 100) / people;
};

function handleChange(e) {
    const {name, value} = e.target;
    if(name === "bill"){
        bill = Number(Number(value).toFixed(2));
    }else if(name === "btn-input"){
        removeActiveClass();
        selectedTipPer = Number(Number(value).toFixed(2));
    }else{
        people = Number(value);
    }

    if(bill > 0 && people > 0){
        const tipPerPerson = getTipPerPerson(bill, people);
        const tipPerPersonFixed = tipPerPerson.toFixed(2);
        tipAmntEL.innerText = `$${tipPerPersonFixed}`;

        totalAmntEL.innerText = `$${(bill / people + Number(tipPerPersonFixed)).toFixed(2)}`

        resetBtnEL.classList.add("active")
    }
};

resetBtnEL.addEventListener("click", function(){
    billInputEL.value = "";
    peopleInputEL.value = "";
    btnInputEL.value = "";
    removeActiveClass();
    selectedTipPer = 0;
    bill = 0;
    people = 0;
    tipAmntEL.innerText = "$0.00";
    totalAmntEL.innerText = "$0.00";
    resetBtnEL.classList.remove("active");
});
