var userData = [];
var dataSetSizePrompt = "How many variables do you plan to store?";
var dataSetSizeDefaultText = "Enter any non-zero and positive integer";
var dataSetSize = prompt(dataSetSizePrompt, dataSetSizeDefaultText);
var tempData;

while (typeof dataSetSize !== 'number' && (dataSetSize % 1) === 0 && dataSetSize <= 0) {
    alert("ERROR: Your input must be a non-zero and positive integer.");
    dataSetSize = prompt(dataSetSizePrompt, dataSetSizeDefaultText);
}

console.log("Data accepted: " + dataSetSize);

/*
for (int i = 0; i < dataSetSize; i++) {
    tempData = prompt("", "");
    
}*/
