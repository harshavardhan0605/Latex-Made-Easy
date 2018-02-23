'use strict';

/**
 * @ngdoc function
 * @name latexmadeeasyApp.controller:StartupPageCtrl
 * @description
 * # StartupPageCtrl
 * Controller of the latexmadeeasyApp
 */

let StartupPageController = function($mdDialog, $rootScope, StartupPageFact, FileSaver, Blob) {
  this.fileSaver = FileSaver;
  this.blob = Blob;
  this.$rootScope = $rootScope;
  this.$mdDialog = $mdDialog;
  this.StartupPageFact = StartupPageFact;
  this.frontBlockData = {
    title: {
      title: '',
      author: '',
      college: '',
      degree: '',
      date: new Date(),
    },
    dedication: {
      dedication: ''
    },
    acknowledge: {
      acknowledge:''
    },
    abstract: {
      abstract: ''
    },
  };
  this.pageNumber = 1;

  this.getLatex = (frontBlockData) => {
    let requestObject = _.cloneDeep(frontBlockData);
    requestObject.title.date = frontBlockData.title.date.toDateString().substring(4);
    requestObject.currentUser = this.$rootScope.currentUser;
    this.StartupPageFact.getLatex(requestObject).then((data) => {
      let blob = new this.blob([data.data]);
      let fileName = data.headers()["content-disposition"].split("\"")[1];
      this.fileSaver.saveAs(blob, fileName);
    }).catch((err) => {
      console.log(err.data);
    });
  };
};

angular.module('latexmadeeasyApp').controller('StartupPageCtrl', StartupPageController);
