
$.ajax({
  method: "GET",
  url: "http://imdc-ofs-4:8083/api/project/getsites/?layer_id=4",
})
.done(function( response ) {
    console.log("this is the response", response)
    var response_sites = response;
    response.forEach(function(site) {
        $("#site").append(`<option value=${site.properties.id}>${site.properties.shortname}</option>`);
    })


    jQuery("document").ready(function () {
        // The DOM is ready!
        // The rest of the code goes here


        jQuery("#site").on("change", function() {

        
                var selectedValue = jQuery(this).val();
                console.log(selectedValue)
                //document.getElementById("variable").options.length = 0;
                document.getElementById("variable").innerHTML = "";
                response_sites.forEach(function(site) {
                    console.log(site)
                    //debugger
                    
                    //$("#variable").options.length = 0
                    if (site.properties.id==parseInt(selectedValue))  {
                        //console.log(site.properties.id)
                        //console.log(site)
                        site.properties.variables.forEach(function(variable){
                                //console.log(variable)
                                $("#variable").append(`<option value=${variable.id}>${variable.variablename}</option>`);
                        })
                    }
                })
        })


        jQuery("#variable").on("change", function() {

        $.ajax({
            method: "GET",
            //url: "http://imdc-ofs-4:8083/api/timeseries/getdata/?format=json&Site_id=565&SiteVariable_id=1074",

            url: "http://imdc-ofs-4:8083/api/timeseries/getdata/?format=json&Site_id=" + jQuery("#site").val() + "&SiteVariable_id=" + jQuery("#variable").val(),
        })
        .done(function( response ) {
            // console.log("http://imdc-ofs-1/api/timeseries/getdata/?format=json&Site_id=" + jQuery("#site").val() + "&SiteVariable_id=" + jQuery("#variable").val()),
            // The DOM is ready!
            // The rest of the code goes here
            console.log("this is the response", response)
            $('#chart').highcharts({
                title: {
                    text: $("#site option:selected").text(),
                    x: -20 //center
                },
                subtitle: {
                    text: $("#variable option:selected").text(),
                    x: -20
                },
               xAxis: {
                    type: 'datetime'
                },
                yAxis: {
                    title: {
                        text: $("#variable option:selected").text()
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                tooltip: {
                    valueSuffix: '°C'
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },
                series: [{
                    name: $("#site option:selected").text(),
                    data: response[0].data.value
                }]
            });
            })
            
        });
    });
});

jQuery("document").ready(function () {
    // The DOM is ready!
    // The rest of the code goes here

    jQuery("#plot_data").on("click", function() {
        console.log("plot_data")

    })


});

$.ajax({
  method: "GET",
  url: "http://imdc-ofs-1/api/timeseries/getdata/?format=json&Site_id=95&scenario_id=1901",
  //url: "http://imdc-ofs-1/api/timeseries/getdata/?format=json&Site_id=" + jQuery("#site").val() + "&SiteVariable_id=" + jQuery("#variable").val(),
  
})
.done(function( response ) {
    // The DOM is ready!
    // The rest of the code goes here
    //console.log("http://imdc-ofs-1/api/timeseries/getdata/?format=json&Site_id=" + jQuery("#site").val() + "&SiteVariable_id=" + jQuery("#variable").val()),
    $('#chart').highcharts({
        title: {
            text: jQuery("#site").val(),
            x: -20 //center
        },
        subtitle: {
            text: 'Source: WorldClimate.com',
            x: -20
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
            title: {
                text: 'Temperature (°C)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '°C'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: 'Tokyo',
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }, {
            name: 'New York',
            data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
        }, {
            name: 'Berlin',
            data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
        }, {
            name: 'London',
            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
        }]
    });
    
});