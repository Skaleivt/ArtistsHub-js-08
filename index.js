import{a as E}from"./assets/vendor-BvLu_gPC.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const r of e.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function o(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function a(t){if(t.ep)return;t.ep=!0;const e=o(t);fetch(t.href,e)}})();const u=document.getElementById("artist-modal"),L=document.getElementById("artist-modal-close"),k=document.getElementById("modal-loader");function w(){k.classList.remove("hidden")}function C(){k.classList.add("hidden")}function A(s){s.target===u&&p()}function M(s){s.key==="Escape"&&p()}function D(){u.classList.add("is-open"),document.body.style.overflow="hidden",L.addEventListener("click",p),u.addEventListener("click",A),document.addEventListener("keydown",M)}function p(){u.classList.remove("is-open"),document.body.style.overflow="",L.removeEventListener("click",p),u.removeEventListener("click",A),document.removeEventListener("keydown",M)}async function F(s){w();try{const n=await s;document.getElementById("artist-name").textContent=n.strArtist||"Unknown",document.getElementById("artist-years").textContent=n.intFormedYear?`${n.intFormedYear}–${n.intDiedYear||"present"}`:"information missing",document.getElementById("artist-sex").textContent=n.strGender||"N/A",document.getElementById("artist-members").textContent=n.intMembers||"N/A",document.getElementById("artist-country").textContent=n.strCountry||"N/A",document.getElementById("artist-bio").textContent=n.strBiographyEN||"No biography available.",document.getElementById("artist-image").src=n.strArtistThumb||"./images/placeholder.jpg";const o=document.getElementById("artist-genres");if(o.innerHTML="",Array.isArray(n.genres)&&n.genres.length>0)n.genres.forEach(t=>{const e=document.createElement("span");e.className="genre-item",e.textContent=t,o.appendChild(e)});else{const t=document.createElement("span");t.className="genre-item",t.textContent="Unknown genre",o.appendChild(t)}const a=document.getElementById("albums-container");if(a.innerHTML="",Array.isArray(n.tracksList)&&n.tracksList.length>0){const t={};n.tracksList.forEach(e=>{const r=e.strAlbum||"Unknown Album";t[r]||(t[r]=[]),t[r].push(e)}),Object.entries(t).forEach(([e,r])=>{const i=document.createElement("li");i.className="album";const l=document.createElement("h2");l.className="album-title",l.textContent=e;const d=document.createElement("div");d.className="track-list-container";const f=document.createElement("div");f.className="track-header",f.innerHTML=`
      <span>Track</span>
      <span>Time</span>
      <span>Link</span>
    `;const g=document.createElement("ul");g.className="track-list",r.forEach(m=>{const I=m.strTrackName||m.strTrack||"Unknown track",y=m.intDuration;function T(U){const v=Math.floor(Number(U)/1e3),_=Math.floor(v/60),j=v%60;return`${_}:${j.toString().padStart(2,"0")}`}const q=y?T(y):"Unknown length",b=m.movie,h=document.createElement("li");h.className="track-item",h.innerHTML=`
        <span class="track-name">${I}</span>
        <span class="track-time">${q}</span>
        ${b?`<a href="${b}" class="track-link" target="_blank" rel="noopener noreferrer">
                 <svg class="youtube-link" width="24" height="25">
                   <use href="../img/symbol-defs.svg#icon-youtube"></use>
                 </svg>
               </a>`:'<span class="track-link"> </span>'}
      `,g.appendChild(h)}),d.appendChild(f),d.appendChild(g),i.appendChild(l),i.appendChild(d),a.appendChild(i)})}else{const t=document.createElement("p");t.className="no-albums",t.textContent="No tracks available.",a.appendChild(t)}D()}catch(n){console.error("Error loading artist:",n)}finally{C()}}const B="https://sound-wave.b.goit.study/api";async function O(s=1,n=8){try{return(await E.get(`${B}/artists`,{params:{page:s,limit:n}})).data}catch{return iziToast.error({message:"Sorry, there is no more artists. Please try later!",position:"topRight",messageColor:"#fff",messageSize:"16px",backgroundColor:" #EF4040",timeout:3e3}),{}}}async function P(){try{return(await E.get(`${B}/feedbacks`)).data.data}catch(s){return console.error("API Error:",s),{}}}document.querySelector("#artists");const $=document.querySelector(".artists-list"),N=document.querySelector("#load-more-btn");document.querySelector("#no-more-artists-msg");let S=1;const H=8;async function x(){w();try{const s=await O(S,H);if(s.artists.length===0){N.style.display="none",iziToast.info({title:"Notice",message:"No more artists to load",position:"bottomRight",messageColor:"#fff",messageSize:"16px",backgroundColor:" #EF4040",timeout:3e3});return}R(s.artists)}catch(s){console.error("Failed to load artists:",s)}finally{C()}}function R(s){const o=s.filter(a=>a._id).map(a=>{var e;const t=(e=a.genres)!=null&&e.length?a.genres.map(r=>`<span class="artist-card-genre">${r}</span>`).join(""):'<span class="artist-card-genre">Unknown</span>';return`
        <li class="artist-card" data-id="${a._id}">
          <img 
            class="artist-card-img" 
            src="${a.strArtistThumb||"./img/placeholderartist.jpg"}" 
            alt="${a.strArtist||"Unknown Artist"}" 
          />
          <div class="artist-card-content">
            <div class="artist-card-genres">${t}</div>
            <h3 class="artist-card-name">${a.strArtist||"Unknown Artist"}</h3>
            <p class="artist-card-description">
              ${a.strBiographyEN||"No description available."}
            </p>

