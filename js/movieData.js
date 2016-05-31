// construct the url with parameter values

    var apikey = "xdtvzz798zd9jca2sanfjd8d";
    var baseUrl = "https://data.tmsapi.com/v1.1";
    var showtimesUrl = baseUrl + '/movies/showings';
    var zipCode;
      $('#userZip').keyup(function(){
       zipCode = $('#userZip').val();
      });
    var d = new Date();
    var today = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate();

    // callback to handle the results
   function dataHandler(data) {

     $('#dataReturn').append('<p>Found ' + data.length + ' movies showing within 5 miles of ' + zipCode+':</p>');

     $.each(data, function(index, movie) {

      //  These variables create the HTML formatting to make the returned data look nice
      var openBlock = '<div class="card blue-grey darken-1"> \
                        <div class="card-content white-text"> \
                          <span class="card-title white-text">';
      var closeBlock = '    </div> \
                          </div> \
                        </div>' ;

      var movieBlock =   openBlock
                         + movie.title + '</span>'
                         + '<p>' + movie.shortDescription + '</p>'
                         + '</div>'
                         + '<div class="card-content white-text"><ul>'

                      // A loop to get all theatre's names  at which a movie is playing
                      for (var i = 0; i < movie.showtimes.length; i++) {
                        var theatres;

                        // Get the time playing
                        var time = movie.showtimes[i].dateTime;
                        // Convert to readable hour time
                        var hourTime = time.slice(time.indexOf("T") +1);

                        // Separate the first two and last two characters of the time string
                        var firstTwo = parseInt(time.substr(0, 2));
                        var lastTwo = time.substr(2, 4);

                        if (firstTwo > 12){
                          console.log(firstTwo);
                        };
                        // Concatinate results
                        movieBlock += '<ul><li>';

                        // Check if the theatres name is the same as previous iteration

                          while (movie.showtimes[i].theatre.name !== theatres){
                            theatres = movie.showtimes[i].theatre.name;
                            movieBlock += '<p>' + theatres + '</p>';
                          };

                        movieBlock += '</li>'
                        + '<li>'
                        + " " + hourTime
                        + '</li>';

                      };

                        // To reference the theatre: movie.showtimes[0].theatre.name;


                         + '</ul></div>';



      $('#dataReturn').append(movieBlock);

     });
    }


   //Loads on ready
   $(document).ready(function() {


     $('#zipSubmit').click(function(){
        event.preventDefault();
        var removeNode = document.getElementById('dataReturn');
        while (removeNode.firstChild) {
          removeNode.removeChild(removeNode.firstChild);  
        };


     // send off the query
     $.ajax({
      url: showtimesUrl,
          data: {
              startDate: today,
              zip: zipCode,
              jsonp: "dataHandler",
              api_key: apikey
             },
      dataType: "jsonp",
     });




   });
  });



   // https://data.tmsapi.com/v1.1/movies/showings
