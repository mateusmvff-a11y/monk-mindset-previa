/* Monk Mindset: movimento da pagina */
(function(){
  const reduz = matchMedia('(prefers-reduced-motion:reduce)').matches;
  gsap.registerPlugin(ScrollTrigger, SplitText);

  /* rolagem suave, ligada ao ScrollTrigger */
  let lenis = null;
  if (!reduz && window.Lenis && !/nolenis/.test(location.search)) {
    lenis = new Lenis({ lerp: .09, wheelMultiplier: .95 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  /* topo */
  const topo = document.getElementById('topo');
  ScrollTrigger.create({ start: 60, end: 99999, onToggle: s => topo.classList.toggle('rolou', s.isActive) });

  /* ---------- celular que roda ---------- */
  const tpl = document.getElementById('t-fone');

  function montaFone(el, telaInicial){
    el.appendChild(tpl.content.cloneNode(true));
    const q = gsap.utils.selector(el);
    const telas = {};
    const glare = document.createElement('i'); glare.className = 'glare'; el.querySelector('.tela').appendChild(glare);
    el.querySelectorAll('.s').forEach(s => telas[s.dataset.s] = s);
    let atual = null, tl = null, visivel = true;

    
    gsap.set(q('.folha'), { autoAlpha: 1, yPercent: 105 });

    const fabricas = {
      sem(){
        const li = q('.s-sem .comp li:not(.extra)'), extra = q('.s-sem li.extra');
        const ck = q('.s-sem .ck'), add = q('.s-sem .add'), folha = q('.folha');
        const cartao = q('.folha .gr div')[0];
        const reset = () => {
          ck.forEach(c => c.classList.remove('ok'));
          cartao.classList.remove('sel');
          gsap.set(extra, { display: 'none' });
          gsap.set(folha, { yPercent: 105 });
        };
        reset();
        gsap.set(li, { opacity: 0, y: 18 });
        const t = gsap.timeline({ repeat: -1, onRepeat: () => { reset(); } });
        t.to(li, { opacity: 1, y: 0, duration: .6, stagger: .12, ease: 'power3.out' })
         .call(() => ck[0].classList.add('ok'), null, '+=.5')
         .call(() => ck[1].classList.add('ok'), null, '+=.8')
         .call(() => ck[2].classList.add('ok'), null, '+=.8')
         .to(add, { scale: .94, duration: .12, yoyo: true, repeat: 1 }, '+=.7')
         .to(folha, { yPercent: 0, duration: .85, ease: 'power3.out' })
         .call(() => cartao.classList.add('sel'), null, '+=.8')
         .to(folha, { yPercent: 105, duration: .75, ease: 'power3.inOut' }, '+=.9')
         .call(() => cartao.classList.remove('sel'))
         .set(extra, { display: 'flex', opacity: 0, y: 18 })
         .to(extra, { opacity: 1, y: 0, duration: .6, ease: 'power3.out' })
         .call(() => ck[4].classList.add('ok'), null, '+=.6')
         .to({}, { duration: 2.2 })
         .to(li.concat(extra), { opacity: 0, duration: .5 });
        return t;
      },
      blq(){
        const vel = q('.s-blq .vel'), cartao = q('.s-blq .cartao'), barra = q('.s-blq .barra i');
        const resta = q('.s-blq .resta')[0], fechar = q('.s-blq .fechar');
        const o = { m: 83 };
        const txt = () => { const m = Math.round(o.m); resta.textContent = Math.floor(m / 60) + 'h ' + (m % 60) + 'm left'; };
        gsap.set(vel, { opacity: 0 });
        gsap.set(cartao, { opacity: 0, yPercent: 6, scale: .96 });
        gsap.set(barra, { width: '32%' });
        o.m = 83; txt();
        const t = gsap.timeline({ repeat: -1 });
        t.to(vel, { opacity: 1, duration: .6 })
         .to(cartao, { opacity: 1, yPercent: 0, scale: 1, duration: .8, ease: 'power3.out' }, '<.1')
         .to(o, { m: 80, duration: 4.2, ease: 'none', onUpdate: txt }, '+=.4')
         .to(barra, { width: '37%', duration: 4.2, ease: 'none' }, '<')
         .to(fechar, { scale: .95, duration: .12, yoyo: true, repeat: 1 }, '+=.2')
         .to(cartao, { opacity: 0, yPercent: -4, scale: .98, duration: .55, ease: 'power2.in' }, '+=.1')
         .to(vel, { opacity: 0, duration: .5 }, '<')
         .to({}, { duration: .9 })
         .call(() => { o.m = 83; txt(); gsap.set(barra, { width: '32%' }); gsap.set(cartao, { yPercent: 6, scale: .96 }); });
        return t;
      },
      prog(){
        const anel = q('.s-prog .anel .v'), bars = q('.s-prog .barras i'), n1 = q('.s-prog .n1')[0], n2 = q('.s-prog .n2')[0];
        const o = { a: 0, b: 0, c: 0, d: 0 };
        const sd = q('.s-prog .anel strong')[0], pc = q('.s-prog .meta2 span')[0], br = q('.s-prog .meta2 .br i');
        const set = () => { n1.textContent = Math.round(o.a) + 'h'; n2.textContent = Math.round(o.b); sd.textContent = Math.round(o.c); pc.textContent = Math.round(o.d) + '%'; };
        gsap.set(br, { width: '0%' });
        gsap.set(anel, { strokeDashoffset: 100 });
        gsap.set(bars, { height: 0 });
        set();
        const t = gsap.timeline({ repeat: -1, repeatDelay: 2.8 });
        t.to(anel, { strokeDashoffset: 14, duration: 1.6, ease: 'power3.out' })
         .to(bars, { height: i => 0, duration: 0 }, 0)
         .to(bars, { height: (i, el) => el.dataset.h, duration: .9, stagger: .09, ease: 'power3.out' }, .25)
         .to(o, { a: 18, b: 142, c: 12, d: 86, duration: 2, ease: 'power2.out', onUpdate: set }, .3)
         .to(br, { width: '86%', duration: 2, ease: 'power2.out' }, .3)
         .to({}, { duration: 2.2 })
         .set(o, { a: 0, b: 0, c: 0, d: 0 }).set(br, { width: '0%' }).call(set).set(bars, { height: 0 }).set(anel, { strokeDashoffset: 100 });
        return t;
      },
      bib(){
        const dest = q('.s-bib .dest'), img = q('.s-bib .dest img'), li = q('.s-bib .lista > div');
        gsap.set(dest, { opacity: 0, y: 24 });
        gsap.set(li, { opacity: 0, y: 24 });
        gsap.set(img, { scale: 1 });
        const t = gsap.timeline({ repeat: -1, repeatDelay: 1.2 });
        t.to(dest, { opacity: 1, y: 0, duration: .8, ease: 'power3.out' })
         .to(li, { opacity: 1, y: 0, duration: .6, stagger: .14, ease: 'power3.out' }, '-=.3')
         .to(img, { scale: 1.1, duration: 6, ease: 'none' }, 0)
         .to({}, { duration: 1.4 })
         .to([dest[0], ...li], { opacity: 0, duration: .5 });
        return t;
      }
    };

    function mostra(nome){
      if (atual === nome) return;
      atual = nome;
      if (tl) tl.kill();
      Object.entries(telas).forEach(([k, s]) => s.classList.toggle('on', k === nome));
      glare.classList.remove('go'); void glare.offsetWidth; glare.classList.add('go');
      tl = fabricas[nome]();
      if (reduz) tl.progress(.55).pause();
      else if (!visivel) tl.pause();
    }

    new IntersectionObserver(es => {
      visivel = es[0].isIntersecting;
      if (tl && !reduz) visivel ? tl.resume() : tl.pause();
    }, { threshold: .05 }).observe(el);

    mostra(telaInicial);
    return { mostra, el };
  }

  const fones = {};
  document.querySelectorAll('[data-fone]').forEach(el => {
    const nome = el.dataset.fone;
    fones[nome] = montaFone(el, nome === 'tech' ? 'prog' : 'sem');
  });

  /* ---------- hero: a cena. A rolagem prende a tela, faz o zoom out e o titulo desce atras das colinas ---------- */
  const cena = document.getElementById('cena');
  const frente = document.getElementById('frente');
  const sol = document.getElementById('sol');
  const camadas = [cena, frente, sol];
  const titulo = document.querySelector('#hero .titulo');
  if (!reduz) {
    const sp = SplitText.create(titulo.querySelectorAll('span'), { type: 'chars', charsClass: 'ch' });
    const lede = SplitText.create('#lede', { type: 'words', wordsClass: 'mw' });
    gsap.set(lede.words, { opacity: 0, filter: 'blur(14px)', y: 12 });
    const ZOOM = innerWidth < 900 ? 1.35 : 1.4;
    /* entrada (referencia Frostbound): a nevoa se abre. O fundo comeca lavado e dessaturado e ganha cor e nitidez;
       as letras do titulo saem do desfoque uma a uma; depois entram a barra, o subtitulo e o botao */
    const fotos = [cena.querySelector('.fundo'), frente];
    gsap.set(sp.chars, { opacity: 0, filter: 'blur(18px)', scale: 1.08 });
    gsap.set(titulo, { letterSpacing: '.03em' });
    gsap.set(fotos, { filter: 'saturate(.2) brightness(1.22) blur(8px)' });
    gsap.set('#hero .base > *', { opacity: 0, y: 24 });
    gsap.set('.topo .barra', { opacity: 0, y: -22 });
    gsap.set(camadas, { scale: ZOOM * 1.1 });
    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .to(camadas, { scale: ZOOM, duration: 3.4, ease: 'power2.out' }, 0)
      .to(fotos, { filter: 'saturate(1) brightness(1) blur(0px)', duration: 2.8, ease: 'power2.inOut' }, 0)
      .to('.topo .barra', { opacity: 1, y: 0, duration: 1 }, .3)
      .to(sp.chars, { opacity: 1, filter: 'blur(0px)', scale: 1, duration: 1.4, stagger: .07 }, .5)
      .to(titulo, { letterSpacing: '-.045em', duration: 2.6, ease: 'power3.out' }, .5)
      .to('#hero .base > *', { opacity: 1, y: 0, duration: 1, stagger: .14 }, 1.9)
      .set(fotos, { clearProps: 'filter' }, 2.9);

    /* rolagem: 1) zoom out total, com o texto pequeno surgindo palavra por palavra do desfoque;
       2) mais uma rolada e o titulo e o texto descem e somem atras das montanhas */
    const zo = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: '#hero', start: 'top top', end: '+=190%', pin: true, scrub: .7, anticipatePin: 1, refreshPriority: 3 } });
    zo.fromTo(camadas, { scale: ZOOM }, { scale: 1, ease: 'power1.inOut', duration: .9, immediateRender: false }, 0)
      .to('#hero .base', { opacity: 0, y: -30, duration: .25 }, 0)
      .to(lede.words, { opacity: 1, filter: 'blur(0px)', y: 0, duration: .2, stagger: .045 }, .06)
      .to(lede.words.slice(-3), { fontWeight: 800, color: '#0f2a42', duration: .2, stagger: .05 }, .5)
      .to({}, { duration: .1 }, .9)
      .to([titulo, '#lede'], { y: () => innerHeight * .85, duration: .4, ease: 'power1.in' }, 1.0)
      /* saida = inverso da entrada: o texto fica enevoado e desfocado enquanto desce atras da montanha */
      .to([titulo, '#lede'], { filter: 'blur(42px)', opacity: .08, duration: .4, ease: 'power1.in' }, 1.0)
      .to(titulo, { letterSpacing: '.02em', duration: .4, ease: 'power1.in' }, 1.0);
  }

  /* ---------- problema: leque de cartas que troca na rolagem ---------- */
  if (!reduz) {
    /* leque de cartas (referencia: Flick Cards Slider): a carta da frente sai e a proxima gira para o centro conforme a rolagem */
    const lcs = [...document.querySelectorAll('.problema .lc')], N = lcs.length;
    const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
    const leque = p => lcs.forEach((c, i) => {
      const d = i - p, ad = Math.abs(d);
      gsap.set(c, {
        rotation: d * 13, rotationY: d * -9, xPercent: d * 7, yPercent: ad * 3.2, scale: 1 - Math.min(ad, 3) * .06,
        opacity: d < 0 ? clamp(1 + d * 1.15) : clamp(1 - ad * .36),
        zIndex: Math.round(100 - ad * 10 - (d < 0 ? 4 : 0)),
        filter: ad > .25 ? `blur(${Math.min(ad * 1.6, 4).toFixed(1)}px)` : 'none'
      });
    });
    leque(0);
    gsap.fromTo('.problema .leque', { opacity: 0, filter: 'blur(18px)', y: 40 }, { opacity: 1, filter: 'blur(0px)', y: 0, ease: 'none', scrollTrigger: { trigger: '.problema', start: 'top 70%', end: 'top 5%', scrub: true } });
    ScrollTrigger.create({
      trigger: '.problema', start: 'top top', end: 'bottom bottom',
      onUpdate: self => {
        const P = self.progress;
        leque(clamp((P - .08) / .54) * (N - 1));
        /* no fim a paz chega: feed e cartas perdem nitidez e somem, e entra a frase final */
        const q = clamp((P - .74) / .16);
        gsap.set(['.problema .leque-w'], { opacity: 1 - q, filter: q ? `blur(${(q * 12).toFixed(1)}px)` : 'none' });
        const f = clamp((P - .86) / .1);
        gsap.set('.problema .fecho', { opacity: f, y: (1 - f) * 14 });
      }
    });
  }

  /* ---------- frases que acendem palavra a palavra ---------- */
  document.querySelectorAll('.rev').forEach(h => {
    const sp = SplitText.create(h, { type: 'words', wordsClass: 'w' });
    if (reduz) { gsap.set(sp.words, { opacity: 1 }); return; }
    const dentroDoProblema = !!h.closest('.problema');
    gsap.to(sp.words, {
      opacity: 1, stagger: .12, ease: 'none',
      scrollTrigger: dentroDoProblema
        ? { trigger: '.problema', start: 'top 15%', end: 'bottom 85%', scrub: .6 }
        : { trigger: h, start: 'top 82%', end: 'bottom 48%', scrub: .6 }
    });
  });

  /* solucao: foto em paralaxe lenta */
  if (!reduz) {
    gsap.fromTo('.solucao .foto', { yPercent: -4 }, { yPercent: 4, ease: 'none', scrollTrigger: { trigger: '.solucao', start: 'top bottom', end: 'bottom top', scrub: true } });
  }

  /* ---------- app: o celular sobe inclinado, gira no eixo a cada recurso, e os recursos aparecem dos lados ---------- */
  const nomes = ['sem', 'blq', 'prog', 'bib'];
  const dots = [...document.querySelectorAll('.show .prog button')];
  const ct = document.querySelector('.show .prog .ct b');
  const grupos = [...document.querySelectorAll('.show .cj')];
  let passoAtual = -2;
  function ativa(i) { /* -1 = abertura, antes do primeiro recurso */
    if (i === passoAtual) return; passoAtual = i;
    const k = Math.max(i, 0);
    dots.forEach((b, n) => b.classList.toggle('on', n === k));
    ct.textContent = '0' + (k + 1);
    fones.app.mostra(nomes[k]);
  }
  const INTRO = 3.6, PASSO = 3.1;
  let showTL = null;
  const ap = document.getElementById('aparelho');
  gsap.set(ap, { xPercent: -50, yPercent: -50 });
  if (reduz) {
    grupos.forEach((g, i) => { if (i) g.style.display = 'none'; });
  } else {
    gsap.set(ap, { y: () => innerHeight * 1.05, rotationY: -40, rotationZ: 10, rotationX: 16, scale: .9 });
    const mSplit = SplitText.create('.show .manchete', { type: 'words', wordsClass: 'mw' });
    gsap.set(mSplit.words, { opacity: 0, filter: 'blur(16px)', y: 10 });
    gsap.set('.show .prog', { opacity: 0 });
    gsap.set('.show .call', { opacity: 0 });
    /* pinos ancorados nos elementos reais da tela do app (filhos da .tela: giram junto com o celular) */
    const tela = fones.app.el.querySelector('.tela'), stage = document.querySelector('.show .stage');
    document.querySelectorAll('.show .call').forEach(c => {
      const sp = SplitText.create(c.querySelectorAll('h3, p'), { type: 'words', wordsClass: 'cw' }); c._w = sp.words;
      gsap.set(c._w, { opacity: 0, filter: 'blur(4px)', y: 6 });
    });
    gsap.to(fones.app.el, { y: -7, duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    showTL = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: '#app', start: 'top top', end: '+=990%', pin: true, scrub: .6, anticipatePin: 1, refreshPriority: 2,
        onUpdate: self => {
          const t = self.progress * showTL.duration();
          ativa(t < INTRO ? -1 : Math.min(3, Math.floor((t - INTRO) / PASSO)));
          dots.forEach((b, n) => gsap.set(b.firstElementChild, { scaleX: Math.min(1, Math.max(0, (t - INTRO - n * PASSO) / PASSO)) }));
        }
      }
    });
    /* 1) o texto se condensa do desfoque, palavra por palavra, conforme voce rola */
    showTL.to(mSplit.words, { opacity: 1, filter: 'blur(0px)', y: 0, duration: .5, stagger: .05 }, 0)
      /* 2) o texto se dissolve e o celular sobe inclinado */
      .to(mSplit.words, { opacity: 0, filter: 'blur(10px)', duration: .5, stagger: .015 }, 2.2)
      .to(ap, { y: 0, rotationY: 0, rotationZ: 0, rotationX: 0, scale: 1, duration: 1.4, ease: 'power2.out' }, 2.2)
      .to('.show .halo', { opacity: 1, duration: 1.4, ease: 'sine.inOut' }, 2.6)
      .to('.show .prog', { opacity: 1, duration: .4 }, INTRO - .4);
    grupos.forEach((g, i) => {
      const t0 = INTRO + i * PASSO;
      /* a cada recurso o celular da uma meia-volta no eixo: esquerda, direita, esquerda, direita */
      const giro = i % 2 === 0 ? -12 : 12;
      showTL.to(ap, { rotationY: giro, rotationX: 4, rotationZ: -giro * .1, duration: 1.6, ease: 'sine.inOut' }, t0 - .1);
      g.querySelectorAll('.call').forEach((c, k) => {
        const d = t0 + .2 + k * .5, dir = c.classList.contains('l') ? -1 : 1;
        showTL.fromTo(c, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .7, ease: 'sine.out' }, d)
          .to(c._w, { opacity: 1, filter: 'blur(0px)', y: 0, duration: .6, stagger: .03, ease: 'sine.out' }, d + .05);
        if (i < 3) showTL.to(c, { opacity: 0, duration: .5, ease: 'sine.inOut' }, t0 + PASSO - .55).to(c._w, { opacity: 0, filter: 'blur(4px)', duration: .5 }, t0 + PASSO - .55);
      });
    });
    showTL.to(ap, { rotationY: 0, rotationX: 0, rotationZ: 0, duration: 1, ease: 'sine.inOut' }, INTRO + 4 * PASSO - 1.1);
    showTL.to({}, { duration: .01 }, INTRO + 4 * PASSO - .01);
  }
  dots.forEach((b, i) => b.addEventListener('click', () => {
    if (!showTL) return;
    const st = showTL.scrollTrigger, t = INTRO + i * PASSO + .6;
    const y = st.start + (t / showTL.duration()) * (st.end - st.start);
    if (lenis) lenis.scrollTo(y, { duration: 1.2 }); else scrollTo({ top: y, behavior: 'smooth' });
  }));

  /* ---------- principios: claustro de 7 arcos que corre na horizontal ---------- */
  const trilho = document.getElementById('trilho');
  const cartoes = [...trilho.querySelectorAll('.pc')];
  if (!reduz) {
    const dist = () => Math.max(0, trilho.scrollWidth - innerWidth + 40);
    gsap.to(trilho, {
      x: () => -dist(), ease: 'none',
      scrollTrigger: {
        trigger: '#principios', start: 'top top', end: () => '+=' + dist(), pin: true, scrub: .6, invalidateOnRefresh: true, anticipatePin: 1,
        onUpdate: self => {
          gsap.set('.princ .barra-h i', { scaleX: self.progress });
          const cx = innerWidth / 2;
          cartoes.forEach(c => {
            const r = c.getBoundingClientRect(), d = Math.min(1, Math.abs(r.left + r.width / 2 - cx) / (innerWidth * .62));
            gsap.set(c, { scale: 1 - d * .12, opacity: 1 - d * .45 });
          });
        }
      }
    });
  }


  /* ---------- quem / chips / faz / depoimentos / final ---------- */
  if (!reduz) {
    gsap.from('.quem figure', { y: 60, opacity: 0, duration: 1.2, stagger: .15, ease: 'power3.out', scrollTrigger: { trigger: '.quem .col-img', start: 'top 85%' } });
    gsap.to('.quem .t1', { yPercent: -6, ease: 'none', scrollTrigger: { trigger: '.quem', start: 'top bottom', end: 'bottom top', scrub: true } });
    gsap.to('.quem .t2', { yPercent: 6, ease: 'none', scrollTrigger: { trigger: '.quem', start: 'top bottom', end: 'bottom top', scrub: true } });
    gsap.from('.faz .lado', { y: 60, opacity: 0, duration: 1.1, stagger: .15, ease: 'power3.out', scrollTrigger: { trigger: '.faz .duas', start: 'top 85%' } });
    gsap.fromTo('.depo .faixa img', { yPercent: 8 }, { yPercent: 0, ease: 'none', scrollTrigger: { trigger: '.depo .faixa', start: 'top bottom', end: 'bottom 60%', scrub: true } });
    gsap.from('.depo blockquote', { y: 40, opacity: 0, duration: 1, stagger: .15, ease: 'power3.out', scrollTrigger: { trigger: '.depo .tres', start: 'top 88%' } });
    gsap.fromTo('.final .bg', { scale: 1.12 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '.final', start: 'top bottom', end: 'top 20%', scrub: true } });
    gsap.from('.final .txt > *', { y: 36, opacity: 0, duration: 1, stagger: .12, ease: 'power3.out', scrollTrigger: { trigger: '.final', start: 'top 55%' } });
  }

  window.addEventListener('load', () => { ScrollTrigger.refresh(); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
})();
