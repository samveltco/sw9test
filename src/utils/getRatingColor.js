// ©2024 Austin App House. All rights reserved.
const getRatingColor = (rating) => {
    if (rating > 80) {
        return '#6cff2e'
    }
    if (rating > 50) {
        return '#ff9a20'
    }
    return '#e6183f'
}

export default getRatingColor;