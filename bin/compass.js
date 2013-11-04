var compass = require('compass'),
    cwd     = __dirname + '/../';

compass.compile({
    cwd: cwd
}, function(err, stdout, stderr) {
    if (err) {
        console.log(err);
    }

    console.log('Finished Compiling SASS');
});
