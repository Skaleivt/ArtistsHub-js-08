import{a as m}from"./assets/vendor-BvLu_gPC.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))c(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&c(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function c(s){if(s.ep)return;s.ep=!0;const o=t(s);fetch(s.href,o)}})();const r={openBtn:document.querySelector("[data-menu-open]"),closeBtn:document.querySelector("[data-menu-close]"),mobileMenu:document.querySelector("[data-menu]")};r.openBtn.addEventListener("click",()=>{r.mobileMenu.classList.remove("is-hidden"),r.mobileMenu.classList.add("is-open"),document.body.style.overflow="hidden"});r.closeBtn.addEventListener("click",()=>{r.mobileMenu.classList.remove("is-open"),r.mobileMenu.classList.add("is-hidden"),document.body.style.overflow=""});const i=document.getElementById("artist-modal"),p=document.querySelectorAll("[data-artist-open]"),f=document.getElementById("artist-modal-close");p.forEach(e=>{e.addEventListener("click",()=>{i.classList.add("is-open"),document.body.style.overflow="hidden"})});f.addEventListener("click",()=>{l()});i.addEventListener("click",e=>{e.target===i&&l()});document.addEventListener("keydown",e=>{e.key==="Escape"&&i.classList.contains("is-open")&&l()});function l(){i.classList.remove("is-open"),document.body.style.overflow=""}const g="https://sound-wave.b.goit.study/api";async function y(e=1,n=8){try{const t=await m.get(`${g}/artists`,{params:{page:e,limit:n}});return console.log("Full API response:",t),console.log("API Response:",t.data),t.data}catch(t){return console.error("API Error:",t),{}}}document.querySelector("#artists");const h=document.querySelector(".artists-list"),v=document.querySelector("#load-more-btn");let d=1;const L=8;async function u(){try{const e=await y(d,L);console.log("Artists Data:",e),console.log("Results:",e.artists),b(e.artists)}catch(e){console.error("Failed to load artists:",e)}}function b(e){console.log("Rendering Artists:",e);const n=e.map(t=>{const c=t.genres&&t.genres.length>0?t.genres.map(s=>`<span class="artist-card-genre">${s}</span>`).join(""):'<span class="artist-card-genre">Unknown</span>';return`
        <li class="artist-card" data-id="${t._id||""}">
          <img 
            class="artist-card-img" 
            src="${t.strArtistThumb||"./images/placeholder.jpg"}" 
            alt="${t.strArtist||"Unknown Artist"}" 
          />
          <div class="artist-card-content">
            <div class="artist-card-genres">
              ${c}
            </div>
            <h3 class="artist-card-name">${t.strArtist||"Unknown Artist"}</h3>
            <p class="artist-card-description">
              ${t.strBiographyEN?t.strBiographyEN:"No description available."}
            </p>
            <button type="button" class="artist-card-btn">
              Learn More
              <svg class="artist-card-btn-icon" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-left: 8px;">
                <path d="M0 14L8 7L0 0V14Z"/>
              </svg>
            </button>
          </div>
        </li>
      `}).join("");h.insertAdjacentHTML("beforeend",n)}v.addEventListener("click",async()=>{d+=1,await u()});u();
//# sourceMappingURL=index.js.map
