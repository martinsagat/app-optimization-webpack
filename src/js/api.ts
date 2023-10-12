export function getTestImages(): Promise<string[]> {
    return new Promise(resolve => {
        setTimeout(() => {
            const mockedResponse = [
                'images/test-images/mountain.webp',
                'images/test-images/apple.webp',
                'images/test-images/tree.webp'
            ]

            resolve(mockedResponse)
        }, 700)
    })
}
