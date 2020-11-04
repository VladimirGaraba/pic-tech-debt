var myListRequestHandler = function (params, onResult) {
    var processed = true;
    if (params.listName == "RegionList") {
        var query = EQ.client.getQuery();
        var country = EQ.core.getOneValueForAttr(query, "Customer.Country");
        if (country == "Canada") {
            onResult([{
                    id: "BC",
                    text: "British Columbia"
                },
                {
                    id: "Quebec",
                    text: "Quebec"
                }
            ]);

        } else {
            onResult([{
                    id: "CA",
                    text: "California"
                },
                {
                    id: "CO",
                    text: "Colorado"
                },
                {
                    id: "OR",
                    text: "Oregon"
                },
                {
                    id: "WA",
                    text: "Washington"
                }
            ]);
        }
    } else {
        processed = false;
    }

    return processed;

};

window.easyQuerySettings = {
    loadModelUrl: "api/v1/easyquery/model",
    buildQueryUrl: "EasyQuery.php?action=buildQuery",
    syncQueryUrl: "api/v1/easyquery/sync",
    executeQueryUrl: "api/v1/easyquery/execute",
    loadQueryUrl: "api/v1/easyquery/load",
    saveQueryUrl: "api/v1/easyquery/save",
    listRequestUrl: "EasyQuery.php?action=listRequest",
    modelId: "NWind",
    listRequestHandler: myListRequestHandler,
    entitiesPanel: {
        showCheckboxes: true
    },
    columnsPanel: {
        allowAggrColumns: true,
        attrElementFormat: "{entity} {attr}",
        showColumnCaptions: true,
        adjustEntitiesMenuHeight: false
    },
    queryPanel: {
        alwaysShowButtonsInPredicates: false,
        adjustEntitiesMenuHeight: false
    }
};

window.easyQueryViewSettings = {
    showChart: false,
    useEasyChart: false
};

// Load the Visualization API and the piechart package.
google.charts.load('current', {
    'packages': ['corechart']
});


// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(GoogleVisualizationLoaded);

function GoogleVisualizationLoaded() {
    //alert("Visualization loaded!!!");
}


function getPrefix() {
    var res = window.location.pathname;
    if (res.charAt(res.length - 1) !== '/')
        res = res + '/';
    return res;
}



$(document).ready(function () {
    $(".logout").on("click", function () {
        $.ajax({
                method: "POST",
                url: "api/v1/auth/logout"
            })
            .done(function (res) {
                if (res.message === 'Successfully logged out') {
                    localStorage.clear()
                    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;'
                    window.location.href = '/'
                }
            });
    })
});
