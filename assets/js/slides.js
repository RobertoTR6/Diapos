/**
 * Engine de Presentación Dinámico
 * Gestiona renderizado de slides, navegación y modo presentador.
 */

class PresentationEngine {
  constructor(data) {
    this.data = data;
    this.current = 0;
    this.isPresenting = false;
    this.startTime = null;
    this.timerInterval = null;
    this.baseCrumb = "ANA • PLANEAMIENTO ESTRATÉGICO 2025-2030";
    this.prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    this.init();
  }

  init() {
    this.renderSlides();
    this.bindEvents();
    this.loadFromHash();
    this.updateUi();
    lucide.createIcons();
    this.autoFitContent();
    window.addEventListener("resize", () => this.autoFitContent());
  }

  renderSlides() {
    const container = document.getElementById("slides-container");
    container.innerHTML = "";

    this.data.forEach((slide, index) => {
      const slideEl = document.createElement("div");
      slideEl.className = `slide ${index === this.current ? "active" : ""}`;
      slideEl.id = slide.id;
      slideEl.innerHTML = this.getTemplate(slide);
      container.appendChild(slideEl);
    });
  }

  getTemplate(slide) {
    switch (slide.type) {
      case "cover":
        return this.templateCover(slide.content);
      case "crisis":
        return this.templateCrisis(slide.content);
      case "diagnosis":
        return this.templateDiagnosis(slide.content);
      case "strategy":
        return this.templateStrategy(slide.content);
      case "value":
        return this.templateValue(slide.content);
      case "implementation":
        return this.templateImplementation(slide.content);
      case "references":
        return this.templateReferences(slide.content);
      default:
        return `<div class="p-20"><h1>Slide Type Not Found</h1></div>`;
    }
  }

  templateCover(c) {
    return `
      <section class="slide-cover reveal">
        <div class="cover-top">
          <img src="${c.image}" alt="Building" />
        </div>
        <div class="cover-bottom">
          <div class="cover-blue-box">
             <div class="cover-logo-area">
                <img src="${c.logo}" alt="UP Logo" />
             </div>
             <div class="cover-main-text">
                Escuela de<br/>
                Gestión<br/>
                Pública
             </div>
             <div class="cover-url">${c.url}</div>
          </div>
          <div class="cover-content">
             <h1 class="cover-title">${c.title}</h1>
             <ul class="cover-names">
                ${c.names.map(name => `<li>${name}</li>`).join("")}
             </ul>
          </div>
        </div>
      </section>
    `;
  }

