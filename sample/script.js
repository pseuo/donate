document.addEventListener('DOMContentLoaded', function () {
    var drinkBox = document.getElementById('drinks-box-s');
    var donateIcons = document.querySelectorAll('.icon-donate');
    var donateButtons = document.querySelectorAll('.donate-button');
    var donateButtonBox = document.getElementById('drinks-button-box');
    var donateButtonBg = document.getElementById('drinks-button-bg');
    var qrCodeBox = document.getElementById('drinks-qrcodes');
    var qrCode = document.getElementById('drinks-qrcode');

    var animationDuration = 300;
    var qrCodes = {
        alipay_donate: 'images/alipay-qr.png',
        alipay_donate_link: 'https://qr.alipay.com/3272611934645308',
        wechat_donate: 'images/wechat-qr.png'
    };
    var isMobile = isMobileDevice();

    if (isMobile && donateButtonBox) {
        donateButtonBox.classList.add('Mobile');
    }

    if (drinkBox) {
        setTimeout(function () {
            drinkBox.classList.remove('page-open-animation');
        }, 700);
    }

    function isActivationKey(event) {
        return event.key === 'Enter' || event.key === ' ';
    }

    function isMobileDevice() {
        var hasTouchPointer = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
        var hasSmallViewport = window.matchMedia && window.matchMedia('(max-width: 768px)').matches;
        var hasMobileUA = /Android|webOS|iPhone|iPad|BlackBerry/i.test(navigator.userAgent);

        return hasMobileUA || (hasTouchPointer && hasSmallViewport);
    }

    function showDonateButtons() {
        if (!drinkBox || !donateButtonBox) return;

        drinkBox.classList.remove('donate-animation-2', 'donate-animation-3');
        drinkBox.classList.add('donate-animation-1');
        donateButtonBox.classList.add('showBox');

        setTimeout(function () {
            donateButtonBox.classList.remove('showBox');
        }, animationDuration);
    }

    function hideDonateButtons() {
        if (!drinkBox) return;

        drinkBox.classList.remove('donate-animation-1', 'donate-animation-3');
        drinkBox.classList.add('donate-animation-2');

        setTimeout(function () {
            drinkBox.classList.remove('donate-animation-2');
        }, animationDuration);
    }

    function showQRCode(buttonId) {
        if (!drinkBox || !qrCodeBox) return;

        if (qrCode && qrCodes[buttonId]) {
            qrCode.style.backgroundImage = 'url(' + qrCodes[buttonId] + ')';
        }

        drinkBox.classList.remove('donate-animation-2', 'donate-animation-1');
        drinkBox.classList.add('donate-animation-3');
        qrCodeBox.classList.add('showBox');

        setTimeout(function () {
            qrCodeBox.classList.remove('showBox');
        }, animationDuration);
    }

    function hideQRCode() {
        if (!drinkBox) return;

        drinkBox.classList.remove('donate-animation-3', 'donate-animation-2');
        drinkBox.classList.add('donate-animation-4');

        setTimeout(function () {
            drinkBox.classList.remove('donate-animation-4');
            drinkBox.classList.add('donate-animation-1');
        }, animationDuration);
    }

    function handleDonate(button) {
        var buttonId = button.id;
        if (!buttonId) return;

        if (isMobile && buttonId === 'alipay_donate') {
            window.open(qrCodes.alipay_donate_link, '_blank', 'noopener');
            return;
        }

        showQRCode(buttonId);
    }

    function onKeyboardActivate(event, callback) {
        if (!isActivationKey(event)) return;

        event.preventDefault();
        callback();
    }

    donateIcons.forEach(function (icon) {
        icon.addEventListener('click', showDonateButtons);
        icon.addEventListener('keydown', function (event) {
            onKeyboardActivate(event, showDonateButtons);
        });
    });

    if (donateButtonBg) {
        donateButtonBg.addEventListener('click', hideDonateButtons);
    }

    donateButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            handleDonate(button);
        });

        button.addEventListener('keydown', function (event) {
            onKeyboardActivate(event, function () {
                handleDonate(button);
            });
        });
    });

    if (qrCode) {
        qrCode.addEventListener('click', hideQRCode);
        qrCode.addEventListener('keydown', function (event) {
            if (!isActivationKey(event) && event.key !== 'Escape') return;

            event.preventDefault();
            hideQRCode();
        });
    }
});
