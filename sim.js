var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../libs/core/enums.d.ts"/>
var pxsim;
(function (pxsim) {
    var loops;
    (function (loops) {
        /**
         * Repeats the code forever in the background. On each iteration, allows other code to run.
         * @param body the code to repeat
         */
        //% help=functions/forever weight=55 blockGap=8
        //% blockId=device_forever block="forever" 
        function forever(body) {
            pxsim.thread.forever(body);
        }
        loops.forever = forever;
        /**
         * Pause for the specified time in milliseconds
         * @param ms how long to pause for, eg: 100, 200, 500, 1000, 2000
         */
        //% help=functions/pause weight=54
        //% block="pause (ms) %pause" blockId=device_pause
        function pauseAsync(ms) {
            return Promise.delay(ms);
        }
        loops.pauseAsync = pauseAsync;
    })(loops = pxsim.loops || (pxsim.loops = {}));
})(pxsim || (pxsim = {}));
function logMsg(m) { console.log(m); }
var pxsim;
(function (pxsim) {
    var console;
    (function (console) {
        /**
         * Print out message
         */
        //% 
        function log(msg) {
            logMsg("CONSOLE: " + msg);
            // why doesn't that work?
            pxsim.board().writeSerial(msg + "\n");
        }
        console.log = log;
    })(console = pxsim.console || (pxsim.console = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var lights;
    (function (lights) {
        /**
         * Send key frame
         * @param red Red value
         * @param green Green value
         * @param blue Blue value
         */
        //% blockId=send_keyframe block="send keyframe red %r| green %g| blue %b"
        //% blockNamespace=lights inBasicCategory=true promise
        //% weight=100
        function sendKeyFrameAsync(r, g, b) {
            var url = "https://atlas-tower.herokuapp.com/send?framepair0=k0" + r.toString() + "g" + g.toString() + "b" + b.toString() +
                "m1t01000F&framepair1=&framepair2=&framepair3=&framepair4=";
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                }
            };
            xmlHttp.open("GET", url, true); // true for asynchronous 
            xmlHttp.send(null);
            return new Promise(function (resolve, reject) { });
        }
        lights.sendKeyFrameAsync = sendKeyFrameAsync;
    })(lights = pxsim.lights || (pxsim.lights = {}));
})(pxsim || (pxsim = {}));
var pxsim;
(function (pxsim) {
    var messaging;
    (function (messaging) {
        var peer = null;
        var connections = {};
        var script = document.createElement('script');
        script.onload = function () {
            initializePeer();
        };
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/peerjs/0.3.14/peer.js";
        document.head.appendChild(script);
        function updateUserId(id) {
            var userId = parent.document.getElementById("userid");
            userId.value = id.toString();
        }
        function initDataConnectionCallbacks(conn) {
            connections[conn.peer] = conn;
            conn.on('data', function (data) {
                pxsim.board().bus.queue(data["key"], 0x1);
            });
            conn.on('close', function () { connections[conn.peer] = undefined; });
            conn.on('error', function () { connections[conn.peer] = undefined; });
        }
        function initializePeer() {
            /* Create instance of PeerJS */
            peer = new Peer({
                host: 'liminal-jam.herokuapp.com',
                secure: true,
                port: 443,
                key: 'peerjs',
                debug: 3 });
            /* Received user ID from server */
            if (peer)
                peer.on('open', function (id) { updateUserId(id); });
            else
                initializePeer();
            if (peer)
                peer.on('close', function () { });
            else
                initializePeer();
            if (peer)
                peer.on('disconnected', function () { });
            else
                initializePeer();
            if (peer)
                peer.on('error', function (err) { });
            else
                initializePeer();
            /* Successfully created data connection */
            if (peer)
                peer.on('connection', function (conn) { initDataConnectionCallbacks(conn); });
            else
                initializePeer();
        }
        /**
         * Peer
         * @param id The value of the marker
         */
        //% blockId=peer_block block="send key %key| value %value| to %id"
        //% blockNamespace=messaging inBasicCategory=true
        //% weight=100
        function send(key, value, id) {
            if (peer) {
                var conn_1 = connections[id];
                if (!conn_1 || !conn_1.open) {
                    conn_1 = peer.connect(id);
                    conn_1.on('open', function () {
                        initDataConnectionCallbacks(conn_1);
                        conn_1.send({ "key": key, "value": value });
                    });
                }
                conn_1.send({ "key": key, "value": value });
            }
            else {
                initializePeer();
                send(key, value, id);
            }
        }
        messaging.send = send;
        /**
         * Allows user to define callbacks for receive event
         * @param key
         */
        //% blockId=peer_receive block="when I receive key %key|do" blockGap=8
        //% blockNamespace=messaging inBasicCategory=true
        //% weight=99    
        function receive(key, handler) {
            pxsim.board().bus.listen(key, 0x1, handler);
        }
        messaging.receive = receive;
    })(messaging = pxsim.messaging || (pxsim.messaging = {}));
})(pxsim || (pxsim = {}));
/// <reference path="../node_modules/pxt-core/typings/globals/bluebird/index.d.ts"/>
/// <reference path="../node_modules/pxt-core/built/pxtsim.d.ts"/>
/// <reference path="../typings/globals/peerjs/index.d.ts" />
/// <reference path="sound.d.ts" />
var pxsim;
(function (pxsim) {
    /**
     * This function gets called each time the program restarts
     */
    pxsim.initCurrentRuntime = function () {
        pxsim.runtime.board = new Board();
    };
    /**
     * Gets the current 'board', eg. program state.
     */
    function board() {
        return pxsim.runtime.board;
    }
    pxsim.board = board;
    /**
     * Represents the entire state of the executing program.
     * Do not store state anywhere else!
     */
    var Board = (function (_super) {
        __extends(Board, _super);
        function Board() {
            _super.call(this);
            this.canvas = document.getElementById("visualizer-canvas");
            this.canvasContext = this.canvas.getContext("2d");
            this.bus = new pxsim.EventBus(pxsim.runtime);
        }
        Board.prototype.initAsync = function (msg) {
            // reset sound stuff eventually       
            return Promise.resolve();
        };
        return Board;
    }(pxsim.BaseBoard));
    pxsim.Board = Board;
})(pxsim || (pxsim = {}));
/// <reference path="sound.d.ts" />
