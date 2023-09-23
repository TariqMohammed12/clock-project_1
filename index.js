function getAlam() {
  let arrAlam = {};
  for (let i = 0; i < window.localStorage.length; i++) {
    if (window.localStorage.key(i).split(" ")[0] == "alam") {
      arrAlam[window.localStorage.key(i)] = window.localStorage.getItem(
        window.localStorage.key(i)
      );
    }
  }

  return arrAlam;
}
let hours = document.getElementById("hours");
let minutes = document.getElementById("minutes");
let seconds = document.getElementById("seconds");
let ampm = document.getElementById("ampm");

const dapap1 = document.getElementById("dapap1");
const se = document.getElementById("se");

function show(key, value) {
  se.innerHTML = value.slice(0, value.split("").length - 5);

  let audioElement = document.querySelector("#myAudio");
  audioElement.play();
  dapap1.style.visibility = "unset";
  dapap1.style.opacity = "1";
  dapap1.style.transform = "scale(1)";
  dapap1.style.background = "#000000c4";
  document.getElementById("nameAl").innerHTML = key.split(" ")[2];
  dapap1.addEventListener("click", (e) => {
    hidden();
  });
}

function swits() {
  return {
    blue: function () {
      document.getElementById("se").style.color = "#00ff74";
    },
    white: function () {
      document.getElementById("se").style.color = "#fff";
    },
  };
}

function hidden() {
  dapap1.style.visibility = "hidden";
  dapap1.style.opacity = "0";
  dapap1.style.transform = "scale(0.8)";
  dapap1.style.background = "transparent";
}
let swit = true;
function clock(h, m, per) {
  getAlam();

  let key = Object.getOwnPropertyNames(getAlam());

  for (let i = 0; i < key.length; i++) {
    if (getAlam()[key[i]] == nameV(h, m, per, true)) {
      show(key[i], getAlam()[key[i]]);
      if (swit == true) {
        swits().blue();
        swit = false;
      } else {
        swits().white();
        swit = true;
      }
    }
  }
}

function renderClock() {
  let h = new Date().getHours();
  let m = new Date().getMinutes();
  let s = new Date().getSeconds();
  let am = h >= 12 ? "PM" : "AM";

  if (h > 12) {
    h = h - 12;
  }

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  hours.innerHTML = h + " :<br><span>Hours</span>";
  minutes.innerHTML = m + " :<br><span>Minutes</span>";
  seconds.innerHTML = s + "<br><span>seconds</span>";
  ampm.innerHTML = am;
  clock(h, m, am);
}
renderClock();
setInterval(() => {
  renderClock();
}, 1000);

const sel = document.getElementById("sel");
const sel1 = document.getElementById("sel1");
const sel2 = document.getElementById("sel2");

let count = 37;
for (let i = 0; i < 12; i++, count -= 37 / 12) {
  let option = document.createElement("option");
  let val = i + 1 < 10 ? "0" + (i + 1) : i + 1;
  option.innerHTML = val;
  option.className = "option";
  option.setAttribute("value", val);
  option.style.background = `rgb(${count}, ${count}, ${count})`;
  sel.append(option);
}
for (let i = 0; i < 60; i++, count -= 37 / 59) {
  let option = document.createElement("option");
  let val = i < 10 ? "0" + i : i;
  option.innerHTML = val;
  option.setAttribute("value", val);
  option.className = "option";
  option.style.background = `rgb(${count}, ${count}, ${count})`;
  sel1.append(option);
}

const pluse = document.getElementById("pluse");
const dapap = document.getElementById("dapap");
const close1 = document.getElementById("close");
const set = document.getElementById("set");
const titleMessage = document.getElementById("titleMessage");

function openM() {
  dapap.style.visibility = "unset";
  dapap.style.opacity = "1";
  dapap.style.transform = "scale(1)";
  dapap.style.background = "#000000c4";
}
function closeM() {
  dapap.style.visibility = "hidden";
  dapap.style.opacity = "0";
  dapap.style.transform = "scale(0.8)";
  dapap.style.background = "transparent";
}
pluse.addEventListener("click", (e) => {
  nameA.value = "";
  titleMessage.innerHTML = "Create your alarm now";
  for (let i = 0; i < document.querySelectorAll(".edit").length; i++) {
    document.querySelectorAll(".edit")[i].style.display = "none";
  }
  document.getElementById("create").style.display = "block";
  document.querySelector(".upNume").style.display = "block";
  document.getElementById("create").innerHTML = "Create";
  openM();
});
close1.addEventListener("click", () => {
  closeM();
});

const empty = document.getElementById("empty");

