function jsRequired() {
    document.getElementById("jsmissing").style.display = "none";
	document.getElementById("jsavailable").style.display = "block";
	document.getElementById("recieve").value=1;
	calc("recieve",1)
}

BigNumber.config({ DECIMAL_PLACES: 18 });
BigNumber.config({ ROUNDING_MODE: 4 }) ;

function calc(source,valNum) {
	
	var bignum = new BigNumber(valNum)
	var recieve = document.getElementById("recieve");
	var send = document.getElementById("send");
	var fees = document.getElementById("fees");
	  if (source=="recieve") {
		send.value=bignum.dividedBy(98).mul(100).plus(0.001).toString(10);
		fees.value=new BigNumber(send.value).minus(bignum).toString(10);
	  }
	  if (source=="send") {
		if (bignum.cmp(0.001) >= 0) {
		recieve.value=bignum.minus(0.001).mul(0.98).toString(10);
		fees.value=bignum.minus(0.001).mul(0.02).plus(0.001).toString(10);
		} else {
			recieve.value="";
			fees.value="";
		}
	  }
	  if (source=="fees") {
		recieve.value="";
		send.value="";
	  }  

}