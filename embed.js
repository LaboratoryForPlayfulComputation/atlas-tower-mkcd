(function() {
    if (window.ksRunnerInit) return;

    // This line gets patched up by the cloud
    var pxtConfig = {
    "relprefix": "/atlas-tower-mkcd/",
    "workerjs": "/atlas-tower-mkcd/worker.js",
    "tdworkerjs": "/atlas-tower-mkcd/tdworker.js",
    "monacoworkerjs": "/atlas-tower-mkcd/monacoworker.js",
    "pxtVersion": "2.0.10",
    "pxtRelId": "",
    "pxtCdnUrl": "/atlas-tower-mkcd/",
    "commitCdnUrl": "/atlas-tower-mkcd/",
    "blobCdnUrl": "/atlas-tower-mkcd/",
    "cdnUrl": "/atlas-tower-mkcd/",
    "targetVersion": "0.0.0",
    "targetRelId": "",
    "targetUrl": "",
    "simUrl": "/atlas-tower-mkcd/simulator.html",
    "partsUrl": "/atlas-tower-mkcd/siminstructions.html",
    "runUrl": "/atlas-tower-mkcd/run.html",
    "docsUrl": "/atlas-tower-mkcd/docs.html",
    "isStatic": true
};

    var scripts = [
        "/atlas-tower-mkcd/highlight.js/highlight.pack.js",
        "/atlas-tower-mkcd/bluebird.min.js",
        "/atlas-tower-mkcd/typescript.js",
        "/atlas-tower-mkcd/semantic.js",
        "/atlas-tower-mkcd/marked/marked.min.js",
        "/atlas-tower-mkcd/lzma/lzma_worker-min.js",
        "/atlas-tower-mkcd/blockly/blockly_compressed.js",
        "/atlas-tower-mkcd/blockly/blocks_compressed.js",
        "/atlas-tower-mkcd/blockly/msg/js/en.js",
        "/atlas-tower-mkcd/pxtlib.js",
        "/atlas-tower-mkcd/pxtcompiler.js",
        "/atlas-tower-mkcd/pxtblocks.js",
        "/atlas-tower-mkcd/pxteditor.js",
        "/atlas-tower-mkcd/pxtsim.js",
        "/atlas-tower-mkcd/target.js",
        "/atlas-tower-mkcd/pxtrunner.js"
    ]

    if (typeof jQuery == "undefined")
        scripts.unshift("/atlas-tower-mkcd/jquery.js")

    var pxtCallbacks = []

    window.ksRunnerReady = function(f) {
        if (pxtCallbacks == null) f()
        else pxtCallbacks.push(f)
    }

    window.ksRunnerWhenLoaded = function() {
        pxt.docs.requireHighlightJs = function() { return hljs; }
        pxt.setupWebConfig(pxtConfig || window.pxtWebConfig)
        pxt.runner.initCallbacks = pxtCallbacks
        pxtCallbacks.push(function() {
            pxtCallbacks = null
        })
        pxt.runner.init();
    }

    scripts.forEach(function(src) {
        var script = document.createElement('script');
        script.src = src;
        script.async = false;
        document.head.appendChild(script);
    })

} ())
