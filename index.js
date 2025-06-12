import{a as E}from"./assets/vendor-BvLu_gPC.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const r of t.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();const L="/ArtistsHub-js-08/assets/symbol-defs-DNVN9KjG.svg",u=document.getElementById("artist-modal"),k=document.getElementById("artist-modal-close"),w=document.getElementById("modal-loader");function C(){w.classList.remove("hidden")}function A(){w.classList.add("hidden")}function M(s){s.target===u&&p()}function $(s){s.key==="Escape"&&p()}function H(){u.classList.add("is-open"),document.body.style.overflow="hidden",k.addEventListener("click",p),u.addEventListener("click",M),document.addEventListener("keydown",$)}function p(){u.classList.remove("is-open"),document.body.style.overflow="",k.removeEventListener("click",p),u.removeEventListener("click",M),document.removeEventListener("keydown",$)}async function P(s){C();try{const n=await s;document.getElementById("artist-name").textContent=n.strArtist||"Unknown",document.getElementById("artist-years").textContent=n.intFormedYear?`${n.intFormedYear}–${n.intDiedYear||"present"}`:"information missing",document.getElementById("artist-sex").textContent=n.strGender||"N/A",document.getElementById("artist-members").textContent=n.intMembers||"N/A",document.getElementById("artist-country").textContent=n.strCountry||"N/A",document.getElementById("artist-bio").textContent=n.strBiographyEN||"No biography available.",document.getElementById("artist-image").src=n.strArtistThumb;const a=document.getElementById("artist-genres");if(a.innerHTML="",Array.isArray(n.genres)&&n.genres.length>0)n.genres.forEach(e=>{const t=document.createElement("span");t.className="genre-item",t.textContent=e,a.appendChild(t)});else{const e=document.createElement("span");e.className="genre-item",e.textContent="Unknown genre",a.appendChild(e)}const o=document.getElementById("albums-container");if(o.innerHTML="",Array.isArray(n.tracksList)&&n.tracksList.length>0){const e={};n.tracksList.forEach(t=>{const r=t.strAlbum||"Unknown Album";e[r]||(e[r]=[]),e[r].push(t)}),Object.entries(e).forEach(([t,r])=>{const i=document.createElement("li");i.className="album";const c=document.createElement("h2");c.className="album-title",c.textContent=t;const d=document.createElement("div");d.className="track-list-container";const f=document.createElement("div");f.className="track-header",f.innerHTML=`
      <span>Track</span>
      <span>Time</span>
      <span>Link</span>
    `;const g=document.createElement("ul");g.className="track-list",r.forEach(m=>{const T=m.strTrackName||m.strTrack||"Unknown track",y=m.intDuration;function q(U){const v=Math.floor(Number(U)/1e3),_=Math.floor(v/60),D=v%60;return`${_}:${D.toString().padStart(2,"0")}`}const j=y?q(y):"Unknown length",b=m.movie,h=document.createElement("li");h.className="track-item",h.innerHTML=`
        <span class="track-name">${T}</span>
        <span class="track-time">${j}</span>
        ${b?`<a href="${b}" class="track-link" target="_blank" rel="noopener noreferrer">
                 <svg class="youtube-link" width="24" height="25">
                   <use href="${L} #icon-youtube"></use>
                 </svg>
               </a>`:'<span class="track-link"> </span>'}
      `,g.appendChild(h)}),d.appendChild(f),d.appendChild(g),i.appendChild(c),i.appendChild(d),o.appendChild(i)})}else{const e=document.createElement("p");e.className="no-albums",e.textContent="No tracks available.",o.appendChild(e)}H()}catch(n){console.error("Error loading artist:",n)}finally{A()}}const B="https://sound-wave.b.goit.study/api";async function F(s=1,n=8){try{return(await E.get(`${B}/artists`,{params:{page:s,limit:n}})).data}catch{return iziToast.error({message:"Sorry, there is no more artists. Please try later!",position:"topRight",messageColor:"#fff",messageSize:"16px",backgroundColor:" #EF4040",timeout:3e3}),{}}}async function O(s=1,n=25){try{return(await E.get(`${B}/feedbacks`,{params:{page:s,limit:n}})).data.data}catch(a){return console.error("API Error:",a),{}}}const R="/ArtistsHub-js-08/assets/placeholder-CaZEGydM.jpg",N=document.querySelector(".artists-list"),x=document.querySelector("#load-more-btn");let I=1;const z=8;async function S(){C();try{const s=await F(I,z);if(s.artists.length===0){x.style.display="none",iziToast.info({title:"Notice",message:"No more artists to load",position:"bottomRight",messageColor:"#fff",messageSize:"16px",backgroundColor:" #EF4040",timeout:3e3});return}G(s.artists,L)}catch(s){console.error("Failed to load artists:",s)}finally{A()}}function G(s,n){const o=s.filter(e=>e._id).map(e=>{var i;const t=(i=e.genres)!=null&&i.length?e.genres.map(c=>`<span class="artist-card-genre">${c}</span>`).join(""):'<span class="artist-card-genre">Unknown</span>',r=e.strArtistThumb||R;return`
        <li class="artist-card" data-id="${e._id}">
          <img 
            class="artist-card-img" 
            src="${r}" 
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
      `}).join("");N.insertAdjacentHTML("beforeend",o)}function K(){N.addEventListener("click",s=>{const n=s.target.closest("[data-artist-open]");if(!n)return;const a=n.dataset.artistId;if(!a){console.warn("Artist ID is missing — modal will not open.");return}const o=fetch(`https://sound-wave.b.goit.study/api/artists/${a}`).then(e=>e.json());P(o)})}x.addEventListener("click",async()=>{I+=1,await S()});S();K();async function Y(){const s=await O(),n=document.querySelector("#feedback-list");n.innerHTML="";const a=s.length,o=Math.floor(a/2);s.forEach(t=>{const r=document.createElement("div");r.classList.add("swiper-slide"),r.innerHTML=`
  <div class="feedback-card">
    <div class="rating" data-rating="${t.rating}">
      <div class="rating__stars">
      ${V(t.rating)}
      </div>
    </div> 
    <p class="feedback-text">${t.descr||"—"}</p>
    <h3 class="feedback-author">${t.name||"Анонім"}</h3>
  </div>`,n.appendChild(r)});const e=new Swiper(".feedback-swiper",{slidesPerView:1,spaceBetween:32,speed:500,loop:!1,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},pagination:{el:".swiper-pagination",clickable:!1,renderBullet:function(t,r){return t===0||t===o||t===a-1?`<span class="${r}" data-index="${t}"></span>`:""}},on:{slideChange:function(){const t=this.activeIndex;document.querySelectorAll(".swiper-pagination span").forEach(d=>d.classList.remove("swiper-pagination-bullet-active"));let i=0;t>=a-2?i=a-1:t>=o-1&&t<=o+1?i=o:i=0;const c=document.querySelector(`.swiper-pagination [data-index="${i}"]`);c&&c.classList.add("swiper-pagination-bullet-active")}},touchRatio:1,simulateTouch:!0});e.emit("slideChange"),document.querySelectorAll(".swiper-pagination [data-index]").forEach(t=>{t.addEventListener("click",()=>{const r=parseInt(t.dataset.index);e.slideTo(r)})})}function V(s){const n=Math.round(s);return Array.from({length:5},(a,o)=>`<span class="rating__star ${o<n?"active":""}">★</span>`).join("")}document.addEventListener("DOMContentLoaded",Y);const l={openBtn:document.querySelector("[data-menu-open]"),closeBtn:document.querySelector("[data-menu-close]"),mobileMenu:document.querySelector("[data-menu]")};l.openBtn.addEventListener("click",()=>{l.mobileMenu.classList.remove("is-hidden"),l.mobileMenu.classList.add("is-open"),document.body.style.overflow="hidden"});l.closeBtn.addEventListener("click",()=>{l.mobileMenu.classList.remove("is-open"),l.mobileMenu.classList.add("is-hidden"),document.body.style.overflow=""});const Z=document.querySelectorAll('[data-menu] a[href*="#"]');Z.forEach(s=>{s.addEventListener("click",()=>{l.mobileMenu.classList.remove("is-open"),l.mobileMenu.classList.add("is-hidden"),document.body.style.overflow=""})});
//# sourceMappingURL=index.js.map