  templateCrisis(c) {
    return `
      <section class="infografia-crisis reveal">
        <header class="hero-title-v2 reveal">
          <h1>
            <span class="text-[#003066]">PERÚ:</span> 
            ${c.title.replace("PERÚ: ", "").replace("CALIDAD DEL AGUA", '<span class="text-blue-600">CALIDAD DEL AGUA</span>')}
          </h1>
          <h2>${c.subtitle.replace("MILLONES DE USUARIOS", '<span class="highlight-blue">MILLONES DE USUARIOS</span>')}</h2>
        </header>

        <div class="content-grid-v2">
          <div class="col-span-2 glass-module module-scale">
            <div class="metrics-grid">
              ${c.metrics.map((m, i) => `
                <div class="identical-card card-${m.color} reveal delay-${i + 1}">
                  <div class="card-label-v3">${m.label}</div>
                  <div class="card-main-val">
                    ${m.value} ${m.unit ? `<span class="unit-text">${m.unit}</span>` : ""}
                  </div>
                  <div class="card-sub-info">${m.sub}</div>
                  <div class="wave-bg"></div>
                </div>
              `).join("")}
            </div>

            <div class="ranking-container-v6 reveal delay-3">
              <div class="rank-stack-v6">
                ${c.rankings.map(r => `
                  <div class="rank-card-v6 !py-4">
                    <div class="rank-icon-circle-v6 bg-${r.color}-soft w-12 h-12">
                      <i data-lucide="${r.icon}" class="w-7 h-7"></i>
                    </div>
                    <div class="rank-text-v6">
                      <h4 class="text-${r.color}-rank text-xl">${r.title}</h4>
                      <p class="text-base">${r.sub}</p>
                    </div>
                  </div>
                `).join("")}
              </div>
              <div class="evidence-side-v6 !bg-slate-950 p-6 flex flex-col justify-between border-none">
                <div class="flex items-center justify-between mb-6">
                  <h5 class="text-white text-xs font-black uppercase tracking-widest opacity-80">${c.chart.title}</h5>
                  <div class="flex gap-2">
                    <span class="w-2 h-2 rounded-full bg-blue-500"></span>
                    <span class="w-2 h-2 rounded-full bg-red-500"></span>
                  </div>
                </div>
                <div class="flex-grow flex flex-col justify-around gap-4">
                  ${c.chart.items.map(item => `
                    <div class="space-y-2">
                      <div class="flex justify-between items-end">
                        <span class="text-white font-black text-sm uppercase tracking-wider">${item.country}</span>
                        <span class="text-xs ${item.highlight ? 'text-red-400' : 'text-blue-400'} font-bold">${item.value.toFixed(2)} - ${item.level}</span>
                      </div>
                      <div class="h-3 w-full bg-white/10 rounded-full overflow-hidden shadow-inner">
                        <div class="h-full bg-gradient-to-r ${item.highlight ? 'from-red-600 to-red-400' : 'from-blue-600 to-blue-400'} rounded-full transition-all duration-1000" style="width: ${(item.value / 4.47) * 100}%"></div>
                      </div>
                    </div>
                  `).join("")}
                </div>
                <div class="mt-6 pt-4 border-t border-white/10">
                  <p class="text-[10px] text-slate-400 font-bold italic text-center">Fuente: World Resources Institute (WRI) 2024</p>
                </div>
              </div>
            </div>
          </div>

          <div class="impact-v5 glass-module module-impact reveal delay-4">
            <div class="consequence-box-v5">
              <p>${c.impacts.title}</p>
            </div>
            ${c.impacts.items.map(item => `
              <div class="impact-card-v5">
                <div class="icon-sq-v5 bg-b-50"><i data-lucide="${item.icon}"></i></div>
                <div class="card-info-v5">
                  <h4>${item.title}</h4>
                  <p>${item.desc}</p>
                </div>
                <i data-lucide="chevron-right" class="arrow-v5"></i>
              </div>
            `).join("")}
          </div>
        </div>

        <footer class="cta-footer-v2 reveal delay-4">
          <p>${c.footer}</p>
        </footer>
      </section>
    `;
  }

  templateDiagnosis(c) {
    return `
      <section class="slide-diagnosis reveal">
        <header class="diag-header-v8">
          <span class="diag-label-v8">${c.label}</span>
          <h1>${c.title}</h1>
        </header>

        <!-- SECCIÓN EFECTOS -->
        <div class="diag-row-v8">
          <div class="diag-side-label-v8 effect-label">
            <i data-lucide="alert-triangle"></i>
            <span>EFECTOS</span>
          </div>
          <div class="diag-main-content-v8">
            <div class="grid grid-cols-4 gap-4 items-stretch">
              ${c.effects.map(e => `
                <div class="diag-card-v8 !border-l-4 !border-l-${e.color}-500">
                  <h4 class="leading-tight"><i data-lucide="${e.icon}" class="shrink-0"></i> ${e.text}</h4>
                </div>
              `).join("")}
            </div>
            <div class="tree-branch-container mt-0">
              <div class="tree-grid-connectors top-connectors">
                ${'<div><span class="tree-vert-line"></span></div>'.repeat(4)}
              </div>
              <div class="tree-pivot">
                <div class="tree-horizontal-bar top-bar"></div>
                <div class="tree-main-v"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- PROBLEMA CENTRAL -->
        <div class="problem-bridge-v8">
          <h2>${c.problem.title}</h2>
          <p>${c.problem.sub}</p>
        </div>

        <!-- SECCIÓN CAUSAS -->
        <div class="diag-row-v8">
          <div class="diag-side-label-v8 cause-label">
            <i data-lucide="cog"></i>
            <span>CAUSAS</span>
          </div>
          <div class="diag-main-content-v8">
            <div class="tree-branch-container mb-1">
              <div class="tree-pivot">
                <div class="tree-main-v rotate-180" style="top: -4px"></div>
                <div class="tree-horizontal-bar bottom-bar" style="bottom: 0; top: auto"></div>
              </div>
              <div class="tree-grid-connectors bottom-connectors">
                ${'<div><span class="tree-vert-line"></span></div>'.repeat(4)}
              </div>
            </div>
            <div class="grid grid-cols-4 gap-4 items-stretch">
              ${c.causes.map(ca => `
                <div class="diag-card-v8 !border-t-2 !border-t-${ca.color}-400">
                  <h4 class="leading-tight"><i data-lucide="${ca.icon}" class="shrink-0"></i> ${ca.text}</h4>
                </div>
              `).join("")}
            </div>
          </div>
        </div>

        <!-- ESCENARIO 2030 -->
        <div class="horizon-2030-v8 reveal delay-1">
          <span class="diag-label-v8" style="color: #1e40af"><i data-lucide="target" class="w-4 h-4"></i> ${c.horizon.label}</span>
          <div class="horizon-grid-v8 mt-2">
            ${c.horizon.items.map(h => `
              <div class="horizon-item-v8">
                <i data-lucide="${h.icon}"></i>
                <div><h5>${h.title}</h5><p>${h.desc}</p></div>
              </div>
            `).join("")}
          </div>
        </div>

        <footer class="diag-footer-v8 reveal delay-2">
          <p>${c.footer}</p>
        </footer>
      </section>
    `;
  }

