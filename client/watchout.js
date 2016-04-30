// start slingin' some d3 here.

// d3 selector for the svg-g
var svg = d3.select('body').append('svg')
  .attr('height', 500)
  .attr('width', 500)
.append('g');
  // .attr('height', 500 - 100)
  // .attr('width', 500 - 100);
  // .attr('transform', 'translate(' + 10 + ',' + 10 + ')' );

//makes n enemies with random positions
var makeEnemies = function(n) {
  var arr = [];
  for (var i = 0; i < n; i++) {
    arr.push({
      id: i,
      x: Math.random() * 400,
      y: Math.random() * 400
    });
  }
  return arr;
};

allEnemies = makeEnemies(10);

// d3 selector for the circle enemies 
var brdEnemies = svg.selectAll('enemies').data(allEnemies)
  .enter().append('svg:circle')
    .attr('class', 'enemy')
    .attr('cx', function(d) { return d.x; } )
    .attr('cy', function(d) { return d.y; } )
    .attr('r', 10);

// function that generates random enemy positons
var randMovEnemies = function(dataArray) {
  for (var i = 0; i < dataArray.length; i++) {
    dataArray[i].x = Math.random() * 400;
    dataArray[i].y = Math.random() * 400;
  }
  return dataArray;
};


//d3 update function
var update = function(dataArray) {
  //update
  brdEnemies.data(dataArray)
  .transition().duration(1000)
  .attr('cx', function(d) { return d.x; } )
  .attr('cy', function(d) { return d.y; } );
  //enter

  //exit
};


setInterval(function() {
  update(randMovEnemies(allEnemies));
}, 1000);


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

