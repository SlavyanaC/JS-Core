console.log(calculateFitnessRate("Monday", "Sauna", 15.30));

function calculateFitnessRate(day, service, hour) {
    let result = 0;
    switch (service) {
        case "Fitness": {
            if (day === "Saturday" || day === "Sunday") {
                result = 8.00;
            } else {

                if (+hour >= 8.00 && +hour <= 15.00) {
                    result = 5.00;
                } else if (+hour > 15.00 && +hour <= 22.00) {
                    result = 7.50;
                }
            }
        }
            break;
        case "Sauna": {
            if (day === "Saturday" || day === "Sunday") {
                result = 7.00;
            } else {
                if (+hour >= 8.00 && +hour <= 15.00) {
                    result = 4.00;
                } else if (+hour > 15.00 && +hour <= 22.00) {
                    result = 6.50;
                }
            }
        }
            break;
        case "Instructor": {
            if (day === "Saturday" || day === "Sunday") {
                result = 15.00;
            } else {
                if (+hour >= 8.00 && +hour <= 15.00) {
                    result = 10.00;
                } else if (+hour > 15.00 && +hour <= 22.00) {
                    result = 12.50;
                }
            }
        }
            break;
    }

    return result;
}