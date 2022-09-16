export default {
    formatNumber(value, dicimal) {
        if (typeof (value) === 'number') {
            return value.toLocaleString(undefined, {
                minimumFractionDigits: dicimal,
                maximumFractionDigits: dicimal
            });
        } else {
            let v_value = value === null || value === "" ? "0" : value;
            let checkcomma = v_value.includes(',');
            if (checkcomma) {
                /* have comma */
                let digit = (value.split(".")[1] !== undefined) ? value.split(".")[1].substring(0, dicimal) : 0;
                return value.split(".")[0] + digit;
            } else {
                return parseFloat(v_value).toLocaleString(undefined, {
                    minimumFractionDigits: dicimal,
                    maximumFractionDigits: dicimal
                });
            }
        }
    },
    datetoThaiDateString(date) {
        let monthNames = [
            "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน",
            "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม",
            "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
        ];

        let year = date.getFullYear() + 543;
        let month = monthNames[date.getMonth()];
        let numOfDay = date.getDate();

        let hour = date.getHours().toString().padStart(2, "0");
        let minutes = date.getMinutes().toString().padStart(2, "0");
        let second = date.getSeconds().toString().padStart(2, "0");

        return `${numOfDay} ${month} ${year} `;
        // return `${numOfDay} ${month} ${year} ` +
        //     `${hour}:${minutes}:${second} น.`;
    }
}