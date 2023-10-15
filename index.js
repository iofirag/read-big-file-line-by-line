var fs = require('fs')
    , es = require('event-stream');

var lineNr = 0;

var s = fs.createReadStream('test_big_100000_rows.csv')
    .pipe(es.split())
    .pipe(es.mapSync(line => {

        // pause the readstream
        s.pause();

        lineNr++;
        if (lineNr>1) {
            const name = line.split(',')[2];
            console.log(`${lineNr}) ${name}`);
        }
        // process line here and call s.resume() when rdy
        // function below was for logging memory usage
        // logMemoryUsage(lineNr);


        // resume the readstream, possibly from a callback
        s.resume();
    })
    .on('error', function(err){
        console.log('Error while reading file.', err);
    })
    .on('end', function(){
        console.log('Read entire file. rows=' + lineNr)
    })
);