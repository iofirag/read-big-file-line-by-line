var fs = require('fs')
    , es = require('event-stream');

var lineNr = 0;

var s = fs.createReadStream('./test_big_100000_rows.csv')
    .pipe(es.split())
    .pipe(es.mapSync(line => {
        s.pause();                              // pause the readstream
        console.log(`${++lineNr}) ${line}`);    // process line
        s.resume();                             // resume the readstream, possibly from a callback
    })
    .on('error', function(err){
        console.log('Error while reading file.', err);
    })
    .on('end', function(){
        console.log('Read entire file. rows=' + lineNr)
    })
);