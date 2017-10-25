// Build a worker from an anonymous function body
var blobURL = URL.createObjectURL(new Blob(['(',

    function () {
        //Long-running work here

        /* xlsx.js (C) 2013-2014 SheetJS -- http://sheetjs.com */
        /* uncomment the next line for encoding support */
        //importScripts('dist/cpexcel.js');
        try {
            importScripts('https://pulipulichen.github.io/HTML5-Spreadsheet-to-Solr-XML/jszip.js');
        } catch (e) {
        }
        try {
            importScripts('https://pulipulichen.github.io/HTML5-Spreadsheet-to-Solr-XML/xlsx.js');
        } catch (e) {
        }
        /* uncomment the next line for ODS support */
        try {
            importScripts('https://pulipulichen.github.io/HTML5-Spreadsheet-to-Solr-XML/ods.js');
        } catch (e) {
        }
        postMessage({t: "ready"});

        function ab2str(data) {
            var o = "", l = 0, w = 10240;
            for (; l < data.byteLength / w; ++l)
                o += String.fromCharCode.apply(null, new Uint16Array(data.slice(l * w, l * w + w)));
            o += String.fromCharCode.apply(null, new Uint16Array(data.slice(l * w)));
            return o;
        }

        function s2ab(s) {
            var b = new ArrayBuffer(s.length * 2), v = new Uint16Array(b);
            for (var i = 0; i !== s.length; ++i)
                v[i] = s.charCodeAt(i);
            return [v, b];
        }

        onmessage = function (oEvent) {
            var v;
            try {
                console.log(oEvent.data);
                v = XLSX.read(ab2str(oEvent.data), {type: 'binary'});
            } catch (e) {
                postMessage({t: "e", d: e.stack});
            }
            var res = {t: "xlsx", d: JSON.stringify(v)};
            var r = s2ab(res.d)[1];
            postMessage(r, [r]);
        };

    }.toString(),

    ')()'], {type: 'application/javascript'}));

xlsxworker2 = new Worker(blobURL);
