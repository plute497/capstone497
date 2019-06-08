export default Colors = {
    blue: '#64b5e2',
    green: '#307c3b',
    beige: '#ebebc5',
    yellow: '#fbb515',
    orange: '#eb4337',
    red: '#c54c41',
    white: '#ffffff',
    transWhite: 'rgba(255, 255, 255, 0.8)',
    black: '#000000',
    lightGray: '#dddddd',
    lighterGray: '#f5f5f5',
    darkGray: '#333333'
};

export const getColor = (name) => {
    switch(name) {
        case 'arts': return Colors.blue;
        case 'cchm': return Colors.yellow;
        case 'elks': return Colors.yellow; 
        case 'esther': return Colors.green; 
        case 'evergreen': return Colors.green; 
        case 'heritage': return Colors.green; 
        case 'hidden': return Colors.red; 
        case 'kiggins': return Colors.red; 
        case 'providence': return Colors.red; 
        case 'schofield': return Colors.blue; 
        case 'slocum': return Colors.blue; 
        case 'smith': return Colors.yellow; 
    }
}