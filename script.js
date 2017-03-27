var low = lowEx.slice(), med = medEx.slice(), high = highEx.slice();

function calcTime(numExercises, numSets){
	return numExercises * .5 * numSets;
}

function getRand(hiNum){
	return Math.round(Math.random() * hiNum);
}

// checks if ex a and b are both lunges or squats
function matches(a, b){
	var match = false;
	if(a.toLowerCase().indexOf("squat") >= 0 && b.toLowerCase().indexOf("squat") >= 0){
		match = true;
	}else if(a.toLowerCase().indexOf("lunge") >= 0 && b.toLowerCase().indexOf("lunge") >= 0){
		match = true;
	}
	return match;
}

// pulls ex b from array until b is the the same type of exercise as a
function getEx(exArr, ex1){
	var ex2 = null, ndx;
	while(ex2 == null || matches(ex1, ex2)){
		ndx = getRand(exArr.length-1);
		ex2 = exArr[ndx];
	}
	exArr.splice(ndx, 1);
	return ex2;
}


function getPair(round){
	var a, b, res = [];
	if(round % 2 == 0){
		//get high & low
		if(getRand(1) == 0){
			ndx = getRand(high.length-1);
			a = high[ndx];
			high.splice(ndx, 1);
			b = getEx(low, a);
		}else{
			ndx = getRand(low.length-1);
			a = low[ndx];
			low.splice(ndx, 1);
			b = getEx(high, a);
		}
	}else{
		//get 2 med
		ndx = getRand(med.length-1);
		a = med[ndx];
		med.splice(ndx, 1);
		b = getEx(med, a);
	}
	res.push(a);
	res.push(b);
	return res;
}

function getExercises(numExercises, numSets){
	var j = 2, res = [], pair;
	for(var i=0; i< numExercises; i++){
		pair = getPair(j);
		for(var n=0; n<numSets; n++){
			res.push(pair);
		}
		j++;
	}
	return res;
}
