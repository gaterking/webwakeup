var expect = require('chai').expect;
var feeOpenWeb;
var testConfig = {};
beforeAll(() => {
    testConfig.schema = {
        protocal: 'duobaohkg://',
        value: ''
    };
    testConfig.intentData = {
        name: '//duobao',
        package: 'com.henkuaigou.kuaiduobao',
        schema: '',
        fallbackUrl: ''
    };
    testConfig.universalUrl = 'universalUrl';
    testConfig.webviewUrl = 'webviewUrl';
    testConfig.downloadUrl = 'downloadUrl';
    testConfig.appFlag = 'duobaohkg'
});
beforeEach(() => {
    feeOpenWeb = require('../src/feeopen.web');
});
/**
 * @jest-environment jsdom
 */
test('url query config', () => {
    location.search = '?from=sFrom';
    var openWeb = feeOpenWeb.init();
    expect(openWeb.config.auto).to.equal(false);

    location.search = '?from=sFrom&auto=true';
    openWeb = feeOpenWeb.init();
    expect(openWeb.config.auto).to.equal(true);

    location.search = '?from=sFrom&auto=1';
    openWeb = feeOpenWeb.init();
    expect(openWeb.config.auto).to.equal(true);

    location.search = '?from=sFrom&auto=false';
    openWeb = feeOpenWeb.init();
    expect(openWeb.config.auto).to.equal(false);

    location.search = '?from=sFrom&auto=0';
    openWeb = feeOpenWeb.init();
    expect(openWeb.config.auto).to.equal(false);
});

test('auto open above IOS 9 ', done => {
    window.navigator.userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_3_2 like Mac OS X; en-US) AppleWebKit/537.51.1 (KHTML, like Gecko) Mobile/13F69 UCBrowser/10.7.3.808 Mobile';
    location.search = '?auto=1';
    var openWeb = feeOpenWeb.init(testConfig.schema, testConfig.intentData, testConfig.universalUrl, testConfig.webviewUrl, testConfig.downloadUrl, testConfig.appFlag);
    openWeb.start();
    expect(location.href).to.equal('universalUrl');
    done();
});

test('auto open below IOS 9 ', (done) => {
    navigator.userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 7_1_1 like Mac OS X) AppleWebKit/537.51.2 (KHTML, like Gecko) OPiOS/8.0.0.78129 Mobile/11D201 Safari/9537.53';
    location.search = '?auto=1';
    var openWeb = feeOpenWeb.init(testConfig.schema, testConfig.intentData, testConfig.universalUrl, testConfig.webviewUrl, testConfig.downloadUrl, testConfig.appFlag, {
        onFail: function() {
            expect(document.getElementsByTagName('iframe').length).to.equal(0);
            done();
        },
        onSuccess: function() {
            expect(document.getElementsByTagName('iframe').length).to.equal(0);
            done();
        }
    });
    openWeb.start();
    expect(document.getElementsByTagName('iframe')[0].src).to.equal('duobaohkg://webview%3Furl%3DwebviewUrl');
});

test('auto open Androw browser ', (done) => {
    navigator.userAgent = 'Mozilla/5.0 (Linux; U; Android 4.0.4; zh-cn; HTC S720e Build/IMM76D) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30';
    location.search = '?auto=1';
    var openWeb = feeOpenWeb.init(testConfig.schema, testConfig.intentData, testConfig.universalUrl, testConfig.webviewUrl, testConfig.downloadUrl, testConfig.appFlag, {
        onFail: function() {
            expect(document.getElementsByTagName('iframe').length).to.equal(0);
            done();
        },
        onSuccess: function() {
            expect(document.getElementsByTagName('iframe').length).to.equal(0);
            done();
        }
    });
    openWeb.start();
    expect(document.getElementsByTagName('iframe')[0].src).to.equal('duobaohkg://webview%3Furl%3DwebviewUrl');
});

test('auto open chrome browser ', (done) => {
    window.navigator.userAgent = '"Mozilla/5.0 (Linux; Android 4.1.2; Xperia Tipo Build/JZO54K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Mobile Safari/537.36';
    location.search = '?auto=1';
    var openWeb = feeOpenWeb.init(testConfig.schema, testConfig.intentData, testConfig.universalUrl, testConfig.webviewUrl, testConfig.downloadUrl, testConfig.appFlag);
    openWeb.start();
    expect(location.href).to.equal('intent://duobao/#Intent;scheme=;package=com.henkuaigou.kuaiduobao;end');
    done();
});

test('auto open WeChat ', () => {

});