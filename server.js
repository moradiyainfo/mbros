const express = require('express');
const http = require('http');
const mysql = require('mysql');
const app = express();

const server = http.createServer(app);
const cors = require('cors');
 

var pool = mysql.createPool({
    connectionLimit: 100,
    host: "localhost",
    user: "mbros",
    password: "Mbros@123",
    database: "mbros",
    debug: true,
    port:3306
});


app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/assets', express.static('assets'))
app.use('/images', express.static('images'))

app.get('/:pcode', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});


app.post('/:pcode', function (req, res) {

    var p_code = req.params.pcode;
    get_info(p_code, function (resp, result) {
        if (resp) {
           
            var result_data = result[0];
            res.json({

                imgsrc: result_data.pcode + ".png",
                product_name: result_data.pname,
                product_name2: result_data.pname2,
                product_desc: result_data.pdes,
                product_rate: result_data.prate


            })
        }




    })


});

var get_info = function (pcode, callback) {

    pool.getConnection(function (err, con) {
        if (err) {
            callback(false, null);

            return;
        }
        var qry = "SELECT `id`, `pcode`, `pname`, `pname2`, `pdesc`, `pbrand`, `prate`, `pactive`, `pdelete` FROM`products` WHERE pcode = \"" + pcode + "\"";
       
        con.query(qry, function (err, rows) {

            if (!err) {
                callback(true, rows);

            }
        });

        con.on('error', function (err) {
            callback(false, null);

            return;
        });
    });

}


server.listen(process.env.PORT, () => {
    console.log('Server running on port' + process.env.PORT);
})


