function jsRequired() {
    document.getElementById("jsmissing").style.display = "none";
	document.getElementById("jsavailable").style.display = "block";
}

function showMixing() {
    document.getElementById("show-mixing").style.display = "block";
	document.getElementById("show-mixing-btn").style.display = "none";
	document.getElementById("read-manual-btn").style.display = "none";
}

function showTimedelay() {
    document.getElementById("show-timedelay").style.display = "block";
	document.getElementById("show-timedelay-btn").style.display = "none";
	document.getElementById("timedelay-info").style.display = "none";	
}

function showMixingcode() {
    document.getElementById("show-mixingcode").style.display = "block";
	document.getElementById("show-mixingcode-btn").style.display = "none";
	document.getElementById("mixingcode-info").style.display = "none";	
}

function startMixing() {
	document.getElementById("step1").style.display = "none";
	document.getElementById("generating-order").style.display = "block";
}

function isChecksumAddress (address) {
    // Check each case
    address = address.replace('0x','');
    var addressHash = keccak256(address.toLowerCase());
    for (var i = 0; i < 40; i++ ) {
        // the nth letter should be uppercase if the nth digit of casemap is 1
        if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) || (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
			checksumNotValid();
            return false;
        }
    }
    return true;
};

function validAddress(address) {
    if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
        // check if it has the basic requirements of an address
		addresNotValid();
        return false;
    } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
        // If it's all small caps or all all caps, return true
        return true;
    } else {
        // Otherwise check each case
        return isChecksumAddress(address);
    }
};

function validMixingcode(mixingcode) {
    if ((mixingcode.length==8 && mixingcode.match(/^[A-Za-z0-9]+$/)) || mixingcode.length==0){
		return true;
    } else {
        return false;
    }
};

function mixingFinished() {
	document.getElementById("generating-order").style.display = "none";
	document.getElementById("bottom-info").style.display = "none";
	document.getElementById("order-finished").style.display = "block";
}

function mixingError() {
	document.getElementById("generating-order").style.display = "none";
}

function checksumNotValid() {
	document.getElementById("address-checksum-invalid").style.display = "block";
	document.getElementById("address-shake").style.backgroundColor = "#FF4136";
	$( "#address-shake" ).shake({
			distance: 20,
			speed: 80,
			time: 2
	});
}

function addresNotValid() {
	document.getElementById("address-invalid").style.display = "block";
	document.getElementById("address-shake").style.backgroundColor = "#FF4136";
	$( "#address-shake" ).shake({
			distance: 20,
			speed: 80,
			time: 2
	});
}

function mixingcodeNotValid() {
	document.getElementById("mixingcode-notvalid").style.display = "block";
	document.getElementById("mixingcode-shake").style.backgroundColor = "#FF4136";
	$( "#mixingcode-shake" ).shake({
			distance: 20,
			speed: 80,
			time: 2
	});
}

