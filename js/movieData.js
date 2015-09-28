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


                        movieBlock += movie.showtimes[0].theatre.name;
                        movieBlock += movie.showtimes[i].dateTime;

                         + closeBlock;



      $('#dataReturn').append(movieBlock);

     });
    }


   //Loads on ready
   $(document).ready(function() {


     $('#zipSubmit').click(function(){
        event.preventDefault();


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
