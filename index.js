import{a as E}from"./assets/vendor-BvLu_gPC.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const L="/ArtistsHub-js-08/assets/symbol-defs-DNVN9KjG.svg",u=document.getElementById("artist-modal"),k=document.getElementById("artist-modal-close"),w=document.getElementById("modal-loader");function C(){w.classList.remove("hidden")}function A(){w.classList.add("hidden")}function M(s){s.target===u&&p()}function $(s){s.key==="Escape"&&p()}function P(){u.classList.add("is-open"),document.body.style.overflow="hidden",k.addEventListener("click",p),u.addEventListener("click",M),document.addEventListener("keydown",$)}function p(){u.classList.remove("is-open"),document.body.style.overflow="",k.removeEventListener("click",p),u.removeEventListener("click",M),document.removeEventListener("keydown",$)}async function F(s){C();try{const n=await s;document.getElementById("artist-name").textContent=n.strArtist||"Unknown",document.getElementById("artist-years").textContent=n.intFormedYear?`${n.intFormedYear}–${n.intDiedYear||"present"}`:"information missing",document.getElementById("artist-sex").textContent=n.strGender||"N/A",document.getElementById("artist-members").textContent=n.intMembers||"N/A",document.getElementById("artist-country").textContent=n.strCountry||"N/A",document.getElementById("artist-bio").textContent=n.strBiographyEN||"No biography available.",document.getElementById("artist-image").src=n.strArtistThumb;const r=document.getElementById("artist-genres");if(r.innerHTML="",Array.isArray(n.genres)&&n.genres.length>0)n.genres.forEach(e=>{const t=document.createElement("span");t.className="genre-item",t.textContent=e,r.appendChild(t)});else{const e=document.createElement("span");e.className="genre-item",e.textContent="Unknown genre",r.appendChild(e)}const o=document.getElementById("albums-container");if(o.innerHTML="",Array.isArray(n.tracksList)&&n.tracksList.length>0){const e={};n.tracksList.forEach(t=>{const a=t.strAlbum||"Unknown Album";e[a]||(e[a]=[]),e[a].push(t)}),Object.entries(e).forEach(([t,a])=>{const i=document.createElement("li");i.className="album";const l=document.createElement("h2");l.className="album-title",l.textContent=t;const d=document.createElement("div");d.className="track-list-container";const f=document.createElement("div");f.className="track-header",f.innerHTML=`
      <span>Track</span>
      <span>Time</span>
      <span>Link</span>
    `;const g=document.createElement("ul");g.className="track-list",a.forEach(m=>{const T=m.strTrackName||m.strTrack||"Unknown track",y=m.intDuration;function q(_){const v=Math.floor(Number(_)/1e3),j=Math.floor(v/60),D=v%60;return`${j}:${D.toString().padStart(2,"0")}`}const U=y?q(y):"Unknown length",b=m.movie,h=document.createElement("li");h.className="track-item",h.innerHTML=`
        <span class="track-name">${T}</span>
        <span class="track-time">${U}</span>
        ${b?`<a href="${b}" class="track-link" target="_blank" rel="noopener noreferrer">
                 <svg class="youtube-link" width="24" height="25">
                   <use href="${L} #icon-youtube"></use>
                 </svg>
               </a>`:'<span class="track-link"> </span>'}
      `,g.appendChild(h)}),d.appendChild(f),d.appendChild(g),i.appendChild(l),i.appendChild(d),o.appendChild(i)})}else{const e=document.createElement("p");e.className="no-albums",e.textContent="No tracks available.",o.appendChild(e)}P()}catch(n){console.error("Error loading artist:",n)}finally{A()}}const B="https://sound-wave.b.goit.study/api";async function H(s=1,n=8){try{return(await E.get(`${B}/artists`,{params:{page:s,limit:n}})).data}catch{return iziToast.error({message:"Sorry, there is no more artists. Please try later!",position:"topRight",messageColor:"#fff",messageSize:"16px",backgroundColor:" #EF4040",timeout:3e3}),{}}}async function O(s=1,n=25){try{return(await E.get(`${B}/feedbacks`,{params:{page:s,limit:n}})).data.data}catch(r){return console.error("API Error:",r),{}}}const N=document.querySelector(".artists-list"),x=document.querySelector("#load-more-btn");let S=1;const R=8;async function I(){C();try{const s=await H(S,R);if(s.artists.length===0){x.style.display="none",iziToast.info({title:"Notice",message:"No more artists to load",position:"bottomRight",messageColor:"#fff",messageSize:"16px",backgroundColor:" #EF4040",timeout:3e3});return}z(s.artists,L)}catch(s){console.error("Failed to load artists:",s)}finally{A()}}function z(s,n){const o=s.filter(e=>e._id).map(e=>{var a;const t=(a=e.genres)!=null&&a.length?e.genres.map(i=>`<span class="artist-card-genre">${i}</span>`).join(""):'<span class="artist-card-genre">Unknown</span>';return`
        <li class="artist-card" data-id="${e._id}">
          <img 
            class="artist-card-img" 
            src="${e.strArtistThumb||"../img/placeholder.jpg"}" 
            alt="${e.strArtist||"Unknown Artist"}" 
          />
          <div class="artist-card-content">
            <div class="artist-card-genres">${t}</div>
            <h3 class="artist-card-name">${e.strArtist||"Unknown Artist"}</h3>
            <p class="artist-card-description">
              ${e.strBiographyEN||"No description available."}
            </p>

