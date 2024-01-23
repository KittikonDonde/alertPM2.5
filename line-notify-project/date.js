async function DateData() {
    try {
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString('th-TH', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        return formattedDate;
    } catch (error) {
        console.error('Error getting current date:', error);
        throw error;
    }
}   

module.exports = { DateData };
