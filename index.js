import{a as l}from"./assets/vendor-BvLu_gPC.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(e){if(e.ep)return;e.ep=!0;const s=t(e);fetch(e.href,s)}})();const d="https://sound-wave.b.goit.study/api";async function u(r=1,o=8){try{const t=await l.get(`${d}/artists`,{params:{page:r,limit:o}});return console.log("Full API response:",t),console.log("API Response:",t.data),t.data}catch(t){return console.error("API Error:",t),{}}}document.querySelector("#artists");const p=document.querySelector(".artists-list"),g=document.querySelector("#load-more-btn");let i=1;const f=8;async function c(){try{const r=await u(i,f);console.log("Artists Data:",r),console.log("Results:",r.artists),m(r.artists)}catch(r){console.error("Failed to load artists:",r)}}function m(r){console.log("Rendering Artists:",r);const o=r.map(t=>{const n=t.genres&&t.genres.length>0?t.genres.map(e=>`<span class="artist-card-genre">${e}</span>`).join(""):'<span class="artist-card-genre">Unknown</span>';return`
        <li class="artist-card" data-id="${t._id||""}">
          <img 
            class="artist-card-img" 
            src="${t.strArtistThumb||"./images/placeholder.jpg"}" 
            alt="${t.strArtist||"Unknown Artist"}" 
          />
          <div class="artist-card-content">
            <div class="artist-card-genres">
              ${n}
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
      `}).join("");p.insertAdjacentHTML("beforeend",o)}g.addEventListener("click",async()=>{i+=1,await c()});c();
//# sourceMappingURL=index.js.map
