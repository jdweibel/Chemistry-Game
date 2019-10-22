import React from "react";
import Matter from "matter-js";
import { Beaker, Sodiums } from "./Shapes";
window.decomp = require("poly-decomp");

const Laboratory = () => {
  const rotateSpeed = Math.PI / 96;
  const minRotateSpeed = rotateSpeed / 5;

  //module aliases
  let Engine = Matter.Engine,
    World = Matter.World,
    Render = Matter.Render,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Events = Matter.Events;
  //Sleeping = Matter.Sleeping;

  //create an engine
  let engine = Engine.create();
  engine.world.gravity.y = 0.3;
  engine.timing.timeScale = 1;

  let ground1 = Bodies.rectangle(400, 720, 810, 60);
  //let ground2 = Bodies.rectangle(400, 570, 810, 20);
  //let ground3 = Bodies.rectangle(400, 590, 810, 20);
  Body.setStatic(ground1, true);
  //Body.setStatic(ground2, true);
  //Body.setStatic(ground3, true);

  let beaker1 = Beaker(100, 200, 100, 100, 10);
  let beaker2 = Beaker(175, 350, 75, 75, 5);
  let atoms = Sodiums(80, 10, 5, 5, 1);
  //Body.setStatic(beaker1, true);
  Body.setStatic(beaker2, true);

  let allBodies = [ground1, beaker1, beaker2].concat(atoms);

  Events.on(engine, "beforeUpdate", function() {
    let gravity = engine.world.gravity;
    Body.applyForce(beaker1, beaker1.position, {
      x: -gravity.x * gravity.scale * beaker1.mass,
      y: -gravity.y * gravity.scale * beaker1.mass
    });
  });

  //create a renderer
  let render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      width: 800,
      height: 800,
      wireframes: false
    }
  });

  //add all of the bodies to the world
  World.add(engine.world, allBodies);

  //run the engine
  Engine.run(engine);

  //run the renderer
  Render.run(render);

  function togRotateBeaker1() {
    beaker1.angularVelocity > minRotateSpeed
      ? Body.setAngularVelocity(beaker1, 0)
      : Body.setAngularVelocity(beaker1, Math.PI / 96);
  }
  function stopBeaker1() {
    Body.setVelocity(beaker1, { x: 0, y: 0 });
    Body.setAngularVelocity(beaker1, 0);
  }
  return (
    <div>
      <button onClick={togRotateBeaker1}>toggleRotate</button>
      <button onClick={stopBeaker1}>stop</button>
    </div>
  );
};

export default Laboratory;
