import{a as p}from"./assets/vendor-BvLu_gPC.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const n={openBtn:document.querySelector("[data-menu-open]"),closeBtn:document.querySelector("[data-menu-close]"),mobileMenu:document.querySelector("[data-menu]")};n.openBtn.addEventListener("click",()=>{n.mobileMenu.classList.remove("is-hidden"),n.mobileMenu.classList.add("is-open"),document.body.style.overflow="hidden"});n.closeBtn.addEventListener("click",()=>{n.mobileMenu.classList.remove("is-open"),n.mobileMenu.classList.add("is-hidden"),document.body.style.overflow=""});const i=document.getElementById("artist-modal"),y=document.querySelectorAll("[data-artist-open]"),f=document.getElementById("artist-modal-close");y.forEach(t=>{t.addEventListener("click",()=>{i.classList.add("is-open"),document.body.style.overflow="hidden"})});f.addEventListener("click",()=>{d()});i.addEventListener("click",t=>{t.target===i&&d()});document.addEventListener("keydown",t=>{t.key==="Escape"&&i.classList.contains("is-open")&&d()});function d(){i.classList.remove("is-open"),document.body.style.overflow=""}const g="https://sound-wave.b.goit.study/api";async function h(t=1,r=8){try{return(await p.get(`${g}/artists`,{params:{page:t,limit:r}})).data}catch{return iziToast.error({message:"Sorry, there is no more artists. Please try later!",...optionIzi}),{}}}document.querySelector("#artists");const v=document.querySelector(".artists-list"),l=document.querySelector("#load-more-btn");document.querySelector("#no-more-artists-msg");let u=1;const b=8;async function m(){try{const t=await h(u,b);if(t.artists.length===0){l.style.display="none",iziToast.info({title:"Notice",message:"No more artists to load",position:"bottomRight",timeout:3e3});return}L(t.artists)}catch(t){console.error("Failed to load artists:",t)}}function L(t){console.log("Rendering Artists:",t);const r=t.map(s=>{const a=s.genres&&s.genres.length>0?s.genres.map(e=>`<span class="artist-card-genre">${e}</span>`).join(""):'<span class="artist-card-genre">Unknown</span>';return`
        <li class="artist-card" data-id="${s._id||""}">
          <img 
            class="artist-card-img" 
            src="${s.strArtistThumb||"./img/placeholderartist.jpg"}" 
            alt="${s.strArtist||"Unknown Artist"}" 
          />
          <div class="artist-card-content">
            <div class="artist-card-genres">
              ${a}
            </div>
            <h3 class="artist-card-name">${s.strArtist||"Unknown Artist"}</h3>
            <p class="artist-card-description">
              ${s.strBiographyEN?s.strBiographyEN:"No description available."}
            </p>
<button type="button" class="artist-card-btn" data-artist-open>
  Learn More
  <svg class="artist-card-btn-icon" width="8" height="14">
    <use href="#icon-triangle-white"></use>
  </svg>
</button>
          </div>
        </li>
      `}).join("");v.insertAdjacentHTML("beforeend",r)}l.addEventListener("click",async()=>{u+=1,await m()});m();
//# sourceMappingURL=index.js.map
