var initgraph = function(data) {
    
var margin = {top: 30, right: 40, bottom: 50, left: 60},
    width = 800 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;


var svg = d3.select("#graph1")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

    var yScale = d3.scaleLinear()
    .domain([0, 50])
    .range([0, height])
    
    var subgroups = data.columns.slice(1)

var names = [];
    data.forEach(season);
    
    function season(item, index) {
        names.push(item.Season)
    }


 var x = d3.scaleBand()
      .domain(names)
      .range([0, width])
      .padding([0.2])

    
   var groups = d3.map(data, function(d){return(d.CL_Goals)}).keys()
    
 
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickSize(0));
    
var y = d3.scaleLinear()
    .domain([0, 50])
    .range([ height, 0 ]);
  svg.append("g")
    .call(d3.axisLeft(y));

     var xSubgroup = d3.scaleBand()
    .domain(subgroups)
    .range([0, x.bandwidth()])
    .padding([0.05])
     
       var color = d3.scaleOrdinal()
    .domain(subgroups)
    .range(['green','blue',])
       
      svg.append("g")
    .selectAll("g")
    
    // Enter in data = loop group per group
    .data(data)
    .enter()
    .append("g")
      .attr("transform", function(d) { return "translate(" + x(d.Season) + ",0)"; })
    
    
    
    //bars
    .selectAll("rect")
    .data(function(d) { return subgroups.map(function(key) { return {key: key, CL_Goals: d[key]}; }); })
    .enter().append("rect")
      .attr("x", function(d) { return xSubgroup(d.key); })
      .attr("y", function(d) { return y(d.CL_Goals); })
      .attr("width", xSubgroup.bandwidth())
      .attr("height", function(d) {return yScale(parseInt(d.CL_Goals));})
      .attr("fill", function(d) { return color(d.key); });


var labels = d3.select("svg")
.append("g")
.classed("labels", "true");
    
    labels.append("text")
    .text("Champions league goals")
    .classed("title", "true")
    .attr("text-anchor", "middle")
    .attr("x", margin.left+(width/2))
    .attr("y", margin.top-5)
    
    labels.append("text")
    .text("Season year")
    .classed("label", "true")
    .attr("text-anchor", "middle")
    .attr("x", margin.left+width/2)
    .attr("y", height+(margin.bottom+margin.top-5))
    
    labels.append("g")
    .attr("transform", "translate(20,"+(margin.top+(height/2))+")")
    .append("text")
    .text("Goals")
    .classed("label", true)
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(90)")

}


var successFNC = function(data) {
    console.log("Data", data);
    initgraph(data); 
}
var failFNC = function(error) {
    console.log("Error finding data", error);
}
var DataPromise = d3.csv("MessiRonaldo.csv")
DataPromise.then(successFNC,failFNC);