  templateStrategy(c) {
    return `
      <section class="global-slide-v8 reveal" style="gap: 1.25rem">
        <header class="section-header-v8" style="margin-bottom: 0.25rem">
          <span class="section-label-v8">${c.label}</span>
          <h2 class="text-4xl font-black">${c.title}</h2>
        </header>
        <div class="glass-module bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 border-none p-5 reveal delay-1 shadow-2xl relative rounded-[2rem]">
          <div class="flex items-center justify-between relative z-10 gap-12">
            <div class="flex-grow">
              <div class="flex items-center gap-4 mb-4">
                <div class="bg-blue-500 p-3 rounded-2xl shadow-xl"><i data-lucide="target" class="w-8 h-8 text-white"></i></div>
                <span class="text-cyan-400 font-black tracking-[0.3em] text-[11px] uppercase">${c.oei.id}</span>
              </div>
              <h3 class="text-3xl font-black text-white leading-tight mb-4">${c.oei.text}</h3>
              <div class="bg-white/10 px-8 py-4 rounded-2xl border border-white/20 backdrop-blur-xl flex items-center gap-6 max-w-max">
                <i data-lucide="bar-chart-2" class="w-7 h-7 text-cyan-400"></i>
                <div>
                  <p class="text-blue-200 text-[11px] font-black uppercase tracking-widest mb-0.5">${c.oei.indicator.label}</p>
                  <p class="text-white font-extrabold text-xl leading-none">${c.oei.indicator.text} <span class="text-cyan-400">${c.oei.indicator.value}</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <span class="diag-label-v8 text-blue-900 font-black text-sm uppercase tracking-widest flex items-center gap-2">
          <i data-lucide="layers" class="w-6 h-6"></i> Acciones Estratégicas
        </span>
        <div class="grid grid-cols-4 gap-4 flex-grow">
          ${c.aeis.map(aei => `
            <div class="glass-module reveal delay-2 p-5 border-l-4 border-${aei.color}-600 bg-white/95 rounded-[1.5rem] shadow-lg flex flex-col hover:translate-y-[-4px] transition-transform">
              <div class="flex justify-between items-center mb-2">
                <span class="text-[13px] bg-${aei.color}-600 text-white px-4 py-1.5 rounded-full font-black">${aei.id}</span>
                <i data-lucide="${aei.icon}" class="w-5 h-5 text-blue-600"></i>
              </div>
              <h4 class="font-black text-slate-800 text-[16px] leading-tight mb-2">${aei.title}</h4>
              <p class="text-[14px] text-slate-600 font-bold mb-4 italic">${aei.sub}</p>
              <div class="mt-auto pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
                <div><p class="text-slate-400 text-[10px] font-black uppercase tracking-tighter">Base 2023</p><span class="text-xl font-black text-slate-600">${aei.base}</span></div>
                <div class="text-right"><p class="text-blue-600 text-[10px] font-black uppercase tracking-tighter">Meta 2030</p><span class="text-3xl font-black text-blue-800">${aei.meta}</span></div>
              </div>
            </div>
          `).join("")}
        </div>
      </section>
    `;
  }