<button type="button" class="artist-card-btn" data-artist-open data-artist-id="${a._id}">
  Learn More
  <svg class="artist-card-btn-icon" width="8" height="14">
    <use href="../img/symbol-defs.svg#icon-triangle-white"></use>
  </svg>
</button>

          </div>
        </li>
      `}).join("");$.insertAdjacentHTML("beforeend",o)}function z(){$.addEventListener("click",s=>{const n=s.target.closest("[data-artist-open]");if(!n)return;const o=n.dataset.artistId;if(!o){console.warn("Artist ID is missing — modal will not open.");return}const a=fetch(`https://sound-wave.b.goit.study/api/artists/${o}`).then(t=>t.json());F(a)})}N.addEventListener("click",async()=>{S+=1,await x()});x();z();async function Y(){const s=await P(),n=document.querySelector("#feedback-list");n.innerHTML="";const o=s.length,a=Math.floor(o/2);s.forEach(e=>{const r=document.createElement("div");r.classList.add("swiper-slide"),r.innerHTML=`
  <div class="feedback-card">
    <div class="rating" data-rating="${e.rating}">
      <div class="rating__stars">
      ${K(e.rating)}
      </div>
    </div> 
    <p class="feedback-text">${e.descr||"—"}</p>
    <h5 class="feedback-author">${e.name||"Анонім"}</h5>
  </div>`,n.appendChild(r)});const t=new Swiper(".feedback-swiper",{slidesPerView:1,spaceBetween:32,speed:500,loop:!1,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},pagination:{el:".swiper-pagination",clickable:!1,renderBullet:function(e,r){return e===0||e===a||e===o-1?`<span class="${r}" data-index="${e}"></span>`:""}},on:{slideChange:function(){const e=this.activeIndex;document.querySelectorAll(".swiper-pagination span").forEach(d=>d.classList.remove("swiper-pagination-bullet-active"));let i=0;e>=o-2?i=o-1:e>=a-1&&e<=a+1?i=a:i=0;const l=document.querySelector(`.swiper-pagination [data-index="${i}"]`);l&&l.classList.add("swiper-pagination-bullet-active")}},touchRatio:1,simulateTouch:!0});t.emit("slideChange"),document.querySelectorAll(".swiper-pagination [data-index]").forEach(e=>{e.addEventListener("click",()=>{const r=parseInt(e.dataset.index);t.slideTo(r)})})}function K(s){const n=Math.round(s);return Array.from({length:5},(o,a)=>`<span class="rating__star ${a<n?"active":""}">★</span>`).join("")}document.addEventListener("DOMContentLoaded",Y);const c={openBtn:document.querySelector("[data-menu-open]"),closeBtn:document.querySelector("[data-menu-close]"),mobileMenu:document.querySelector("[data-menu]")};c.openBtn.addEventListener("click",()=>{c.mobileMenu.classList.remove("is-hidden"),c.mobileMenu.classList.add("is-open"),document.body.style.overflow="hidden"});c.closeBtn.addEventListener("click",()=>{c.mobileMenu.classList.remove("is-open"),c.mobileMenu.classList.add("is-hidden"),document.body.style.overflow=""});const G=document.querySelectorAll('[data-menu] a[href*="#"]');G.forEach(s=>{s.addEventListener("click",()=>{c.mobileMenu.classList.remove("is-open"),c.mobileMenu.classList.add("is-hidden"),document.body.style.overflow=""})});
//# sourceMappingURL=index.js.map