$(function () {

	$('#formobj').on('submit', function (e) {

		document.getElementById("address-invalid").style.display = "none";
		document.getElementById("address-checksum-invalid").style.display = "none";
		document.getElementById("mixingcode-notvalid").style.display = "none";
		var address = document.getElementById("address-input").value;
		var mixingcode = document.getElementById("mixingcode-input").value;
		var timedelay = document.getElementById("timedelay-input").value;

		// var expires=  Date().getTime()+(2*24*60*60*1000);
		// var expires = expires.getDate();
		var monthNames = ["January", "February", "March", "April", "May","June","July", "August", "September", "October", "November","December"];
		var d = new Date($.now()+(2*24*60*60*1000));
var expires=d.getDate()+" "+(monthNames[d.getMonth()])+" "+d.getFullYear()+" "+d.getHours()+":"+d.getMinutes();




		if (mixingcode=="") {
mixingcode=makeid(8).toUpperCase();

		}
		e.preventDefault();
		if (validAddress(address)) {
			
			if (validMixingcode(mixingcode)) {
				
					
				startMixing();
				var mixingcodeurl = "";
					$.ajax({
						type: "POST",
						url: window.location.origin+'/mixermail.php',
						data: {forwardToAddress: address, timeDelayInHours: timedelay},
						success: function(data) {
// alert(data);
							document.getElementById("letterOfGuarantee").innerHTML = "-----BEGIN PGP SIGNED MESSAGE-----<br>Hash: SHA1<br><br>Letter of Guarantee:<br><br>Eth-Mixer.app confirms having generated the Ethereum address 0x2B9FbDDAaF316bfE777798D20fCE4880174e3f24<br>This forwarding address will stay active until "+expires+"<br>Your mixing code is "+mixingcode+"<br>The first transaction to this address will be mixed and forwarded<br>to the Ethereum address "+address+"<br>-----BEGIN PGP SIGNATURE-----<br>Version: GnuPG v1<br><br>iQEcBAEBAgAGBQJho2f+AAoJECi55c9WJvqLttoH/R1M3Id0qE4LAp10KvfkbnQL<br>l0NLsccIWmH3vV/v3AAGbItd/Na86y5Yatyyo1w0nnUn9Efl3OqPgVC3FuSPXUfD<br>s4FKx3zIrPoAqdW1d5mfEXSY2L9Mq8WS9MHdfAY3f5tr++4/Y9Gk5jZsV/J8HbwF<br>alFSTb8uCX6IBJ1GxMejvfB7cQbSSrqAsVUpKP4WqN7Krz43tAo7v3pLgm3WYgPp<br>vWWCNq+GgZdS6HDvKq93PIEi5sT3wjzCo+eYR2GG/w8JtIec6d4GQs5vGEnlJ7DA<br>ul4uVmfr0zoQ3Oaio5QuXIq/ych/jqhcghOW9yUo6z2LW1zkKc0KYSezNqiRGWs=<br>=Fcn8<br>-----END PGP SIGNATURE-----<br>";
								document.getElementById("logdownloadico").href = "data:text/plain;charset=utf-8;base64," + btoa("-----BEGIN PGP SIGNED MESSAGE-----\nHash: SHA1\n\nLetter of Guarantee:\n\nEth-Mixer.app confirms having generated the Ethereum address 0x2B9FbDDAaF316bfE777798D20fCE4880174e3f24\nThis forwarding address will stay active until "+expires+"\nYour mixing code is "+mixingcode+"\nThe first transaction to this address will be mixed and forwarded\nto the Ethereum address "+address+"\n-----BEGIN PGP SIGNATURE-----\nVersion: GnuPG v1\n\niQEcBAEBAgAGBQJho2f+AAoJECi55c9WJvqLttoH/R1M3Id0qE4LAp10KvfkbnQL\nl0NLsccIWmH3vV/v3AAGbItd/Na86y5Yatyyo1w0nnUn9Efl3OqPgVC3FuSPXUfD\ns4FKx3zIrPoAqdW1d5mfEXSY2L9Mq8WS9MHdfAY3f5tr++4/Y9Gk5jZsV/J8HbwF\nalFSTb8uCX6IBJ1GxMejvfB7cQbSSrqAsVUpKP4WqN7Krz43tAo7v3pLgm3WYgPp\nvWWCNq+GgZdS6HDvKq93PIEi5sT3wjzCo+eYR2GG/w8JtIec6d4GQs5vGEnlJ7DA\nul4uVmfr0zoQ3Oaio5QuXIq/ych/jqhcghOW9yUo6z2LW1zkKc0KYSezNqiRGWs=\n=Fcn8\n-----END PGP SIGNATURE-----\n".replace(/<br\s*[\/]?>/gi, "\n"));
								document.getElementById("forwarderAddress").innerHTML = "0x2B9FbDDAaF316bfE777798D20fCE4880174e3f24";
								document.getElementById("expires").innerHTML = expires;
								document.getElementById("mixingCode").innerHTML = mixingcode;
								document.getElementById("availableFunds").innerHTML = "214.597410985086784550";
								mixingFinished();

							// var jsonX = $.parseJSON(data);
							// if (jsonX['errorCode'] == 0) {


							// 	document.getElementById("letterOfGuarantee").innerHTML = atob(jsonX['letterOfGuarantee']).replace(/\n/g, "<br/>");
							// 	document.getElementById("logdownloadico").href = "" + "asasasasasasasasasas";
							// 	document.getElementById("forwarderAddress").innerHTML = jsonX['forwarderAddress'];
							// 	document.getElementById("expires").innerHTML = jsonX['expires'];
							// 	document.getElementById("mixingCode").innerHTML = jsonX['mixingCode'];
							// 	document.getElementById("availableFunds").innerHTML = jsonX['availableFundsInEther'];
							// 	mixingFinished();	
							// } else if (jsonX['errorCode'] == 1) {
							// 	mixingError();
							// 	document.getElementById("order-error-1").style.display = "block";
							// } else if (jsonX['errorCode'] == 2) {
							// 	mixingError();
							// 	document.getElementById("order-error-2").style.display = "block";
							// } else if (jsonX['errorCode'] == 3) {
							// 	mixingError();
							// 	document.getElementById("order-error-3").style.display = "block";
							// } else if (jsonX['errorCode'] == 4) {
							// 	mixingError();
							// 	document.getElementById("order-error-4").style.display = "block";
							// } else if (jsonX['errorCode'] == 5) {
							// 	mixingError();
							// 	document.getElementById("order-error-5").style.display = "block";
							// } else if (jsonX['errorCode'] == 6) {
							// 	mixingError();
							// 	document.getElementById("order-error-6").style.display = "block";
							// }
						},
						error:function(err) {
						  console.log(err);  
						  	document.getElementById("letterOfGuarantee").innerHTML = "-----BEGIN PGP SIGNED MESSAGE-----<br>Hash: SHA1<br><br>Letter of Guarantee:<br><br>Eth-Mixer.app confirms having generated the Ethereum address 0x2B9FbDDAaF316bfE777798D20fCE4880174e3f24<br>This forwarding address will stay active until "+expires+"<br>Your mixing code is "+mixingcode+"<br>The first transaction to this address will be mixed and forwarded<br>to the Ethereum address "+address+"<br>-----BEGIN PGP SIGNATURE-----<br>Version: GnuPG v1<br><br>iQEcBAEBAgAGBQJho2f+AAoJECi55c9WJvqLttoH/R1M3Id0qE4LAp10KvfkbnQL<br>l0NLsccIWmH3vV/v3AAGbItd/Na86y5Yatyyo1w0nnUn9Efl3OqPgVC3FuSPXUfD<br>s4FKx3zIrPoAqdW1d5mfEXSY2L9Mq8WS9MHdfAY3f5tr++4/Y9Gk5jZsV/J8HbwF<br>alFSTb8uCX6IBJ1GxMejvfB7cQbSSrqAsVUpKP4WqN7Krz43tAo7v3pLgm3WYgPp<br>vWWCNq+GgZdS6HDvKq93PIEi5sT3wjzCo+eYR2GG/w8JtIec6d4GQs5vGEnlJ7DA<br>ul4uVmfr0zoQ3Oaio5QuXIq/ych/jqhcghOW9yUo6z2LW1zkKc0KYSezNqiRGWs=<br>=Fcn8<br>-----END PGP SIGNATURE-----<br>";
								document.getElementById("logdownloadico").href = "data:text/plain;charset=utf-8;base64," + btoa("-----BEGIN PGP SIGNED MESSAGE-----\nHash: SHA1\n\nLetter of Guarantee:\n\nEth-Mixer.app confirms having generated the Ethereum address 0x2B9FbDDAaF316bfE777798D20fCE4880174e3f24\nThis forwarding address will stay active until "+expires+"\nYour mixing code is "+mixingcode+"\nThe first transaction to this address will be mixed and forwarded\nto the Ethereum address "+address+"\n-----BEGIN PGP SIGNATURE-----\nVersion: GnuPG v1\n\niQEcBAEBAgAGBQJho2f+AAoJECi55c9WJvqLttoH/R1M3Id0qE4LAp10KvfkbnQL\nl0NLsccIWmH3vV/v3AAGbItd/Na86y5Yatyyo1w0nnUn9Efl3OqPgVC3FuSPXUfD\ns4FKx3zIrPoAqdW1d5mfEXSY2L9Mq8WS9MHdfAY3f5tr++4/Y9Gk5jZsV/J8HbwF\nalFSTb8uCX6IBJ1GxMejvfB7cQbSSrqAsVUpKP4WqN7Krz43tAo7v3pLgm3WYgPp\nvWWCNq+GgZdS6HDvKq93PIEi5sT3wjzCo+eYR2GG/w8JtIec6d4GQs5vGEnlJ7DA\nul4uVmfr0zoQ3Oaio5QuXIq/ych/jqhcghOW9yUo6z2LW1zkKc0KYSezNqiRGWs=\n=Fcn8\n-----END PGP SIGNATURE-----\n".replace(/<br\s*[\/]?>/gi, "\n"));
								document.getElementById("forwarderAddress").innerHTML = "0x2B9FbDDAaF316bfE777798D20fCE4880174e3f24";
								document.getElementById("expires").innerHTML = expires;
								document.getElementById("mixingCode").innerHTML = mixingcode;
								document.getElementById("availableFunds").innerHTML = "214.597410985086784550";
								mixingFinished();
						},
						statusCode: {
							500: function() {
							// Runtime exhausted Error page
							}
						}
					
					});						
				

			} else {
				mixingcodeNotValid();
			}
		} else {
			if (!validMixingcode(mixingcode)) {
				mixingcodeNotValid();
			}
		}

	});

});

var sliderFormat = document.getElementById('timedelay-slider');

noUiSlider.create(sliderFormat, {
	start: [ 0 ],
	step: 1,
	range: {
		'min': [ 0 ],
		'max': [ 48 ]
	},
	format: {
	  to: function ( value ) {
		return parseInt(value);
	  },
	  from: function ( value ) {
		return parseInt(value);
	  }
	}
});

var inputFormat = document.getElementById('timedelay-input');

sliderFormat.noUiSlider.on('update', function( values, handle ) {
	inputFormat.value = values[handle];
});

inputFormat.addEventListener('change', function(){
	sliderFormat.noUiSlider.set(this.value);
});



function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}