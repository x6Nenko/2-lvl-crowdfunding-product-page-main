const bookmarkBtn = document.querySelector('.bookmark-btn');

const openNavBtn = document.querySelector('.open-nav');
const closeNavBtn = document.querySelector('.close-nav');
const nav = document.querySelector('nav');

const openModal = document.querySelector('.cta-btn');
const selectReward = document.querySelectorAll('.reward-btn');
const closeModal = document.querySelector('.close-modal');
const modal = document.querySelector('.selection-modal');

const overlay = document.querySelector('.nav-overlay');
const modalOverlay = document.querySelector('.modal-overlay');

const backedAmount = document.getElementById('backedAmount');
const backersCount = document.getElementById('backersCount');
const daysLeft = document.getElementById('daysLeft');

let backedAmountValue = 89914;
let backersCountValue = 5007;
let daysLeftValue = 56;

const backedTarget = 100000;

const progressBar = document.querySelector('.stats-progress');
const percentage = (backedAmountValue / backedTarget) * 100;
const width = `clamp(4%, ${percentage}%, 100%)`;

progressBar.style.width = width;

backedAmount.textContent = `$${backedAmountValue}`;
backersCount.textContent = backersCountValue;
daysLeft.textContent = daysLeftValue;

openNavBtn.addEventListener('click', () => {
  nav.style.display = 'unset';
  openNavBtn.style.display = 'none';
  closeNavBtn.style.display = 'unset';

    overlay.classList.add('open');
});

closeNavBtn.addEventListener('click', () => {
  nav.style.display = 'none';
  openNavBtn.style.display = 'unset';
  closeNavBtn.style.display = 'none';

  overlay.classList.remove('open');
});

bookmarkBtn.addEventListener('click', () => {
  bookmarkBtn.classList.toggle('bookmarked');
});


const options = document.querySelectorAll('.option');

function updateStyles() {
  options.forEach(option => {
    if (option.querySelector('input[type="radio"]').checked) {
      option.style.border = '2px solid #37B5AA';
      option.querySelector('.hiden').style.display = 'unset';
    } else {
      option.style.border = '1px solid #DBDBDB';
      option.querySelector('.hiden').style.display = 'none';
    }
  });
}

options.forEach(option => {
  const radio = option.querySelector('input[type="radio"]');
  radio.addEventListener('change', updateStyles);
});


openModal.addEventListener('click', () => {
    modal.style.display = 'unset';

    modalOverlay.classList.add('open');
});

selectReward.forEach(select => {
  select.addEventListener('click', () => {
    modal.style.display = 'unset';
  
    modalOverlay.classList.add('open');
  });
})

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';

    modalOverlay.classList.remove('open');
});


const inputBtns = document.querySelectorAll('.continue-btn');
const successModal = document.querySelector('.success-modal');
const successModalBtn = document.querySelector('.success-btn');

inputBtns.forEach(btn => {
  btn.addEventListener('click', (event) => {
    event.preventDefault();

    // Get the value of the input field associated with the selected radio button
    const parent = btn.closest('.option');
    const pledgeAmount = parent.querySelector('input[type="text"]').value;
    const minAmount = parseInt(parent.querySelector('input[type="text"]').dataset.min);

    // Check if the entered value is greater than or equal to the minimum value
    if (pledgeAmount < minAmount) {
      console.log('Please enter an amount greater than or equal to ' + minAmount + '. Your input is:' + pledgeAmount);
      return;
    }

    modal.style.display = 'none';
    successModal.style.display = 'unset';

    // Do something with the pledge amount value
    backedAmountValue += parseInt(pledgeAmount);
    backersCountValue += 1;

    backedAmount.textContent = `$${backedAmountValue}`;
    backersCount.textContent = backersCountValue;

    const percentage = (backedAmountValue / backedTarget) * 100;
    const width = `clamp(4%, ${percentage}%, 100%)`;
    progressBar.style.width = width;

    console.log('Pledge amount:', pledgeAmount, backedAmountValue, backersCountValue);
  });
});

successModalBtn.addEventListener('click', () => {
  successModal.style.display = 'none';

  modalOverlay.classList.remove('open');
});