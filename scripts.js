var allActive = true;

function showInfo(key) {
  var img = document.getElementById('infoImg');
  img.src = `./assets/logos/${key.toLowerCase()}.jpg`;
  img.style.width = '500px';
  img.style.height = '200px';
  document.getElementById('infoTitle').textContent = infoStands[key].title;
  // document.getElementById('infoBody').textContent = 'Body' + key;
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
  if (allActive)
    currentActives = [
      'miraflores',
      'santiago_de_surco',
      'barranco',
      'san_isidro',
      'san_borja',
      'jesus_maria',
      'lince',
      'magdalena',
      'pueblo_libre',
      'san_miguel',
      'surquillo',
      'smp',
      'ate',
      'la_victoria',
      'brena',
      'chorrillos',
      'cercado_lima',
      'independencia',
      'carabayllo',
      'chaclacayo',
      'mala',
      'pachacamac',
      'san_luis',
      'san_bartolo',
      'bellavista',
    ];
  else currentActives = [];
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

function shouldStayActive(distrito, stand) {
  for (var [key, value] of Object.entries(distritos)) {
    if (key === distrito || !distritos[key].active) continue;

    var imgs = value.imgs;
    for (var imgId of imgs) {
      if (imgId === stand) return true;
    }
  }
  return false;
}

window.myFunction = function (distrito) {
  if (distrito === 'todos') {
    changeAll();
    return;
  }
  distritos[distrito].active = !distritos[distrito].active;
  var active = distritos[distrito].active;
  var imgs = distritos[distrito].imgs;

  if (active) {
    document.getElementById(distrito + '_check').textContent = '\u2705';
    currentActives.push(distrito);
  } else {
    document.getElementById(distrito + '_check').textContent = '\u274C';
    var filteredArray = currentActives.filter((e) => e !== distrito);
    currentActives = filteredArray;
  }

  for (var imgId of imgs) {
    var img = document.getElementById(imgId);
    if (active) {
      if (img.style.opacity != 1) fadeIn(img);
    } else {
      if (img.style.opacity != 0.2) {
        if (!shouldStayActive(distrito, imgId)) fadeOut(img);
      }
    }
  }
};
