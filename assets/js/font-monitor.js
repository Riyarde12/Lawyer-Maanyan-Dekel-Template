/**
 * Font Loading Monitor
 * This script monitors for font loading errors and reports them to the console
 * to help identify any remaining font issues.
 */

(function () {
    // Report font loading errors
    document.fonts.ready.then(function () {
        console.log('✓ Fonts loaded successfully');
    }).catch(function (error) {
        console.error('✕ Font loading error:', error);
    });

    // Log any 404 errors that might be font-related
    window.addEventListener('error', function (e) {
        const target = e.target || e.srcElement;
        const isLinkElement = target && target.tagName === 'LINK';
        const isFontResource = target && (
            target.href && (
                target.href.indexOf('.woff') !== -1 ||
                target.href.indexOf('.ttf') !== -1 ||
                target.href.indexOf('.eot') !== -1 ||
                target.href.indexOf('.otf') !== -1 ||
                target.href.indexOf('fonts.googleapis.com') !== -1
            )
        );

        if (isLinkElement && isFontResource) {
            console.error('✕ Font resource failed to load:', target.href);
        }
    }, true);

    // Check if FontAwesome is loaded correctly
    setTimeout(function () {
        const testElement = document.createElement('i');
        testElement.className = 'fas fa-check';
        testElement.style.visibility = 'hidden';
        document.body.appendChild(testElement);

        const styles = window.getComputedStyle(testElement);
        const isFontAwesomeLoaded = styles &&
            styles.fontFamily &&
            (styles.fontFamily.indexOf('Font Awesome') !== -1 ||
                styles.fontFamily.indexOf('FontAwesome') !== -1);

        if (isFontAwesomeLoaded) {
            console.log('✓ Font Awesome loaded successfully');
        } else {
            console.error('✕ Font Awesome not loading properly');
        }

        document.body.removeChild(testElement);
    }, 1000);
})();
