/*
* jQuery QueryBuilder CouchDB support
*/

// Register plugin
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery', 'query-builder'], factory);
  }
  else {
    factory(root.jQuery);
  }
}(this, function($) {
  "use strict";

  var QueryBuilder = $.fn.queryBuilder;
  var Utils = $.fn.queryBuilder.constructor.utils;

  function parseArrayNotation(str, val, obj) {
    var currentObj = obj,
      keys = str.split("$"),
      i, l = Math.max(1, keys.length - 1),
      key;

    for (i = 0; i < l; ++i) {
      key = keys[i].replace(/^\.+|\.+$/g,'');
      currentObj[key] = currentObj[key] || { "$elemMatch": {} };
      if ( i !== l-1 ) {
        currentObj = currentObj[key];
      } else {
        currentObj = currentObj[key]["$elemMatch"];
      }
    }

    currentObj[keys[i].replace(/^\.+|\.+$/g,'')] = val;
    delete obj[str];
  }

  // DEFAULT CONFIG
  // ===============================
  QueryBuilder.defaults({
    mangoOperators: {
      // @formatter:off
      equal:            function(v) { return v[0]; },
      not_equal:        function(v) { return { '$ne': v[0] }; },
      in:               function(v) { return { '$in': v }; },
      not_in:           function(v) { return { '$nin': v }; },
      less:             function(v) { return { '$lt': v[0] }; },
      less_or_equal:    function(v) { return { '$lte': v[0] }; },
      greater:          function(v) { return { '$gt': v[0] }; },
      greater_or_equal: function(v) { return { '$gte': v[0] }; },
      between:          function(v) { return { '$gte': v[0], '$lte': v[1] }; },
      not_between:      function(v) { return { '$lt': v[0], '$gt': v[1] }; },
      begins_with:      function(v) { return { '$regex': '^' + Utils.escapeRegExp(v[0]) }; },
      not_begins_with:  function(v) { return { '$regex': '^(?!' + Utils.escapeRegExp(v[0]) + ')' }; },
      contains:         function(v) { return { '$regex': Utils.escapeRegExp(v[0]) }; },
      not_contains:     function(v) { return { '$regex': '^((?!' + Utils.escapeRegExp(v[0]) + ').)*$', '$options': 's' }; },
      ends_with:        function(v) { return { '$regex': Utils.escapeRegExp(v[0]) + '$' }; },
      not_ends_with:    function(v) { return { '$regex': '(?<!' + Utils.escapeRegExp(v[0]) + ')$' }; },
      is_empty:         function(v) { return ''; },
      is_not_empty:     function(v) { return { '$ne': '' }; },
      is_null:          function(v) { return null; },
      is_not_null:      function(v) { return { '$ne': null }; }
      // @formatter:on
    },

    mangoRuleOperators: {
      $eq: function(v) {
        return {
          'val': v,
          'op': v === null ? 'is_null' : (v === '' ? 'is_empty' : 'equal')
        };
      },
      $ne: function(v) {
        v = v.$ne;
        return {
          'val': v,
          'op': v === null ? 'is_not_null' : (v === '' ? 'is_not_empty' : 'not_equal')
        };
      },
      $regex: function(v) {
        v = v.$regex;
        if (v.slice(0, 4) == '^(?!' && v.slice(-1) == ')') {
          return { 'val': v.slice(4, -1), 'op': 'not_begins_with' };
        }
        else if (v.slice(0, 5) == '^((?!' && v.slice(-5) == ').)*$') {
          return { 'val': v.slice(5, -5), 'op': 'not_contains' };
        }
        else if (v.slice(0, 4) == '(?<!' && v.slice(-2) == ')$') {
          return { 'val': v.slice(4, -2), 'op': 'not_ends_with' };
        }
        else if (v.slice(-1) == '$') {
          return { 'val': v.slice(0, -1), 'op': 'ends_with' };
        }
        else if (v.slice(0, 1) == '^') {
          return { 'val': v.slice(1), 'op': 'begins_with' };
        }
        else {
          return { 'val': v, 'op': 'contains' };
        }
      },
      between: function(v) {
        return { 'val': [v.$gte, v.$lte], 'op': 'between' };
      },
      not_between: function(v) {
        return { 'val': [v.$lt, v.$gt], 'op': 'not_between' };
      },
      $in: function(v) {
        return { 'val': v.$in, 'op': 'in' };
      },
      $nin: function(v) {
        return { 'val': v.$nin, 'op': 'not_in' };
      },
      $lt: function(v) {
        return { 'val': v.$lt, 'op': 'less' };
      },
      $lte: function(v) {
        return { 'val': v.$lte, 'op': 'less_or_equal' };
      },
      $gt: function(v) {
        return { 'val': v.$gt, 'op': 'greater' };
      },
      $gte: function(v) {
        return { 'val': v.$gte, 'op': 'greater_or_equal' };
      }
    }
  });


  // PUBLIC METHODS
  // ===============================
  QueryBuilder.extend(/** @lends module:plugins.CouchDbSupport.prototype */ {
    /**
     * Returns rules as a CouchDB query
     * @param {object} [data] - current rules by default
     * @returns {object}
     * @fires module:plugins.CouchDbSupport.changer:getCouchDBField
     * @fires module:plugins.CouchDbSupport.changer:ruleToMango
     * @fires module:plugins.CouchDbSupport.changer:groupToMango
     * @throws UndefinedMangoConditionError, UndefinedMangoOperatorError
     */
    getMango: function(data) {
      data = (data === undefined) ? this.getRules() : data;

      if (!data) {
        return null;
      }

      var self = this;

      return (function parse(group) {
        if (!group.condition) {
          group.condition = self.settings.default_condition;
        }
        if (['AND', 'OR'].indexOf(group.condition.toUpperCase()) === -1) {
          Utils.error('UndefinedMangoCondition', 'Unable to build CouchDB query with condition "{0}"', group.condition);
        }

        if (!group.rules) {
          return {};
        }

        var parts = [];

        group.rules.forEach(function(rule) {
          if (rule.rules && rule.rules.length > 0) {
            parts.push(parse(rule));
          }
          else {
            var mdb = self.settings.mangoOperators[rule.operator];
            var ope = self.getOperatorByType(rule.operator);

            if (mdb === undefined) {
              Utils.error('UndefinedMangoOperator', 'Unknown CouchDB operation for operator "{0}"', rule.operator);
            }

            if (ope.nb_inputs !== 0) {
              if (!(rule.value instanceof Array)) {
                rule.value = [rule.value];
              }
            }

            /**
             * Modifies the CouchDB field used by a rule
             * @event changer:getCouchDBField
             * @memberof module:plugins.CouchDbSupport
             * @param {string} field
             * @param {Rule} rule
             * @returns {string}
             */
            var field = self.change('getCouchDBField', rule.field, rule);

            var ruleExpression = {};
            ruleExpression[field] = mdb.call(self, rule.value);

            /**
             * Modifies the CouchDB expression generated for a rul
             * @event changer:ruleToMango
             * @memberof module:plugins.CouchDbSupport
             * @param {object} expression
             * @param {Rule} rule
             * @param {*} value
             * @param {function} valueWrapper - function that takes the value and adds the operator
             * @returns {object}
             */
            if (rule.id.match(/\$/)) {
              for (var key in ruleExpression) {
                if (key.indexOf("$") !== -1)
                {
                  parseArrayNotation(key, ruleExpression[key], ruleExpression);
                }
              }
            }
            parts.push(self.change('ruleToMango', ruleExpression, rule, rule.value, mdb));
          }
        });

        var groupExpression = {};
        groupExpression['$' + group.condition.toLowerCase()] = parts;

        /**
         * Modifies the CouchDB expression generated for a group
         * @event changer:groupToMango
         * @memberof module:plugins.CouchDbSupport
         * @param {object} expression
         * @param {Group} group
         * @returns {object}
         */
        return self.change('groupToMango', groupExpression, group);
      }(data));
    },

    /**
     * Converts a CouchDB query to rules
     * @param {object} query
     * @returns {object}
     * @fires module:plugins.CouchDbSupport.changer:parseMangoNode
     * @fires module:plugins.CouchDbSupport.changer:getCouchDBFieldID
     * @fires module:plugins.CouchDbSupport.changer:mangoToRule
     * @fires module:plugins.CouchDbSupport.changer:mangoToGroup
     * @throws MangoParseError, UndefinedMangoConditionError, UndefinedMangoOperatorError
     */
    getRulesFromMango: function(query) {
      if (query === undefined || query === null) {
        return null;
      }

      var self = this;

      /**
       * Custom parsing of a CouchDB expression, you can return a sub-part of the expression, or a well formed group or rule JSON
       * @event changer:parseMangoNode
       * @memberof module:plugins.CouchDbSupport
       * @param {object} expression
       * @returns {object} expression, rule or group
       */
      query = self.change('parseMangoNode', query);

      // a plugin returned a group
      if ('rules' in query && 'condition' in query) {
        return query;
      }

      // a plugin returned a rule
      if ('id' in query && 'operator' in query && 'value' in query) {
        return {
          condition: this.settings.default_condition,
          rules: [query]
        };
      }

      var key = self.getMangoCondition(query);
      if (!key) {
        Utils.error('MangoParse', 'Invalid CouchDB query format');
      }

      return (function parse(data, topKey) {
        var rules = data[topKey];
        var parts = [];

        rules.forEach(function(data) {
          // allow plugins to manually parse or handle special cases
          data = self.change('parseMangoNode', data);

          // a plugin returned a group
          if ('rules' in data && 'condition' in data) {
            parts.push(data);
            return;
          }

          // a plugin returned a rule
          if ('id' in data && 'operator' in data && 'value' in data) {
            parts.push(data);
            return;
          }

          var key = self.getMangoCondition(data);
          if (key) {
            parts.push(parse(data, key));
          }
          else {
            var field = Object.keys(data)[0];
            var value = data[field];

            var operator = self.getMangoOperator(value);
            if (operator === undefined) {
              Utils.error('MangoParse', 'Invalid CouchDB query format');
            }

            var mdbrl = self.settings.mangoRuleOperators[operator];
            if (mdbrl === undefined) {
              Utils.error('UndefinedMangoOperator', 'JSON Rule operation unknown for operator "{0}"', operator);
            }

            var opVal = mdbrl.call(self, value);

            var id = self.getCouchDBFieldID(field, value);

            /**
             * Modifies the rule generated from the CouchDB expression
             * @event changer:mangoToRule
             * @memberof module:plugins.CouchDbSupport
             * @param {object} rule
             * @param {object} expression
             * @returns {object}
             */
            var rule = self.change('mangoToRule', {
              id: id,
              field: field,
              operator: opVal.op,
              value: opVal.val
            }, data);

            parts.push(rule);
          }
        });

        /**
         * Modifies the group generated from the CouchDB expression
         * @event changer:mangoToGroup
         * @memberof module:plugins.CouchDbSupport
         * @param {object} group
         * @param {object} expression
         * @returns {object}
         */
        return self.change('mangoToGroup', {
          condition: topKey.replace('$', '').toUpperCase(),
          rules: parts
        }, data);
      }(query, key));
    },

    /**
     * Sets rules a from CouchDB query
     * @see module:plugins.CouchDbSupport.getRulesFromMango
     */
    setRulesFromMango: function(query) {
      this.setRules(this.getRulesFromMango(query));
    },

    /**
     * Returns a filter identifier from the CouchDB field.
     * Automatically use the only one filter with a matching field, fires a changer otherwise.
     * @param {string} field
     * @param {*} value
     * @fires module:plugins.CouchDbSupport:changer:getCouchDBFieldID
     * @returns {string}
     * @private
     */
    getCouchDBFieldID: function(field, value) {
      var matchingFilters = this.filters.filter(function(filter) {
        return filter.field === field;
      });

      var id;
      if (matchingFilters.length === 1) {
        id = matchingFilters[0].id;
      }
      else {
        /**
         * Returns a filter identifier from the CouchDB field
         * @event changer:getCouchDBFieldID
         * @memberof module:plugins.CouchDbSupport
         * @param {string} field
         * @param {*} value
         * @returns {string}
         */
        id = this.change('getCouchDBFieldID', field, value);
      }

      return id;
    },

    /**
     * Finds which operator is used in a CouchDB sub-object
     * @param {*} data
     * @returns {string|undefined}
     * @private
     */
    getMangoOperator: function(data) {
      if (data !== null && typeof data === 'object') {
        if (data.$gte !== undefined && data.$lte !== undefined) {
          return 'between';
        }
        if (data.$lt !== undefined && data.$gt !== undefined) {
          return 'not_between';
        }

        var knownKeys = Object.keys(data).filter(function(key) {
          return !!this.settings.mangoRuleOperators[key];
        }.bind(this));

        if (knownKeys.length === 1) {
          return knownKeys[0];
        }
      }
      else {
        return '$eq';
      }
    },


    /**
     * Returns the key corresponding to "$or" or "$and"
     * @param {object} data
     * @returns {string|undefined}
     * @private
     */
    getMangoCondition: function(data) {
      var keys = Object.keys(data);

      for (var i = 0, l = keys.length; i < l; i++) {
        if (keys[i].toLowerCase() === '$or' || keys[i].toLowerCase() === '$and') {
          return keys[i];
        }
      }
    }
  });

}));