// 5 - MODULES & NAMESPACES
//Internal modules
var App;
(function (App) {
    var DataAccess;
    (function (DataAccess) {
        var PublicClass = (function () {
            function PublicClass() {
            }
            return PublicClass;
        }());
        DataAccess.PublicClass = PublicClass;
        var PrivateClass = (function () {
            function PrivateClass() {
            }
            return PrivateClass;
        }());
    })(DataAccess = App.DataAccess || (App.DataAccess = {}));
})(App || (App = {}));
var Ui;
(function (Ui) {
    var PublicType = App.DataAccess.PublicClass;
    var dataService = new PublicType();
    var ViewModel = (function () {
        function ViewModel(firstName) {
            this.firstName = firstName;
        }
        return ViewModel;
    }());
    Ui.ViewModel = ViewModel;
})(Ui || (Ui = {}));
//# sourceMappingURL=5Modules.js.map