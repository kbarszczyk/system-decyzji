import React, {useEffect, useState} from "react";
import {useFormik} from "formik";
import styled from "styled-components";
import Logo from "./t-shirt.jpg";
import "./style.css"

declare module '*.jpg';

const CostCalculator = () => {
    let lossMatrix = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ];

    interface Form {
        firstDay: number;
        secondDay: number;
    }

    const onSubmit = () => {
    };

    const {values, handleChange} = useFormik<Form>({
        initialValues: {
            firstDay: 33,
            secondDay: 30,
        },
        onSubmit,
    });
    const matrix = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ];

    const demand = [100, 200, 300, 400];
    const supply = [100, 200, 300, 400];
    const buyPrices = [12, 10, 9, 9];

    for (let i = 0; i < matrix.length; i += 1) {
        const value = matrix[i];
        for (let j = 0; j < matrix.length; j += 1) {
            if (j > i) {
                value[j] = value[i];
            } else {
                value[j] =
                    -supply[i] * buyPrices[i] +
                    (demand[j] * values.firstDay +
                        (supply[i] - demand[j]) * values.secondDay);
            }
        }
    }

    const cloneArray = (array: number[][]): number[][] => {
        const loss = [[0]];
        for (let i = 0; i < array.length; i += 1) loss[i] = [...array[i]];
        return loss;
    };

    const getTransponderMatrix = (array: number[][]) =>
        array[0].map((_, i) => array.map((x: { [x: number]: number }) => x[i]));

    const transponeMatrix = getTransponderMatrix(matrix);

    console.log(transponeMatrix);

    // get max from each row
    const getMaxFromRow = (array: number[][]) => {
        const max = [];
        for (let i = 0; i < array.length; i += 1) {
            let maxValue = array[i][0];
            for (let j = 1; j < array[i].length; j += 1) {
                if (array[i][j] > maxValue) maxValue = array[i][j];
            }
            max.push(maxValue);
        }
        return max;
    };

    const getMinFromRow = (array: number[][]) => {
        const min = [];
        for (let i = 0; i < array.length; i += 1) {
            let minValue = array[i][0];
            for (let j = 1; j < array[i].length; j += 1) {
                if (array[i][j] < minValue) minValue = array[i][j];
            }
            min.push(minValue);
        }
        return min;
    };

    const getLoss = (loss: number[][], max: number[]): number[][] => {
        for (let i = 0; i < loss.length; i += 1) {
            const value = loss[i];
            for (let j = 0; j < loss.length; j += 1) {
                value[j] = max[j] - value[j];
            }
        }
        console.log(loss);
        return loss;
    };

    lossMatrix = getLoss(cloneArray(matrix), getMaxFromRow(transponeMatrix));

    const maxValue = Math.max(...getMaxFromRow(matrix));
    console.log("hurwicza", maxValue);

    const waldValue = Math.max(...getMinFromRow(matrix));
    console.log("waldi", waldValue);

    const savageValue = Math.min(...getMaxFromRow(lossMatrix));
    console.log("savage", savageValue);


    const sumFromRow = (array: number[][]) => {
        const sum = [];
        for (let i = 0; i < array.length; i += 1) {
            let sumValue = 0;
            for (let j = 0; j < array[i].length; j += 1) {
                if (j === 0) {
                    sumValue += array[i][j] * 0.2;
                }
                if (j === 1) {
                    sumValue += array[i][j] * 0.1;
                }
                if (j === 2) {
                    sumValue += array[i][j] * 0.5;
                }
                if (j === 3) {
                    sumValue += array[i][j] * 0.2;
                }
            }
            sum.push(sumValue);
        }
        return sum;
    };

    const owi = Math.max(...sumFromRow(cloneArray(matrix)));

    const ows = Math.min(...sumFromRow(cloneArray(lossMatrix)));

    const maxValuesArr = getMaxFromRow(matrix);

    const owdiValue =
        maxValuesArr[0] * 0.2 +
        maxValuesArr[1] * 0.1 +
        maxValuesArr[2] * 0.5 +
        maxValuesArr[3] * 0.2;

    console.log("owdi", owdiValue);

    interface MatrixWithIndexes {
        value: number;
        index: number[];
    }

    const getMaxWithIndexes = (array: MatrixWithIndexes[]) => {
        const max = {
            value: array[0].value,
            index: array[0].index,
        };
        for (let i = 1; i < array.length; i += 1) {
            if (array[i].value > max.value) {
                max.value = array[i].value;
                max.index = array[i].index;
            }
        }
        return max;
    };

    const getMaxFromRowWithIndexes = (array: MatrixWithIndexes[][]) => {
        const max = [];
        for (let i = 0; i < array.length; i += 1) {
            const maxValue: MatrixWithIndexes = {
                value: array[i][0].value,
                index: array[i][0].index,
            };
            for (let j = 1; j < array[i].length; j += 1) {
                if (array[i][j].value > maxValue.value) {
                    maxValue.value = array[i][j].value;
                    maxValue.index = array[i][j].index;
                }
            }
            max.push(maxValue);
        }
        return max;
    };

    const getMatrixWithIndexes = (array: number[][]): MatrixWithIndexes[][] => {
        const matrixWithIndexes = [];
        for (let i = 0; i < matrix.length; i += 1) {
            const value = array[i];
            const row = [];
            for (let j = 0; j < array.length; j += 1) {
                row.push({value: value[j], index: [i, j]});
            }
            matrixWithIndexes.push(row);
        }
        return matrixWithIndexes;
    };

    const hurwiczIdX = getMaxWithIndexes(
        getMaxFromRowWithIndexes(getMatrixWithIndexes(matrix))
    );

    const getMinFromRowWithIndexes = (array: MatrixWithIndexes[][]) => {
        const max = [];
        for (let i = 0; i < array.length; i += 1) {
            const maxValue: MatrixWithIndexes = {
                value: array[i][0].value,
                index: array[i][0].index,
            };
            for (let j = 1; j < array[i].length; j += 1) {
                if (array[i][j].value < maxValue.value) {
                    maxValue.value = array[i][j].value;
                    maxValue.index = array[i][j].index;
                }
            }
            max.push(maxValue);
        }
        return max;
    };

    const getMinWithIndexes = (array: MatrixWithIndexes[]) => {
        const max = {
            value: array[0].value,
            index: array[0].index,
        };
        for (let i = 1; i < array.length; i += 1) {
            if (array[i].value < max.value) {
                max.value = array[i].value;
                max.index = array[i].index;
            }
        }
        return max;
    };

    const waldIdx = getMaxWithIndexes(
        getMinFromRowWithIndexes(getMatrixWithIndexes(matrix))
    );

    const savageIdx = getMinWithIndexes(
        getMaxFromRowWithIndexes(getMatrixWithIndexes(lossMatrix))
    );

    return (
        <Wrapper>
            <div>
                <h1>Problemy oceny alternatyw w warunkach niepewności </h1>
                <h2>Sprzedaż koszulek typu T-SHIRT</h2>
                <td>
                    <img src={Logo} alt=''/>

                    <Row>
                        <h2>Cena pierwszego dnia za jedna koszulke: </h2>
                        <input
                            onChange={handleChange("firstDay")}
                            value={values.firstDay}
                        />
                    </Row>
                    <Row>
                        <h2>Cena drugiego dnia za jedna koszulke: </h2>
                        <input
                            onChange={handleChange("secondDay")}
                            value={values.secondDay}
                        />
                    </Row>
                    <div>
                        <td>
                            <h1>Tabela wypłat</h1>

                            <Table>
                                <table>
                                    <thead>
                                    <tr>
                                        <th>
                                            <tr>popyt/zamówienia</tr>
                                        </th>
                                        <th>100</th>
                                        <th>200</th>
                                        <th>300</th>
                                        <th>400</th>
                                    </tr>
                                    </thead>
                                    {matrix.map((row, i) => (
                                        <tr key={i}>
                                            <th scope='row'>{i + 1}00</th>
                                            {row.map((value, j) => (
                                                <td key={j}>{value}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </table>
                            </Table>
                        </td>
                        <td>
                            <h1>Tabela strat</h1>
                            <Table>
                                <table>
                                    <thead>
                                    <tr>
                                        <th>
                                            <tr>popyt/zamówienia</tr>
                                        </th>
                                        <th>100</th>
                                        <th>200</th>
                                        <th>300</th>
                                        <th>400</th>
                                    </tr>
                                    </thead>
                                    {lossMatrix.map((row, i) => (
                                        <tr key={i}>
                                            <th scope='row'>{i + 1}00</th>
                                            {row.map((value, j) => (
                                                <td key={j}>{value}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </table>
                            </Table>
                        </td>
                    </div>
                </td>

                <div>
                    <h1>Kryterium Hurwicza</h1>
                    <h3>
                        Według tego kryterium wybieramy decyzję [{hurwiczIdX.index[0] + 1} ,{" "}
                        {hurwiczIdX.index[1] + 1}] której odpowiada kwota:{" "}
                        {hurwiczIdX.value} zł
                    </h3>

                    <h1>Kryterium Walda</h1>
                    <h3>
                        Według tego kryterium wybieramy decyzję [{waldIdx.index[0] + 1} ,
                        {waldIdx.index[1] + 1}] której odpowiada kwota: {waldIdx.value} zł
                    </h3>

                    <h1>Kryterium Savage</h1>
                    <h3>
                        Według tego kryterium wybieramy decyzję [{savageIdx.index[0] + 1} ,
                        {savageIdx.index[1] + 1}] której odpowiada kwota: {savageIdx.value}{" "}
                        zł
                    </h3>

                    <h2><span>Kryterium oczekiwanej wypłaty:</span> {owi} zł</h2>
                    <h2><span>Kryterium oczekiwanej staraty moliwości:</span> {ows} zł</h2>
                    <h2>
                        <span>Kryterium Przy wykorzystaniu informacji doskonełej:</span> {owdiValue} zł
                    </h2>
                    <h2>
                        <span>Oczekiwana wartość informacji doskonałej:</span> {owdiValue - owi} zł
                    </h2>
                </div>
            </div>
        </Wrapper>
    );
};

export default CostCalculator;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin:0 auto;
  padding:0;
  font-family: "Century Gothic",Verdana,sans-serif;
  background-color:yellow;
`;

const Row = styled.div`
  display: marker;
  align-items: center;
`;
const bgc = styled.th`
  background-color: "green";
`;
const Table = styled.tr`
  padding: 1rem;
  display: flex;
  justify-content: center;
  table {
    border-spacing: 0;
    border: 5px solid black;
    tr {
    }
    th,
    td {
      margin: 0;
      padding: 2rem;
      border-bottom: 2px solid black;
      border-right: 2px solid black;
      :first-child {
        th {
          border: 0;
          background-color: "green";
        }
      }
      :last-child {
        border-right: 0;
      }
    }
  }
`;
