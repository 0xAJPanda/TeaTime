const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function startTeaTimer(teaType, steepingTime) {
  console.log(`\n[${teaType}] Tea timer started. Steep for ${steepingTime} minutes.`);
  let timeLeft = steepingTime * 60;
  const timerInterval = setInterval(() => {
    const minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`Time left: ${minutes}:${seconds}`);
    if (timeLeft === 0) {
      clearInterval(timerInterval);
      console.log(`\n[${teaType}] Your tea is ready! Enjoy.`);
      rl.close();
    }
    timeLeft--;
  }, 1000);
}

function selectTeaType() {
  rl.question('Select your tea type (Green/Black/Herbal): ', (teaType) => {
    teaType = teaType.toLowerCase();
    let steepingTime;
    switch (teaType) {
      case 'green':
        steepingTime = 3;
        break;
      case 'black':
        steepingTime = 5;
        break;
      case 'herbal':
        steepingTime = 7;
        break;
      default:
        console.log('Invalid tea type. Please select Green, Black, or Herbal.');
        selectTeaType();
        return;
    }
    startTeaTimer(teaType, steepingTime);
  });
}

console.log('Welcome to TeaTime!');
selectTeaType();
