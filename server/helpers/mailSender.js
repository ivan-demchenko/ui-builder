'use strict';

var d = require('debug')('uib:server:helpers:mailSender'),
    Q = require('q'),
    _ = require('lodash'),
    fs = require('fs'),
    nodemailer = require('nodemailer'),
    path = require('path'),
    mailTransporter = nodemailer.createTransport();

function getTemplateContent(path) {
  return Q.nfcall(fs.readFile, path);
}

function generateEmailTemplate(emailTemplateName, templateData) {
  d('Try to render a template %s', emailTemplateName);
  var templateDir = path.join(__dirname, '../../emails/', emailTemplateName);
  var templater = new EmailTemplate(templateDir);
  templater.render(templateData, function(res) {
    d('rendering result:', JSON.stringify(res));
  });
  return Q.ninvoke(templater, 'render', templateData);
}

function sendAnEmail(recepient, subject, text, html) {
  if (!recepient) {
    throw new Error('No recepient for the email %s', recepient);
  }

  if (!text || !html) {
    throw new Error('No template for email has been provided');
  }

  d('Try to send an email to %s with sunject %s', recepient, subject);

  var emailPayload = {
    from: 'UI Builder <mail@uibuilder.io>',
    to: recepient,
    subject: subject,
    text: text,
    html: html
  };

  return Q.ninvoke(mailTransporter, 'sendMail', emailPayload);
}

module.exports.sendWelcomeEmail = function(newUser) {
  d('Try to send welcome email to %s', newUser.email);
  return generateEmailTemplate('welcome', newUser).then(function(result) {
    console.log(result);
    //return sendAnEmail(newUser.email, 'Welcome on board!', result.text, result.html);
  });
};
