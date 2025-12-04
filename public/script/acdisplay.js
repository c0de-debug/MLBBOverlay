const DEFAULT_LOGO = 'Assets/Other/transparent.png';

function updateDisplay() {
    for (let i = 1; i <= 4; i++) {
        const schedule = JSON.parse(localStorage.getItem(`schedule-${i}`)) || {};
        const scheduleElement = document.getElementById(`schedule-${i}`);
        if (schedule.show) {
            scheduleElement.classList.remove('hidden');
            document.getElementById(`time-${i}`).textContent = schedule.time || '';
            document.getElementById(`logo1-${i}`).src = schedule.logo1 || DEFAULT_LOGO;
            document.getElementById(`team1-${i}`).textContent = schedule.team1 || 'Team 1';
            document.getElementById(`score1-${i}`).textContent = schedule.score1 || '0';
            document.getElementById(`logo2-${i}`).src = schedule.logo2 || DEFAULT_LOGO;
            document.getElementById(`team2-${i}`).textContent = schedule.team2 || 'Team 2';
            document.getElementById(`score2-${i}`).textContent = schedule.score2 || '0';
        } else {
            scheduleElement.classList.add('hidden');
        }
    }
}

window.addEventListener('storage', updateDisplay);
window.onload = updateDisplay;