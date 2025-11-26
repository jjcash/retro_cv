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
                alert('Konami Code Activated! Here is a secret.');
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

        // --- Render Skills ---
        const skillsContainer = document.getElementById('skills-container');
        const skillsData = i18next.t('skills_list', { returnObjects: true });
        
        // Clear previous skills to prevent duplication on language switch
        skillsContainer.innerHTML = '';

        if (skillsData && Array.isArray(skillsData)) {
            skillsData.forEach(category => {
                const categoryElement = document.createElement('div');
                categoryElement.className = 'skill-category';

                const categoryTitle = document.createElement('h3');
                categoryTitle.className = 'skill-category-title';
                categoryTitle.textContent = category.category;
                categoryElement.appendChild(categoryTitle);

                const skillList = document.createElement('ul');
                skillList.className = 'skill-list';
                category.items.forEach(item => {
                    const skillItem = document.createElement('li');
                    skillItem.className = 'skill-item';
                    skillItem.textContent = item;
                    skillList.appendChild(skillItem);
                });
                categoryElement.appendChild(skillList);
                skillsContainer.appendChild(categoryElement);
            });
        }

        // --- Render Projects ---
        const projectsContainer = document.getElementById('projects-container');
        const projectsData = i18next.t('projects_list', { returnObjects: true });

        projectsContainer.innerHTML = '';

        if (projectsData && Array.isArray(projectsData)) {
            projectsData.forEach(project => {
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card';

                const projectName = document.createElement('h3');
                projectName.className = 'project-name';
                projectName.textContent = project.name;

                const projectDesc = document.createElement('p');
                projectDesc.className = 'project-description';
                projectDesc.textContent = project.description;

                const projectLink = document.createElement('a');
                projectLink.className = 'project-link';
                projectLink.href = project.link_url;
                projectLink.textContent = project.link_text;
                projectLink.target = '_blank'; // Open link in a new tab

                projectCard.appendChild(projectName);
                projectCard.appendChild(projectDesc);
                projectCard.appendChild(projectLink);

                projectsContainer.appendChild(projectCard);
            });
        }

        // --- Render Experience ---
        const experienceContainer = document.getElementById('experience-container');
        const experienceData = i18next.t('experience_list', { returnObjects: true });

        experienceContainer.innerHTML = '';

        if (experienceData && Array.isArray(experienceData)) {
            experienceData.forEach(job => {
                const jobCard = document.createElement('div');
                jobCard.className = 'experience-card';

                const jobHeader = document.createElement('div');
                jobHeader.className = 'experience-header';

                const jobRole = document.createElement('h3');
                jobRole.className = 'experience-role';
                jobRole.textContent = job.role;

                const jobCompany = document.createElement('p');
                jobCompany.className = 'experience-company';
                jobCompany.textContent = job.company;

                const jobDetails = document.createElement('p');
                jobDetails.className = 'experience-details';
                jobDetails.textContent = `${job.period} · ${job.location}`;

                const jobDesc = document.createElement('p');
                jobDesc.className = 'experience-description';
                jobDesc.textContent = job.description;

                jobHeader.appendChild(jobRole);
                jobHeader.appendChild(jobCompany);
                jobCard.appendChild(jobHeader);
                jobCard.appendChild(jobDetails);
                jobCard.appendChild(jobDesc);
                experienceContainer.appendChild(jobCard);
            });
        }
    };

    i18next
        .use(i18nextHttpBackend)
        .init({
            lng: 'en', // default language
            fallbackLng: 'en',
            backend: {
                loadPath: 'locales/{{lng}}.json',
            },
            compatibilityJSON: 'v3'
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
