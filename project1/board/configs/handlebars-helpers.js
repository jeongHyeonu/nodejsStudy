module.exports = {
    lengthOfList: (list=[]) => list.length, // 리스트 길이 반환
    eq: (val1, val2) => val1===val2, // 두 값이 같은지 비교
    dateString: (str) => new Date(str).toLocaleDateString(), // 표준시간 -> 우리나라 시간
}