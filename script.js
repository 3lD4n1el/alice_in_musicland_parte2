
(function(){
  "use strict";

  /* ===== navegación ===== */
  var slides = document.querySelectorAll(".slide");
  var total = slides.length;
  var current = 0;
  var dotsBox = document.getElementById("dots");
  var bar = document.getElementById("progressBar");
  var runMark = document.getElementById("runMark");
  var counter = document.getElementById("counter");
  var gliss = document.getElementById("gliss");

  for (var i = 0; i < total; i++){
    var d = document.createElement("div");
    d.className = "dot";
    d.dataset.i = i;
    d.addEventListener("click", function(){ goTo(parseInt(this.dataset.i,10)); });
    dotsBox.appendChild(d);
  }
  var dots = dotsBox.querySelectorAll(".dot");

  function pad(n){ return (n<10?"0":"")+n; }
  function doGliss(){
    gliss.classList.remove("go");
    void gliss.offsetWidth;
    gliss.classList.add("go");
  }
  function goTo(n, silent){
    if (n < 0 || n >= total) return;
    if (!silent && n !== current) doGliss();
    slides[current].classList.remove("active");
    current = n;
    slides[current].classList.add("active");
    var pct = ((current)/(total-1))*100;
    bar.style.width = pct + "%";
    runMark.style.left = pct + "%";
    counter.innerHTML = "<b>"+pad(current+1)+"</b> / "+pad(total);
    for (var k = 0; k < total; k++){
      dots[k].classList.toggle("active", k === current);
      dots[k].classList.toggle("done", k < current);
    }
  }
  document.getElementById("prev").addEventListener("click", function(){ goTo(current-1); });
  document.getElementById("next").addEventListener("click", function(){ goTo(current+1); });
  document.addEventListener("keydown", function(e){
    if (e.target && e.target.tagName === "INPUT") return;
    if (e.key === "ArrowRight") goTo(current+1);
    if (e.key === "ArrowLeft") goTo(current-1);
  });
  document.querySelectorAll("[data-go]").forEach(function(b){
    b.addEventListener("click", function(){ goTo(parseInt(this.dataset.go,10)); });
  });

  /* ===== retratos ===== */
  function avatarSVG(hair, hc, cc, extra){
    var skin = "#f6d7b0";
    var back = "";
    var front = "";
    if (hair === "long"){
      back = "<path d='M28,40 C19,68 21,98 27,108 L38,102 C33,82 33,60 37,46 Z' fill='"+hc+"'/>" +
             "<path d='M72,40 C81,68 79,98 73,108 L62,102 C67,82 67,60 63,46 Z' fill='"+hc+"'/>";
      front = "<path d='M27,52 Q25,25 50,23 Q75,25 73,52 Q66,37 50,36 Q34,37 27,52 Z' fill='"+hc+"'/>";
    } else if (hair === "spiky"){
      front = "<path d='M26,54 Q22,24 50,22 Q78,24 74,54 L69,41 L63,52 L57,39 L50,51 L43,39 L37,52 L31,41 Z' fill='"+hc+"'/>";
    } else {
      front = "<path d='M27,52 Q25,25 50,23 Q75,25 73,52 Q66,37 50,36 Q34,37 27,52 Z' fill='"+hc+"'/>";
    }
    var ex = "";
    if (extra === "hairband"){
      ex = "<path d='M30,36 Q50,26 70,36' fill='none' stroke='#2e8f8f' stroke-width='4' stroke-linecap='round'/>";
    } else if (extra === "crown"){
      ex = "<path d='M38,24 L42,14 L48,21 L52,11 L56,21 L62,14 L66,24 Z' fill='#e8c84a' stroke='#c99a2e' stroke-width='1.5'/>" +
           "<circle cx='52' cy='11' r='2.2' fill='#c9344a'/>";
    }
    return "<svg viewBox='0 0 100 118' xmlns='http://www.w3.org/2000/svg'>" +
      back +
      "<path d='M27,118 C29,92 39,85 50,85 C61,85 71,92 73,118 Z' fill='"+cc+"'/>" +
      "<path d='M50,88 L50,118' stroke='#fffcf4' stroke-width='2'/>" +
      "<path d='M42,87 L50,96 L58,87' fill='none' stroke='#fffcf4' stroke-width='2'/>" +
      "<circle cx='50' cy='52' r='23' fill='"+skin+"'/>" +
      "<circle cx='38' cy='64' r='3' fill='#e88a8a' opacity='.5'/><circle cx='62' cy='64' r='3' fill='#e88a8a' opacity='.5'/>" +
      "<ellipse cx='42' cy='57' rx='2.6' ry='3.6' fill='#3a2e2a'/><ellipse cx='58' cy='57' rx='2.6' ry='3.6' fill='#3a2e2a'/>" +
      "<path d='M46,67 Q50,70 54,67' stroke='#a86a5a' stroke-width='1.6' fill='none' stroke-linecap='round'/>" +
      front + ex +
    "</svg>";
  }
  function naipeSVG(num, color){
    return "<svg viewBox='0 0 100 118' xmlns='http://www.w3.org/2000/svg'>" +
      "<g stroke='#8a7460' stroke-width='4' stroke-linecap='round'><path d='M22,58 L6,80'/><path d='M78,58 L94,80'/><path d='M38,104 L34,116'/><path d='M62,104 L66,116'/></g>" +
      "<rect x='22' y='16' width='56' height='88' rx='8' fill='#fffcf4' stroke='"+color+"' stroke-width='3'/>" +
      "<text x='31' y='38' font-size='17' fill='"+color+"' font-family='Alice, serif'>"+num+"</text>" +
      "<text x='58' y='94' font-size='17' fill='"+color+"' font-family='Alice, serif'>"+num+"</text>" +
      "<circle cx='50' cy='58' r='13' fill='#f6d7b0'/>" +
      "<ellipse cx='45' cy='56' rx='2' ry='2.8' fill='#3a2e2a'/><ellipse cx='55' cy='56' rx='2' ry='2.8' fill='#3a2e2a'/>" +
      "<path d='M45,64 Q50,68 55,64' stroke='#a86a5a' stroke-width='1.5' fill='none' stroke-linecap='round'/>" +
      "<rect x='60' y='20' width='7' height='24' rx='2' fill='#c99a2e' transform='rotate(20 63 32)'/>" +
      "<path d='M66,44 L73,47 L69,58 L64,56 Z' fill='"+color+"'/>" +
    "</svg>";
  }
  function orugaSVG(){
    return "<svg viewBox='0 0 100 118' xmlns='http://www.w3.org/2000/svg'>" +
      "<ellipse cx='24' cy='96' rx='16' ry='14' fill='#3a6ad9'/>" +
      "<ellipse cx='44' cy='88' rx='17' ry='15' fill='#4a7ae0'/>" +
      "<ellipse cx='64' cy='78' rx='17' ry='15' fill='#3a6ad9'/>" +
      "<circle cx='58' cy='46' r='24' fill='#5a8aee'/>" +
      "<ellipse cx='50' cy='42' rx='3' ry='4.5' fill='#fffcf4'/><ellipse cx='66' cy='42' rx='3' ry='4.5' fill='#fffcf4'/>" +
      "<circle cx='50' cy='43' r='2' fill='#1a2a4a'/><circle cx='66' cy='43' r='2' fill='#1a2a4a'/>" +
      "<path d='M50,56 Q58,62 66,56' stroke='#1a2a4a' stroke-width='2' fill='none' stroke-linecap='round'/>" +
      "<g stroke='#3a5ab8' stroke-width='2.5' stroke-linecap='round'><path d='M46,24 L40,10'/><path d='M70,24 L76,10'/></g>" +
      "<circle cx='39' cy='8' r='4' fill='#e0c03a'/><circle cx='77' cy='8' r='4' fill='#e0c03a'/>" +
      "<path d='M74,64 q14,-4 14,10 q0,10 -8,10' fill='none' stroke='#c99a2e' stroke-width='6' stroke-linecap='round'/>" +
      "<text x='12' y='40' font-size='16' fill='#7a5ad9'>♪</text>" +
    "</svg>";
  }
  function flamencoSVG(){
    return "<svg viewBox='0 0 100 118' xmlns='http://www.w3.org/2000/svg'>" +
      "<g stroke='#e0a63a' stroke-width='4' stroke-linecap='round'><path d='M50,96 L50,116'/><path d='M50,116 L42,116'/></g>" +
      "<ellipse cx='50' cy='82' rx='24' ry='19' fill='#f08ab5'/>" +
      "<path d='M68,74 q16,4 18,18 q-14,-2 -20,-8 Z' fill='#e07aa5'/>" +
      "<path d='M40,66 C30,44 40,26 52,24' fill='none' stroke='#f08ab5' stroke-width='11' stroke-linecap='round'/>" +
      "<circle cx='56' cy='22' r='12' fill='#f08ab5'/>" +
      "<circle cx='60' cy='19' r='2.6' fill='#3a2e2a'/>" +
      "<path d='M66,24 L84,32 L64,32 Z' fill='#3a2e2a'/>" +
      "<text x='12' y='46' font-size='15' fill='#c9344a'>♥</text>" +
    "</svg>";
  }
  function erizoSVG(){
    return "<svg viewBox='0 0 100 118' xmlns='http://www.w3.org/2000/svg'>" +
      "<path d='M14,92 Q22,44 50,42 Q78,44 86,92 Z' fill='#8a6a4a'/>" +
      "<g stroke='#5a4430' stroke-width='3' stroke-linecap='round'>" +
      "<path d='M22,80 L14,64'/><path d='M32,66 L26,48'/><path d='M44,58 L42,38'/><path d='M56,58 L58,38'/><path d='M68,66 L74,48'/><path d='M78,80 L86,64'/></g>" +
      "<ellipse cx='50' cy='94' rx='30' ry='14' fill='#8a6a4a'/>" +
      "<circle cx='50' cy='88' r='17' fill='#d9b894'/>" +
      "<ellipse cx='43' cy='86' rx='2.4' ry='3.4' fill='#3a2e2a'/><ellipse cx='57' cy='86' rx='2.4' ry='3.4' fill='#3a2e2a'/>" +
      "<circle cx='50' cy='95' r='3.5' fill='#3a2e2a'/>" +
      "<g stroke='#8a7460' stroke-width='1.2' stroke-linecap='round'><path d='M28,92 L40,93'/><path d='M72,92 L60,93'/></g>" +
    "</svg>";
  }
  function tortugaSVG(){
    return "<svg viewBox='0 0 100 118' xmlns='http://www.w3.org/2000/svg'>" +
      "<ellipse cx='50' cy='84' rx='34' ry='26' fill='#4a9e6b'/>" +
      "<ellipse cx='50' cy='82' rx='26' ry='19' fill='#3a7e54'/>" +
      "<g stroke='#2e6a44' stroke-width='2' fill='none'><path d='M50,63 L50,101'/><path d='M26,82 L74,82'/></g>" +
      "<circle cx='50' cy='42' r='17' fill='#6fbe8a'/>" +
      "<ellipse cx='43' cy='40' rx='2.6' ry='3.6' fill='#3a2e2a'/><ellipse cx='57' cy='40' rx='2.6' ry='3.6' fill='#3a2e2a'/>" +
      "<path d='M43,50 Q50,54 57,50' stroke='#2e6a44' stroke-width='2' fill='none' stroke-linecap='round'/>" +
      "<path d='M36,28 Q50,18 64,28' fill='none' stroke='#c99a2e' stroke-width='4' stroke-linecap='round'/>" +
      "<text x='72' y='34' font-size='15' fill='#2e8f8f'>♫</text>" +
    "</svg>";
  }
  function grifoSVG(){
    return "<svg viewBox='0 0 100 118' xmlns='http://www.w3.org/2000/svg'>" +
      "<path d='M24,96 Q10,72 22,58 Q26,74 36,82 Z' fill='#c99a2e'/>" +
      "<ellipse cx='54' cy='88' rx='26' ry='21' fill='#e0b34a'/>" +
      "<path d='M76,74 q14,10 8,26 q-12,-4 -16,-14 Z' fill='#c99a2e'/>" +
      "<circle cx='52' cy='44' r='19' fill='#f0d08a'/>" +
      "<ellipse cx='45' cy='42' rx='2.6' ry='3.6' fill='#3a2e2a'/><ellipse cx='59' cy='42' rx='2.6' ry='3.6' fill='#3a2e2a'/>" +
      "<path d='M60,50 L76,56 L58,58 Z' fill='#c99a2e'/>" +
      "<path d='M38,28 L44,14 L50,26 L56,12 L62,28 Z' fill='#c99a2e'/>" +
      "<text x='14' y='40' font-size='15' fill='#7a5ad9'>♩</text>" +
    "</svg>";
  }

  var roster = [
    { nm:"Alicia", cc:"#2e8f8f", wp:"🎀 vuelve a Musicland", fr:"Hoy su vestido es <b>azul</b> y su lazo es <b>blanco</b>.", kind:"human", hair:"long", hc:"#e8c86a", extra:"hairband", file:"alicia.png" },
    { nm:"El Jardinero Dos", cc:"#c9344a", wp:"🃏 pinta y canta", fr:"<b>Está</b> siempre al lado del rosal, con su pincel.", kind:"naipe", num:"2", ncol:"#c9344a", file:"dos.png" },
    { nm:"El Jardinero Cinco", cc:"#3a2e2a", wp:"🃏 el más nervioso", fr:"Dice que las rosas <b>son blancas</b>… ¡y la Reina las quiere rojas!", kind:"naipe", num:"5", ncol:"#3a2e2a", file:"cinco.png" },
    { nm:"La Oruga Azul", cc:"#3a6ad9", wp:"🎷 saxofonista de blues", fr:"<b>Está encima</b> de un hongo morado y toca jazz.", kind:"oruga", file:"oruga.png" },
    { nm:"El Flamenco Rosado", cc:"#f08ab5", wp:"🦩 mazo de cróquet", fr:"Es <b>rosado</b> y baila cuando hay música.", kind:"flamenco", file:"flamenco.png" },
    { nm:"El Erizo Marrón", cc:"#8a6a4a", wp:"🦔 la bola del juego", fr:"<b>Está debajo</b> de un arbusto: no quiere jugar.", kind:"erizo", file:"erizo.png" },
    { nm:"La Falsa Tortuga", cc:"#4a9e6b", wp:"🐢 canta muy triste", fr:"Es <b>verde</b> y su canción es <b>lenta</b> y bonita.", kind:"tortuga", file:"tortuga.png" },
    { nm:"El Grifo", cc:"#e0b34a", wp:"🦅 baila la cuadrilla", fr:"Es <b>amarillo</b> y <b>dorado</b>: mitad águila, mitad león.", kind:"grifo", file:"grifo.png" }
  ];
  var rBox = document.getElementById("roster");
  roster.forEach(function(c){
    var el = document.createElement("div");
    el.className = "chara";
    el.style.setProperty("--cc", c.cc);
    var av;
    if (c.kind === "naipe"){ av = naipeSVG(c.num, c.ncol); }
    else if (c.kind === "oruga"){ av = orugaSVG(); }
    else if (c.kind === "flamenco"){ av = flamencoSVG(); }
    else if (c.kind === "erizo"){ av = erizoSVG(); }
    else if (c.kind === "tortuga"){ av = tortugaSVG(); }
    else if (c.kind === "grifo"){ av = grifoSVG(); }
    else { av = avatarSVG(c.hair, c.hc, c.cc, c.extra); }
    el.innerHTML =
      "<div class=\"av\">" + av + "</div>" +
      "<div class=\"nm\">"+c.nm+"</div>" +
      "<div class=\"wp\">"+c.wp+"</div>" +
      "<div class=\"frase\"><span>"+c.fr+"</span></div>";
    var ph = document.createElement("img");
    ph.className = "photo";
    ph.alt = c.nm;
    ph.src = "personajes/" + c.file;
    ph.addEventListener("load", function(){ el.classList.add("hasPhoto"); });
    el.insertBefore(ph, el.firstChild);
    el.addEventListener("click", function(){ el.classList.toggle("open"); });
    rBox.appendChild(el);
  });

  /* ===== vocabulario ===== */
  var vocab = [
    { emo:"🌹", es:"la rosa", kr:"장미", ej:"La rosa roja está en el jardín.", qc:"var(--s-cor)" },
    { emo:"🌷", es:"el jardín", kr:"정원", ej:"En el jardín hay muchas flores.", qc:"var(--s-tre)" },
    { emo:"🌿", es:"el laberinto", kr:"미로", ej:"El laberinto es verde y enorme.", qc:"var(--s-pic)" },
    { emo:"🖌️", es:"el pincel", kr:"붓", ej:"El jardinero pinta con un pincel.", qc:"var(--s-dia)" },
    { emo:"🪞", es:"el espejo", kr:"거울", ej:"El espejo está detrás de la puerta.", qc:"var(--s-nota)" },
    { emo:"🎨", es:"pintar", kr:"칠하다", ej:"Pintan las rosas de rojo.", qc:"var(--s-cor)" },
    { emo:"🔍", es:"buscar", kr:"찾다", ej:"Alicia busca la salida.", qc:"var(--s-tre)" },
    { emo:"🎷", es:"tocar", kr:"연주하다", ej:"La oruga toca el saxofón.", qc:"var(--s-nota)" }
  ];
  var cardsBox = document.getElementById("vocabCards");
  vocab.forEach(function(v){
    var c = document.createElement("div");
    c.className = "fcard";
    c.innerHTML =
      "<div class=\"in\">" +
        "<div class=\"face\" style=\"--qc:"+v.qc+"\"><div class=\"gem\">♦</div><div class=\"emo\">"+v.emo+"</div><div class=\"es\">"+v.es+"</div><div class=\"hint\">toca ♪ 터치</div></div>" +
        "<div class=\"face back\"><div class=\"kr\">"+v.kr+"</div><div class=\"ej\">"+v.ej+"</div></div>" +
      "</div>";
    c.addEventListener("click", function(){ c.classList.toggle("flipped"); });
    cardsBox.appendChild(c);
  });

  /* ===== intruso ===== */
  var intrusoRounds = [
    { words:["rojo","verde","morado","el pincel"], bad:3, theme:"Los otros tres son COLORES 🎨" },
    { words:["encima de","debajo de","al lado de","el espejo"], bad:3, theme:"Los otros tres son palabras del MAPA 🗺️" },
    { words:["pintar","buscar","tocar","el jardín"], bad:3, theme:"Las otras tres son ACCIONES (verbos) 🏃" }
  ];
  var intrusoIdx = 0;
  var iWords = document.getElementById("intrusoWords");
  var iFb = document.getElementById("intrusoFb");
  var iRound = document.getElementById("intrusoRound");
  function renderIntruso(){
    var r = intrusoRounds[intrusoIdx];
    iRound.textContent = "Ronda " + (intrusoIdx+1) + " / 3";
    iFb.textContent = "";
    iFb.className = "feedback";
    iWords.innerHTML = "";
    r.words.forEach(function(w, idx){
      var b = document.createElement("div");
      b.className = "word-btn";
      b.textContent = w;
      b.addEventListener("click", function(){
        if (idx === r.bad){
          b.classList.add("right");
          iFb.textContent = "🕵️ ¡Espía capturado! " + r.theme;
          iFb.classList.add("good");
          setTimeout(function(){
            intrusoIdx++;
            if (intrusoIdx < intrusoRounds.length){ renderIntruso(); }
            else {
              iRound.textContent = "Completado";
              iWords.innerHTML = "";
              iFb.textContent = "⭐ ¡Las tres rondas completas! Pasa a la siguiente diapositiva ›";
            }
          }, 1600);
        } else {
          b.classList.add("wrong");
          iFb.textContent = "Mmm… esa palabra sí es del grupo. ¡Piensa en el tema!";
          iFb.className = "feedback oops";
          setTimeout(function(){ b.classList.remove("wrong"); }, 400);
        }
      });
      iWords.appendChild(b);
    });
  }
  renderIntruso();

  /* ===== pintar las rosas ===== */
  var paint = [
    { s:"👑 «¡Quiero UNA rosa ROJA!» ¿Cómo se dice?",
      opts:["una rosa rojo","una rosa roja","unas rosas rojas"], ok:1,
      targets:["r1"], color:"#c9344a", why:"la ros<b>a</b> → roj<b>a</b>. El camaleón copia la -a." },
    { s:"👑 «¡Ahora DOS rosas AMARILLAS!»",
      opts:["dos rosas amarillas","dos rosas amarilla","dos rosas amarillo"], ok:0,
      targets:["r2","r3"], color:"#e0c03a", why:"Dos ros<b>as</b> → amarill<b>as</b>. ¡Plural también!" },
    { s:"🖌️ El jardinero pinta el hongo. «El hongo es ＿＿» (morado)",
      opts:["morada","morados","morado"], ok:2,
      targets:["r4"], color:"#7a5ad9", why:"el hong<b>o</b> → morad<b>o</b>." },
    { s:"🦎 ¡Camaleón perezoso! «La puerta es ＿＿» (verde)",
      opts:["verda","verde","verdo"], ok:1,
      targets:["r5"], color:"#4a9e6b", why:"<b>verde</b> nunca cambia de -o/-a. ¡Es perezoso!" },
    { s:"🌸 «Estas flores son ＿＿» (rosado)",
      opts:["rosadas","rosados","rosada"], ok:0,
      targets:["r6"], color:"#e08ab5", why:"las flor<b>es</b> (femenino plural) → rosad<b>as</b>." },
    { s:"🌈 ¡Última orden! «Quiero TODAS las rosas ＿＿» (blanco) otra vez",
      opts:["blancos","blanca","blancas"], ok:2,
      targets:["r1","r2","r3","r4","r5","r6"], color:"#fffcf4", why:"las ros<b>as</b> → blanc<b>as</b>. ¡El jardín vuelve a empezar!" }
  ];
  var paintIdx = 0;
  var paintSent = document.getElementById("paintSentence");
  var paintOpts = document.getElementById("paintOpts");
  var paintFb = document.getElementById("paintFb");
  var paintCount = document.getElementById("paintCount");
  function pintar(ids, color){
    ids.forEach(function(id){
      var el = document.getElementById(id);
      if (!el) return;
      el.setAttribute("fill", color);
      el.classList.remove("pintada");
      void el.getBoundingClientRect();
      el.classList.add("pintada");
    });
  }
  function renderPaint(){
    var r = paint[paintIdx];
    paintCount.textContent = "Orden " + (paintIdx+1) + " / 6";
    paintFb.textContent = "";
    paintFb.className = "feedback";
    paintSent.textContent = r.s;
    paintOpts.innerHTML = "";
    r.opts.forEach(function(op, idx){
      var b = document.createElement("button");
      b.className = "end-btn";
      b.textContent = op;
      b.addEventListener("click", function(){
        if (idx === r.ok){
          b.classList.add("right");
          pintar(r.targets, r.color);
          paintFb.innerHTML = "🎨 ¡Pintado! " + r.why;
          paintFb.classList.add("good");
          setTimeout(function(){
            paintIdx++;
            if (paintIdx < paint.length){ renderPaint(); }
            else {
              paintCount.textContent = "Rosal terminado";
              paintSent.textContent = "🌹 ¡La Reina está feliz! Y tú dominas el camaleón 🦎";
              paintOpts.innerHTML = "";
              paintFb.textContent = "Ahora lee el capítulo tres ›";
            }
          }, 2200);
        } else {
          b.classList.add("wrong");
          paintFb.textContent = "El camaleón se confunde… mira si la palabra es -o/-a y si es una o muchas.";
          paintFb.className = "feedback oops";
          setTimeout(function(){ b.classList.remove("wrong"); }, 400);
        }
      });
      paintOpts.appendChild(b);
    });
  }
  renderPaint();

  /* ===== detective ===== */
  var det = [
    { q:"¿Por qué pintan las rosas los jardineros?",
      opts:["Porque les gusta el arte","Porque son blancas y la Reina las quiere rojas","Porque hay una fiesta"], ok:1,
      exp:"Las rosas <b>son blancas</b>, pero la Reina quiere <b>rosas rojas</b>. ¡Por eso pintan tan rápido!" },
    { q:"¿Los jardineros están tranquilos o nerviosos?",
      opts:["Nerviosos: cantan «¡Rápido!»","Muy tranquilos","El texto no lo dice"], ok:0,
      exp:"El Cinco canta <b>«¡Rápido!»</b>: eso es una pista de que tienen miedo de la Reina." },
    { q:"¿Cuántos colores diferentes ve Alicia en el jardín?",
      opts:["Solo rojo y blanco","Dos: rojo y azul","Muchos: blanco, rojo, amarillo, azul y morado"], ok:2,
      exp:"Rosas blancas y rojas, rosas <b>amarillas</b>, un gato <b>azul</b> y flores <b>moradas</b>. ¡Un jardín de colores!" },
    { q:"¿Qué idea propone Alicia sin decirlo directamente?",
      opts:["Escapar del jardín","No pintar y cantar para la Reina","Pintar más rápido"], ok:1,
      exp:"Ella dice «¿por qué no le <b>cantan</b>?» y que un jardín de muchos colores es más bonito: propone <b>música en vez de pintura</b>." }
  ];
  var detIdx = 0;
  var dQ = document.getElementById("detQ");
  var dOpts = document.getElementById("detOpts");
  var dExp = document.getElementById("detExp");
  var dRound = document.getElementById("detRound");
  function renderDet(){
    var r = det[detIdx];
    dRound.textContent = "Pregunta " + (detIdx+1) + " / 4";
    dQ.textContent = r.q;
    dExp.innerHTML = "";
    dOpts.innerHTML = "";
    r.opts.forEach(function(op, idx){
      var b = document.createElement("div");
      b.className = "opt";
      b.textContent = op;
      b.addEventListener("click", function(){
        if (idx === r.ok){
          b.classList.add("right");
          dExp.innerHTML = "✅ " + r.exp;
          setTimeout(function(){
            detIdx++;
            if (detIdx < det.length){ renderDet(); }
            else {
              dRound.textContent = "Caso cerrado";
              dQ.textContent = "🕵️ ¡Excelente, detective! Resolviste las cuatro preguntas.";
              dOpts.innerHTML = "";
              dExp.textContent = "Ahora, el mapa del laberinto ›";
            }
          }, 2600);
        } else {
          b.classList.add("wrong");
          dExp.innerHTML = "Busca las pistas en el texto otra vez…";
        }
      });
      dOpts.appendChild(b);
    });
  }
  renderDet();

  /* ===== mapa del laberinto ===== */
  var mapRounds = [
    { q:"🗝️ ¿Dónde está la llave?", opts:["encima de la mesa","debajo de la mesa","dentro de la mesa"], ok:1, spot:{x:80,y:110}, why:"La llave está más abajo que la mesa 🪵 → debajo de." },
    { q:"🦩 ¿Dónde está el flamenco?", opts:["al lado de la puerta","detrás de la puerta","lejos de la puerta"], ok:0, spot:{x:250,y:140}, why:"Están juntos, uno junto al otro → al lado de." },
    { q:"😸 En el árbol ＿＿ un gato.", opts:["está","hay","están"], ok:1, spot:{x:410,y:72}, why:"«UN gato» es nuevo → linterna 🔦 hay." },
    { q:"🫖 La tetera ＿＿ cerca del seto grande.", opts:["hay","están","está"], ok:2, spot:{x:490,y:142}, why:"«LA tetera» ya la conocemos → mapa 📍 está." },
    { q:"🦔 ¿Dónde está el erizo?", opts:["encima del seto","debajo del seto","al lado del rosal"], ok:1, spot:{x:180,y:232}, why:"El erizo está más abajo que el seto → debajo de." },
    { q:"🐛🌹 En el mapa ＿＿ una oruga y un rosal.", opts:["hay","están","es"], ok:0, spot:{x:580,y:112}, why:"«UNA oruga y UN rosal» son cosas nuevas → hay." }
  ];
  var mapIdx = 0;
  var mapSent = document.getElementById("mapSentence");
  var mapOpts = document.getElementById("mapOpts");
  var mapFb = document.getElementById("mapFb");
  var mapCount = document.getElementById("mapCount");
  var spot = document.getElementById("spot");
  function showSpot(p){
    spot.setAttribute("cx", p.x);
    spot.setAttribute("cy", p.y);
    spot.classList.add("on");
  }
  function renderMap(){
    var r = mapRounds[mapIdx];
    mapCount.textContent = "Pista " + (mapIdx+1) + " / 6";
    mapFb.textContent = "";
    mapFb.className = "feedback";
    mapSent.textContent = r.q;
    spot.classList.remove("on");
    mapOpts.innerHTML = "";
    r.opts.forEach(function(op, idx){
      var b = document.createElement("button");
      b.className = "end-btn";
      b.textContent = op;
      b.addEventListener("click", function(){
        if (idx === r.ok){
          b.classList.add("right");
          showSpot(r.spot);
          mapFb.innerHTML = "📍 ¡Encontrado! " + r.why;
          mapFb.classList.add("good");
          setTimeout(function(){
            mapIdx++;
            if (mapIdx < mapRounds.length){ renderMap(); }
            else {
              mapCount.textContent = "Mapa completo";
              mapSent.textContent = "🗺️ ¡Conoces todo el laberinto! Ya sabes qué HAY y dónde ESTÁ.";
              mapOpts.innerHTML = "";
              mapFb.textContent = "Sigue el capítulo cuatro ›";
            }
          }, 2400);
        } else {
          b.classList.add("wrong");
          mapFb.textContent = "Mira otra vez el mapa… ¿es linterna 🔦 (hay) o mapa 📍 (está)?";
          mapFb.className = "feedback oops";
          setTimeout(function(){ b.classList.remove("wrong"); }, 400);
        }
      });
      mapOpts.appendChild(b);
    });
  }
  renderMap();

  /* ===== ordena la historia ===== */
  var events = [
    "Alicia entra en el laberinto verde y busca la salida.",
    "La Oruga Azul toca el saxofón encima de un hongo.",
    "Alicia escucha un piano, un tambor y una flauta.",
    "Todos tocan juntos y Alicia canta.",
    "Las paredes se abren: ¡el laberinto es un teatro!"
  ];
  var shuffled = [2,4,0,3,1];
  var expected = 0;
  var oList = document.getElementById("orderList");
  var oFb = document.getElementById("orderFb");
  shuffled.forEach(function(evIdx){
    var el = document.createElement("div");
    el.className = "ev";
    el.innerHTML = "<span class=\"num\">?</span><span>" + events[evIdx] + "</span>";
    el.addEventListener("click", function(){
      if (el.classList.contains("locked")) return;
      if (evIdx === expected){
        el.classList.add("locked");
        el.querySelector(".num").textContent = expected + 1;
        expected++;
        if (expected === events.length){
          oFb.textContent = "🎶 ¡Historia perfecta! La salida estaba donde había música.";
          oFb.className = "feedback good";
        } else {
          oFb.textContent = "✅ ¡Sí! ¿Y qué pasa después?";
          oFb.className = "feedback good";
        }
      } else {
        el.classList.add("wrong");
        oFb.textContent = "Todavía no… recuerda el capítulo del laberinto.";
        oFb.className = "feedback oops";
        setTimeout(function(){ el.classList.remove("wrong"); }, 450);
      }
    });
    oList.appendChild(el);
  });

  /* ===== confeti ===== */
  var confChars = ["♪","🌹","♫","🌷","♩","🍃"];
  var confColors = ["#c9344a","#2e8f8f","#c99a2e","#7a5ad9","#4a9e6b","#e08ab5"];
  function confettiBurst(){
    for (var c = 0; c < 36; c++){
      var f = document.createElement("div");
      f.className = "confetti";
      f.textContent = confChars[c % confChars.length];
      f.style.left = (Math.random()*100) + "vw";
      f.style.color = confColors[c % confColors.length];
      f.style.animationDuration = (1.6 + Math.random()*2.4) + "s";
      f.style.animationDelay = (Math.random()*0.6) + "s";
      document.body.appendChild(f);
      (function(node){ setTimeout(function(){ node.remove(); }, 5200); })(f);
    }
  }
  var cutin = document.getElementById("cutin");

  /* ===== combate 1: Pincel Furioso ===== */
  var boss = [
    { q:"🌹 una rosa ＿＿ (rojo)", opts:["rojo","roja","rojas"], ok:1 },
    { q:"🎩 los sombreros ＿＿ (negro)", opts:["negras","negro","negros"], ok:2 },
    { q:"😸 el gato ＿＿ (azul)", opts:["azul","azula","azulo"], ok:0 },
    { q:"🌼 las flores ＿＿ (amarillo)", opts:["amarillos","amarillas","amarilla"], ok:1 },
    { q:"¿Cómo se pregunta el color de una cosa?", opts:["¿De qué color es?","¿Qué color tienes?","¿Dónde es el color?"], ok:0 },
    { q:"🍄 dos hongos ＿＿ (verde)", opts:["verdas","verde","verdes"], ok:2 }
  ];
  var bossIdx = 0;
  var hp = boss.length;
  var bQ = document.getElementById("bossQ");
  var bOpts = document.getElementById("bossOpts");
  var bHp = document.getElementById("bossHp");
  var bSprite = document.getElementById("bossSprite");
  var bGame = document.getElementById("bossGame");
  var bWin = document.getElementById("bossWin");
  var field = document.getElementById("battlefield");
  var mini = document.getElementById("miniSlash");
  function spawnDamage(f){
    var d = document.createElement("div");
    d.className = "dmg";
    d.textContent = String(800 + Math.floor(Math.random()*2200));
    d.style.left = (42 + Math.random()*16) + "%";
    d.style.top = "22%";
    f.appendChild(d);
    setTimeout(function(){ d.remove(); }, 950);
  }
  function musicHit(){
    mini.classList.remove("go");
    void mini.offsetWidth;
    mini.classList.add("go");
    bSprite.classList.add("hit");
    spawnDamage(field);
    setTimeout(function(){ bSprite.classList.remove("hit"); }, 520);
  }
  function renderBoss(){
    var r = boss[bossIdx];
    bQ.textContent = "🖌️ Ataque " + (bossIdx+1) + ": " + r.q;
    bOpts.innerHTML = "";
    r.opts.forEach(function(op, idx){
      var b = document.createElement("div");
      b.className = "opt";
      b.style.textAlign = "center";
      b.textContent = op;
      b.addEventListener("click", function(){
        if (idx === r.ok){
          b.classList.add("right");
          hp--;
          bHp.style.width = (hp/boss.length)*100 + "%";
          var isLast = (bossIdx === boss.length - 1);
          if (isLast){
            document.getElementById("cutinTxt").textContent = "¡CANCIÓN: LLUVIA DE COLORES!";
            cutin.classList.remove("go");
            void cutin.offsetWidth;
            cutin.classList.add("go");
            setTimeout(musicHit, 700);
            setTimeout(function(){
              bSprite.textContent = "🌈";
              bGame.classList.add("hidden");
              bWin.classList.remove("hidden");
              confettiBurst();
            }, 2100);
          } else {
            musicHit();
            setTimeout(function(){
              bossIdx++;
              renderBoss();
            }, 950);
          }
        } else {
          b.classList.add("wrong");
        }
      });
      bOpts.appendChild(b);
    });
  }
  renderBoss();

  /* ============ ACTO II ============ */

  /* ===== memoria ===== */
  var memoPairs = [
    { es:"la rosa", m:"🌹 장미" },
    { es:"el jardín", m:"🌷 정원" },
    { es:"el laberinto", m:"🌿 미로" },
    { es:"pintar", m:"🎨 칠하다" },
    { es:"buscar", m:"🔍 찾다" },
    { es:"el espejo", m:"🪞 거울" }
  ];
  var memoCards = [];
  memoPairs.forEach(function(p, i){
    memoCards.push({ pid:i, label:p.es });
    memoCards.push({ pid:i, label:p.m });
  });
  for (var m = memoCards.length - 1; m > 0; m--){
    var j = Math.floor(Math.random() * (m + 1));
    var tmp = memoCards[m]; memoCards[m] = memoCards[j]; memoCards[j] = tmp;
  }
  var memoGrid = document.getElementById("memoGrid");
  var memoStats = document.getElementById("memoStats");
  var memoFb = document.getElementById("memoFb");
  var memoOpen = [];
  var memoFound = 0;
  var memoTries = 0;
  function memoUpdate(){
    memoStats.textContent = "Parejas: " + memoFound + " / 6 · Intentos: " + memoTries;
  }
  memoCards.forEach(function(c){
    var el = document.createElement("div");
    el.className = "mcard";
    el.textContent = "🍃";
    el.addEventListener("click", function(){
      if (el.classList.contains("lock") || el.classList.contains("up") || memoOpen.length === 2) return;
      el.classList.add("up");
      el.textContent = c.label;
      memoOpen.push({ el:el, pid:c.pid });
      if (memoOpen.length === 2){
        memoTries++;
        if (memoOpen[0].pid === memoOpen[1].pid){
          memoOpen[0].el.classList.add("lock");
          memoOpen[1].el.classList.add("lock");
          memoOpen = [];
          memoFound++;
          memoFb.textContent = "🌱 ¡Pareja! Dila en voz alta.";
          memoFb.className = "feedback good";
          if (memoFound === 6){
            memoFb.textContent = "⭐ ¡Memoria completa! El jardín está entero.";
          }
        } else {
          memoFb.textContent = "No son pareja… ¡memoria de jardinera!";
          memoFb.className = "feedback oops";
          var a = memoOpen[0].el, bEl = memoOpen[1].el;
          memoOpen = [];
          setTimeout(function(){
            a.classList.remove("up"); a.textContent = "🍃";
            bEl.classList.remove("up"); bEl.textContent = "🍃";
          }, 1000);
        }
        memoUpdate();
      }
    });
    memoGrid.appendChild(el);
  });
  memoUpdate();

  /* ===== rol + oruga ===== */
  var rolItems = [
    { t:"👤 Tu nombre", m:"Me llamo ____ y vengo del mundo real." },
    { t:"🦎 Tu color", m:"Mi color favorito es el ____." },
    { t:"👕 Tu ropa hoy", m:"Hoy mi camiseta es ____ y mis zapatos son ____." },
    { t:"🔦 Tu cuarto", m:"En mi cuarto hay ____ y ____." },
    { t:"📍 Tu mapa", m:"Mi cama está ____ (al lado de / cerca de) la ventana." }
  ];
  var rolList = document.getElementById("rolList");
  rolItems.forEach(function(r){
    var el = document.createElement("div");
    el.className = "rline";
    el.innerHTML = r.t + "<span class=\"tap\">toca ♪</span><div class=\"model\">🗣️ " + r.m + "</div>";
    el.addEventListener("click", function(){ el.classList.toggle("open"); });
    rolList.appendChild(el);
  });

  var ivQs = [
    { q:"¿De qué color es tu cuarto?", h:"Mi cuarto es..." },
    { q:"¿Qué hay en tu mochila?", h:"En mi mochila hay..." },
    { q:"¿Dónde está tu celular ahora?", h:"Está encima de / al lado de..." },
    { q:"¿De qué color son tus zapatos?", h:"Mis zapatos son..." },
    { q:"¿Qué hay debajo de tu cama?", h:"Debajo de mi cama hay... / no hay nada." },
    { q:"¿Hay un parque cerca de tu casa?", h:"Sí, hay... / No, no hay..." },
    { q:"¿Cuál es tu color favorito? ¿Por qué?", h:"Mi color favorito es... porque..." },
    { q:"¿Qué hay encima de tu mesa?", h:"Encima de mi mesa hay..." },
    { q:"¿Dónde está tu escuela?", h:"Mi escuela está cerca de / lejos de..." },
    { q:"¿De qué color es tu comida favorita?", h:"Es... y es de color..." }
  ];
  var ivPool = [];
  var ivQ = document.getElementById("ivQ");
  var ivHint = document.getElementById("ivHint");
  document.getElementById("ivBtn").addEventListener("click", function(){
    if (ivPool.length === 0){ ivPool = ivQs.slice(); }
    var pick = Math.floor(Math.random() * ivPool.length);
    var q = ivPool.splice(pick, 1)[0];
    ivQ.textContent = "🐛 " + q.q;
    ivHint.textContent = "Pista: " + q.h;
  });

  /* ===== ¿y en tu casa? ===== */
  var compItems = [
    { s:"En el jardín de la Reina hay rosas rojas.", si:"¡En mi casa también hay flores!", no:"En mi casa no hay flores. Hay..." },
    { s:"En Musicland hay un gato azul en el árbol.", si:"¡En mi casa también hay un animal!", no:"En mi casa no hay animales." },
    { s:"La Oruga está encima de un hongo morado.", si:"¡Yo también estoy encima de algo: una silla!", no:"Yo no. Yo estoy al lado de..." },
    { s:"En el laberinto hay muchas paredes verdes.", si:"¡En mi cuarto también hay algo verde!", no:"En mi cuarto no hay nada verde." },
    { s:"El espejo mágico está detrás de la puerta.", si:"¡En mi casa también hay un espejo!", no:"El espejo de mi casa está..." }
  ];
  var compIdx = 0;
  var compSent = document.getElementById("compSent");
  var compModel = document.getElementById("compModel");
  var compRound = document.getElementById("compRound");
  function renderComp(){
    var r = compItems[compIdx];
    compRound.textContent = "Frase " + (compIdx+1) + " / 5";
    compSent.textContent = r.s;
    compModel.innerHTML = "";
  }
  function compAnswer(kind){
    if (compIdx >= compItems.length) return;
    var r = compItems[compIdx];
    var txt = (kind === "si") ? r.si : r.no;
    compModel.innerHTML = "🗣️ " + txt + "<span class=\"say\">Dilo en voz alta y completa la frase.</span>";
    setTimeout(function(){
      compIdx++;
      if (compIdx < compItems.length){ renderComp(); }
      else {
        compRound.textContent = "Completado";
        compSent.textContent = "⭐ ¡Ya describes tu mundo con HAY y ESTÁ!";
        compModel.innerHTML = "Siguiente misión: el dictado del saxofón ›";
      }
    }, 3400);
  }
  document.getElementById("compSi").addEventListener("click", function(){ compAnswer("si"); });
  document.getElementById("compNo").addEventListener("click", function(){ compAnswer("no"); });
  renderComp();

  /* ===== dictado ===== */
  var dictItems = [
    "Las rosas del jardín son rojas.",
    "Hay un gato azul en el árbol.",
    "La llave está debajo de la mesa.",
    "El flamenco rosado está al lado de la puerta.",
    "En el laberinto hay muchas flores blancas."
  ];
  var dictIdx = 0;
  var dictIn = document.getElementById("dictIn");
  var dictFb = document.getElementById("dictFb");
  var dictRound = document.getElementById("dictRound");
  var dictSecret = document.getElementById("dictSecret");
  function dictNorm(s){
    return s.toLowerCase().replace(/[.,;:!?¡¿"«»]/g, "").replace(/\s+/g, " ").trim();
  }
  function dictDeacc(s){
    return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  function speak(text, rate){
    if (!window.speechSynthesis){ dictFb.textContent = "Este navegador no tiene voz: la profe lee el mensaje 👩‍🏫"; dictFb.className = "feedback oops"; return; }
    var u = new SpeechSynthesisUtterance(text);
    u.lang = "es-ES";
    u.rate = rate;
    var vs = window.speechSynthesis.getVoices();
    for (var v = 0; v < vs.length; v++){
      if (vs[v].lang && vs[v].lang.indexOf("es") === 0){ u.voice = vs[v]; break; }
    }
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  }
  function renderDict(){
    dictRound.textContent = "Mensaje " + (dictIdx+1) + " / 5";
    dictIn.value = "";
    dictFb.textContent = "";
    dictFb.className = "feedback";
    dictSecret.textContent = dictItems[dictIdx];
  }
  document.getElementById("dictPlay").addEventListener("click", function(){ speak(dictItems[dictIdx], 0.82); });
  document.getElementById("dictSlow").addEventListener("click", function(){ speak(dictItems[dictIdx], 0.55); });
  document.getElementById("dictCheck").addEventListener("click", function(){
    var ans = dictNorm(dictIn.value);
    var target = dictNorm(dictItems[dictIdx]);
    if (ans === target){
      dictFb.textContent = "🎷 ¡La oruga aplaude! Mensaje perfecto.";
      dictFb.className = "feedback good";
    } else if (ans !== "" && dictDeacc(ans) === dictDeacc(target)){
      dictFb.textContent = "¡Casi perfecto! Revisa las tildes: " + dictItems[dictIdx];
      dictFb.className = "feedback oops";
    } else {
      dictFb.textContent = "Escucha otra vez… pista: la frase tiene " + dictItems[dictIdx].split(" ").length + " palabras.";
      dictFb.className = "feedback oops";
    }
  });
  document.getElementById("dictNext").addEventListener("click", function(){
    dictIdx++;
    if (dictIdx < dictItems.length){ renderDict(); }
    else {
      dictIdx = dictItems.length - 1;
      dictRound.textContent = "Dictado completado";
      dictFb.textContent = "⭐ ¡Cinco mensajes descifrados! El laberinto te espera ›";
      dictFb.className = "feedback good";
    }
  });
  renderDict();

  /* ===== jefe final: Laberinto Viviente ===== */
  var boss2 = [
    { q:"En el laberinto ＿＿ tres puertas.", opts:["están","hay","es"], ok:1 },
    { q:"La salida ＿＿ detrás de la pared verde.", opts:["hay","está","están"], ok:1 },
    { q:"🌹 las rosas ＿＿ (blanco)", opts:["blancos","blanca","blancas"], ok:2 },
    { q:"⚠️ ⏰ 5:30 → ＿＿", opts:["Son las cinco y media.","Es la cinco y media.","Son las cinco y cuarto."], ok:0 },
    { q:"⚠️ 🎒 El erizo ＿＿ mucho miedo.", opts:["es","está","tiene"], ok:2 },
    { q:"El hongo ＿＿ debajo del árbol.", opts:["hay","está","están"], ok:1 },
    { q:"🐛 la oruga ＿＿ (azul)", opts:["azul","azula","azules"], ok:0 },
    { q:"Entre los dos rosales ＿＿ una flauta.", opts:["está","hay","son"], ok:1 }
  ];
  var boss2Idx = 0;
  var hp2 = boss2.length;
  var b2Q = document.getElementById("boss2Q");
  var b2Opts = document.getElementById("boss2Opts");
  var b2Hp = document.getElementById("boss2Hp");
  var b2Sprite = document.getElementById("boss2Sprite");
  var b2Game = document.getElementById("boss2Game");
  var b2Win = document.getElementById("boss2Win");
  var field2 = document.getElementById("battlefield2");
  var mini2 = document.getElementById("miniSlash2");
  function musicHit2(){
    mini2.classList.remove("go");
    void mini2.offsetWidth;
    mini2.classList.add("go");
    b2Sprite.classList.add("hit");
    spawnDamage(field2);
    setTimeout(function(){ b2Sprite.classList.remove("hit"); }, 520);
  }
  function renderBoss2(){
    var r = boss2[boss2Idx];
    b2Q.textContent = "🌿 Ataque " + (boss2Idx+1) + ": " + r.q;
    b2Opts.innerHTML = "";
    r.opts.forEach(function(op, idx){
      var b = document.createElement("div");
      b.className = "opt";
      b.style.textAlign = "center";
      b.textContent = op;
      b.addEventListener("click", function(){
        if (idx === r.ok){
          b.classList.add("right");
          hp2--;
          b2Hp.style.width = (hp2/boss2.length)*100 + "%";
          var isLast = (boss2Idx === boss2.length - 1);
          if (isLast){
            document.getElementById("cutinTxt").textContent = "¡GRAN FINAL: JARDÍN DE MIL COLORES!";
            cutin.classList.remove("go");
            void cutin.offsetWidth;
            cutin.classList.add("go");
            setTimeout(musicHit2, 700);
            setTimeout(function(){
              b2Sprite.textContent = "🌸";
              b2Game.classList.add("hidden");
              b2Win.classList.remove("hidden");
              confettiBurst();
            }, 2100);
          } else {
            musicHit2();
            setTimeout(function(){
              boss2Idx++;
              renderBoss2();
            }, 950);
          }
        } else {
          b.classList.add("wrong");
        }
      });
      b2Opts.appendChild(b);
    });
  }
  renderBoss2();

  /* init */
  goTo(0, true);
})();
