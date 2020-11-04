require('./bootstrap');
require('./components/Reports');

$(function() {

  /*$('#query-builder').on('ruleToMango.filter.queryBuilder', function(e, rule) {
    if (rule.filter.id === 'postcode') {
      e.value = {'mongoarray': {$regex: {'patient.postcode': '%' + e.value + '%'}}} ;
    }
    if (rule.filter.id === 'timeOfCall') {
      //e.value = {'mongoarray': {$regex: {'patient.postcode': '%' + e.value + '%'}}}
    }
  });

  $('button.reset').on('click', function() {
    $('#query-builder').queryBuilder('reset');
  });
  $('button.parse-mango').on('click', function() {
    var result = $('#query-builder').queryBuilder('getMango');

    if (!$.isEmptyObject(result)) {
      alert(JSON.stringify(result, null, 2));
    }
  });*/
});