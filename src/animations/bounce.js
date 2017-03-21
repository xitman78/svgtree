import Bounce from 'bounce.js'

let foldUnfold = new Bounce();

foldUnfold.title = 'Fold & Unfold';

foldUnfold.scale({
  from: { x: 1, y: 1 },
  to: { x: 0.2, y: 1 },
  easing: 'bounce',
  duration: 1000,
  bounces: 4,
  stiffness: 3
}).scale({
  from: { x: 1, y: 1 },
  to: { x: 1, y: 0.2 },
  easing: 'bounce',
  duration: 1000,
  delay: 500,
  bounces: 4,
  stiffness: 3
}).scale({
  from: { x: 1, y: 1 },
  to: { x: 5, y: 1 },
  easing: 'bounce',
  duration: 1000,
  delay: 1000,
  bounces: 4,
  stiffness: 3
}).scale({
  from: { x: 1, y: 1 },
  to: { x: 1, y: 5 },
  easing: 'bounce',
  duration: 500,
  delay: 1500,
  bounces: 4,
  stiffness: 3
});

let jelly = new Bounce();

jelly.title = "Jelly";

jelly.scale({
  from: { x: 1, y: 1 },
  to: { x: 2, y: 1 },
  easing: 'bounce',
  duration: 1000,
  delay: 0,
  bounces: 4,
  stiffness: 1
}).scale({
  from: { x: 1, y: 1 },
  to: { x: 1, y: 2 },
  easing: 'bounce',
  duration: 1000,
  delay: 0,
  bounces: 6,
  stiffness: 1
});

let smack = new Bounce();

smack.title = "Smack";

smack.skew({
  from: { x: 0, y: 0 },
  to: { x: 40, y: 60 },
  easing: 'sway',
  duration: 750,
  delay: 0,
  bounces: 4,
  stiffness: 3
}).scale({
  from: { x: 1, y: 1 },
  to: { x: 2, y: 2 },
  easing: 'bounce',
  duration: 750,
  delay: 0,
  bounces: 4,
  stiffness: 2
});

let swoosh = new Bounce();

swoosh.title = "Swoosh";

swoosh.translate({
  from: { x: 0, y: 0 },
  to: { x: 300, y: 0 },
  easing: 'bounce',
  duration: 1000,
  delay: 0,
  bounces: 4,
  stiffness: 5
}).scale({
  from: { x: 1, y: 1 },
  to: { x: 15, y: 1 },
  easing: 'sway',
  duration: 500,
  delay: 0,
  bounces: 4,
  stiffness: 5
});

let splat = new Bounce();

splat.title = "Splat";

splat.translate({
  from: { x: 0, y: 0 },
  to: { x: 300, y: 0 },
  easing: 'bounce',
  duration: 600,
  delay: 0,
  bounces: 4,
  stiffness: 4
}).scale({
  from: { x: 1, y: 1 },
  to: { x: 0.1, y: 2.3 },
  easing: 'sway',
  duration: 800,
  delay: 65,
  bounces: 4,
  stiffness: 2
}).scale({
  from: { x: 1, y: 1 },
  to: { x: 5, y: 1 },
  easing: 'sway',
  duration: 300,
  delay: 30,
  bounces: 4,
  stiffness: 3
});

let spin = new Bounce();

spin.title = "Spin";

spin.rotate({
  from: 0,
  to: 90,
  easing: 'bounce',
  duration: 1000,
  delay: 0,
  bounces: 4,
  stiffness: 3
}).skew({
  from: { x: 0, y: 0 },
  to: { x: 20, y: 20 },
  easing: 'sway',
  duration: 1000,
  delay: 0,
  bounces: 4,
  stiffness: 3
})

export default {
  foldUnfold,
  jelly,
  smack,
  splat,
  spin,
  swoosh,
};
