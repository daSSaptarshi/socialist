
const express       = require('express');
const cors          = require('cors');
const bodyParser    = require('body-parser');
const path          = require('path');
const mongoose      = require('mongoose');
const CONFIG        = require('./config');

const appPort          = CONFIG.PORT;

const appOne           = express();

appOne.use(cors());
appOne.use(bodyParser.urlencoded({ extended: false }));
appOne.use(express.json());

appOne.use('/app/profile', require('./routers/appUserRoutes'));
appOne.use('/app/post', require('./routers/appPostRoutes'));
appOne.use('/app/comment', require('./routers/appCommentRoute'));

mongoose.connect(CONFIG.MONGO, 
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Database connected at cloud"))
.catch(err => console.log(err));

appOne.use(express.static('frontend/dist'));
appOne.get("*", (req, res) => 
{
    res.sendFile(path.resolve(__dirname,  "frontend" ,"dist", "index.html"));
});

// Start appOne 
appOne.listen(appPort, () => console.log(`Server is listening on PORT ${appPort}`))
