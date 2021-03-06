
let activeToken = null;

function getToken() {
    activeToken = null;
    getActiveTokensCall();
}

function selectTocen(listOfTokens) {
    console.log(Object.keys(listOfTokens).length)
    console.log("selectTocen = " + listOfTokens)

    if (listOfTokens === null || listOfTokens.Length === 0) {
        activeToken = "PKCS12";
        consoe.log(activeToken)
    }
    else {
        let arrTokens = ["AKKaztokenStore", "AKKZIDCardStore"];
        for (var i = 0; i < 2; i++) {
            for (var k = 0; k < listOfTokens.Length; k++) {
                if (arrTokens[i] === listOfTokens[k]) {
                    activeToken = listOfTokens[k];
                    consoe.log(activeToken)
                    break;
                }
            }
        }
    }
    console.log("activeToken = " + activeToken)
}

function getActiveTokensCall() {
    console.log('start getActiveTokensCall')
    blockScreen();
    getActiveTokens("getActiveTokensBack");
}

function getActiveTokensBack(result) {
    console.log('getActiveTokensBack ' + result)
    unblockScreen();
    if (result['code'] === "500") {
        alert(result['message']);
    } else if (result['code'] === "200") {
        selectTocen(result['responseObject']);
    }
}

function getKeyInfoCall() {
    blockScreen();
    getToken()
    if (activeToken != null)
    {
        var selectedStorage = activeToken;
        console.log("selectedStorage = " + selectedStorage)
        getKeyInfo(selectedStorage, "getKeyInfoBack");
    }
}

function getKeyInfoBack(result) {
    unblockScreen();
    if (result['code'] === "500") {
        alert(result['message']);
    } else if (result['code'] === "200") {
        var res = result['responseObject'];

        var alias = res['alias'];
        $("#alias").val(alias);

        var keyId = res['keyId'];
        $("#keyId").val(keyId);

        var algorithm = res['algorithm'];
        $("#algorithm").val(algorithm);

        var subjectCn = res['subjectCn'];
        $("#subjectCn").val(subjectCn);

        var subjectDn = res['subjectDn'];
        $("#subjectDn").val(subjectDn);

        var issuerCn = res['issuerCn'];
        $("#issuerCn").val(issuerCn);

        var issuerDn = res['issuerDn'];
        $("#issuerDn").val(issuerDn);

        var serialNumber = res['serialNumber'];
        $("#serialNumber").val(serialNumber);

        var dateString = res['certNotAfter'];
        var date = new Date(Number(dateString));
        $("#notafter").val(date.toLocaleString());

        dateString = res['certNotBefore'];
        date = new Date(Number(dateString));
        $("#notbefore").val(date.toLocaleString());

        var authorityKeyIdentifier = res['authorityKeyIdentifier'];
        $("#authorityKeyIdentifier").val(authorityKeyIdentifier);

        var pem = res['pem'];
        $("#pem").val(pem);
    }
}

function signXmlCall() {
    var xmlToSign = $("#xmlToSign").val();
    var selectedStorage = $('#storageSelect').val();
	blockScreen();
    signXml(selectedStorage, "SIGNATURE", xmlToSign, "signXmlBack");
}

function signXmlBack(result) {
	unblockScreen();
    if (result['code'] === "500") {
        alert(result['message']);
    } else if (result['code'] === "200") {
        var res = result['responseObject'];
        $("#signedXml").val(res);
    }
}

function signXmlsCall() {
    var xmlToSign1 = $("#xmlToSign1").val();
	var xmlToSign2 = $("#xmlToSign2").val();
	var xmlsToSign = new Array(xmlToSign1, xmlToSign2);
	var selectedStorage = $('#storageSelect').val();
	blockScreen();
	signXmls(selectedStorage, "SIGNATURE", xmlsToSign, "signXmlsBack");
}

function signXmlsBack(result) {
	unblockScreen();
    if (result['code'] === "500") {
        alert(result['message']);
    } else if (result['code'] === "200") {
        var res = result['responseObject'];
        $("#signedXml1").val(res[0]);
		$("#signedXml2").val(res[1]);
    }
}

function createCAdESFromFileCall() {
    var selectedStorage = $('#storageSelect').val();
    var flag = $("#flag").is(':checked');
    var filePath = $("#filePath").val();
    if (filePath !== null && filePath !== "") {
		blockScreen();
        createCAdESFromFile(selectedStorage, "SIGNATURE", filePath, flag, "createCAdESFromFileBack");
    } else {
        alert("???? ???????????? ???????? ?????? ??????????????!");
    }
}

function createCAdESFromFileBack(result) {
	unblockScreen();
    if (result['code'] === "500") {
        alert(result['message']);
    } else if (result['code'] === "200") {
        var res = result['responseObject'];
        $("#createdCMS").val(res);
    }
}

