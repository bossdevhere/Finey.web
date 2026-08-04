(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&c(r)}).observe(document,{childList:!0,subtree:!0});function i(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function c(t){if(t.ep)return;t.ep=!0;const o=i(t);fetch(t.href,o)}})();document.addEventListener("DOMContentLoaded",()=>{y(),f(),g(),h(),v(),E()});function y(){const n=document.getElementById("themeToggleBtn"),e=localStorage.getItem("finey_theme")||"dark";document.documentElement.setAttribute("data-theme",e),u(e),n&&n.addEventListener("click",()=>{const c=document.documentElement.getAttribute("data-theme")==="dark"?"light":"dark";document.documentElement.setAttribute("data-theme",c),localStorage.setItem("finey_theme",c),u(c)})}function u(n){const e=document.getElementById("themeIcon");e&&(n==="dark"?e.innerHTML=`
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    `:e.innerHTML=`
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    `)}function f(){const n=document.querySelectorAll(".tab-btn"),e=document.querySelectorAll(".policy-pane");n.length&&n.forEach(i=>{i.addEventListener("click",()=>{const c=i.getAttribute("data-tab");n.forEach(o=>o.classList.remove("active")),e.forEach(o=>o.classList.remove("active")),i.classList.add("active");const t=document.getElementById(`policy-${c}`);t&&t.classList.add("active")})})}function g(){const n=document.querySelectorAll(".faq-item");n.forEach(e=>{const i=e.querySelector(".faq-question");i&&i.addEventListener("click",()=>{const c=e.classList.contains("open");n.forEach(t=>t.classList.remove("open")),c||e.classList.add("open")})})}function h(){const n=document.getElementById("demoExpenseForm"),e=document.getElementById("demoExpenseList"),i=document.getElementById("demoTotalDisplay");if(!n||!e||!i)return;let c=[{title:"Grocery Shopping",category:"Food & Dining",amount:48.5,date:"Today"},{title:"Electricity Bill",category:"Utilities & Bills",amount:85,date:"Yesterday"},{title:"Coffee & Snacks",category:"Food & Dining",amount:12.4,date:"2 days ago"}];function t(){e.innerHTML="";let o=0;c.forEach(r=>{o+=r.amount;const s=document.createElement("li");s.className="expense-item",s.innerHTML=`
        <div class="expense-cat">
          <span class="expense-cat-badge"></span>
          <div>
            <div>${d(r.title)}</div>
            <small style="color: var(--text-muted); font-weight: normal;">${d(r.category)} • ${r.date}</small>
          </div>
        </div>
        <div class="expense-amount">-$${r.amount.toFixed(2)}</div>
      `,e.appendChild(s)}),i.textContent=`$${o.toFixed(2)}`}t(),n.addEventListener("submit",o=>{o.preventDefault();const r=document.getElementById("demoTitle"),s=document.getElementById("demoAmount"),m=document.getElementById("demoCategory"),p=r.value.trim()||"Expense Item",a=parseFloat(s.value);if(isNaN(a)||a<=0){l("Please enter a valid amount");return}c.unshift({title:p,category:m.value,amount:a,date:"Just now"}),t(),r.value="",s.value="",l("Expense recorded! (Offline Hive storage simulation)")})}function v(){const n=document.getElementById("contactForm");n&&n.addEventListener("submit",e=>{e.preventDefault();const i=document.getElementById("contactName").value.trim(),c=document.getElementById("contactEmail").value.trim(),t=document.getElementById("contactMessage").value.trim();if(!i||!c||!t){l("Please fill out all fields.");return}l("Thank you! Your support ticket has been logged."),n.reset()})}function E(){document.querySelectorAll(".btn-copy-link").forEach(e=>{e.addEventListener("click",()=>{const i=e.getAttribute("data-url")||window.location.href;navigator.clipboard.writeText(i).then(()=>{l("Link copied to clipboard! Ready for Play Store / App Store Console.")}).catch(()=>{l("Failed to copy. URL: "+i)})})})}function l(n){let e=document.getElementById("toastNotification");e||(e=document.createElement("div"),e.id="toastNotification",e.className="toast",document.body.appendChild(e)),e.innerHTML=`
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${d(n)}</span>
  `,e.classList.add("show"),setTimeout(()=>{e.classList.remove("show")},3500)}function d(n){return n.replace(/[&<>"']/g,function(e){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[e]})}
