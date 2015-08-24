'use strict';

/*@ngInject*/
function NotificationSeverityFilter() {
  return function(severity) {
    return 'uib-notification--' + severity;
  };
}

module.exports = NotificationSeverityFilter;
