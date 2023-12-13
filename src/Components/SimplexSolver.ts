import { SimplexReady } from "@/app/page";

export interface SimplexResult {
    [a:string] : number;
}

export default class SimplexSolver{

    private data : SimplexReady;

    constructor(data:SimplexReady) {
        this.data = data;
    }

    public simplexToString():string {
        return ""
    }

    private pickIn(matrix:number[][]):number {
        let pickIn = -1;
        let minor = Infinity;
        for (let i = 0; i < matrix[0].length; i++) {
            if(matrix[0][i] < minor && matrix[0][i] < 0) {
                minor = matrix[0][i];
                pickIn = i;
            }
        }

        return pickIn;
    }

    private pickOut(matrix: number[][], pickIn: number): number {
        console.log("matrix pickout: ", matrix)
        let minRatio = Number.MAX_VALUE;
        let minRatioRow = -1;
      
        for (let row = 1; row < matrix.length; row++) {
          const numerator = matrix[row][matrix[row].length - 1];
          const denominator = matrix[row][pickIn];
      
          // Verifica se o denominador não é zero e a razão não é negativa
          if ((denominator !== 0) && ((numerator / denominator) > 0)) {
            const currentRatio = numerator / denominator;
            console.log(matrix[row])
            console.log(`[${row}] ${numerator} / ${denominator} = `, currentRatio);
      
            // Atualiza a linha com a menor razão
            if (currentRatio < minRatio) {
              minRatio = currentRatio;
              minRatioRow = row;
            }
          }
        }
      
        return minRatioRow;
    }

    public initMatrix(rows: number, columns: number): number[][] {
        // Initialize an empty matrix
        const matrix: number[][] = [];
      
        // Iterate through rows
        for (let i = 0; i < rows; i++) {
          // Initialize an empty row
          const row: number[] = [];
      
          // Iterate through columns
          for (let j = 0; j < columns; j++) {
            // Add 0 to the row
            row.push(0);
          }
      
          // Add the row to the matrix
          matrix.push(row);
        }
      
        return matrix;
      }

    public execute() {
        
        if(this.data != {} as SimplexReady) {
            const maxRestHours = parseFloat(((this.data.restPercentage/100) * this.data.weekHours).toFixed(2));
            const maxWorkHours = parseFloat(((this.data.maxWorkGoalPercentage / 100) * this.data.weekHours).toFixed(2));
            const maxMeetHours = parseFloat(((this.data.maxMeetingPercentage / 100) * this.data.weekHours).toFixed(2));
            const matrix : number[][] = [
                [-this.data.codeImpact, -this.data.meetImpact, -this.data.restImpact , 0, 0, 0, 0, 0],
                [1, 1, 1, 1, 0, 0, 0, this.data.weekHours],
                [0, 0, 1, 0, 1, 0, 0, maxRestHours],
                [1, 1, 0, 0, 0, 1, 0, maxWorkHours],
                [0, 1, 0, 0, 0, 0, 1, maxMeetHours]
            ]

            let matrixList : number[][][] = [];

            matrixList.push(matrix);

            let pickIn = this.pickIn(matrixList[matrixList.length - 1]);
            

            while(pickIn !== -1) {
                let pickOut = this.pickOut(matrixList[matrixList.length - 1], pickIn)
                console.log("executing...");
                console.log("pickIn: ", pickIn);
                console.log("pickOut: ", pickOut);

                const currentMatrix : number[][] = matrixList[matrixList.length - 1];
                const pivot : number = currentMatrix[pickOut][pickIn];
                let newPivotLine : number[] = [];

                //calcula nova linha pivô
                for (let i = 0; i < currentMatrix[pickOut].length; i++) {
                    
                    newPivotLine.push(currentMatrix[pickOut][i]/pivot);
                    
                }

                console.log("new pivot line: ", newPivotLine);
                let newMatrix : number[][] = this.initMatrix(currentMatrix.length, currentMatrix[0].length);

                //calcula novas linhas da tabela
                for (let i = 0; i < currentMatrix.length; i++) {
                    if(i === pickOut) {
                        newMatrix[i] = newPivotLine;
                    }
                    else {
                        for (let j = 0; j < currentMatrix[i].length; j++) {
                            newMatrix[i][j] = (currentMatrix[i][j]) - (currentMatrix[i][pickIn] * newPivotLine[j]);
                        }
                    }
                    
                }

                matrixList.push(newMatrix);

                pickIn = this.pickIn(matrixList[matrixList.length - 1]);
                
            }

            
            

            return matrixList;
        }

        return [];
    }
}