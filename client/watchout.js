// start slingin' some d3 here.


var svg = d3.select('body').append('svg')
  .attr('height', 500)
  .attr('width', 500)
.append('g')
  .attr('height', 500 - 100)
  .attr('width', 500 - 100)
  .attr('transform', 'translate(' + 10 + ',' + 10 + ')' );

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

var brdEnemies = svg.selectAll('enemies').data(allEnemies)
  .enter().append('svg:circle')
    .attr('class', 'enemy')
    .attr('cx', function(d) { return d.x; } )
    .attr('cy', function(d) { return d.y; } )
    .attr('r', 10);

var randMovEnemies = function(dataArray) {
  for (var i = 0; i < dataArray.length; i++) {
    dataArray[i].x = Math.random() * 400;
    dataArray[i].y = Math.random() * 400;
  }
  return dataArray;
};

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
}, 2000);