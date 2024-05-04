class Alert {
    constructor() {
        this.alerts = [];
    }

    async loadAlerts() {
        try {
            const response = await fetch('./alerts.json');
            if (!response.ok) {
                console.error('Failed to load alerts');
            }
            const data = await response.json();
            this.alerts = data;

        } catch (error) {
            console.error('Error loading alerts:', error);
        }
    }

    getAlerts() {
        const mainElement = document.querySelector('main'); // Move outside the if block
        if (this.alerts.length > 0) {
            const alertListSection = document.createElement('section');
            alertListSection.classList.add('alert-list');

            this.alerts.forEach(alert => {
                const { message, background, color } = alert;
                const alertP = document.createElement('p');
                alertP.textContent = message;
                alertP.style.backgroundColor = background;
                alertP.style.color = color;
                alertListSection.appendChild(alertP);
            });

            mainElement.prepend(alertListSection);
        }
    }
}

export default Alert;

document.addEventListener('DOMContentLoaded', async () => {
    const alertHandler = new Alert();
    await alertHandler.loadAlerts();
    alertHandler.getAlerts();
});


