(function(){
const langs={"en": "English", "es": "Español", "fr": "Français", "de": "Deutsch", "pt": "Português", "ar": "العربية", "hi": "हिन्दी", "ur": "اردو", "ja": "日本語", "ko": "한국어", "id": "Bahasa Indonesia"};
const codes=Object.keys(langs);
const path=location.pathname;
const m=path.match(/\/(es|fr|de|pt|ar|hi|ur|ja|ko|id)(?:\/|$)/);
const current=m?m[1]:'en';
const isGithub=location.hostname.endsWith('.github.io');
function detectBase(){
 if(!isGithub) return '/';
 const seg=location.pathname.split('/').filter(Boolean)[0];
 return seg ? '/'+seg+'/' : '/';
}
const base=detectBase();
function localeRoot(lang){ return base+(lang==='en'?'':lang+'/'); }
function pagePath(){
 let p=path; if(isGithub) p=p.replace(base,'/');
 if(current!=='en') p=p.replace(new RegExp('^/'+current+'(?=/|$)'),'');
 if(!p) p='/';
 return p;
}
function localeUrl(lang){ let p=pagePath(); if(p==='/') return localeRoot(lang); return localeRoot(lang)+p.replace(/^\//,''); }
function detect(){
 const saved=localStorage.getItem('tc-language'); if(saved&&langs[saved]) return saved;
 const list=(navigator.languages||[navigator.language||'en']).map(x=>x.toLowerCase().split('-')[0]);
 for(const x of list) if(langs[x]) return x;
 const tz=(Intl.DateTimeFormat().resolvedOptions().timeZone||'').toLowerCase();
 const map=[['asia/karachi','ur'],['asia/kolkata','hi'],['asia/tokyo','ja'],['asia/seoul','ko'],['asia/jakarta','id'],['asia/riyadh','ar'],['asia/dubai','ar'],['europe/madrid','es'],['america/mexico_city','es'],['europe/paris','fr'],['europe/berlin','de'],['america/sao_paulo','pt']];
 for(const [needle,code] of map) if(tz.includes(needle)) return code; return 'en';
}
function addSelector(){
 const nav=document.querySelector('.navbar'); if(!nav||nav.querySelector('.tc-language-li')) return;
 const ul=nav.querySelector('.nav-links'); if(!ul) return;
 const li=document.createElement('li'); li.className='tc-language-li';
 const select=document.createElement('select'); select.className='tc-language-select'; select.setAttribute('aria-label','Language');
 for(const [code,name] of Object.entries(langs)){const o=document.createElement('option');o.value=code;o.textContent=name;if(code===current)o.selected=true;select.appendChild(o);}
 select.addEventListener('change',()=>{localStorage.setItem('tc-language',select.value);location.href=localeUrl(select.value);});
 li.appendChild(select); ul.appendChild(li);
}
document.addEventListener('DOMContentLoaded',()=>{addSelector(); if(current==='en' && (location.pathname.endsWith('/')||location.pathname.endsWith('/index.html')) && !localStorage.getItem('tc-language')){const d=detect(); if(d!=='en'){localStorage.setItem('tc-language',d); location.replace(localeUrl(d));}}});
})();
