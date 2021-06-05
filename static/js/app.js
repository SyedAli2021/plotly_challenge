//DEFINING THE VARIABLES
var metadata; 
var names; 
var samples;

//LINKING TO THE DATA
d3.json("data/samples.json").then((data)=> {

     samples = data.samples;
     names = data.names;
     metadata = data.metadata;
     
    var drop = document.getElementById("selDataset"); 

    names.forEach(function(item) {
        var o = document.createElement("option");
        var attr = document.createAttribute("value");
        attr.value = item;
        o.setAttributeNode(attr);
        o.text=item;
        drop.appendChild(o);

    });
    optionChanged(940)
});

//LOOPING THOUGH THE DATA TO GRAB IT, CREATING FUNCTION TO CALL LATER
function optionChanged(id) {
    for (var i=0; i<metadata.length; i++) {
        if (metadata[i].id == id) {
            break;
        }
    }
    // //CREATE DEMO CHART
    createTable(metadata[i]);
    //CREATE BAR CHART
    createBarChart(samples[i], names[i]);
    //CREATE BUBBLE CHART
    createBubble(samples[i], names[i]);

    console.log(i);
};

function createTable(sample) {
    console.log(sample);
    d3.json("data/samples.json").then((data)=> {
        metadata = data.metadata;
    
        var demoMeta = metadata.filter(d=> parseInt(d.id)==parseInt(sample.id));
      
        var demoResults = demoMeta[0];
        var newVar = d3.select("#sample-metadata");
        newVar.html("");
        Object.entries(demoResults).forEach(([key, value])=>{
        newVar.append("h6").text(`${key}: ${value}`)
    })
})
}

function createBarChart(data) {

    var trace1 = {
        x: data.sample_values.slice(0,10).reverse(),
        y: data.otu_ids.slice(0,10).map(otu=> `OTU${otu}`).reverse(),
        text: data.otu_labels.slice(0,10).reverse(),
        type: "bar",
        orientation: "h"
    }
    var data = [trace1];

    var layout = {
      title: ""
    };
    Plotly.newPlot("bar", data, layout);
};

function createBubble(data, names) {

    
    var trace1 = {
        x: data.otu_ids,
        y: data.sample_values,
        text: data.otu_labels.map(samp_values =>samp_values),
        mode: 'markers',
        marker: {
            size: data.sample_values,
            color: data.otu_ids,
            colorscale: 'Earth',
        }
    } 
      var data = [trace1];
      
      var layout = {
        title: '',
        margin: {t: 0},
        hovermode: "closest",
        xaxis: {Title: ""},
        margin: {t: 30},
      };
      
      Plotly.newPlot('bubble', data, layout);

}
