export class DataManager {
  constructor(basePath){ this.base = basePath; this._cache = {}; }
  async fetchJson(path){
    try{
      const res = await fetch(`${this.base}/${path}.json`, {cache:'no-store'});
      if(!res.ok) throw new Error('Not found');
      return await res.json();
    }catch(e){
      const key = `dm_${path}`;
      const raw = localStorage.getItem(key);
      if(raw) return JSON.parse(raw);
      return this.defaults(path);
    }
  }
  defaults(path){
    const map = {
      profile: {name:'Somanshu Agarwal', title:'Agile Product Owner', bio:'Agile Product Owner with ~9 years experience across enterprise platforms. I connect technology and business with clarity and empathy.', email:'somanshu.agarwal01@gmail.com', location:'Pune, India', social:[{platform:'LinkedIn',url:'#'}]},
      skills: ['Azure Integration Services','Logic Apps','Data Factory','Salesforce CPQ','APIs','Agile','JIRA'],
      projects: [ {id:1,title:'Quote-to-Cash Integrator',description:'End-to-end Q2C integration connecting CRM, Billing and ERP',technologies:['Azure','Logic Apps','API'],githubUrl:'',liveUrl:''} ],
      experience: [ {company:'FIS',role:'Senior Product Owner',location:'Pune, India',period:'Jun 2024 – Present',summary:'Modernizing global Quote-to-Cash using Azure-based integrations.'} ],
      education: [ {degree:'MBA / PGDM',institution:'IMT Nagpur',period:'2018–2020'} ],
      hobbies: ['Music','Guitar','Reading','Open-source']
    };
    return map[path] || {};
  }
  async load(name){
    if(this._cache[name]) return this._cache[name];
    const data = await this.fetchJson(name);
    this._cache[name] = data;
    return data;
  }
  applyLocal(name,obj){
    this._cache[name] = obj;
    localStorage.setItem(`dm_${name}`, JSON.stringify(obj));
  }
}