const projects = [];

function addMyProject(e){
    e.preventDefault();

    const project_name = document.getElementById('project_name').value;
    const start_date = document.getElementById('start_date').value;
    const end_date = document.getElementById('end_date').value;
    const description = document.getElementById('description').value;
    const node_js = document.getElementById('node_js');
    const next_js = document.getElementById('next_js');
    const react_js = document.getElementById('react_js');
    const typescript = document.getElementById('typescript');
    var upload_image = document.getElementById('upload_image').files;

    const projectImage = URL.createObjectURL(upload_image[0]);

    const date_start = new Date(start_date);
    const date_end = new Date(end_date);
    
    let yearStart = date_start.getFullYear();
    let monthStart = date_start.getMonth();
    let dateStart = date_start.getDate();

    let yearEnd = date_end.getFullYear();
    let monthEnd = date_end.getMonth();
    let dateEnd = date_end.getDate();

    let duration = ''
    
    if (yearEnd !== yearStart) {
        const yearDiff = yearEnd - yearStart;
        duration = `${yearDiff} tahun`;
    } else if (monthEnd !== monthStart) {
        const monthDiff = monthEnd - monthStart;
        duration = `${monthDiff} bulan`;
    } else if (dateEnd !== dateStart) {
        const dayDiff = dateEnd - dateStart;
        duration = `${dayDiff} hari`;
    } else {
        duration = '0 hari';
    }
    
    console.log(`Durasi: ${duration}`);

    const skills = [];

    if(node_js.checked){
        skills.push(node_js.value);
    } 
    if (next_js.checked){
        skills.push(next_js.value);
    } 
    if (react_js.checked){
        skills.push(next_js.value);
    } 
    if (typescript.checked){
        skills.push(typescript.value);
    }
    skills.push('dummy');

    const reqBody = {
        name: project_name,
        description,
        skills,
        start_date,
        end_date,
        projectImage,
        duration
    };

    console.log(reqBody);
    projects.unshift(reqBody);

    renderProjectCard();
    alert('Publish project success');
};

function projectCardComponent(index, name, description, duration, imageUrl, startDate, endDate, skills){
    const arrDesc = Array.from(description);
    arrDesc.splice(100, 10000);
    const excerpt = arrDesc.join('');

    return (
        `<div class="project-card">
            <div onclick="renderDetailProject('${name}', '${description}', '${duration}', '${imageUrl}', '${startDate}', '${endDate}', '${skills}')">
                <img src="${imageUrl}" alt="${name}">
                <h3>${name}</h3>
                <h5>durasi: ${duration}</h5>
                <p>${excerpt}</p>
                <div class="card-icons">
                    <img src="./assets/img/playstore.png" alt="playstore">
                    <img src="./assets/img/android.png" alt="android">
                    <img src="./assets/img/java.png" alt="java">
                </div>
            </div>
            <div class="card-buttons">
                <button>Edit</button>
                <button onclick="deleteProject(${index})">Delete</button>
            </div>
        </div>`
    )
}

function renderProjectCard(){
    let html = '';
    for(let i = 0; i < projects.length; i++){
        html += projectCardComponent(i, projects[i].name, projects[i].description, projects[i].duration, projects[i].projectImage, projects[i].start_date, projects[i].end_date, projects[i].skills);
        console.log(projects[i]);
    }
    document.getElementById('my-projects-container').innerHTML = html;
};

function renderDetailProject(name, description, duration, imageUrl, startDate, endDate, skills){
    let skillArr = Array.from(skills);
    let skillItem = [];
    let skillchosen = [];
    for(let i = 0; i < skillArr.length; i++){
        if(skillArr[i] !== ','){
            skillItem.push(skillArr[i]); 
        } else {
            skillchosen.push(skillItem.join(''));
            skillItem = [];
        }
    };

    let html = `<div class="detail-project">
        <button class="close" onclick="closeDetailProject()">X</button>
        <div class="detail-project-container">
            <h1>${name}</h1>
        <div class="heading">
            <img src="${imageUrl}" alt="${name}">
            <div class="data">
                <div class="duration">
                    <h3>Duration</h3>
                    <p class="fromTo">
                    ${startDate} - ${endDate}
                    </p>
                    <p>${duration}</p>
                </div>
                <div>
                <h3>Technologies</h3>
                <div class="tech">
                ${
                    skillchosen.map(skill => `<p>${skill}</p>`).join('')
                }
                </div>
                </div>
            </div>
        </div>
        <div class="description">
            <p>${description}</p>
        </div>
        </div>
    </div>`
    document.getElementById('detail-container').innerHTML = html;
}

function closeDetailProject(){
    document.getElementById('detail-container').innerHTML = null;
}

function deleteProject(n){
    projects.splice(n, 1);
    let html = '';
    for(let i = 0; i < projects.length; i++){
        html += projectCardComponent(i, projects[i].name, projects[i].description, projects[i].duration, projects[i].projectImage, projects[i].start_date, projects[i].end_date, projects[i].skills);
        console.log(projects[i]);
    }
    document.getElementById('my-projects-container').innerHTML = html;
}

document.getElementById('add_my_project').addEventListener('submit', (e) => addMyProject(e));