class CreateS {
  static sh = true;
  constructor(key, i) {
    this.i = i;
    this.key = key;
    this.slid = document.createElement("li");
    this.sli1 = document.createElement("li");
    this.sli2 = document.createElement("li");
    this.sec1 = document.createElement("span");
    this.sec2 = document.createElement("span");
    this.span = document.createElement("span");
    this.p = document.createElement("p");
    this.p1 = document.createElement("p");
    this.upp = document.createElement("div");
    this.upSet = document.createElement("ul");
    this.sheck = document.createElement("input");
    this.button = document.createElement("button");
    this.buttonFak = document.createElement("button");
    this.shx = 0;

    this.time = {
      h: window.localStorage.getItem(this.key).split(" ")[0],
      m: window.localStorage.getItem(this.key).split(" ")[2],
      per: window.localStorage.getItem(this.key).split(" ")[6],
    };

    this.sh = true;
    this.s = true;
    this.elements();
    this.functions();
  }
  elements() {
    this.button.innerHTML = "<i class='fa-solid fa-ellipsis-vertical'></i>";
    this.button.className = "setting";
    this.span.innerHTML = "<i class='fa-solid fa-circle'></i>";
    this.buttonFak.setAttribute("type", "button");
    this.buttonFak.classList.add("create", "edit");
    this.buttonFak.id = "but" + this.i;
    this.buttonFak.innerHTML = "Edit";
    this.p.innerHTML = this.key.split(":")[1].trim();
    this.p1.innerHTML = window.localStorage
      .getItem(this.key)
      .slice(0, window.localStorage.getItem(this.key).split("").length - 5);
    this.sli1.setAttribute("id", "edit");
    this.sli1.innerHTML =
      "<i class='fa-solid fa-pen'></i><span style='margin-left: 8px;'>Edit</span>";
    this.sli2.setAttribute("id", "delete");
    this.sli2.innerHTML =
      "<i class='fa-solid fa-trash'></i><span style='margin-left: 8px;'>Trash</span>";
    this.sheck.type = "checkbox";
    this.sheck.className = "sheck";
    this.sheck.setAttribute("checked", "");
    this.upSet.className = "upSet1";
    document.querySelector(".upSet").append(this.buttonFak);
    this.upSet.append(this.sli1, this.sli2);
    this.upp.className = "upp";
    this.upp.append(this.sheck, this.button, this.upSet);
    this.sec1.classList.add("sec1", "sec");
    this.sec1.append(this.span, this.p);
    this.sec2.classList.add("sec2", "sec");
    this.sec2.append(this.p1, this.upp);
    this.slid.className = "slid";
    this.slid.setAttribute("id", "slid" + this.i);
    this.slid.append(this.sec1, this.sec2);
    set.prepend(this.slid);
  }
  functions() {
    emptyx();
    function open(object) {
      object.upSet.style.opacity = 1;
      object.upSet.style.visibility = "unset";
      object.upSet.style.right = "26px";
      object.sh = false;
    }
    function close(object) {
      object.upSet.style.opacity = 0;
      object.upSet.style.visibility = "hidden";
      object.upSet.style.right = "46px";
      object.sh = true;
    }
    this.button.addEventListener("click", (e) => {
      for (let i = 0; i < arrSlid.length; i++) {
        if (arrSlid[i] != this) {
          close(arrSlid[i]);
        }
      }

      if (this.sh == true) {
        open(this);
      } else {
        close(this);
      }
    });
    window.addEventListener("click", (e) => {
      if (
        (e.target == this.upSet ||
          e.target == this.sli1 ||
          e.target == this.sli2 ||
          e.target == this.sli1.children[0] ||
          e.target == this.sli1.children[1] ||
          e.target == this.sli2.children[0] ||
          e.target == this.sli2.children[1] ||
          e.target == this.button ||
          e.target == this.button.children[0]) == false
      ) {
        this.upSet.style.opacity = 0;
        this.upSet.style.visibility = "hidden";
        this.upSet.style.right = "46px";
        this.sh = true;
      }
    });

    this.sli1.addEventListener("click", (e) => {
      openM();
      nameA.value = this.p.innerHTML;
      titleMessage.innerHTML = "Edit your alarm now";
      for (let i = 0; i < document.querySelectorAll(".edit").length; i++) {
        document.querySelectorAll(".edit")[i].style.display = "none";
      }
      this.buttonFak.style.display = "block";
      document.getElementById("create").style.display = "none";
      document.querySelector(".upNume").style.display = "none";
      this.buttonFak.addEventListener("click", (e) => {
        if (load().validValue(sel.value, sel1.value, sel2.value) == false) {
          let sh = window.localStorage
            .getItem(window.localStorage.key(this.i))
            .split(" ")[
            window.localStorage
              .getItem(window.localStorage.key(this.i))
              .split(" ").length - 1
          ];
          window.localStorage.setItem(
            window.localStorage.key(this.i),
            nameV(sel.value, sel1.value, sel2.value, sh)
          );

          this.p1.innerHTML = `${sel.value} : ${sel1.value} : 00 => ${sel2.value}`;
          closeM();
        }
      });
    });

    this.sli2.addEventListener("click", (e) => {
      window.localStorage.removeItem(window.localStorage.key(this.i));
      this.slid.remove();
      emptyx();
      window.location.reload();
    });

    this.sheck.addEventListener("click", (e) => {
      if (this.s == true) {
        window.localStorage.setItem(
          "alam : " + this.p.innerHTML,
          window.localStorage
            .getItem(window.localStorage.key(this.i))
            .slice(
              0,
              window.localStorage.getItem(window.localStorage.key(this.i))
                .length - 5
            ) + " false"
        );

        this.s = false;
      } else {
        window.localStorage.setItem(
          "alam : " + this.p.innerHTML,
          window.localStorage
            .getItem(window.localStorage.key(this.i))
            .slice(
              0,
              window.localStorage.getItem(window.localStorage.key(this.i))
                .length - 5
            ) + "true"
        );
        this.s = true;
      }
    });
  }
}
function nameV(h, m, per, sh) {
  return `${h} : ${m} : 00 => ${per} ${sh}`;
}
function emptyx() {
  if (document.querySelectorAll(".slid").length != 0) {
    empty.style.display = "none";
  } else {
    empty.style.display = "flex";
  }
}
let arrSlid = new Array();
function load() {
  let i = 0;
  return {
    nam: function () {
      for (let i = 0; i < window.localStorage.length; i++) {
        if (window.localStorage.key(i).split(" ")[0] == "alam") {
          arrSlid.push(new CreateS(window.localStorage.key(i), i));
        }
      }
      i++;
    },
    validValue: function (h, m, p) {
      let count = 0;
      for (let i = 0; i < window.localStorage.length; i++) {
        if (
          window.localStorage
            .getItem(window.localStorage.key(i))
            .slice(
              0,
              window.localStorage.getItem(window.localStorage.key(i)).length - 5
            ) == `${h} : ${m} : 00 => ${p}`
        ) {
          count++;
        }
      }
      if (count > 0) {
        return true;
      } else {
        return false;
      }
    },
    validKey: function (key) {
      let count = 0;
      for (let i = 0; i < window.localStorage.length; i++) {
        if (window.localStorage.key(i) == key) {
          count++;
        }
      }
      if (count > 0) {
        return true;
      } else {
        return false;
      }
    },
  };
}
load().nam();
const nameA = document.getElementById("name");

