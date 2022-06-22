var allActive = true;
var distritos = {
  miraflores: {
    imgs: ['M1', 'A13', 'A19', 'S73'],
    active: false,
  },
  san_borja: {
    imgs: ['A16', 'A37', 'A21'],
    active: false,
  },
  barranco: {
    imgs: ['M22', 'A2', 'S18'],
    active: false,
  },
};

function showInfo(key) {
  document.getElementById('infoTitle').textContent = 'Titulo' + key;
  document.getElementById('infoBody').textContent = 'Body' + key;
}

function fadeIn(el) {
  el.style.opacity = 0.2;
  var tick = function () {
    el.style.opacity = +el.style.opacity + 0.01;
    if (+el.style.opacity < 1) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) ||
        setTimeout(tick, 16);
    }
  };
  tick();
}

function fadeOut(el) {
  el.style.opacity = 1;
  var tick = function () {
    el.style.opacity = +el.style.opacity - 0.01;
    if (+el.style.opacity > 0.2) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) ||
        setTimeout(tick, 16);
    }
  };
  tick();
}

window.changeAll = function () {
  allActive = !allActive;
  for (var [key, value] of Object.entries(distritos)) {
    var imgs = value.imgs;
    distritos[key].active = allActive;
    for (var imgId of imgs) {
      var img = document.getElementById(imgId);
      if (allActive) {
        if (img.style.opacity != 1) fadeIn(img);
        document.getElementById(key + '_check').textContent = '\u2705'; // Check mark
      } else {
        if (img.style.opacity != 0.2) fadeOut(img);
        document.getElementById(key + '_check').textContent = '\u274C'; // X mark
      }
    }
  }
};

window.myFunction = function (distrito) {
  if (distrito === 'todos') {
    changeAll();
    return;
  }
  distritos[distrito].active = !distritos[distrito].active;
  for (var [key, value] of Object.entries(distritos)) {
    var imgs = value.imgs;
    var active = value.active;
    for (var imgId of imgs) {
      var img = document.getElementById(imgId);
      if (active) {
        if (img.style.opacity != 1) fadeIn(img);
        document.getElementById(key + '_check').textContent = '\u2705';
      } else {
        if (img.style.opacity != 0.2) fadeOut(img);
        document.getElementById(key + '_check').textContent = '\u274C';
      }
    }
  }
};
