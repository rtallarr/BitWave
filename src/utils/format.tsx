// convert miliseconds to minutes and seconds
export function GetMins(ms: number) {
    const mins = Math.floor(ms / 60000);
    const secs = Math.floor((ms % 60000) / 1000).toFixed(0); 

    if (secs < '10') {
        return mins + ':0' + secs;
    } else {
        return mins + ':' + secs;
    }
}

export function GetPorcentage(value: number) {
    return (value * 100).toFixed(0) + '%';
}