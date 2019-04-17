function solve() {
    // 85/100 in Judge
    $("button").on("click", () => {
        const jsFund = "js-fundamentals";
        const jsAdv = "js-advanced";
        const jsApp = "js-applications";

        let coursesPrice = {
            "js-fundamentals": 170,
            "js-advanced": 180,
            "js-applications": 190,
            "js-web": 490,
        };

        let selectedCourses = Array.from($('.courseBody input[type="checkbox"]:checked '));
        let educationForm = $('.courseBody input[type="radio"]:checked');

        let totalPrice = Math.round(getTotalPrice());
        $('.courseFoot p').text(`Cost: ${totalPrice}.00 BGN`);
        appendAllCourses();

        function getTotalPrice() {
            let totalPrice = calculateRegularPrice();
            if (isSelected(jsFund) && isSelected(jsAdv)) {
                totalPrice -= (coursesPrice[jsAdv] * 0.1);
            }
            if (isSelected(jsFund) && isSelected(jsAdv) && isSelected(jsApp)) {
                let moduleTotalPrice = coursesPrice[jsFund] + coursesPrice[jsAdv] + coursesPrice[jsApp];
                totalPrice -= moduleTotalPrice * 0.06;
            }
            if (educationForm.val() === "online") {
                totalPrice -= totalPrice * 0.06;
            }
            return totalPrice;
        }

        function calculateRegularPrice() {
            let result = 0;
            Array.from(selectedCourses).forEach(c => result += coursesPrice[c.name]);
            return result;
        }

        function isSelected(courseName) {
            return selectedCourses.some(c => c.name === courseName);
        }

        function appendAllCourses() {
            let resultUl = $('#myCourses .courseBody ul');
            resultUl.empty();
            for (let course of selectedCourses) {
                let courseArgs = course.name.split('-');
                let courseName = "";
                courseName += courseArgs[0].toUpperCase() + "-";
                courseName += courseArgs[1][0].toUpperCase() + courseArgs[1].substr(1);
                resultUl.append($('<li>').text(courseName));
            }
            if (selectedCourses.length === 4) {
                resultUl.append($('<li>').text("HTML and CSS"));
            }
        }
    });
}

solve();