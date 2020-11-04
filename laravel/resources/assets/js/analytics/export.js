(function (w, d) {
    'use strict'
    w.ExportCsv = w.ExportCsv || {}
    w.addEventListener('load', init)

    function init() {
        w.ExportCsv.download_csv = download_csv
        w.ExportCsv.export_table_to_csv = export_table_to_csv
        w.ExportCsv.run = run
    }

    function download_csv(csv, filename) {
        var csvFile;
        var downloadLink;

        // CSV FILE
        csvFile = new Blob([csv], {
            type: "text/csv"
        });

        // Download link
        downloadLink = document.createElement("a");

        // File name
        downloadLink.download = filename;

        // We have to create a link to the file
        downloadLink.href = window.URL.createObjectURL(csvFile);

        // Make sure that the link is not displayed
        downloadLink.style.display = "none";

        // Add the link to your DOM
        document.body.appendChild(downloadLink);

        // Lanzamos
        downloadLink.click();
    }

    function export_table_to_csv(html, filename) {
        var csv = [];
        var rows = document.querySelectorAll("table tr");

        for (var i = 0; i < rows.length; i++) {
            var row = [],
                cols = rows[i].querySelectorAll("td, th");

            for (var j = 0; j < cols.length; j++) {
                let val = cols[j].innerText;
                if (val !== "NULL" && isNaN(val)) {
                    val = '"' + val + '"'
                }
                row.push(val);
            }

            csv.push(row.join(","));
        }

        // Download CSV
        download_csv(csv.join("\n"), filename);
    }

    function run() {
        var html = d.querySelector(".grid-panel table").outerHTML;
        export_table_to_csv(html, "table.csv");
    }
})(window, document);