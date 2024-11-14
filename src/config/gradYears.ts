// const GradYearList = [2020, 2021, 2022, 2023, 2024, 2025, 2026];
const presentDate = new Date();
const presentYear = presentDate.getFullYear();
const GradYearList = [presentYear, presentYear+1, presentYear+2, presentYear+3, presentYear+4, presentYear+5, presentYear+6, presentYear+7, presentYear+8, presentYear+9, presentYear+10];
export const GradYears = GradYearList.map((v) => ({ label: v, value: v }));
