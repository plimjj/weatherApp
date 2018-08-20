$(document).ready(function() {
    $(".short").hide();
    if (navigator.geolocation) {
        var currentPosition = "";
        navigator.geolocation.getCurrentPosition(function(position) {
            currentPosition = position;
            // set lat annd lon
            var latitude = currentPosition.coords.latitude;
            var longitude = currentPosition.coords.longitude;
            // console.log(latitude, longitude);
            var url = "https://api.apixu.com/v1/current.json?key=" + apiKey + "&q=";
            $.getJSON(url + latitude + "," + longitude, function(data) {
                // console.log(data);
                var data = JSON.stringify(data);
                var json = JSON.parse(data);

                var country = json.location.country;
                var city = json.location.name;
                var state = json.location.region;

                var temp = json.current.temp_c;
                var temp_f = json.current.temp_f;
                var last_updated = json.current.last_updated.replace('-',' ');

                var wind = json.current.wind_kph;
                var humidity = json.current.humidity;
                var time = json.location.localtime.split(' ')[1];
                var cloud = json.current.cloud;
                console.log(data);
                $("#weather").html(city + ", " + state + ", " + country);

                if(temp < 18) {
                    $(".grey-jumbo").css({
                        backgroundImage: 'url(https://cdn.pixabay.com/photo/2017/11/07/00/07/fantasy-2925250_1280.jpg)'
                    })
                    $("#temp").html("<h1>It's cold out there today...<hr></h1>");
                } else if(temp > 10 && temp <28 && cloud < 10) {
                    $(".grey-jumbo").css({
                        backgroundImage: "url(https://cdn.pixabay.com/photo/2014/09/26/03/55/fountain-461552_1280.jpg)"
                    })
                    $("#temp").html("<h1>Beatutiful day today!<hr></h1>");

                } else {
                    $(".grey-jumbo").css({
                        backgroundImage: "url(https://cdn.pixabay.com/photo/2017/12/30/08/41/fantasy-3049543_1280.jpg)"
                    })
                    $("#temp").html("<h1>Feelin hot hot hot!<hr></h1>");
                }



                $("#info1").html(time);
                $("#info2").html("Wind " + wind + " kph");
                $("#info3").html(temp + "&#8451");

                var yes = true;
                $("#switch").on("click", function() {
                    if (yes) {
                        $("#info3").html(temp_f + "&#8457");
                        $("#switch").html("Show in Celcius");

                        yes = false;
                    } else{
                        $("#info3").html(temp + "&#8451");
                        $("#switch").html("Show in Farenheight");
                        yes = true;
                    }
                });
                if (cloud <= 30) {
                    $("#info5").html("Clear Sky");
                } else {
                    $("#info5").html("Cloudy Sky");
                }
                $("#info6").html("Humidity " + humidity + " %");
                $(".short").show();
            });
        });
    }
});


var apiKey = "ce06b2ae125640989b163720181808";
