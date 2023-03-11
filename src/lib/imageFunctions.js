export function aspectRatio(dims, newWidth) {
    const width = dims[0];
    const height = dims[1];
    const newHeight = Math.round(((height / width) * newWidth));

    return([newWidth, newHeight]);
}