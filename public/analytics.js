(function() {

    window.dataLayer = window.dataLayer || [];

    function gtag() {

        if (window.env.isProduction) {

            window.dataLayer.push(arguments);

        }
        else {

            console.log("gtag", arguments);

        }

    }
    var GA_TRACKING_ID = 'UA-114953479-2';
    gtag('js', new Date());
    gtag('config', GA_TRACKING_ID);
    var lastNoted = document.location.href;
    function notePageView( e ) {
        
        var pageUrl = document.location.href;
        if ( pageUrl === lastNoted ) return;
        lastNoted = pageUrl;
        var pagePath = pageUrl.substr(document.location.origin.length, 999);
        var pageName = (e.detail && e.detail.name) || pagePath;
        gtag('config', GA_TRACKING_ID, {

            'page_path': pagePath,
            'page_url': pageUrl,
            'page_name': pageName

        } );

    }
    document.addEventListener( "after-navigation", notePageView );
    window.addEventListener( "hashchange", notePageView );
    window.addEventListener( "popstate", notePageView );
    
}());
