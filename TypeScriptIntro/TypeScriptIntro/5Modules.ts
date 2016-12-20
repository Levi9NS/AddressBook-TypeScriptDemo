// 5 - MODULES & NAMESPACES

//Internal modules
namespace App.DataAccess {

    export class PublicClass {

    }

    class PrivateClass {

    }
}


namespace Ui {

    import PublicType = App.DataAccess.PublicClass;

    var dataService = new PublicType();

    export class ViewModel {
        constructor(public firstName: string) { }
    }
}

