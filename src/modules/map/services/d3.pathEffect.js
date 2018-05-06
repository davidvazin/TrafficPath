/* eslint-disable */

//import * as d3 from "d3";
//import * as L from "leaflet";
var d3 = require("d3");
var L = require("leaflet");

var pathEffect = {};

pathEffect.execute = function (map) {

    d3.json("/samplePath.json", function (collection) {

        map.on("zoomend", reset)

        var svg = d3.select(map.getPanes().overlayPane).append("svg");
        var g = svg.append("g").attr("class", "leaflet-zoom-hide");

        var featuresdata = collection.features[0].geometry.coordinates;
        
        var transform = d3.geo.transform({
            point: projectPoint
        });

        var d3path = d3.geo.path().projection(transform);

        var toLine = d3.svg.line()
            .interpolate("linear")
            .x(function (d) {
                return applyLatLngToLayer(d).x;
            })
            .y(function (d) {
                return applyLatLngToLayer(d).y;
            });

        var ptFeatures = g.selectAll("circle")
            .data(featuresdata)
            .enter()
            .append("circle")
            .attr("r", 3)
            .attr("class", "waypoints");

        var linePath = g.selectAll(".lineConnect")
            .data([featuresdata])
            .enter()
            .append("path")
            .attr("class", "lineConnect");

        var marker = g.append("circle")
            .attr("r", 30)
            .attr("id", "marker")
            .attr("class", "travelMarker");

        var originANDdestination = [featuresdata[0], featuresdata[19]]

        var begend = g.selectAll(".drinks")
            .data(originANDdestination)
            .enter()
            .append("circle", ".drinks")
            .attr("r", 5)
            .style("fill", "red")
            .style("opacity", "1");

        var text = g.selectAll("text")
            .data(originANDdestination)
            .enter()
            .append("text")
            .text(function (d) {
                //return d.properties.name
                return "";
            })
            .attr("class", "locnames")
            .attr("y", function (d) {
                return -10;
            });

        reset();
        transition();

        function reset() {

            var bounds = d3path.bounds(collection),
                topLeft = bounds[0],
                bottomRight = bounds[1];

            text.attr("transform",
                function (d) {
                    return "translate(" +
                        applyLatLngToLayer(d).x + "," +
                        applyLatLngToLayer(d).y + ")";
                });

            begend.attr("transform",
                function (d) {
                    return "translate(" +
                        applyLatLngToLayer(d).x + "," +
                        applyLatLngToLayer(d).y + ")";
                });

            ptFeatures.attr("transform",
                function (d) {
                    return "translate(" +
                        applyLatLngToLayer(d).x + "," +
                        applyLatLngToLayer(d).y + ")";
                });

            marker.attr("transform",
                function () {
                    var y = featuresdata[0][1];
                    var x = featuresdata[0][0];
                    return "translate(" +
                        map.latLngToLayerPoint(new L.LatLng(y, x)).x + "," +
                        map.latLngToLayerPoint(new L.LatLng(y, x)).y + ")";
                });


            // Setting the size and location of the overall SVG container
            svg.attr("width", bottomRight[0] - topLeft[0] + 120)
                .attr("height", bottomRight[1] - topLeft[1] + 120)
                .style("left", topLeft[0] - 50 + "px")
                .style("top", topLeft[1] - 50 + "px");


            linePath.attr("d", toLine)
            g.attr("transform", "translate(" + (-topLeft[0] + 50) + "," + (-topLeft[1] + 50) + ")");

        }

        function transition() {
            linePath.transition()
                .duration(13000)
                .attrTween("stroke-dasharray", tweenDash)
                .each("end", function () {
                    //d3.select(this).call(transition);// infinite loop

                    svg.remove();
                });
        }

        function tweenDash() {
            return function (t) {
                //total length of path (single value)
                var l = linePath.node().getTotalLength();
                interpolate = d3.interpolateString("0," + l, l + "," + l);
                //t is fraction of time 0-1 since transition began
                var marker = d3.select("#marker");

                var p = linePath.node().getPointAtLength(t * l);

                //Move the marker to that point
                marker.attr("transform", "translate(" + p.x + "," + p.y + ")"); //move marker
                var newCenter = map.layerPointToLatLng(new L.Point(p.x, p.y));
                map.panTo(newCenter, 14);

                return interpolate(t);
            }
        }

        function projectPoint(x, y) {
            var point = map.latLngToLayerPoint(new L.LatLng(y, x));
            this.stream.point(point.x, point.y);
        }
    });

    function applyLatLngToLayer(d) {
        var y = d[1];
        var x = d[0];
        return map.latLngToLayerPoint(new L.LatLng(y, x));
    }
};

module.exports = pathEffect;