<button type="button" class="artist-card-btn" data-artist-open data-artist-id="${e._id}">
  Learn More
  <svg class="artist-card-btn-icon" width="8" height="14">
    <use href="${n}#icon-triangle-white"></use>
  </svg>
</button>

          </div>
        </li>
      `}).join("");N.insertAdjacentHTML("beforeend",o)}function K(){N.addEventListener("click",s=>{const n=s.target.closest("[data-artist-open]");if(!n)return;const r=n.dataset.artistId;if(!r){console.warn("Artist ID is missing — modal will not open.");return}const o=fetch(`https://sound-wave.b.goit.study/api/artists/${r}`).then(e=>e.json());F(o)})}x.addEventListener("click",async()=>{S+=1,await I()});I();K();async function Y(){const s=await O(),n=document.querySelector("#feedback-list");n.innerHTML="";const r=s.length,o=Math.floor(r/2);s.forEach(t=>{const a=document.createElement("div");a.classList.add("swiper-slide"),a.innerHTML=`
  <div class="feedback-card">
    <div class="rating" data-rating="${t.rating}">
      <div class="rating__stars">
      ${G(t.rating)}
      </div>
    </div> 
    <p class="feedback-text">${t.descr||"—"}</p>
    <h3 class="feedback-author">${t.name||"Анонім"}</h3>
  </div>`,n.appendChild(a)});const e=new Swiper(".feedback-swiper",{slidesPerView:1,spaceBetween:32,speed:500,loop:!1,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},pagination:{el:".swiper-pagination",clickable:!1,renderBullet:function(t,a){return t===0||t===o||t===r-1?`<span class="${a}" data-index="${t}"></span>`:""}},on:{slideChange:function(){const t=this.activeIndex;document.querySelectorAll(".swiper-pagination span").forEach(d=>d.classList.remove("swiper-pagination-bullet-active"));let i=0;t>=r-2?i=r-1:t>=o-1&&t<=o+1?i=o:i=0;const l=document.querySelector(`.swiper-pagination [data-index="${i}"]`);l&&l.classList.add("swiper-pagination-bullet-active")}},touchRatio:1,simulateTouch:!0});e.emit("slideChange"),document.querySelectorAll(".swiper-pagination [data-index]").forEach(t=>{t.addEventListener("click",()=>{const a=parseInt(t.dataset.index);e.slideTo(a)})})}function G(s){const n=Math.round(s);return Array.from({length:5},(r,o)=>`<span class="rating__star ${o<n?"active":""}">★</span>`).join("")}document.addEventListener("DOMContentLoaded",Y);const c={openBtn:document.querySelector("[data-menu-open]"),closeBtn:document.querySelector("[data-menu-close]"),mobileMenu:document.querySelector("[data-menu]")};c.openBtn.addEventListener("click",()=>{c.mobileMenu.classList.remove("is-hidden"),c.mobileMenu.classList.add("is-open"),document.body.style.overflow="hidden"});c.closeBtn.addEventListener("click",()=>{c.mobileMenu.classList.remove("is-open"),c.mobileMenu.classList.add("is-hidden"),document.body.style.overflow=""});const V=document.querySelectorAll('[data-menu] a[href*="#"]');V.forEach(s=>{s.addEventListener("click",()=>{c.mobileMenu.classList.remove("is-open"),c.mobileMenu.classList.add("is-hidden"),document.body.style.overflow=""})});
//# sourceMappingURL=index.js.map
