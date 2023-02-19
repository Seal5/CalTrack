import React from "react";

function CalculatedValues(props) {
    if (props.rowId === 0 && props.columId === 0) {
        var tCalorie = props.weightG / props.caloriePG;
        var count = 0;
        var arrC = [];
    } else if (props.columId === 0) {
        arrC[count] = tCalorie;
        count++;
        tCalorie = props.columnId;
    } else {
        tCalorie = tCalorie + props.weightG / props.caloriePG;
    }
  function sendValues() {
    props.onSend(arrC);
  }
}


export default CalculatedValues;
