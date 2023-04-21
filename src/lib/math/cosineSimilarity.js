export default function cosineSimilarity(a, b) {
    let dotProduct = 0;
    for (let i = 0; i < a.length; i++) {
        dotProduct += a[i] * b[i];
    }

    let aMagnitude = 0;
    let bMagnitude = 0;
    for (let i = 0; i < a.length; i++) {
        aMagnitude += a[i] * a[i];
        bMagnitude += b[i] * b[i];
    }
    aMagnitude = Math.sqrt(aMagnitude);
    bMagnitude = Math.sqrt(bMagnitude);

    const similarity = dotProduct / (aMagnitude * bMagnitude);
    return similarity;
}