const webpack         = require("webpack");
const {resolve}       = require("path");
const {CheckerPlugin} = require("awesome-typescript-loader")
const StyleLintPlugin = require("stylelint-webpack-plugin");
const fs              = require("fs");
const bodyParser      = require("body-parser");

module.exports = {
    resolve: {
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".jsx"],
    },
    entry:   [
        "react-hot-loader/patch", // activate HMR for React
        "webpack-dev-server/client?http://localhost:8080",// bundle the client for webpack-dev-server and connect to the provided endpoint
        "webpack/hot/only-dev-server", // bundle the client for hot reloading, only- means to only hot reload for successful updates
        "./index.tsx" // the entry point of our app
    ],
    output:  {
        filename:   "bundle.js", // the output bundle
        path:       resolve(__dirname, "public"),
        publicPath: "/" // necessary for HMR to know where to load the hot update chunks
    },

    context: resolve(__dirname, "src"),
    devtool: "source-map",
    
    devServer: {
        hot:         true, // enable HMR on the server
        contentBase: resolve(__dirname, "public"), // match the output path
        publicPath:  "/", // match the output `publicPath`,
        historyApiFallback: true,
        setup: function(app){
            /*
            app.get('/', function(req, res){
                fs.readFile(resolve(__dirname,"public","index_frontier.html"),"utf8", function(err, file){
                    if (err) {
                        res.status(500).send("Errore");
                    } else {
                        res.send(file);
                    }
                });
            })*/

            var user = {
                displayName: 'Paolo B.',
                description: 'snt....',
                creationDate: new Date(),
                userId: 1,
            };

            app.use(bodyParser.json());

            app.post('/api/user/login', function(req, res) {
                
                const { email, password, agent } = req.body;
                
                if ( email === "test@test.it" && password === "test" ) {
                    res.status(200).json({
                        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZ2VudCI6IndlYiIsInVzZXJfaWQiOiI1OGJmMzg0YzU4MzQyYTVmNzdjZTg3OWMiLCJ0aW1lc3RhbXAiOiIyMDE3LTAzLTA3VDIyOjUxOjIzLjYxOFoiLCJpYXQiOjE0ODg5MjcwODMsImV4cCI6MTQ4OTEwNzA4M30.t83rm8KOVRJUlP3TEHWDCWYRaEUuXwQYyDTg1v5CAnE",
                        user: user,
                    });
                } else {
                    res.status(401).send("Unauthorized");
                }
            });

            app.get('/api/auth/profile', function(req, res) {
                res.status(200).json(user);
            });
        }
    },

    module: {
        rules: [
            {
                test:    /\.js$/,
                use:     ["babel-loader", "source-map-loader"],
                exclude: /node_modules/
            },
            {
                test: /\.tsx?$/,
                use:  "awesome-typescript-loader"
            },
            {
                test: /\.css$/,
                use:  ["style-loader", "css-loader?modules", "postcss-loader",],
            },
            {
                test:    /\.scss$/,
                loaders: ["style-loader", "css-loader?modules", "postcss-loader", "sass-loader"]
            },
            {
                test:    /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
                    {
                        loader: 'image-webpack-loader',
                        query: {
                            bypassOnDebug: false,
                            gifsicle: {
                                interlaced: false
                            },
                            optipng: {
                                optimizationLevel: 7
                            }
                        }
                    }
                ]
            }
        ],
    },

    plugins:     [
        new CheckerPlugin(),
        new StyleLintPlugin(),
        new webpack.HotModuleReplacementPlugin(), // enable HMR globally
        new webpack.NamedModulesPlugin(), // prints more readable module names in the browser console on HMR updates

    ],
    externals:   {
        //"react":     "React",
        //"react-dom": "ReactDOM"
    },
    performance: {
        hints: false
    }
};
