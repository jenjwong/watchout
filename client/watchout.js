// start slingin' some d3 here.

// d3 selector for the svg-g
var svg = d3.select('body').append('svg')
    .attr('height', 500)
    .attr('width', 500)
  .append('g');
    // .attr('height', 500 - 100)
    // .attr('width', 500 - 100);
    // .attr('transform', 'translate(' + 10 + ',' + 10 + ')' );

/////////////
// ScoreBoard
/////////////
var collisions = parseInt(d3.select('.coll > span').text(), 10);
var currScore = parseInt(d3.select('.current > span').text(), 10);
var highScore = parseInt(d3.select('.highscore > span').text(), 10);

var updateScore = function() {
  d3.select('.current > span').text(currScore);
  currScore++;
};

var updateCollisionCount = function() {
  d3.select('.coll > span').text(collisions);
  collisions++;
  console.log(collisions);
};

var updateHighScore = function() {
  if ( currScore > highScore) {
    highScore = currScore;
    d3.select('.highscore > span').text(highScore);
  }
};

var resetScore = function() {
  currScore = 0;
};

setInterval( () => updateScore(), 10);

//////////
// Enemies
//////////
//makes n enemies with random positions
var makeEnemies = function(n) {
  var arr = [];
  for (var i = 0; i < n; i++) {
    arr.push({
      id: i,
      x: Math.random() * 400,
      y: Math.random() * 400,
      width: Math.random() * 50 + 5
      // r: Math.sqrt( Math.pow(this.width, 2) / 2)
    });

    var end = arr.length - 1;
    arr[end].r = Math.sqrt( Math.pow( arr[end].width, 2) / 2);
  }
  return arr;
};

allEnemies = makeEnemies(10);

// d3 selector for the circle enemies 
var brdEnemies = svg.selectAll('enemies').data(allEnemies)
  .enter().append('image')
    .attr('xlink:href', 'shuriken.png')
    .attr('class', 'enemy')
    .attr('x', function(d) { return d.x; } )
    .attr('y', function(d) { return d.y; } )
    .attr('r', function(d) { return d.r; } )
    .attr('height', function(d) { return d.width; } )
    .attr('width', function(d) { return d.width; } );

// function that generates random enemy positons
var randMovEnemies = function(dataArray) {
  for (var i = 0; i < dataArray.length; i++) {
    dataArray[i].x = Math.random() * 400;
    dataArray[i].y = Math.random() * 400;
  }
  return dataArray;
};

//d3 update function for enemey
var update = function(dataArray) {
  //update
  brdEnemies.data(dataArray)
  .transition().duration(1000)
    .tween('custom', collisionDetection)
      .attr('x', function(d) { return d.x; } )
      .attr('y', function(d) { return d.y; } );
      
  //enter

  //exit
};

//implement collision detection
var checkCollision = function(enemy, callback) {
  players.forEach(function(player) {
    var radiusSum = 10 + parseFloat(enemy.attr('r'));
    var xDiff = parseFloat(enemy.attr('x')) - player.x;
    var yDiff = parseFloat(enemy.attr('y')) - player.y;

    var seperation = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
    if (seperation < radiusSum) {
      callback(player, enemy);
    }
  });
};

var collisionDetection = function() {
  var enemy = d3.select(this);
  // console.log(this, 'outer');
  return function(t) {
    checkCollision(d3.select(this), function() {
      // console.log(this, 'inner');
      updateCollisionCount();
      updateHighScore();
      resetScore();
    });  
  };
};

setInterval(function() {
  update(randMovEnemies(allEnemies));
}, 1000);


//////////
// Player
//////////
var Player = function(x, y) {
  var player = {};
  player.id = 'player';
  player.x = x;
  player.y = y;

  return player;
};

var players = [ Player(200, 200) ];

var player = svg.selectAll('player').data(players)
  .enter().append('svg:rect')
    .attr('width', 10)
    .attr('height', 10)
    .attr('fill', 'blue')
    .attr('x', function(d) { return d.x; } )
    .attr('y', function(d) { return d.y; } );

var onDrag = function(d) {
  var x = (d3.event.x);
  var y = (d3.event.y);

  d3.select(this).attr('x', d.x = x )
    .attr('y', d.y = y );
};

var dragBehavior = d3.behavior.drag()
    .on('drag', onDrag);

player.call(dragBehavior);