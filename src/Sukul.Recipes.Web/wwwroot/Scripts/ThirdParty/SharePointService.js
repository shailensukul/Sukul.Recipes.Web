'use strict';

if (SharePointHelper === undefined) var SharePointHelper;
if (!SharePointHelper) SharePointHelper = {};
if (SharePointHelper.Configuration === undefined) SharePointHelper.Configuration = function () {
    var self = this;
    var hostweburl = decodeURIComponent(getQueryStringParameter("SPHostUrl"));
    var appweburl = decodeURIComponent(getQueryStringParameter("SPAppWebUrl"));
    var callBack;

    self.Init = function (onSuccessCallBack) {
        callBack = onSuccessCallBack;
        SPSODAction(["sp.js", "SP.Runtime.js", "SP.RequestExecutor.js"], initializePage);
    }

    function getQueryStringParameter(paramToRetrieve) {
        var params =
            document.URL.split("?")[1].split("&");
        for (var i = 0; i < params.length; i = i + 1) {
            var singleParam = params[i].split("=");
            if (singleParam[0] == paramToRetrieve)
                return singleParam[1];
        }
    }

    /**
        * Consolidated method for waiting for dependent SharePoint
        *     JavaScript libraries to load
        * sodScripts - array of string keys for SharePoint libraries
        * onLoadAction - callback function once all scripts are loaded
       */
    function SPSODAction(sodScripts, onLoadAction) {
        if (SP.SOD.loadMultiple) {
            for (var x = 0; x < sodScripts.length; x++) {
                //register any unregistered scripts
                if (!_v_dictSod[sodScripts[x]]) {
                    //  if (sodScripts[x] == "SP.RequestExecutor.js") {
                    //     SP.SOD.registerSod(sodScripts[x], hostweburl + '/_layouts/15/' + sodScripts[x]);
                    // } else {
                    SP.SOD.registerSod(sodScripts[x], '/_layouts/15/' + sodScripts[x]);
                    // }
                }
            }
            SP.SOD.loadMultiple(sodScripts, onLoadAction);
        } else
            ExecuteOrDelayUntilScriptLoaded(onLoadAction, sodScripts[0]);
    }

    function initializePage() {
        var scriptbase = hostweburl + "/_layouts/15/";

        var context = SP.ClientContext.get_current();
        var hostcontext = new SP.AppContextSite(context, hostweburl);
        var web = hostcontext.get_web();
        var user = context.get_web().get_currentUser();
        var collListItem;
        // This code runs when the DOM is ready and creates a context object which is needed to use the SharePoint object model
        //$(document).ready(function () {
        getUserName().then(function (data) {
            getListConfiguration().then(function (data) {
                var c = CollectConfiguration();
                callBack(c);
            })
        });
        // });

        function CollectConfiguration() {
            var configuration = {};
            configuration.UserName = user.get_loginName();

            var listItemEnumerator = collListItem.getEnumerator();

            while (listItemEnumerator.moveNext()) {
                var oListItem = listItemEnumerator.get_current();
                configuration[oListItem.get_item('Title')] = oListItem.get_item('Config_x0020_Value');
            }
            return configuration;
        }

        function getListConfiguration() {
            var deferred = $.Deferred();
            var me = this;
            var oList = hostcontext.get_web().get_lists().getByTitle('Config Settings');
            var query = new SP.CamlQuery();
            collListItem = oList.getItems(query);

            context.load(collListItem, 'Include(Id, Title, Config_x0020_Value)'); //Config_x0020_Value
            context.executeQueryAsync(
                Function.createDelegate(this, function () { deferred.resolve(collListItem); }),
                Function.createDelegate(this, function () { deferred.reject(sender, args); })
            );

            return deferred.promise();
        }

        // This function prepares, loads, and then executes a SharePoint query to get the current users information
        function getUserName() {
            var deferred = $.Deferred();

            context.load(user);

            context.executeQueryAsync(
                Function.createDelegate(this, function () { deferred.resolve(user); }),
                Function.createDelegate(this, function () { deferred.reject(sender, args); })
                    );

            return deferred.promise();
        }
    }
}