var allActive = true;
var currentDistrict = '';
var currentKey = '';
var districtName = '';

function showInfo(key) {
  currentKey = key;
  var list = document.getElementById('infoList');
  list.innerHTML = '';
  if (key === 'Zona' || key === 'Descanso') return;
  var pathToImg = `./assets/logos/${key.toLowerCase()}.jpg`;
  var img = document.getElementById('infoImg');
  img.src = pathToImg;
  img.style.width = '500px';
  img.style.height = '200px';
  document.getElementById('infoTitle').textContent = infoStands[key].title;
  var ol = document.createElement('ol');
  if (
    currentDistrict === '' ||
    infoStands[key].distritos[currentDistrict] === undefined
  )
    return;

  for (var d of infoStands[key].distritos[currentDistrict]) {
    let li = document.createElement('li');
    li.innerHTML = d;
    ol.appendChild(li);
  }
  list.appendChild(ol);
  document.getElementById('infoBody').textContent = districtName;
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

window.changeAll = function (active) {
  if (active) {
    for (var [key, value] of Object.entries(distritos)) {
      var imgs = value.imgs;
      for (var imgId of imgs) {
        var img = document.getElementById(imgId);
        if (img.style.opacity != 1) fadeIn(img);
      }
    }
  } else {
    for (var [key, value] of Object.entries(distritos)) {
      var imgs = value.imgs;
      for (var imgId of imgs) {
        var img = document.getElementById(imgId);
        if (img.style.opacity != 0.2) fadeOut(img);
      }
    }
  }
};

const snakeCase = (string) => {
  return string
    .replace(/\W+/g, ' ')
    .split(/ |\B(?=[A-Z])/)
    .map((word) => word.toLowerCase())
    .join('_');
};

window.myFunction = function (distrito) {
  districtName = distrito;
  distrito = snakeCase(distrito);
  currentDistrict = distrito;
  if (distrito == 'todos_los_distritos') {
    changeAll(true);
    return;
  }
  changeAll(false);
  for (var imgId of distritos[distrito].imgs) {
    var img = document.getElementById(imgId);
    if (img.style.opacity != 1) fadeIn(img);
  }
  if (currentKey !== '') showInfo(currentKey);
};
