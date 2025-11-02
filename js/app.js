import { DataManager } from './dataManager.js';

const DATA_PATH = './data';
const dm = new DataManager(DATA_PATH);

const nameEl = document.getElementById('name');
const titleEl = document.getElementById('title');
const heroTitle = document.getElementById('heroTitle');
const heroBio = document.getElementById('heroBio');
const heroLinks = document.getElementById('heroLinks');
const emailLink = document.getElementById('emailLink');
const linkedinLink = document.getElementById('linkedinLink');
const navEl = document.getElementById('nav');
const contactEl = document.getElementById('contact');
const skillsGrid = document.getElementById('skillsGrid');
const projectsGrid = document.getElementById('projectsGrid');
const expList = document.getElementById('expList');
const eduList = document.getElementById('eduList');
const hobbiesList = document.getElementById('hobbiesList');
const socials = document.getElementById('socials');
const projectFilter = document.getElementById('projectFilter');

const adminDialog = document.getElementById('adminDialog');
const openAdmin = document.getElementById('openAdmin');
const adminEditor = document.getElementById('adminEditor');
const adminFileSelect = document.getElementById('adminFileSelect');
const saveAdmin = document.getElementById('saveAdmin');
const exportJson = document.getElementById('exportJson');
const importJson = document.getElementById('importJson');

const themeToggle = document.getElementById('themeToggle');
const storedTheme = localStorage.getItem('theme') || 'light';
if(storedTheme === 'dark') document.documentElement.setAttribute('data-theme','dark');
themeToggle.checked = storedTheme === 'dark';

themeToggle.addEventListener('change', ()=>{
  const t = themeToggle.checked ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem('theme', t);
});

const SECTIONS = ['hero','skills','projects','experience','education','hobbies'];
function buildNav(){
  navEl.innerHTML = SECTIONS.map(s=>`<a href="#${s}" data-section="${s}">${s.charAt(0).toUpperCase()+s.slice(1)}</a>`).join('');
  navEl.querySelectorAll('a').forEach(a=>a.addEventListener('click', (e)=>{
    e.preventDefault(); document.getElementById(a.dataset.section).scrollIntoView({behavior:'smooth'});
  }));
}

function renderProfile(profile){
  nameEl.textContent = profile.name;
  titleEl.textContent = profile.title;
  heroTitle.textContent = profile.title;
  heroBio.textContent = profile.bio;
  emailLink.href = `mailto:${profile.email}`;
  linkedinLink.href = profile.social?.find(s=>s.platform==='LinkedIn')?.url || '#';
  contactEl.innerHTML = `<div>${profile.email}</div><div>${profile.location}</div>`;
  socials.innerHTML = profile.social?.map(s=>`<a href="${s.url}" target="_blank">${s.platform}</a>`).join(' • ');
}

function renderSkills(skills){
  skillsGrid.innerHTML = skills.map(k=>`<div class="skill">${k}</div>`).join('');
}

function renderProjects(projects){
  const q = projectFilter.value.trim().toLowerCase();
  const list = (projects.projects)||projects;
  const filtered = list.filter(p=>!q || (p.technologies.join(' ').toLowerCase().includes(q) || p.title.toLowerCase().includes(q)));
  projectsGrid.innerHTML = filtered.map(p=>`
    <div class="project">
      <h4>${p.title}</h4>
      <p>${p.description}</p>
      <div class="meta">${p.technologies.join(' • ')}</div>
      <div style="margin-top:8px"><a href="${p.liveUrl||'#'}" target="_blank">Live</a> • <a href="${p.githubUrl||'#'}" target="_blank">Code</a></div>
    </div>
  `).join('');
}

function renderExperience(exps){
  expList.innerHTML = exps.map(e=>`<div class="exp-item"><strong>${e.role}</strong> — ${e.company} <div class="muted">${e.location} | ${e.period}</div><p>${e.summary}</p></div>`).join('');
}

function renderEducation(edus){
  eduList.innerHTML = edus.map(e=>`<div><strong>${e.degree}</strong>, ${e.institution} — ${e.period}</div>`).join('');
}

function renderHobbies(list){
  hobbiesList.innerHTML = list.map(h=>`<div class="skill">${h}</div>`).join('');
}

async function loadAndRender(){
  const profile = await dm.load('profile');
  const skills = await dm.load('skills');
  const projects = await dm.load('projects');
  const experience = await dm.load('experience');
  const education = await dm.load('education');
  const hobbies = await dm.load('hobbies');

  renderProfile(profile);
  renderSkills(skills);
  renderProjects(projects);
  renderExperience(experience);
  renderEducation(education);
  renderHobbies(hobbies);
}

buildNav();
loadAndRender();

projectFilter.addEventListener('input', ()=> loadAndRender());

openAdmin.addEventListener('click', ()=>{
  adminDialog.showModal();
  loadAdminFile(adminFileSelect.value);
});

adminFileSelect.addEventListener('change', ()=> loadAdminFile(adminFileSelect.value));

async function loadAdminFile(fname){
  const val = await dm.load(fname);
  adminEditor.value = JSON.stringify(val,null,2);
}

saveAdmin.addEventListener('click', (e)=>{
  e.preventDefault();
  try{
    const obj = JSON.parse(adminEditor.value);
    const fname = adminFileSelect.value;
    dm.applyLocal(fname, obj);
    loadAndRender();
    adminDialog.close();
  }catch(err){
    alert('Invalid JSON: '+err.message);
  }
});

exportJson.addEventListener('click', async (e)=>{
  e.preventDefault();
  const fname = adminFileSelect.value;
  const data = await dm.load(fname);
  const blob = new Blob([JSON.stringify(data,null,2)], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href=url; a.download=`${fname}.json`; a.click(); URL.revokeObjectURL(url);
});

importJson.addEventListener('click', (e)=>{
  e.preventDefault();
  const input = document.createElement('input'); input.type='file'; input.accept='application/json';
  input.onchange = ()=>{
    const f = input.files[0];
    const reader = new FileReader();
    reader.onload = ()=>{ adminEditor.value = reader.result; };
    reader.readAsText(f);
  };
  input.click();
});

document.getElementById('downloadPdf').addEventListener('click', ()=> window.print());

const observer = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
},{threshold:0.12});
document.querySelectorAll('.panel').forEach(p=>observer.observe(p));