function createCAdESFromBase64Call() {
    var selectedStorage = $('#storageSelect').val();
    var flag = $("#flagForBase64").is(':checked');
    var base64ToSign = $("#base64ToSign").val();
    if (base64ToSign !== null && base64ToSign !== "") {
		$.blockUI();
        createCAdESFromBase64(selectedStorage, "SIGNATURE", base64ToSign, flag, "createCAdESFromBase64Back");
    } else {
        alert("?????? ???????????? ?????? ??????????????!");
    }
}

function createCAdESFromBase64Back(result) {
	$.unblockUI();
    if (result['code'] === "500") {
        alert(result['message']);
    } else if (result['code'] === "200") {
        var res = result['responseObject'];
        $("#createdCMSforBase64").val(res);
    }
}

function createCAdESFromBase64HashCall() {
    var selectedStorage = $('#storageSelect').val();
    var base64ToSign = $("#base64HashToSign").val();
    if (base64ToSign !== null && base64ToSign !== "") {
		$.blockUI();
        createCAdESFromBase64Hash(selectedStorage, "SIGNATURE", base64ToSign, "createCAdESFromBase64HashBack");
    } else {
        alert("?????? ???????????? ?????? ??????????????!");
    }
}

function createCAdESFromBase64HashBack(result) {
	$.unblockUI();
    if (result['code'] === "500") {
        alert(result['message']);
    } else if (result['code'] === "200") {
        var res = result['responseObject'];
        $("#createdCMSforBase64Hash").val(res);
    }
}

function applyCAdESTCall() {
    var selectedStorage = $('#storageSelect').val();
    var cmsForTS = $("#CMSForTS").val();
    if (cmsForTS !== null && cmsForTS !== "") {
		$.blockUI();
        applyCAdEST(selectedStorage, "SIGNATURE", cmsForTS, "applyCAdESTBack");
    } else {
        alert("?????? ???????????? ?????? ??????????????!");
    }
}

function applyCAdESTBack(result) {
	$.unblockUI();
    if (result['code'] === "500") {
        alert(result['message']);
    } else if (result['code'] === "200") {
        var res = result['responseObject'];
        $("#createdCMSWithAppliedTS").val(res);
    }
}

function showFileChooserCall() {
    blockScreen();
    showFileChooser("ALL", "", "showFileChooserBack");
}

function showFileChooserBack(result) {
    unblockScreen();
    if (result['code'] === "500") {
        alert(result['message']);
    } else if (result['code'] === "200") {
        var res = result['responseObject'];
        $("#filePath").val(res);
    }
}

function showFileChooserForTSCall() {
    blockScreen();
    showFileChooser("ALL", "", "showFileChooserForTSBack");
}

function showFileChooserForTSBack(result) {
    unblockScreen();
    if (result['code'] === "500") {
        alert(result['message']);
    } else if (result['code'] === "200") {
        var res = result['responseObject'];
        $("#filePathWithTS").val(res);
    }
}

function changeLocaleCall() {
    var selectedLocale = $('#localeSelect').val();
    changeLocale(selectedLocale);
}

function createCMSSignatureFromFileCall() {
    var selectedStorage = $('#storageSelect').val();
    var flag = $("#flagForCMSWithTS").is(':checked');
    var filePath = $("#filePathWithTS").val();
    if (filePath !== null && filePath !== "") {
		blockScreen();
        createCMSSignatureFromFile(selectedStorage, "SIGNATURE", filePath, flag, "createCMSSignatureFromFileBack");
    } else {
        alert("???? ???????????? ???????? ?????? ??????????????!");
    }
}

function createCMSSignatureFromFileBack(result) {
	unblockScreen();
    if (result['code'] === "500") {
        alert(result['message']);
    } else if (result['code'] === "200") {
        var res = result['responseObject'];
        $("#createdCMSWithTS").val(res);
    }
}

function createCMSSignatureFromBase64Call() {
    var selectedStorage = $('#storageSelect').val();
    var flag = $("#flagForBase64WithTS").is(':checked');
    var base64ToSign = $("#base64ToSignWithTS").val();
    if (base64ToSign !== null && base64ToSign !== "") {
		$.blockUI();
        createCMSSignatureFromBase64(selectedStorage, "SIGNATURE", base64ToSign, flag, "createCMSSignatureFromBase64Back");
    } else {
        alert("?????? ???????????? ?????? ??????????????!");
    }
}

function createCMSSignatureFromBase64Back(result) {
	$.unblockUI();
    if (result['code'] === "500") {
        alert(result['message']);
    } else if (result['code'] === "200") {
        var res = result['responseObject'];
        $("#createdCMSforBase64WithTS").val(res);
    }
}