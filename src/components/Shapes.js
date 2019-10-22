import React from "react";
import Matter from "matter-js";

//prettier-ignore
export const Beaker = (startX, startY, width, height, thick) => {
  let vectz = [
    {x: 0,           y:  0    },  {x: width,       y:  0     }, {x: width, y: -height},
    {x: width-thick, y: -height}, {x: width-thick, y: -thick }, {x: thick, y: -thick }, 
    {x: thick,       y: -height}, {x: 0,           y: -height}];
  let theBeaker = Matter.Bodies.fromVertices(startX, startY, vectz, { restitution: 0.1, density: 0.1 });
  theBeaker.collisionFilter.group = 1;
  return theBeaker;
};

//prettier-ignore
export const Sodiums = (startX, startY, numH, numW, spacing) => {
  const NaRad = 4;
  const NaColor = "#BF0101"
  let NaParticles = [];
  let posX = startX,
    posY = startY;
  for (let i = 0; i < numH; i++) {
    for (let j = 0; j < numW; j++) {
      NaParticles.push(Atom(posX, posY, NaRad, NaColor, { restitution: 0.3, friction: 0 }));
      posX += spacing + 2 * NaRad;
    }
    posY += spacing + 2 * NaRad;
    posX = startX;
  }
  return NaParticles;
};

export const Atom = (startX, startY, rad, hexColor, options = null) => {
  let temp = Matter.Bodies.circle(startX, startY, rad, options);
  temp.render.fillStyle = hexColor;
  temp.collisionFilter.group = 1;
  return temp;
};

export const Water = (beaker, fillPercent) => {
  let beakVectz = beaker.bounds;
  //let vectz = [beakVectz[]]
};
