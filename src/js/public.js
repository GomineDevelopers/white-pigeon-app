//获取医院等级
export function setHospitalLevel(level) {
    switch (level) {
        case 1:
            return '三级甲等'
            break;
        case 2:
            return '三级乙等'
            break;
        case 3:
            return '三级丙等'
            break;
        case 4:
            return '二级甲等'
            break;
        case 5:
            return '二级乙等'
            break;
        case 6:
            return '二级丙等'
            break;
        case 7:
            return '一级甲等'
            break;
        case 8:
            return '一级乙等'
            break;
        case 9:
            return '一级丙等'
            break;
        case 10:
            return '未知'
            break;
        default:
            break;
    }
}

//获取医院类型
export function setHospitalType(type) {
    switch (type) {
        case 1:
            return '综合医院'
            break;
        case 2:
            return '专科医院'
            break;
        case 3:
            return '整形美容医院'
            break;
        case 4:
            return '未知'
            break;
        default:
            break;
    }
}

//获取医院运营类型
export function setHospitalRunType(runType) {
    switch (runType) {
        case 1:
            return '国营医院'
            break;
        case 2:
            return '股份制医院'
            break;
        case 3:
            return '中外合资医院'
            break;
        case 4:
            return '合伙制医院'
            break;
        case 5:
            return '民营医院'
            break;
        case 6:
            return '未知'
            break;
        default:
            break;
    }
}
