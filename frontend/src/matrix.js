function arrayBuilder(n) {
    return Array(n).fill()
}

function matrix2D(height, width, fillWith) {
    return arrayBuilder(height).map((_,i) => {return arrayBuilder(width).map((__, j) => {return fillWith(i,j)})});
}

function matrixCopy(mat, height, width) {
    return matrix2D(height, width, (i,j) => {return mat[i][j]})
}

function foreach2D(matrix, irange, jrange, exec) {
    for(var i = 0; i < irange;i++) {
        for(var j = 0; j < jrange; j++) {
            const item = matrix[i][j];
            exec(item, i ,j);
        }
    }
}

export {arrayBuilder, matrix2D, matrixCopy, foreach2D}