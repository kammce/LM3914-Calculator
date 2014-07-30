var iLED = 20; // 20 mA
var vHigh = 5; // Voltage High
var vLow = 1.170; // Voltage Low
var animSpeed = 2000; // 2000 mSec or 2 sec
var vDiv = 10000; // 10k Ohms
var cap = 47; // 47uF
var intResReal = 10800; // 10k8 Ohms
var intResTyp = 12000; // 12k Ohms
var vDivFlag = true;
var Vcc = 5;

function refout(R1, R2) {
	return (1.25*(1+(R2/R1)));
}
function getResistorValues(current, vH, vL, intRes, vDiv, vPow) {
	if(vPow-vH < 1.25) {
		return {
			ResI: NaN,
			ResLow: NaN,
			ResHigh: NaN,
		};
	}
	if(vDiv == true) {
		vH /= 2; vL /= 2;
	}
	intRes *= 1000;
	// Datasheet Equaton for Current
	// iled = 12.5/R1 -> R1 = 12.5/iLED
	current /= 1000; // Now it is in Amps
	var ResI = 12.5/current;
	// Datasheet Equation for Regulator
	// V = (1.25*(1+(ResHigh/ResI))) -> ResHigh = (ResI/5)*(4V-5)
	var ResHigh = (ResI/5)*((4*vH)-5);
	// Voltage Divider
	// ResLow = intRes*(1/((vH/vL)-1))
	var ResLow = intRes*(1/((vH/vL)-1));
	return {
		ResI: Math.round(ResI),
		ResLow: Math.round(ResLow),
		ResHigh: Math.round(ResHigh),
	};
}
function getAnimCapValue(current, vH, vL, intRes) {
	// Datasheet Equaton for Current
	// iled = 12.5/R1 -> R1 = 12.5/iLED
	var cap = 0;
	return cap;
}

$("#submit").on("click", function() {
	var circuit = {
		vcc:$('input[name="vcc"]').val(),
		vhi:$('input[name="vHigh"]').val(),
		vlo:$('input[name="vLow"]').val(),
		vdiv:$('input[name="vDiv"]').prop("checked"),
		anim:$('input[name="animSpeed"]').val(),
		ires:$('input[name="intRes"]').val(),
		iled:$('input[name="iLED"] ').val()
	};

	console.log(circuit);

	var resistors = getResistorValues(
		circuit.iled,
		circuit.vhi,
		circuit.vlo,
		circuit.ires,
		circuit.vdiv,
		circuit.vcc
	);

	console.log(resistors);

	var info =  "<p class='lead'>Resistor I-LED "+resistors.ResI+"</p>";
	info += "<p class='lead'>Resistor R-LOW "+resistors.ResLow+"</p>";
	info += "<p class='lead'>Resistor R-HIGH "+resistors.ResHigh+"</p>";

	$("#info").html(info);
});