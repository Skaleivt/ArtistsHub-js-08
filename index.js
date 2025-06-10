import{a as u}from"./assets/vendor-BvLu_gPC.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const n=document.getElementById("artist-modal"),p=document.querySelectorAll("[data-artist-open]"),m=document.getElementById("artist-modal-close");p.forEach(t=>{t.addEventListener("click",()=>{n.classList.add("is-open"),document.body.style.overflow="hidden"})});m.addEventListener("click",()=>{c()});n.addEventListener("click",t=>{t.target===n&&c()});document.addEventListener("keydown",t=>{t.key==="Escape"&&n.classList.contains("is-open")&&c()});function c(){n.classList.remove("is-open"),document.body.style.overflow=""}const g="https://sound-wave.b.goit.study/api";async function f(t=1,o=8){try{const e=await u.get(`${g}/artists`,{params:{page:t,limit:o}});return console.log("Full API response:",e),console.log("API Response:",e.data),e.data}catch(e){return console.error("API Error:",e),{}}}document.querySelector("#artists");const y=document.querySelector(".artists-list"),h=document.querySelector("#load-more-btn");let l=1;const v=8;async function d(){try{const t=await f(l,v);console.log("Artists Data:",t),console.log("Results:",t.artists),L(t.artists)}catch(t){console.error("Failed to load artists:",t)}}function L(t){console.log("Rendering Artists:",t);const o=t.map(e=>{const a=e.genres&&e.genres.length>0?e.genres.map(s=>`<span class="artist-card-genre">${s}</span>`).join(""):'<span class="artist-card-genre">Unknown</span>';return`
        <li class="artist-card" data-id="${e._id||""}">
          <img 
            class="artist-card-img" 
            src="${e.strArtistThumb||"./images/placeholder.jpg"}" 
            alt="${e.strArtist||"Unknown Artist"}" 
          />
          <div class="artist-card-content">
            <div class="artist-card-genres">
              ${a}
            </div>
            <h3 class="artist-card-name">${e.strArtist||"Unknown Artist"}</h3>
            <p class="artist-card-description">
              ${e.strBiographyEN?e.strBiographyEN:"No description available."}
            </p>
            <button type="button" class="artist-card-btn">
              Learn More
              <svg class="artist-card-btn-icon" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-left: 8px;">
                <path d="M0 14L8 7L0 0V14Z"/>
              </svg>
            </button>
          </div>
        </li>
      `}).join("");y.insertAdjacentHTML("beforeend",o)}h.addEventListener("click",async()=>{l+=1,await d()});d();
//# sourceMappingURL=index.js.map
