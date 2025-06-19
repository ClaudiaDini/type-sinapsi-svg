/** @typedef {[SVGImage, SVGImage]} Lettera */
/** @typedef {Lettera[]} Parola */

//let img_1;
//let img_2;
//let A_3;
//let A_4;
// let percentuale = 0.5;
let gap = 20;
let c = "blue"

/** @type {Object.<string, SVGImage[]>} */
let lettere = {};

/** @type {Parola} */
let parola;

let mic;
// let parola = ["S", "I", "N", "A", "P", "S", "I"];

function preload() {
  //img_2 = loadImage("A/A-1-18.svg");
  //img_1 = loadImage("A/A-2-19.svg");
  //A_3 = loadImage("A/A-3-23.svg");
  //A_4 = loadImage("A/A-4-22.svg");
  lettere = {
    S: [
      loadSVGImage("S/S-1.svg"),
      loadSVGImage("S/S-2.svg"),
      loadSVGImage("S/S-3.svg"),
      loadSVGImage("S/S-4.svg"),
      loadSVGImage("S/S-5.svg"),
    ],
    I: [loadSVGImage("I/I-1.svg"), loadSVGImage("I/I-2.svg"), loadSVGImage("I/I-3.svg")],
    N: [loadSVGImage("N/N-1.svg"), loadSVGImage("N/N-2.svg"), loadSVGImage("N/N-3.svg")],
    A: [
      loadSVGImage("A/A-1.svg"),
      loadSVGImage("A/A-2.svg"),
      loadSVGImage("A/A-3.svg"),
      loadSVGImage("A/A-4.svg"),
    ],
    P: [
      loadSVGImage("P/P-1.svg"),
      loadSVGImage("P/P-2.svg"),
      loadSVGImage("P/P-4.svg"),
      loadSVGImage("P/P-3.svg"),
    ],
  };
}

function setup() {
  createCanvas(windowWidth, windowHeight, SVG);
  background("#222222");
  // frameRate(1);
  noStroke();

  // Object.values(lettere).forEach((l) =>
  //   l.forEach((image) => {
  //     image.width = image.width*0.5
  //     image.height = image.height*0.5
  //   })
  // );

  parola = componiParola();
}

function draw() {
  clear()
  background(0);
  disegnaParola(parola);
}

/**
 * @returns {Parola}
 */
function componiParola() {
  let immagini_S = getTwoRandomElements(lettere["S"]);
  let immagini_I = getTwoRandomElements(lettere["I"]);
  let immagini_N = getTwoRandomElements(lettere["N"]);
  let immagini_A = getTwoRandomElements(lettere["A"]);
  let immagini_P = getTwoRandomElements(lettere["P"]);
  let immagini_S2 = getTwoRandomElements(lettere["S"]);
  let immagini_I2 = getTwoRandomElements(lettere["I"]);
  return [
    immagini_S,
    immagini_I,
    immagini_N,
    immagini_A,
    immagini_P,
    immagini_S2,
    immagini_I2,
  ];
}

/**
 * @param {Parola} parola
 */
function disegnaParola(parola) {
  let percentuale1 = noise(frameCount * 0.01);
  let percentuale2 = 1 - percentuale1;

  translate(width/2, height/2)
  scale(0.3)

  // Variante mouse
  // let percentuale1 = map(mouseX, 0, width, 1, 0, true);
  // let percentuale2 = map(mouseX, 0, width, 0, 1, true);

  let width_totale = (parola.length - 1) * gap;
  for (let coppia of parola) {
    width_totale += coppia[0].width / 2 + coppia[1].width / 2;
  }

  let height_totale = parola[0][0].height;

  let x = ( - width_totale) / 2;
  let y = ( - height_totale) / 2;

  // rect(x, y, len_totale, height_totale);

  push();
  translate(x, y);
  for (let i = 0; i < parola.length; i++) {
    let coppia = parola[i];
    lettera(0, 0, coppia, i % 2 == 0 ? percentuale1 : percentuale2);
    translate(coppia[0].width / 2 + coppia[1].width / 2 + gap, 0);
  }
  pop();
}

function mousePressed() {
  parola = componiParola();
}

function keyPressed() {
  if (key == "s") {
    save("SINAPSI.svg");
  }
}

/**
 *
 * @param {number} x
 * @param {number} y
 * @param {Image[]} coppia
 * @param {number} percentuale
 */
function lettera(x, y, coppia, percentuale) {
  let img_sx = coppia[0];
  let img_dx = coppia[1];

  // let larghezza_1 = map(percentuale, 0, 1, 0, img_sx.width);
  // let larghezza_2 = img_dx.width - larghezza_1;

  let cx = x + img_sx.width / 2;
  let cy = y + img_sx.height / 2;

  push();
  imageMode(CENTER);
  translate(cx, cy);

  let base_x = -img_sx.width / 2;
  let base_y = -img_sx.height / 2;
  let mask_w = img_sx.width / 2 + img_dx.width / 2;
  let mask_h = img_sx.height;

  let mask_sx_w = mask_w * percentuale;

  beginClip();
  rect(base_x, base_y, mask_w, mask_h);
  endClip();

  push();
  beginClip();
  rect(base_x, base_y, mask_sx_w, mask_h);
  endClip();
  removeStyles(img_sx)
  fillSVG(img_sx, c)
  image(img_sx, 0, 0);
  pop();

  push();
  beginClip();
  rect(base_x + mask_sx_w, base_y, mask_w - mask_sx_w, mask_h);
  endClip();
  removeStyles(img_dx)
  fillSVG(img_dx, c)
  image(img_dx, 0, 0);
  pop();

  pop();

  // //immagine sinistra
  // push();
  // imageMode(CENTER);
  // translate(x + img_sx.width / 2, y + img_sx.height / 2);

  // push();

  // beginClip();
  // rect(-img_sx.width / 2, -img_sx.height / 2, larghezza_1, img_sx.height);
  // endClip();

  // image(img_sx, 0, 0);

  // pop();

  // pop();

  // //immagine destra
  // push();
  // imageMode(CENTER);
  // translate(x + img_dx.width / 2, y + img_dx.height / 2);

  // push();

  // beginClip();
  // rect(
  //   -img_dx.width / 2 + larghezza_1,
  //   -img_dx.height / 2,
  //   larghezza_2,
  //   img_dx.height
  // );
  // endClip();

  // image(img_dx, 0, 0);

  // pop();
  // pop();
}

/**
 * @param {Image[]} arr
 * @returns {[Image, Image]}
 */
function getTwoRandomElements(arr) {
  if (arr.length < 2) {
    throw new Error("Array must have at least two elements.");
  }
  let shuffled = shuffle(arr); // p5.js's built-in shuffle function
  return [shuffled[0], shuffled[1]];
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

/**
 * @param {SVGImage} svg
 */
function removeStyles(svg) {
  getSVGPaths(svg).forEach((el) => {
    el.elt.setAttribute("class", "");
  });
}