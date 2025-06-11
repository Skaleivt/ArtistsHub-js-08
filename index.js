import{a as E}from"./assets/vendor-BvLu_gPC.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const a of e.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function o(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function r(t){if(t.ep)return;t.ep=!0;const e=o(t);fetch(t.href,e)}})();const u=document.getElementById("artist-modal"),k=document.getElementById("artist-modal-close"),L=document.getElementById("modal-loader");function P(){L.classList.remove("hidden")}function U(){L.classList.add("hidden")}function w(s){s.target===u&&p()}function C(s){s.key==="Escape"&&p()}function D(){u.classList.add("is-open"),document.body.style.overflow="hidden",k.addEventListener("click",p),u.addEventListener("click",w),document.addEventListener("keydown",C)}function p(){u.classList.remove("is-open"),document.body.style.overflow="",k.removeEventListener("click",p),u.removeEventListener("click",w),document.removeEventListener("keydown",C)}async function F(s){P();try{const n=await s;console.log(n),document.getElementById("artist-name").textContent=n.strArtist||"Unknown",document.getElementById("artist-years").textContent=n.intFormedYear?`${n.intFormedYear}–${n.intDiedYear||"present"}`:"information missing",document.getElementById("artist-sex").textContent=n.strGender||"N/A",document.getElementById("artist-members").textContent=n.intMembers||"N/A",document.getElementById("artist-country").textContent=n.strCountry||"N/A",document.getElementById("artist-bio").textContent=n.strBiographyEN||"No biography available.",document.getElementById("artist-image").src=n.strArtistThumb||"./images/placeholder.jpg";const o=document.getElementById("artist-genres");if(o.innerHTML="",Array.isArray(n.genres)&&n.genres.length>0)n.genres.forEach(t=>{const e=document.createElement("span");e.className="genre-item",e.textContent=t,o.appendChild(e)});else{const t=document.createElement("span");t.className="genre-item",t.textContent="Unknown genre",o.appendChild(t)}const r=document.getElementById("albums-container");if(r.innerHTML="",Array.isArray(n.tracksList)&&n.tracksList.length>0){const t={};n.tracksList.forEach(e=>{const a=e.strAlbum||"Unknown Album";t[a]||(t[a]=[]),t[a].push(e)}),Object.entries(t).forEach(([e,a])=>{const i=document.createElement("div");i.className="album";const c=document.createElement("h2");c.className="album-title",c.textContent=e;const l=document.createElement("div");l.className="track-list-container";const g=document.createElement("div");g.className="track-header",g.innerHTML=`
      <span>Track</span>
      <span>Time</span>
      <span>Link</span>
    `;const f=document.createElement("ul");f.className="track-list",a.forEach(m=>{const I=m.strTrackName||m.strTrack||"Unknown track",y=m.intDuration;function N(x){const v=Math.floor(Number(x)/1e3),T=Math.floor(v/60),q=v%60;return`${T}:${q.toString().padStart(2,"0")}`}const S=y?N(y):"Unknown length",b=m.movie,h=document.createElement("li");h.className="track-item",h.innerHTML=`
        <span class="track-name">${I}</span>
        <span class="track-time">${S}</span>
        ${b?`<a href="${b}" class="track-link" target="_blank" rel="noopener noreferrer">
                 <svg class="youtube-link" width="24" height="25">
                   <use href="../img/symbol-defs.svg#icon-youtube"></use>
                 </svg>
               </a>`:'<span class="track-link"> </span>'}
      `,f.appendChild(h)}),l.appendChild(g),l.appendChild(f),i.appendChild(c),i.appendChild(l),r.appendChild(i)})}else{const t=document.createElement("p");t.className="no-albums",t.textContent="No tracks available.",r.appendChild(t)}D()}catch(n){console.error("Error loading artist:",n)}finally{U()}}const A="https://sound-wave.b.goit.study/api";async function _(s=1,n=8){try{return(await E.get(`${A}/artists`,{params:{page:s,limit:n}})).data}catch{return iziToast.error({message:"Sorry, there is no more artists. Please try later!",position:"topRight",messageColor:"#fff",messageSize:"16px",backgroundColor:" #EF4040",timeout:3e3}),{}}}async function j(){try{const s=await E.get(`${A}/feedbacks`);return console.log("Full API feed response:",s),console.log("API feed Response:",s.data),s.data.data}catch(s){return console.error("API Error:",s),{}}}document.querySelector("#artists");const O=document.querySelector(".artists-list"),B=document.querySelector("#load-more-btn");document.querySelector("#no-more-artists-msg");let M=1;const H=8;async function $(){try{const s=await _(M,H);if(s.artists.length===0){B.style.display="none",iziToast.info({title:"Notice",message:"No more artists to load",position:"bottomRight",messageColor:"#fff",messageSize:"16px",backgroundColor:" #EF4040",timeout:3e3});return}R(s.artists)}catch(s){console.error("Failed to load artists:",s)}}function R(s){const o=s.filter(r=>r._id).map(r=>{var e;const t=(e=r.genres)!=null&&e.length?r.genres.map(a=>`<span class="artist-card-genre">${a}</span>`).join(""):'<span class="artist-card-genre">Unknown</span>';return`
        <li class="artist-card" data-id="${r._id}">
          <img 
            class="artist-card-img" 
            src="${r.strArtistThumb||"./img/placeholderartist.jpg"}" 
            alt="${r.strArtist||"Unknown Artist"}" 
          />
          <div class="artist-card-content">
            <div class="artist-card-genres">${t}</div>
            <h3 class="artist-card-name">${r.strArtist||"Unknown Artist"}</h3>
            <p class="artist-card-description">
              ${r.strBiographyEN||"No description available."}
            </p>

