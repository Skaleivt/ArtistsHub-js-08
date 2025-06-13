import{a as L}from"./assets/vendor-BvLu_gPC.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const r of e.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function a(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function o(t){if(t.ep)return;t.ep=!0;const e=a(t);fetch(t.href,e)}})();const k="/ArtistsHub-js-08/assets/symbol-defs-DNVN9KjG.svg",u=document.getElementById("artist-modal"),w=document.getElementById("artist-modal-close"),C=document.getElementById("modal-loader");function A(){C.classList.remove("hidden")}function M(){C.classList.add("hidden")}function $(s){s.target===u&&f()}function B(s){s.key==="Escape"&&f()}function H(){u.classList.add("is-open"),document.body.style.overflow="hidden",w.addEventListener("click",f),u.addEventListener("click",$),document.addEventListener("keydown",B)}function f(){u.classList.remove("is-open"),document.body.style.overflow="",w.removeEventListener("click",f),u.removeEventListener("click",$),document.removeEventListener("keydown",B)}async function P(s){A();try{const n=await s;document.getElementById("artist-name").textContent=n.strArtist||"Unknown",document.getElementById("artist-years").textContent=n.intFormedYear?`${n.intFormedYear}–${n.intDiedYear||"present"}`:"information missing",document.getElementById("artist-sex").textContent=n.strGender||"N/A",document.getElementById("artist-members").textContent=n.intMembers||"N/A",document.getElementById("artist-country").textContent=n.strCountry||"N/A",document.getElementById("artist-bio").textContent=n.strBiographyEN||"No biography available.",document.getElementById("artist-image").src=n.strArtistThumb;const a=document.getElementById("artist-genres");if(a.innerHTML="",Array.isArray(n.genres)&&n.genres.length>0)n.genres.forEach(t=>{const e=document.createElement("span");e.className="genre-item",e.textContent=t,a.appendChild(e)});else{const t=document.createElement("span");t.className="genre-item",t.textContent="Unknown genre",a.appendChild(t)}const o=document.getElementById("albums-container");if(o.innerHTML="",Array.isArray(n.tracksList)&&n.tracksList.length>0){const t={};n.tracksList.forEach(e=>{const r=e.strAlbum||"Unknown Album";t[r]||(t[r]=[]),t[r].push(e)}),Object.entries(t).forEach(([e,r])=>{const i=document.createElement("li");i.className="album";const c=document.createElement("h2");c.className="album-title",c.textContent=e;const l=document.createElement("div");l.className="track-list-container";const g=document.createElement("div");g.className="track-header",g.innerHTML=`
      <span>Track</span>
      <span>Time</span>
      <span>Link</span>
    `;const h=document.createElement("ul");h.className="track-list",r.forEach(m=>{const T=m.strTrackName||m.strTrack||"Unknown track",b=m.intDuration;function q(U){const E=Math.floor(Number(U)/1e3),_=Math.floor(E/60),D=E%60;return`${_}:${D.toString().padStart(2,"0")}`}const j=b?q(b):"Unknown length",v=m.movie,y=document.createElement("li");y.className="track-item",y.innerHTML=`
        <span class="track-name">${T}</span>
        <span class="track-time">${j}</span>
        ${v?`<a href="${v}" class="track-link" target="_blank" rel="noopener noreferrer">
                 <svg class="youtube-link" width="24" height="25">
                   <use href="${k}#icon-youtube"></use>
                 </svg>
               </a>`:'<span class="track-link"> </span>'}
      `,h.appendChild(y)}),l.appendChild(g),l.appendChild(h),i.appendChild(c),i.appendChild(l),o.appendChild(i)})}else{const t=document.createElement("p");t.className="no-albums",t.textContent="No tracks available.",o.appendChild(t)}H()}catch(n){console.error("Error loading artist:",n)}finally{M()}}const N="https://sound-wave.b.goit.study/api";async function F(s=1,n=8){try{return(await L.get(`${N}/artists`,{params:{page:s,limit:n}})).data}catch{return iziToast.error({message:"Sorry, there is no more artists. Please try later!",position:"topRight",messageColor:"#fff",messageSize:"16px",backgroundColor:" #EF4040",timeout:3e3}),{}}}async function O(s=1,n=25){try{return(await L.get(`${N}/feedbacks`,{params:{page:s,limit:n}})).data.data}catch(a){return console.error("API Error:",a),{}}}const R="/ArtistsHub-js-08/assets/placeholder-CaZEGydM.jpg",x=document.querySelector(".artists-list"),p=document.querySelector("#load-more-btn");let I=1;const z=8;async function S(){p.style.display="none",A();try{const s=await F(I,z);if(s.artists.length===0){p.style.display="none",iziToast.info({title:"Notice",message:"No more artists to load",position:"bottomRight",messageColor:"#fff",messageSize:"16px",backgroundColor:" #EF4040",timeout:3e3});return}G(s.artists,k,R),p.style.display="flex"}catch(s){console.error("Failed to load artists:",s)}finally{M()}}function G(s,n,a){const t=s.filter(e=>e._id).map(e=>{var c;const r=(c=e.genres)!=null&&c.length?e.genres.map(l=>`<span class="artist-card-genre">${l}</span>`).join(""):'<span class="artist-card-genre">Unknown</span>',i=e.strArtistThumb||a;return`
        <li class="artist-card" data-id="${e._id}">
          <img 
            class="artist-card-img" 
            src="${i}" 
            alt="${e.strArtist||"Unknown Artist"}" 
          />
          <div class="artist-card-content">
            <div class="artist-card-genres">${r}</div>
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
      `}).join("");x.insertAdjacentHTML("beforeend",t)}function K(){x.addEventListener("click",s=>{const n=s.target.closest("[data-artist-open]");if(!n)return;const a=n.dataset.artistId;if(!a){console.warn("Artist ID is missing — modal will not open.");return}const o=fetch(`https://sound-wave.b.goit.study/api/artists/${a}`).then(t=>t.json());P(o)})}p.addEventListener("click",async()=>{I+=1,await S()});S();K();async function Y(){const s=await O(),n=document.querySelector("#feedback-list");n.innerHTML="";const a=s.length,o=Math.floor(a/2);s.forEach(e=>{const r=document.createElement("div");r.classList.add("swiper-slide"),r.innerHTML=`
  <div class="feedback-card">
    <div class="rating" data-rating="${e.rating}">
      <div class="rating__stars">
      ${V(e.rating)}
      </div>
    </div> 
    <p class="feedback-text">${e.descr||"—"}</p>
    <h3 class="feedback-author">${e.name||"Анонім"}</h3>
  </div>`,n.appendChild(r)});const t=new Swiper(".feedback-swiper",{slidesPerView:1,spaceBetween:32,speed:500,loop:!1,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},pagination:{el:".swiper-pagination",clickable:!1,renderBullet:function(e,r){return e===0||e===o||e===a-1?`<span class="${r}" data-index="${e}"></span>`:""}},on:{slideChange:function(){const e=this.activeIndex;document.querySelectorAll(".swiper-pagination span").forEach(l=>l.classList.remove("swiper-pagination-bullet-active"));let i=0;e>=a-2?i=a-1:e>=o-1&&e<=o+1?i=o:i=0;const c=document.querySelector(`.swiper-pagination [data-index="${i}"]`);c&&c.classList.add("swiper-pagination-bullet-active")}},touchRatio:1,simulateTouch:!0});t.emit("slideChange"),document.querySelectorAll(".swiper-pagination [data-index]").forEach(e=>{e.addEventListener("click",()=>{const r=parseInt(e.dataset.index);t.slideTo(r)})})}function V(s){const n=Math.round(s);return Array.from({length:5},(a,o)=>`<span class="rating__star ${o<n?"active":""}">★</span>`).join("")}document.addEventListener("DOMContentLoaded",Y);const d={openBtn:document.querySelector("[data-menu-open]"),closeBtn:document.querySelector("[data-menu-close]"),mobileMenu:document.querySelector("[data-menu]")};d.openBtn.addEventListener("click",()=>{d.mobileMenu.classList.remove("is-hidden"),d.mobileMenu.classList.add("is-open"),document.body.style.overflow="hidden"});d.closeBtn.addEventListener("click",()=>{d.mobileMenu.classList.remove("is-open"),d.mobileMenu.classList.add("is-hidden"),document.body.style.overflow=""});const Z=document.querySelectorAll('[data-menu] a[href*="#"]');Z.forEach(s=>{s.addEventListener("click",()=>{d.mobileMenu.classList.remove("is-open"),d.mobileMenu.classList.add("is-hidden"),document.body.style.overflow=""})});
//# sourceMappingURL=index.js.map