  templateValue(c) {
    return `
      <section class="global-slide-v8 reveal" style="gap: 0.5rem">
        <header class="section-header-v8">
          <span class="section-label-v8">${c.label}</span>
          <h2>${c.title}</h2>
        </header>
        <div class="mb-4"><span class="text-xs font-black text-blue-600 uppercase tracking-widest">${c.intro}</span></div>
        <div class="grid grid-cols-2 gap-4 flex-grow">
          ${c.benefits.map(b => `
            <div class="glass-module p-4 border-l-4 border-${b.color}-600 reveal delay-1 hover:translate-x-2 transition-all duration-300">
              <div class="flex items-center gap-3 mb-3">
                <div class="bg-${b.color}-100 p-2 rounded-xl"><i data-lucide="${b.icon}" class="w-5 h-5 text-${b.color}-600"></i></div>
                <h4 class="font-black text-slate-900 text-lg leading-tight">${b.title}</h4>
              </div>
              <ul class="space-y-2">
                ${b.points.map(p => `<li class="text-sm font-bold text-slate-600 flex items-start gap-3"><i data-lucide="check-circle-2" class="w-4 h-4 text-${b.color}-500 shrink-0 mt-0.5"></i><span>${p}</span></li>`).join("")}
              </ul>
            </div>
          `).join("")}
        </div>
        <div class="mt-2 glass-module bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-950 border-none p-6 reveal delay-5 shadow-2xl relative overflow-hidden rounded-[1.5rem]">
          <div class="flex gap-8 items-center relative z-10 h-full">
            <div class="flex-shrink-0 border-r border-white/20 pr-8 flex items-center justify-center">
              <span class="text-blue-400 font-black text-2xl vertical-text tracking-[0.2em] uppercase">RESUMEN</span>
            </div>
            <div class="flex-grow">
              <h5 class="text-cyan-400 font-black text-[11px] mb-4 uppercase tracking-[0.4em] flex items-center gap-4">
                <span class="h-px bg-cyan-400/30 flex-grow"></span> ${c.summary.label} <span class="h-px bg-cyan-400/30 flex-grow"></span>
              </h5>
              <div class="grid grid-cols-3 gap-y-5 gap-x-10">
                ${c.summary.items.map(item => `
                  <div class="flex items-center gap-4 group">
                    <div class="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center shadow-lg border border-white/10 group-hover:bg-white/20 transition-all">
                      <i data-lucide="${item.icon}" class="w-5 h-5 text-${item.color}-400"></i>
                    </div>
                    <div>
                      <p class="text-[12px] text-blue-300 font-black uppercase tracking-wider mb-0.5">${item.cat}</p>
                      <p class="text-[16px] font-extrabold text-white leading-tight">${item.text}</p>
                    </div>
                  </div>
                `).join("")}
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  templateImplementation(c) {
    return `
      <section class="global-slide-v8 reveal">
        <header class="section-header-v8"><span class="section-label-v8">${c.label}</span><h2>${c.title}</h2></header>
        <div class="mb-4"><span class="text-xs font-black text-blue-600 uppercase tracking-widest">${c.sub}</span></div>
        <div class="grid grid-cols-12 gap-6 flex-grow relative">
          <div class="col-span-12 md:col-span-6 flex flex-col gap-6 relative">
            <div class="flex items-center gap-4 mb-2">
              <div class="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white border border-blue-400 shadow-xl"><i data-lucide="${c.phases[0].icon}" class="w-7 h-7"></i></div>
              <div><h3 class="text-blue-700 font-black text-2xl uppercase tracking-tighter leading-none">${c.phases[0].title}</h3><p class="text-[10px] text-blue-500 font-bold tracking-[0.3em] uppercase mt-1">${c.phases[0].sub}</p></div>
            </div>
            <div class="space-y-4">
              ${c.phases[0].steps.map((s, i) => `<div class="group relative"><div class="absolute -left-2 top-0 bottom-0 w-1 bg-blue-${600 - i * 100} rounded-full"></div><div class="glass-module p-4 bg-gradient-to-r from-white to-blue-50/30 border-none shadow-md"><p class="text-[13px] font-black text-slate-800 leading-tight">${s}</p></div></div>`).join("")}
            </div>
          </div>
          <div class="col-span-12 md:col-span-6 flex flex-col gap-6 relative">
            <div class="flex items-center gap-4 mb-2">
              <div class="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-white border border-indigo-400 shadow-xl"><i data-lucide="${c.phases[1].icon}" class="w-7 h-7"></i></div>
              <div><h3 class="text-indigo-700 font-black text-2xl uppercase tracking-tighter leading-none">${c.phases[1].title}</h3><p class="text-[10px] text-indigo-500 font-bold tracking-[0.3em] uppercase mt-1">${c.phases[1].sub}</p></div>
            </div>
            <div class="space-y-3">
               <div class="glass-module p-4 bg-indigo-900 text-white shadow-lg border-none"><div class="flex gap-4 items-center"><div class="p-2 bg-white/10 rounded-lg"><i data-lucide="${c.phases[1].highlight.icon}" class="w-5 h-5"></i></div><p class="text-[13px] font-extrabold leading-tight uppercase tracking-wide">${c.phases[1].highlight.title}<br /><span class="text-indigo-300">${c.phases[1].highlight.sub}</span></p></div></div>
               <div class="glass-module p-4 bg-slate-900 text-white border-none shadow-2xl relative overflow-hidden">
                <p class="text-[13px] font-black uppercase tracking-widest text-indigo-400 mb-2">${c.phases[1].alignment.title}</p>
                <div class="grid grid-cols-1 gap-2 text-[11px] text-slate-300 font-bold">
                  ${c.phases[1].alignment.items.map(ai => `<div class="flex items-center gap-3"><span class="w-1.5 h-1.5 bg-${ai.color}-500 rounded-full"></span> ${ai.label}</div>`).join("")}
                </div>
               </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  templateReferences(c) {
    return `
      <section class="global-slide-v8 reveal">
        <header class="section-header-v8"><span class="section-label-v8">${c.label}</span><h2>${c.title}</h2></header>
        <div class="glass-module p-6 overflow-y-auto max-h-[70vh] flex-grow">
          <ul class="space-y-4">
            ${c.sources.map(s => `
              <li class="text-xs font-medium text-slate-700 leading-relaxed border-b border-slate-100 pb-3">
                ${s.text} <a href="${s.url}" target="_blank" class="text-blue-600 hover:underline break-all">${s.url}</a>
              </li>
            `).join("")}
          </ul>
        </div>
      </section>
    `;
  }

  bindEvents() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight" || e.key === " ") this.changeSlide(1);
      if (e.key === "ArrowLeft") this.changeSlide(-1);
      if (e.key.toLowerCase() === "p") this.togglePresenterMode();
      if (e.key === "Escape" && this.isPresenting) this.togglePresenterMode();
    });

    const nextBtn = document.querySelector('[aria-label="Siguiente diapositiva"]');
    const prevBtn = document.querySelector('[aria-label="Diapositiva anterior"]');
    if (nextBtn) nextBtn.onclick = () => this.changeSlide(1);
    if (prevBtn) prevBtn.onclick = () => this.changeSlide(-1);
  }

  changeSlide(dir) {
    const slides = document.querySelectorAll(".slide");
    slides[this.current].classList.remove("active");
    this.current = (this.current + dir + slides.length) % slides.length;
    slides[this.current].classList.add("active");
    this.updateUi();
    this.resetAnimations(slides[this.current]);
    this.autoFitContent();
    
    if (this.isPresenting) {
        this.updatePresenterNotes();
    }
  }

  updateUi() {
    const progress = document.getElementById("progress");
    const breadcrumb = document.getElementById("breadcrumb");
    if (progress) progress.style.width = `${((this.current + 1) / this.data.length) * 100}%`;
    if (breadcrumb) breadcrumb.textContent = `${this.baseCrumb} • ${this.current + 1}/${this.data.length}`;
    window.location.hash = this.data[this.current].id;
  }

  resetAnimations(slide) {
    if (this.prefersReducedMotion) return;
    const elements = slide.querySelectorAll(".reveal");
    elements.forEach((el) => {
      const anim = window.getComputedStyle(el).animation;
      el.style.animation = "none";
      el.offsetHeight; // force reflow
      el.style.animation = anim;
    });
  }

  loadFromHash() {
    const hash = window.location.hash.substring(1);
    if (!hash) return;
    
    const index = this.data.findIndex(s => s.id === hash);
    if (index !== -1) {
      this.current = index;
      // Actualizar clases en el DOM después de cargar del hash
      const slides = document.querySelectorAll(".slide");
      slides.forEach((s, i) => {
        s.classList.toggle("active", i === index);
      });
    }
  }

  // --- Presenter Mode ---
  togglePresenterMode() {
    this.isPresenting = !this.isPresenting;
    let overlay = document.getElementById("presenter-overlay");
    
    if (!overlay) {
      overlay = this.createPresenterOverlay();
      document.body.appendChild(overlay);
    }

    overlay.classList.toggle("active", this.isPresenting);
    
    if (this.isPresenting) {
      this.startTimer();
      this.updatePresenterNotes();
    } else {
      this.stopTimer();
    }
  }

  createPresenterOverlay() {
    const overlay = document.createElement("div");
    overlay.id = "presenter-overlay";
    overlay.className = "presenter-overlay";
    overlay.innerHTML = `
      <div class="presenter-preview">
        <iframe src="${window.location.href}" id="presenter-iframe"></iframe>
      </div>
      <div class="presenter-notes">
        <h3>Notas del Presentador</h3>
        <div id="notes-content" class="notes-content"></div>
      </div>
      <div class="presenter-controls">
        <div class="timer-container">
          <div class="time-box">
            <div class="time-label">TIEMPO TRANSCURRIDO</div>
            <div id="presenter-timer" class="time-value">00:00:00</div>
          </div>
        </div>
        <div class="thumbnails-strip" id="thumbs-strip"></div>
        <button class="nav-btn" onclick="engine.togglePresenterMode()">CERRAR [ESC]</button>
      </div>
    `;

    // Render thumbnails
    const strip = overlay.querySelector("#thumbs-strip");
    this.data.forEach((s, i) => {
      const thumb = document.createElement("div");
      thumb.className = `thumbnail ${i === this.current ? "active" : ""}`;
      thumb.innerText = i + 1;
      thumb.onclick = () => this.jumpTo(i);
      strip.appendChild(thumb);
    });

    return overlay;
  }

  updatePresenterNotes() {
    const notesContent = document.getElementById("notes-content");
    const iframe = document.getElementById("presenter-iframe");
    if (notesContent) notesContent.innerText = this.data[this.current].notes || "Sin notas para esta diapositiva.";
    if (iframe) iframe.src = `${window.location.pathname}#${this.data[this.current].id}`;
    
    // Update active thumb
    const thumbs = document.querySelectorAll(".thumbnail");
    thumbs.forEach((t, i) => t.classList.toggle("active", i === this.current));
  }

  jumpTo(index) {
    const slides = document.querySelectorAll(".slide");
    slides[this.current].classList.remove("active");
    this.current = index;
    slides[this.current].classList.add("active");
    this.updateUi();
    this.updatePresenterNotes();
  }

  startTimer() {
    if (!this.startTime) this.startTime = Date.now();
    this.timerInterval = setInterval(() => {
      const now = Date.now();
      const diff = now - this.startTime;
      const h = Math.floor(diff / 3600000).toString().padStart(2, "0");
      const m = Math.floor((diff % 3600000) / 60000).toString().padStart(2, "0");
      const s = Math.floor((diff % 60000) / 1000).toString().padStart(2, "0");
      document.getElementById("presenter-timer").innerText = `${h}:${m}:${s}`;
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timerInterval);
  }

  /**
   * REGLA DE VALIDACIÓN Y AJUSTE AUTOMÁTICO
   * Detecta si el contenido desborda el contenedor y aplica un escalado
   * proporcional para asegurar que todo sea visible.
   */
  autoFitContent() {
    const activeSlide = document.querySelector(".slide.active");
    if (!activeSlide) return;

    const content = activeSlide.querySelector("section");
    if (!content) return;

    // Reset scale to measure real size
    content.style.transform = "scale(1)";
    content.style.transformOrigin = "top center";

    const containerHeight = activeSlide.clientHeight - 100; // Aumentado para dar margen real arriba/abajo
    const contentHeight = content.scrollHeight;

    if (contentHeight > containerHeight) {
      const scaleFactor = containerHeight / contentHeight;
      content.style.transform = `scale(${scaleFactor})`;
      content.style.width = "100%"; 
      
      console.warn(`[VALIDACIÓN] Slide "${activeSlide.id}" ajustada al ${(scaleFactor * 100).toFixed(0)}%.`);
    } else {
      content.style.transform = "scale(1)";
      content.style.width = "100%";
    }
  }
}

// Initialize engine
const engine = new PresentationEngine(SLIDES_DATA);
window.engine = engine; // Global access for inline events
