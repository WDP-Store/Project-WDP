export const getPublicId = (images) => {
    const publicId = images ? images.map((img) => {
        let dynamicPartPattern = /\/v\d+\//;
        const b = img.split(img.match(dynamicPartPattern)[0])[1].split('.')[0]
        return b
    }) : []

    return publicId
}