function createTrue(h, m, p) {
  closeM();

  window.localStorage.setItem("alam : " + nameA.value, nameV(h, m, p, true));
  document.querySelectorAll(".slid").forEach((ele) => {
    ele.remove();
  });
  load().nam();
}
let create = document.getElementById("create");

function checkData(h, m, per) {
  if (
    load().validValue(h, m, per) == false &&
    load().validKey("alam : " + nameA.value) == false
  ) {
    createTrue(h, m, per);
    window.location.reload();
    shad();
  } else {
    alert("The alarm time or The name is already exists !!");
  }
}
create.addEventListener("click", (e) => {
  if (nameA.value.trim().length != 0) {
    let h = sel.value;
    let m = sel1.value;
    let per = sel2.value;
    checkData(h, m, per);
  }
});
const clear = document.getElementById("clear");

clear.addEventListener("click", (e) => {
  let key = Object.getOwnPropertyNames(getAlam());
  for (let i = 0; i < key.length; i++) {
    window.localStorage.removeItem(key[i]);
  }
  window.location.reload();
});

function Effect(idWH, min, max, color1 = "#161616") {
  let lightStrong = Math.max(min, max);
  window.addEventListener("mousemove", (e) => {
    let car = document.getElementById(idWH).getBoundingClientRect(),
      x = e.pageX - window.scrollX - car.left,
      y = e.pageY - window.scrollY - car.top;

    let color = `rgb(${255 - x / (car.width / 255)}, ${
      255 - y / (car.height / 255)
    }, ${y / (car.height / 255)})`;

    if (
      !(
        x < car.width + lightStrong &&
        x > -lightStrong &&
        y < car.height + lightStrong &&
        y > -lightStrong
      )
    ) {
      x = -lightStrong;
      y = -lightStrong;
    }

    document.getElementById(
      idWH
    ).style.background = `radial-gradient( circle at ${x}px ${y}px, transparent  ${min}px, ${color1} ${max}px )`;
  });
}
Effect("hid", 50, 400);
Effect("hid1", 50, 300);
Effect("hid2", 50, 300);
Effect("hid3", -10, 100, "#252525");
function shad() {
  if (document.querySelectorAll(".slid").length == 1) {
    document.getElementById("hid3").style.height = "100%";
  } else {
    document.getElementById("hid3").style.height =
      Object.getOwnPropertyNames(getAlam()).length * 60 + 60 + "px";
  }
}
shad();