<button type="button" class="artist-card-btn" data-artist-open>
  Learn More
  <svg class="artist-card-btn-icon" width="8" height="14">
    <use href="#icon-triangle-white"></use>
  </svg>
</button>

          </div>
        </li>
      `}).join("");O.insertAdjacentHTML("beforeend",o),z()}function z(){document.querySelectorAll("[data-artist-open]").forEach(n=>{n.addEventListener("click",()=>{const o=n.dataset.artistId;if(console.log("🔍 Clicked artist ID:",o),!o){console.warn("Artist ID is missing — modal will not open.");return}const r=fetch(`https://sound-wave.b.goit.study/api/artists/${o}`).then(t=>t.json());F(r)})})}B.addEventListener("click",async()=>{M+=1,await $()});$();async function Y(){const s=await j(),n=document.querySelector("#feedback-list");n.innerHTML="";const o=s.length,r=Math.floor(o/2);s.forEach(e=>{const a=document.createElement("div");a.classList.add("swiper-slide"),a.innerHTML=`
  <div class="feedback-card">
    <div class="rating" data-rating="${e.rating}">
      <div class="rating__stars">
      ${K(e.rating)}
      </div>
    </div> 
    <p class="feedback-text">${e.descr||"—"}</p>
    <h5 class="feedback-author">${e.name||"Анонім"}</h5>
  </div>`,n.appendChild(a)});const t=new Swiper(".feedback-swiper",{slidesPerView:1,spaceBetween:32,speed:500,loop:!1,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},pagination:{el:".swiper-pagination",clickable:!1,renderBullet:function(e,a){return e===0||e===r||e===o-1?`<span class="${a}" data-index="${e}"></span>`:""}},on:{slideChange:function(){const e=this.activeIndex;document.querySelectorAll(".swiper-pagination span").forEach(l=>l.classList.remove("swiper-pagination-bullet-active"));let i=0;e>=o-2?i=o-1:e>=r-1&&e<=r+1?i=r:i=0;const c=document.querySelector(`.swiper-pagination [data-index="${i}"]`);c&&c.classList.add("swiper-pagination-bullet-active")}},touchRatio:1,simulateTouch:!0});t.emit("slideChange"),document.querySelectorAll(".swiper-pagination [data-index]").forEach(e=>{e.addEventListener("click",()=>{const a=parseInt(e.dataset.index);t.slideTo(a)})})}function K(s){const n=Math.round(s);return Array.from({length:5},(o,r)=>`<span class="rating__star ${r<n?"active":""}">★</span>`).join("")}document.addEventListener("DOMContentLoaded",Y);const d={openBtn:document.querySelector("[data-menu-open]"),closeBtn:document.querySelector("[data-menu-close]"),mobileMenu:document.querySelector("[data-menu]")};d.openBtn.addEventListener("click",()=>{d.mobileMenu.classList.remove("is-hidden"),d.mobileMenu.classList.add("is-open"),document.body.style.overflow="hidden"});d.closeBtn.addEventListener("click",()=>{d.mobileMenu.classList.remove("is-open"),d.mobileMenu.classList.add("is-hidden"),document.body.style.overflow=""});
//# sourceMappingURL=index.js.map
