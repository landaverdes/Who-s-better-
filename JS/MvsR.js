var drawBar = function(data,target, graphDim, xScale,yScale){
    
    target.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", function(season) {
        return xScale(season.Season);
    })
    .attr("y", function(season) {
        return yScale(season.CL_Goals);
    })
    .attr("width", 100)
    .attr("height", function(season) {
        return graphDim.height - yScale(season.CL_Goals);
    })
    
    
    
}




var initGraph = function(data) {
    
    var screen = { width: 400, height: 400}
    var margins = {left:80,right:80,top:30,bottom:30}
    
    d3.select("svg")
    .attr("width", screen.width)
    .attr("height", screen.height)
    
     var target = d3.select("svg")
    .append("g")
    .attr("id","#graph1")
    .attr("transform",
          "translate("+margins.left+","+
                        margins.top+")");
    
    
var xScale = d3.scaleBand()
.domain([0,18])
.range([0,screen.width])

var yScale = d3.scaleLinear()
.domain([0,50])
.range([screen.width, 0])
    
drawBar(data,target, screen, xScale,yScale);
    
    
    
    
}












var successFNC = function(data) {
    console.log("Data", data);
    initGraph(data);
}
var failFNC = function(error) {
    console.log("Error finding data", error);
}
var DataPromise = d3.csv("MessiRonaldo.csv")
DataPromise.then(successFNC,failFNC);