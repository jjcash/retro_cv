document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.menu-item');
    const contentSections = document.querySelectorAll('.content-section');

    // --- Section Navigation Logic ---
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();

            // Get the target section from the href attribute
            const targetId = item.getAttribute('href').substring(1);
            
            // Remove active class from all menu items and sections
            menuItems.forEach(link => link.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));

            // Add active class to the clicked item and corresponding section
            item.classList.add('active');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // --- Konami Code Easter Egg ---
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 
        'b', 'a'
    ];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                // Code entered correctly! Trigger the easter egg.
                alert('Konami Code Activated! Here is a secret.');
                // We can do something more fun here later
                konamiIndex = 0; // Reset for next time
            }
        } else {
            konamiIndex = 0; // Reset if the wrong key is pressed
        }
    });

    // --- Language Switching Logic with i18next ---
    const langButtons = document.querySelectorAll('.lang-btn');
    const i18nElements = document.querySelectorAll('[data-i18n]');

    const updateContent = () => {
        i18nElements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            el.innerHTML = i18next.t(key);
        });
    };

    i18next
        .use(i18nextHttpBackend)
        .init({
            lng: 'en', // default language
            fallbackLng: 'en',
            backend: {
                loadPath: 'locales/{{lng}}.json'
            }
        }, (err, t) => {
            if (err) return console.error(err);
            updateContent();
        });

    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.getAttribute('data-lang');
            
            i18next.changeLanguage(lang, (err, t) => {
                if (err) return console.error(err);
                updateContent();

                // Update active button state
                langButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });
    });
});
